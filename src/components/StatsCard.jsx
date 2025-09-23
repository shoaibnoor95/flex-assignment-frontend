import React from 'react';


export default function StatCard({ label, value, loading }) {
    return (
        <div className="rounded-2xl border border-white/5 bg-zinc-900/60 p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
            <div className="text-[12px] font-medium text-zinc-400">{label}</div>
            <div className="mt-2 text-2xl font-semibold text-white tracking-tight">
                {loading ? <span className="inline-block h-6 w-16 animate-pulse rounded bg-white/10" /> : value}
            </div>
        </div>
    );
}