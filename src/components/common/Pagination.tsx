import { useStoreLocator } from "../../stores/useStoreLocator";

const getVisiblePages = (current: number, total: number): (number | "...")[] => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: (number | "...")[] = [1];
    if (current > 3) pages.push("...");

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
};

export const Pagination = () => {
    const currentPage = useStoreLocator(s => s.currentPage);
    const totalPages = useStoreLocator(s => s.totalPages);
    const totalItems = useStoreLocator(s => s.totalItems);
    const fetchStores = useStoreLocator(s => s.fetchStores);

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="flex items-center justify-between px-2 py-3">
            <p className="text-xs text-gray-500">
                {totalItems} negozi trovati
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => fetchStores(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="min-w-10 min-h-10 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    &larr;
                </button>

                {visiblePages.map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="min-w-10 min-h-10 flex items-center justify-center text-sm text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => fetchStores(page)}
                            className={`min-w-10 min-h-10 text-sm rounded border cursor-pointer ${page === currentPage
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => fetchStores(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="min-w-10 min-h-10 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
};
