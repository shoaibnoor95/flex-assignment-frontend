import { useEffect, useState } from 'react';


export function useAsync(fn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        let alive = true;
        (async () => {
            setLoading(true); setError("");
            try { const d = await fn(); if (alive) setData(d); }
            catch (e) { if (alive) setError(String(e.message || e)); }
            finally { if (alive) setLoading(false); }
        })();
        return () => { alive = false; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);


    return { data, loading, error, setData };
}