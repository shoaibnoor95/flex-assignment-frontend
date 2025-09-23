export const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

async function request(path, init = {}) {
    const res = await fetch(`${API_BASE}${path}`, { ...init });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
}

export const publicApi = {
    getApprovedReviews: (propertyId, limit = 10) =>
        request(`/public/properties/${propertyId}/reviews?limit=${limit}`),
    getProperty: (idOrSlug) => request(`/public/properties/${idOrSlug}`),

};
