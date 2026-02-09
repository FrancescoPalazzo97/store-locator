export const StoreCardSkeleton = () => {
    return (
        <div className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="flex items-center justify-between">
                <div className="h-5 bg-gray-200 rounded-full w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    );
};
