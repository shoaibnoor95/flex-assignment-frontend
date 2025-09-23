import { useEffect, useState } from "react";
import { Star } from "lucide-react";

function Stars({ value = 0 }) {
    return (
        <div className="inline-flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(n => (
                <Star
                    key={n}
                    className={n <= value ? "h-4 w-4 fill-yellow-400 stroke-yellow-400" : "h-4 w-4 text-zinc-300"}
                />
            ))}
        </div>
    );
}

function ReviewCard({ r }) {
    const [expanded, setExpanded] = useState(false);
    const text = r.comment || "";
    const tooLong = text.length > 220;
    const shown = expanded ? text : text.slice(0, 220);

    return (
        <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                        {String(r.guest_name || "G").trim().charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="text-sm font-medium text-zinc-900">{r.guest_name || "Guest"}</div>
                        <div className="text-xs text-zinc-500">
                            {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString() : ""}
                        </div>
                    </div>
                </div>
                <Stars value={r.rating ?? 0} />
            </div>

            <p className="mt-3 text-[15px] leading-6 text-zinc-700">
                {shown}{tooLong && !expanded ? "…" : ""}
            </p>

            {tooLong && (
                <button
                    onClick={() => setExpanded(v => !v)}
                    className="mt-2 text-sm font-medium text-emerald-800 hover:underline"
                >
                    {expanded ? "Show less" : "Read more"}
                </button>
            )}
        </article>
    );
}

/** Approved reviews only (manager-selected)
 * Backend: GET /api/public/properties/:id/reviews?limit=...
 */
export default function ReviewsSection({ propertyId, initialLimit = 6 }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [limit, setLimit] = useState(initialLimit);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true); setErr("");
                const base = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") || "";
                const res = await fetch(`${base}/public/properties/${propertyId}/reviews?limit=${limit}`);
                console.log(res)
                if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                const data = await res.json();
                if (alive) setItems(data.items || []);
            } catch (e) {
                if (alive) setErr(String(e.message || e));
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [propertyId, limit]);

    // If there are no approved reviews, hide the entire section
    if (!loading && !items.length) return null;

    return (
        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
                <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900">Guest Reviews</h3>
                </div>
                {items.length > 0 && (
                    <div className="text-sm text-zinc-500">
                        {items.length} {items.length === 1 ? "review" : "reviews"}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4">
                            <div className="h-4 w-28 animate-pulse rounded bg-zinc-200"></div>
                            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-zinc-200"></div>
                            <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-zinc-200"></div>
                        </div>
                    ))
                ) : (
                    items.map((r, idx) => <ReviewCard key={idx} r={r} />)
                )}
            </div>

            {/* Show more (fetch a larger limit) */}
            {!loading && items.length >= limit && (
                <div className="border-t border-zinc-200 px-6 py-4 text-center">
                    <button
                        onClick={() => setLimit(l => l + initialLimit)}
                        className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50"
                    >
                        Show more reviews
                    </button>
                </div>
            )}

            {err && (
                <div className="border-t border-red-200 bg-red-50 px-6 py-4 text-sm text-red-800">{err}</div>
            )}
        </section>
    );
}
