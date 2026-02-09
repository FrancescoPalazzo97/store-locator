export const StoreCardSkeleton = () => {
    return (
        <div className="p-4 border-b border-dark-border animate-pulse">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="h-4 bg-dark-surface-hover rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-dark-surface-hover rounded w-full mb-2"></div>
                    <div className="h-5 bg-dark-surface-hover rounded-full w-16 mt-2"></div>
                </div>
                <div className="w-5 h-5 bg-dark-surface-hover rounded ml-3"></div>
            </div>
        </div>
    );
};
