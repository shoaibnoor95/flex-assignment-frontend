export const API_BASE = (import.meta?.env?.VITE_API_BASE ?? "https://flexassignment.xyz/api").replace(/\/$/, "");
export const ADMIN_KEY = import.meta?.env?.VITE_ADMIN_API_KEY ?? "supersecret";


async function request(path, init = {}) {
    const headers = new Headers(init.headers || {});
    headers.set("Content-Type", "application/json");
    if (ADMIN_KEY && !path.startsWith("/public/")) headers.set("Authorization", `Bearer ${ADMIN_KEY}`);
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
}


export const api = {
    getProperties: () => request(`/properties`),
    getKpis: (propertyId, since) => request(`/properties/${propertyId}/kpis?since=${since}`),
    getTrends: (propertyId, since) => request(`/properties/${propertyId}/trends?bucket=month&metric=count&since=${since}`),
    getReviews: (queryString) => request(`/reviews?${queryString}`),
    patchReview: (id, body) => request(`/reviews/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
};


export function qs(params) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') q.set(k, String(v));
    return q.toString();
}


export function timeAgo(iso) {
    if (!iso) return "";
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    const t = [[60, 'sec'], [60, 'min'], [24, 'hr'], [7, 'day'], [4.34524, 'wk'], [12, 'mo'], [Infinity, 'yr']];
    let val = diff, i = 0; for (; i < t.length && val >= t[i][0]; i++) val /= t[i][0];
    const unit = t[Math.min(i, t.length - 1)][1];
    return `${Math.floor(val)} ${unit}${Math.floor(val) !== 1 ? 's' : ''} ago`;
}


export const cx = (...c) => c.filter(Boolean).join(' ');