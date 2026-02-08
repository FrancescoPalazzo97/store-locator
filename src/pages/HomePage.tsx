import { useEffect, useRef } from "react";
import { useStoreLocator } from "../stores/useStoreLocator"
import { Loader } from "../components/common/Loader";
import { Link } from "react-router-dom";
import { StoreMap } from "../components/map/StoreMap";

export const HomePage = () => {
    const {
        stores,
        cities,
        isLoading,
        error,
        selectedCity,
        highlightedStoreId,
        fetchStores,
        fetchCities,
        setSelectedCity,
        setHighlightedStore
    } = useStoreLocator();

    const storeRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    useEffect(() => {
        fetchStores();
        fetchCities();
    }, []);

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

    if (isLoading && stores.length === 0) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                <p className="font-semibold">Errore</p>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-140px)]">
            {/* Sidebar con filtri e lista negozi */}
            <aside className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden">
                {/* Filtro città */}
                <div className="card">
                    <label
                        htmlFor="city-filter"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Filtra per città
                    </label>
                    <select
                        id="city-filter"
                        value={selectedCity || ""}
                        onChange={(e) => setSelectedCity(e.target.value || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Tutte le città</option>
                        {cities.map((city) => (
                            <option key={city.città} value={city.città}>
                                {city.città} ({city.count})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista negozi */}
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
            </aside>

            {/* Mappa placeholder */}
            <main className="flex-1 bg-gray-200 rounded-lg flex items-center justify-center min-h-75 lg:min-h-0">
                <StoreMap
                    stores={stores}
                    highlightedStoreId={highlightedStoreId}
                    onMarkerClick={(storeId) => setHighlightedStore(storeId)}
                />
            </main>
        </div>
    )
}