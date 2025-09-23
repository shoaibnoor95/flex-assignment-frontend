import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://207.154.249.186/api";

export interface Review {
    id: number;
    listing: string;
    type: string;
    channel: string;
    rating: number | null;
    content: string;
    submittedAt: string;
    guestName: string;
    approved: boolean;
}

export async function fetchReviews(filters: Record<string, string | number> = {}): Promise<Review[]> {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    const res = await axios.get(`${API_BASE}/reviews/hostaway?${params}`);
    return res.data.data;
}

export async function toggleApproval(id: number): Promise<Review> {
    const res = await axios.post(`${API_BASE}/reviews/approve/${id}`);
    return res.data.review;
}
