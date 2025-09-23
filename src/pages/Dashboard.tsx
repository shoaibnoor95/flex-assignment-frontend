import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatsCard';
import TrendsCard from '../components/TrendsCard';
import FiltersBar from '../components/FiltersBar';
import ReviewsTable from '../components/ReviewsTable';
import { api, qs } from '../services/api';

export default function Dashboard() {
    const [properties, setProperties] = useState([]);
    const [propertyId, setPropertyId] = useState(null);
    const [kpis, setKpis] = useState({ average_rating: null, total_reviews: 0, response_rate: 0 });
    const [kpiLoading, setKpiLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);


    // filters
    const [ratingMin, setRatingMin] = useState(0);
    const [ratingMax, setRatingMax] = useState(5);
    const [category, setCategory] = useState('');
    const [categoryScoreMin, setCategoryScoreMin] = useState(0);
    const [channel, setChannel] = useState('');
    const [since, setSince] = useState('');
    const [until, setUntil] = useState('');
    const [sort, setSort] = useState('-submitted_at');


    const sinceYearStart = useMemo(() => `2024-01-01`, []);



    // bootstrap properties
    useEffect(() => {
        (async () => {
            const props = await api.getProperties();
            setProperties(props);
            if (props.length && propertyId == null) setPropertyId(props[0].id);
        })().catch(console.error);
    }, []);


    // load KPIs when property changes
    useEffect(() => {
        if (!propertyId) return; (async () => {
            setKpiLoading(true);
            try { setKpis(await api.getKpis(propertyId, sinceYearStart)); }
            finally { setKpiLoading(false); }
        })().catch(console.error);
    }, [propertyId, sinceYearStart]);


    // build query
    function buildQuery(p) {
        return qs({ propertyId, page: p, pageSize, sort, ratingGte: ratingMin > 0 ? ratingMin : undefined, ratingLte: ratingMax < 5 ? ratingMax : undefined, category: category || undefined, scoreGte: category && categoryScoreMin > 0 ? categoryScoreMin : undefined, channel: channel || undefined, since: since || undefined, until: until || undefined });
    }


    async function loadReviews(p = page) {
        if (!propertyId) return;
        setTableLoading(true);
        try {
            const resp = await api.getReviews(buildQuery(p));
            setReviews(resp.items || []);
            setTotal(resp.total || 0);
            setPage(resp.page || p);
        } finally { setTableLoading(false); }
    }
    useEffect(() => { loadReviews(1); /* eslint-disable-line */ }, [propertyId, pageSize, ratingMin, ratingMax, category, categoryScoreMin, channel, since, until, sort]);


    async function approveReview(id, approved) {
        await api.patchReview(id, { approved_for_website: approved });
        await loadReviews();
    }




    // bootstrap properties
    useEffect(() => {
        (async () => {
            const props = await api.getProperties();
            setProperties(props);
            if (props.length && propertyId == null) setPropertyId(props[0].id);
        })().catch(console.error);
    }, []);


    // load KPIs when property changes
    useEffect(() => {
        if (!propertyId) return; (async () => {
            setKpiLoading(true);
            try { setKpis(await api.getKpis(propertyId, sinceYearStart)); }
            finally { setKpiLoading(false); }
        })().catch(console.error);
    }, [propertyId, sinceYearStart]);

    return (
        <div className="min-h-screen bg-[#0e1412] text-white">
            <div className="mx-auto max-w-[1200px] px-4 py-5">
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                    <Sidebar />


                    <main className="col-span-12 rounded-2xl border border-white/5 bg-zinc-950/40 p-6 lg:col-span-9 xl:col-span-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h1 className="text-[28px] font-bold tracking-tight text-white">Flex Dashboard Review</h1>
                                <p className="mt-1 text-sm text-zinc-400">Manage and respond to reviews for your properties.</p>
                            </div>
                            <div className="relative">
                                <select className="rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800" value={propertyId || ''} onChange={(e) => setPropertyId(Number(e.target.value))}>
                                    {properties.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
                                </select>
                            </div>
                        </div>


                        {propertyId && <TrendsCard propertyId={propertyId} since={sinceYearStart} />}


                        <section className="mt-6">
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                <StatCard label="Average Rating" value={kpis.average_rating ?? '—'} loading={kpiLoading} />
                                <StatCard label="Total Reviews" value={kpis.total_reviews ?? 0} loading={kpiLoading} />
                                <StatCard label="Response Rate" value={`${Math.round((kpis.response_rate ?? 0) * 100)}%`} loading={kpiLoading} />
                            </div>
                        </section>


                        <FiltersBar state={{ ratingMin, setRatingMin, ratingMax, setRatingMax, category, setCategory, categoryScoreMin, setCategoryScoreMin, channel, setChannel, since, setSince, until, setUntil, sort, setSort }} />


                        <ReviewsTable rows={reviews} loading={tableLoading} page={page} pageSize={pageSize} total={total} onPage={(p) => loadReviews(p)} onApprove={approveReview} />
                    </main>
                </div>
            </div>
        </div>
    );
}
