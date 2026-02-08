import { useStoreLocator } from "../../stores/useStoreLocator";

export const Pagination = () => {
    const currentPage = useStoreLocator(s => s.currentPage);
    const totalPages = useStoreLocator(s => s.totalPages);
    const totalItems = useStoreLocator(s => s.totalItems);
    const fetchStores = useStoreLocator(s => s.fetchStores);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-2 py-3">
            <p className="text-xs text-gray-500">
                {totalItems} negozi trovati
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => fetchStores(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => fetchStores(page)}
                        className={`px-2.5 py-1 text-sm rounded border cursor-pointer ${page === currentPage
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => fetchStores(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-2 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                    →
                </button>
            </div>
        </div>
    );
};
