import { useEffect, useState } from "react";
import ReviewsSection from "../components/public/ReviewsSection";
import { publicApi } from "../services/publicApi";
import { useParams } from "react-router-dom";
import logo from "/logo.png";

export default function PropertyPublic() {
    const [prop, setProp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const { idOrSlug } = useParams();

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                console.log(idOrSlug, 'prop.id')
                setLoading(true); setErr("");
                const data = await publicApi.getProperty(idOrSlug);
                if (alive) setProp(data);
            } catch (e) {
                if (alive) setErr(String(e.message || e));
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, [idOrSlug]);

    if (err) {
        return <div className="p-8 text-center text-red-600">Failed to load property: {err}</div>;
    }

    const images = prop?.images || [];

    return (
        <div className="min-h-screen bg-[#FBF8EE] text-zinc-900">
            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-[#FBF8EE]/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        {/* Logo */}
                        <img
                            src={logo}   // <- make sure this matches your file name in public/
                            alt="The Flex Logo"
                            className="h-7 w-auto"
                        />
                    </div>
                    <nav className="hidden items-center gap-6 text-[15px] text-zinc-700 md:flex">
                        <a className="hover:text-zinc-900" href="#">Landlords</a>
                        <a className="hover:text-zinc-900" href="https://theflex.global/about-us">About Us</a>
                        <a className="hover:text-zinc-900" href="https://theflex.global/careers">Careers</a>
                        <a className="hover:text-zinc-900" href="https://theflex.global/contact">Contact</a>
                        <span className="text-xs text-zinc-400">GB</span>
                        <a className="hover:text-zinc-900" href="#">English</a>
                        <span className="font-medium">€ EUR</span>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-[1200px] px-4 pt-8 pb-20">
                {/* Gallery */}
                <section className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-7 lg:col-span-8">
                        <div className="aspect-[16/12] overflow-hidden rounded-2xl bg-zinc-200">
                            {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : null}
                        </div>
                    </div>
                    <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-5 lg:col-span-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
                                {images[i] ? <img src={images[i]} alt="" className="h-full w-full object-cover" /> : null}
                            </div>
                        ))}
                        <button className="col-span-2 -mt-2 ml-auto rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm">
                            View all photos
                        </button>
                    </div>
                </section>

                {/* Title + specs */}
                <section className="mt-8">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {prop?.name || (loading ? ' ' : 'Property')}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-8 text-sm text-zinc-700">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{prop?.specs?.guests ?? '—'}</span> Guests
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{prop?.specs?.bedrooms ?? '—'}</span> Bedrooms
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{prop?.specs?.bathrooms ?? '—'}</span> Bathrooms
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{prop?.specs?.beds ?? '—'}</span> beds
                        </div>
                    </div>
                    <hr className="mt-6 border-zinc-200" />
                </section>

                {/* Two columns */}
                <section className="mt-6 grid grid-cols-12 gap-6">
                    {/* Left */}
                    <div className="col-span-12 space-y-6 lg:col-span-8">
                        {/* About */}
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold">About this property</h3>
                            <p className="mt-2 text-[15px] leading-7 text-zinc-700">
                                {prop?.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Amenities</h3>
                                <button className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm">
                                    View all amenities
                                </button>
                            </div>
                            <ul className="mt-4 grid grid-cols-1 gap-y-3 text-[15px] sm:grid-cols-2 lg:grid-cols-3">
                                {(prop?.amenities || []).map((a) => (
                                    <li key={a} className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-emerald-600/80"></span>
                                        <span className="text-zinc-700">{a}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Stay Policies */}
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold">Stay Policies</h3>

                            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-emerald-900/5 p-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                                    <div className="text-sm text-zinc-500">Check-in Time</div>
                                    <div className="mt-1 font-semibold">{prop?.specs?.checkin_time || '3:00 PM'}</div>
                                </div>
                                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                                    <div className="text-sm text-zinc-500">Check-out Time</div>
                                    <div className="mt-1 font-semibold">{prop?.specs?.checkout_time || '10:00 AM'}</div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                                    <h4 className="font-medium">House Rules</h4>
                                    <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                                        {(prop?.house_rules || []).map((r) => (
                                            <li key={r} className="flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full bg-zinc-400"></span>{r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                                    <h4 className="font-medium">Cancellation Policy</h4>
                                    <div className="mt-3 space-y-3 text-sm text-zinc-700">
                                        <div>
                                            <div className="font-semibold">For stays less than 28 days</div>
                                            <ul className="mt-2 list-disc pl-5">
                                                {(prop?.cancellation_policy?.short_stays || []).map((x, i) => <li key={i}>{x}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="font-semibold">For stays of 28 days or more</div>
                                            <ul className="mt-2 list-disc pl-5">
                                                {(prop?.cancellation_policy?.long_stays || []).map((x, i) => <li key={i}>{x}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Reviews – approved only */}
                        {prop?.id && <ReviewsSection propertyId={prop.id} initialLimit={6} />}

                        {/* Location */}
                        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold">Location</h3>
                            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
                                <div className="h-[260px] w-full bg-[url('https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png')] bg-cover opacity-20"></div>
                            </div>
                            {prop?.location?.address && (
                                <div className="mt-3 text-sm text-zinc-600">{prop.location.address}</div>
                            )}
                        </div>
                    </div>

                    {/* Right column (booking card UI stub) */}
                    <aside className="col-span-12 lg:col-span-4">
                        <div className="sticky top-20 rounded-2xl border border-zinc-200 bg-white shadow-sm">
                            <div className="rounded-t-2xl bg-emerald-900 px-5 py-4 text-white">
                                <div className="text-[15px] font-semibold">Book Your Stay</div>
                                <p className="mt-1 text-xs opacity-80">Select dates to see prices</p>
                            </div>
                            <div className="space-y-3 p-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="col-span-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-700">Select dates</button>
                                    <button className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-700">1 guest</button>
                                    <button className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-left text-sm text-zinc-700">More</button>
                                </div>
                                <button className="w-full rounded-lg bg-zinc-400 px-4 py-2 text-sm font-medium text-white">Check availability</button>
                                <button className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700">Send Inquiry</button>
                                <div className="pt-1 text-center text-xs text-zinc-500">Instant booking confirmation</div>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>

            <footer className="border-t border-zinc-200 bg-emerald-900 text-white">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* ... footer blocks unchanged ... */}
                    <div>
                        <div className="text-lg font-semibold">Join The Flex</div>
                        <p className="mt-2 text-sm text-emerald-100/90">
                            Sign up now and stay up to date on our latest news and exclusive deals including 5% off your first stay!
                        </p>
                        <div className="mt-4 space-y-2">
                            <input className="w-full rounded-lg border-0 bg-emerald-800/60 px-3 py-2 text-sm placeholder:text-emerald-200/70" placeholder="Email address" />
                            <button className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-emerald-900">Subscribe</button>
                        </div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">The Flex</div>
                        <p className="mt-2 text-sm text-emerald-100/90">
                            Professional property management services for landlords, flexible corporate lets for businesses and quality accommodations for short-term and long-term guests.
                        </p>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Quick Links</div>
                        <ul className="mt-2 space-y-2 text-sm text-emerald-100/90">
                            <li>Blog</li><li>Careers</li><li>Terms & Conditions</li><li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Contact Us</div>
                        <ul className="mt-2 space-y-2 text-sm text-emerald-100/90">
                            <li>United Kingdom: +44 77 2374 5646</li>
                            <li>Algeria: +33 7 57 59 22 41</li>
                            <li>France: +33 6 44 64 57 17</li>
                            <li>info@theflex.global</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-emerald-800 py-4 text-center text-xs text-emerald-100/80">
                    © 2025 The Flex. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
