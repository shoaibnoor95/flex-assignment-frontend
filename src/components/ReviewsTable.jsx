import React from 'react';
import RatingStars from './RatingStars';
import { cx, timeAgo } from '../services/api';
import { ChevronRight } from 'lucide-react';
export default function ReviewsTable({ rows, loading, page, pageSize, total, onPage, onApprove }) {
    return (
        <section className="mt-6">
            <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold">Recent Reviews</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span>Page {page} of {Math.max(1, Math.ceil(total / pageSize))}</span>
                    <div className="flex gap-2">
                        <button onClick={() => onPage(Math.max(1, page - 1))} className="rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-1.5 hover:bg-zinc-800 disabled:opacity-50" disabled={page <= 1}>Prev</button>
                        <button onClick={() => onPage(page + 1)} className="rounded-lg border border-white/10 bg-zinc-900/70 px-3 py-1.5 hover:bg-zinc-800 disabled:opacity-50" disabled={page * pageSize >= total}>Next</button>
                    </div>
                </div>
            </div>        <div className="mt-4 overflow-hidden rounded-2xl border border-white/5">
                <table className="min-w-full divide-y divide-white/5">
                    <thead className="bg-zinc-900/60 text-left text-xs uppercase tracking-wider text-zinc-400">
                        <tr>
                            <th className="px-5 py-3 font-medium">Reviewer</th>
                            <th className="px-5 py-3 font-medium">Rating</th>
                            <th className="px-5 py-3 font-medium">Comment</th>
                            <th className="px-5 py-3 font-medium">Date</th>
                            <th className="px-5 py-3 font-medium">Approved</th>
                            <th className="px-5 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-zinc-950/40">
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <tr key={i} className="hover:bg-zinc-900/40">
                                    <td className="px-5 py-4" colSpan={6}>
                                        <div className="h-5 w-full animate-pulse rounded bg-white/5" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            rows.map(r => (
                                <tr key={r.id} className="hover:bg-zinc-900/40">
                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-zinc-200">{r.guest_name || '—'}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <RatingStars value={r.rating} />
                                            <span className="text-sm text-zinc-400">{r.rating != null ? Number(r.rating).toFixed(1) : '—'}</span>
                                        </div>
                                    </td>
                                    <td className="max-w-0 px-5 py-4"><p className="truncate text-sm text-zinc-300">{r.comment || '—'}</p></td>
                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-zinc-400">{r.submitted_at ? timeAgo(r.submitted_at) : '—'}</td>
                                    <td className="whitespace-nowrap px-5 py-4 text-sm">
                                        <span className={cx('rounded px-2 py-0.5 text-xs', r.approved_for_website ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-400/20' : 'bg-zinc-800/80 text-zinc-300 border border-white/10')}>{r.approved_for_website ? 'Yes' : 'No'}</span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="inline-flex items-center gap-2">
                                            <button onClick={() => onApprove(r.id, !r.approved_for_website)} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-emerald-300 hover:border-emerald-400/30 hover:bg-emerald-500/10">
                                                {r.approved_for_website ? 'Unapprove' : 'Approve'} <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section >
    );
}