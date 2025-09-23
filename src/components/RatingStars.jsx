import React from 'react';
import { Star } from 'lucide-react';
import { cx } from '../services/api';


export default function RatingStars({ value }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={cx('h-4 w-4 stroke-[1.5]', s <= (value || 0) ? 'fill-yellow-400 stroke-yellow-400' : 'text-zinc-600')} />
            ))}
        </div>
    );
}