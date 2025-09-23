import React from 'react';

export default function FiltersBar({ state }) {
    const {
        ratingMin, setRatingMin,
        ratingMax, setRatingMax,
        category, setCategory,
        categoryScoreMin, setCategoryScoreMin,
        channel, setChannel,
        since, setSince,
        until, setUntil,
        sort, setSort
    } = state;

    const categoryOptions = [
        'cleanliness', 'noise', 'hospitality', 'heating',
        'design', 'wifi', 'space', 'view', 'peacefulness', 'maintenance'
    ];
    const channelOptions = ['', 'airbnb', 'booking', 'website', 'google', 'hostaway'];

    return (
        <section className="mt-6 rounded-2xl border border-white/5 bg-zinc-950/60 p-4">
            {/* Filters row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

                {/* Rating */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400">Rating</label>
                    <div className="flex items-center gap-2 text-sm">
                        <input
                            type="number"
                            min={0}
                            max={5}
                            step={0.5}
                            value={ratingMin}
                            onChange={(e) => setRatingMin(Number(e.target.value))}
                            className="w-full rounded border border-white/10 bg-zinc-900/70 px-2 py-1"
                        />
                        <span>to</span>
                        <input
                            type="number"
                            min={0}
                            max={5}
                            step={0.5}
                            value={ratingMax}
                            onChange={(e) => setRatingMax(Number(e.target.value))}
                            className="w-full rounded border border-white/10 bg-zinc-900/70 px-2 py-1"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400">Category</label>
                    <div className="flex items-center gap-2">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex-1 rounded border border-white/10 bg-zinc-900/70 px-2 py-1 text-sm"
                        >
                            <option value="">Any</option>
                            {categoryOptions.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min={0}
                            max={10}
                            step={1}
                            value={categoryScoreMin}
                            onChange={(e) => setCategoryScoreMin(Number(e.target.value))}
                            className="w-20 rounded border border-white/10 bg-zinc-900/70 px-2 py-1 text-sm"
                            placeholder="≥"
                        />
                    </div>
                </div>

                {/* Channel */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400">Channel</label>
                    <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        className="w-full rounded border border-white/10 bg-zinc-900/70 px-2 py-1 text-sm"
                    >
                        {channelOptions.map((c) => (
                            <option key={c || 'any'} value={c}>{c || 'Any'}</option>
                        ))}
                    </select>
                </div>

                {/* Time */}
                {/* Time */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400">Time</label>
                    <div className="flex items-center gap-2 text-sm">
                        <input
                            type="date"
                            value={since}
                            onChange={(e) => setSince(e.target.value)}
                            className="w-32 rounded border border-white/10 bg-zinc-900/70 px-2 py-1 relative z-10"
                        />
                        <span>to</span>
                        <input
                            type="date"
                            value={until}
                            onChange={(e) => setUntil(e.target.value)}
                            className="w-32 rounded border border-white/10 bg-zinc-900/70 px-2 py-1 relative z-10"
                        />
                    </div>
                </div>


                {/* Sort */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400">Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="w-full rounded border border-white/10 bg-zinc-900/70 px-2 py-1 text-sm"
                    >
                        <option value="-submitted_at">Newest</option>
                        <option value="submitted_at">Oldest</option>
                        <option value="-rating">Rating: High → Low</option>
                        <option value="rating">Rating: Low → High</option>
                    </select>
                </div>
            </div>

            {/* Reset button */}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => {
                        state.setRatingMin(0);
                        state.setRatingMax(5);
                        state.setCategory('');
                        state.setCategoryScoreMin(0);
                        state.setChannel('');
                        state.setSince('');
                        state.setUntil('');
                        state.setSort('-submitted_at');
                    }}
                    className="rounded-lg border border-white/10 bg-zinc-900/70 px-4 py-1.5 text-sm hover:bg-zinc-800"
                >
                    Reset
                </button>
            </div>
        </section>
    );
}
