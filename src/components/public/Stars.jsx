import { Star } from "lucide-react";

export default function Stars({ value = 0 }) {
    return (
        <div className="inline-flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(n => (
                <Star
                    key={n}
                    className={n <= value ? "h-4 w-4 fill-yellow-400 stroke-yellow-400" : "h-4 w-4 text-zinc-300"}
                />
            ))}
        </div>
    );
}
