import { useEffect, useRef } from "react";
import { useStoreLocator } from "../stores/useStoreLocator";
import { Link } from "react-router-dom";
import { StoreCardSkeleton } from "./common/StoreCardSkeleton";

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
            <div className="flex-1 overflow-y-auto space-y-2">
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
        <div ref={listRef} className="flex-1 overflow-y-auto space-y-2">
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
                        className={`card hover:shadow-lg active:bg-gray-50 transition-all duration-200 cursor-pointer ${highlightedStoreId === store.id
                            ? "ring-2 ring-blue-500 bg-blue-50"
                            : ""
                            }`}
                        onMouseEnter={() => setHighlightedStore(store.id)}
                        onMouseLeave={() => setHighlightedStore(null)}
                    >
                        <h3 className="font-semibold text-gray-900">{store.nome}</h3>
                        <p className="text-sm text-gray-600">{store.indirizzo}</p>
                        <p className="text-sm text-gray-500">{store.città}</p>
                        <div className="flex items-center justify-between mt-2">
                            {store.totem && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Totem disponibile
                                </span>
                            )}
                            <Link
                                to={`/store/${store.id}`}
                                className="text-sm text-blue-600 hover:underline ml-auto py-2"
                            >
                                Dettagli →
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
