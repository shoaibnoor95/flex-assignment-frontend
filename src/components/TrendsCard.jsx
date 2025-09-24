import React, { useEffect, useState } from 'react';
import { Star as StarIcon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { api, cx } from '../services/api';

export default function TrendsCard({ propertyId, since }) {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true); setError('');
            try {
                const tr = await api.getTrends(propertyId, since);
                const data = (tr.series?.[0]?.data || []).map(d => ({ month: d.x, value: d.y }));
                if (alive) setSeries(data);
            } catch (e) { if (alive) setError(String(e.message || e)); }
            finally { if (alive) setLoading(false); }
        })();
        return () => { alive = false; };
    }, [propertyId, since]);

    const handleViewProperty = () => {
        const appUrl = window.location.origin;
        window.open(`${appUrl}/property/${propertyId}`, '_blank'); // opens in new tab
        // or use: window.location.href = `${appUrl}/public/14`; to open in same tab
    };

    return (
        <div className="mt-6 rounded-2xl border border-white/5 bg-zinc-950/60 p-5">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[15px] font-semibold">Property Performance Trends</div>
                    <p className="mt-1 text-xs text-zinc-400">Monthly review counts (From 2024 to onwards)</p>
                </div>
                <div className="flex gap-2 text-xs">
                    {[{ label: 'Rating', active: true, icon: StarIcon }, { label: 'View Property', onClick: handleViewProperty }].map(t => (
                        <button
                            key={t.label}
                            onClick={t.onClick}
                            className={cx(
                                'inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5',
                                t.active
                                    ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                                    : 'border-white/10 bg-zinc-900/70 text-zinc-400 hover:text-white'
                            )}
                        >
                            {t.icon ? <t.icon className="h-3.5 w-3.5" /> : null}
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-4 h-64 w-full rounded-xl border border-white/5 bg-zinc-900/60 p-3">
                {error && <div className="text-sm text-red-400">{error}</div>}
                {loading ? (
                    <div className="h-full w-full animate-pulse rounded bg-white/5" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                            <CartesianGrid stroke="#1f2937" vertical={false} />
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} tickLine={{ stroke: '#1f2937' }} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} tickLine={{ stroke: '#1f2937' }} />
                            <Tooltip contentStyle={{ background: '#0b1220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, color: '#e5e7eb' }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                            <Bar dataKey="value" fill="#0ea5a4" radius={[8, 8, 4, 4]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
