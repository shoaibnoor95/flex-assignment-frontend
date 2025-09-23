import React from 'react';
import { LayoutDashboard, MessageSquare, ListChecks, Users, Settings, HelpCircle } from 'lucide-react';
import { cx } from '../services/api';


const items = [
    { label: 'Reviews', icon: MessageSquare, active: true },

];


export function Avatar() {
    return <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/90 ring-2 ring-emerald-300/30 text-sm font-semibold text-white">FL</div>;
}


export default function Sidebar() {
    return (
        <aside className="col-span-12 h-full rounded-2xl border border-white/5 bg-zinc-950/60 p-4 shadow-lg backdrop-blur lg:col-span-3 xl:col-span-2">
            <div className="flex items-center gap-3 px-3">
                <Avatar />
                <div className="leading-tight">
                    <div className="text-[15px] font-semibold text-emerald-50">Flex Living</div>
                </div>
            </div>
            <nav className="mt-6 space-y-1.5">
                {items.map(({ icon: Icon, label, active }) => (
                    <button key={label} className={cx('group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium', active ? 'bg-emerald-600/15 text-emerald-200 ring-1 ring-emerald-400/20' : 'text-zinc-300 hover:bg-zinc-800/70 hover:text-white')}>
                        <Icon className={cx('h-4.5 w-4.5', active ? 'text-emerald-300' : 'text-zinc-400 group-hover:text-white')} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

        </aside>
    );
}