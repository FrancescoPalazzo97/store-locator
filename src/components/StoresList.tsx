import { useEffect, useRef } from "react";
import { useStoreLocator } from "../stores/useStoreLocator";
import { Link } from "react-router-dom";
import { Loader } from "./common/Loader";

export const StoreList = () => {
    const stores = useStoreLocator(s => s.stores);
    const highlightedStoreId = useStoreLocator(s => s.highlightedStoreId);
    const isLoading = useStoreLocator(s => s.isLoading);
    const setHighlightedStore = useStoreLocator(s => s.setHighlightedStore);

    const storeRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="flex-1 overflow-y-auto space-y-2">
            {stores.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    Nessun negozio trovato
                </p>
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
                        className={`card hover:shadow-lg transition-shadow cursor-pointer ${highlightedStoreId === store.id
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
                                className="text-sm text-blue-600 hover:underline ml-auto"
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
