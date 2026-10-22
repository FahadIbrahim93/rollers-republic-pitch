import { Loader2 } from "lucide-react";

export function LoadingFallback() {
    return (
        <div className="flex h-[80vh] w-full items-center justify-center bg-[#1b2347]">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="text-white/60 text-sm animate-pulse">Loading experience...</p>
            </div>
        </div>
    );
}
