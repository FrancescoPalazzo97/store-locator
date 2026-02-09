import { useEffect, useRef } from "react";
import { useStoreLocator } from "../stores/useStoreLocator";
import { Link } from "react-router-dom";
import { StoreCardSkeleton } from "./common/StoreCardSkeleton";

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

export const StoreList = () => {
    const stores = useStoreLocator(s => s.stores);
    const highlightedStoreId = useStoreLocator(s => s.highlightedStoreId);
    const isLoading = useStoreLocator(s => s.isLoading);
    const setHighlightedStore = useStoreLocator(s => s.setHighlightedStore);
    const setSelectedCity = useStoreLocator(s => s.setSelectedCity);
    const setSearchQuery = useStoreLocator(s => s.setSearchQuery);
    const setSelectedTotem = useStoreLocator(s => s.setSelectedTotem);

    const storeRefs = useRef<Map<number, HTMLDivElement>>(new Map());
    const listRef = useRef<HTMLDivElement>(null);

    // Scroll to highlighted card
    useEffect(() => {
        if (highlightedStoreId !== null) {
            const cardElement = storeRefs.current.get(highlightedStoreId);
            if (cardElement) {
                cardElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }, [highlightedStoreId]);

    // Scroll to top when stores change (new page/filter)
    useEffect(() => {
        listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, [stores]);

    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StoreCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    const handleResetFilters = () => {
        setSelectedCity(null);
        setSearchQuery("");
        setSelectedTotem(null);
    };

    return (
        <div ref={listRef} className="flex-1 overflow-y-auto">
            {stores.length === 0 ? (
                <div className="text-center py-8 px-4">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-gray-700 font-medium mb-1">
                        Nessun negozio trovato
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        Prova a modificare i filtri di ricerca
                    </p>
                    <button
                        onClick={handleResetFilters}
                        className="btn btn-secondary text-sm"
                    >
                        Resetta filtri
                    </button>
                </div>
            ) : (
                stores.map((store) => (
                    <div
                        key={store.id}
                        ref={el => {
                            if (el) {
                                storeRefs.current.set(store.id, el);
                            } else {
                                storeRefs.current.delete(store.id);
                            }
                        }}
                        className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${highlightedStoreId === store.id
                            ? "ring-2 ring-blue-500 bg-blue-50"
                            : ""
                            }`}
                        onMouseEnter={() => setHighlightedStore(store.id)}
                        onMouseLeave={() => setHighlightedStore(null)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900">{store.nome}</h3>
                                <p className="text-sm text-gray-500 mt-1">{store.indirizzo}, {store.città}</p>
                                {store.totem && (
                                    <span className="inline-block text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full mt-2">
                                        Totem
                                    </span>
                                )}
                            </div>
                            <Link
                                to={`/store/${store.id}`}
                                className="text-gray-400 hover:text-blue-600 ml-3 mt-1 shrink-0"
                                onClick={e => e.stopPropagation()}
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
