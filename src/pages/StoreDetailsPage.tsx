import { Link, useParams } from "react-router-dom";
import { useStoreLocator } from "../stores/useStoreLocator";
import { useEffect } from "react";
import { StoreDetailsMap } from "../components/map/StoreDetailsMap";

const StoreDetailSkeleton = () => (
    <div className="max-w-6xl mx-auto">
        <div className="h-4 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-140px)]">
            <div className="w-full lg:w-1/2">
                <div className="card animate-pulse space-y-4">
                    <div className="h-7 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
                        <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
    </div>
);

export const StoreDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const {
        selectedStore,
        isLoading,
        error,
        fetchStoreById,
        clearSelectedStore
    } = useStoreLocator();

    useEffect(() => {
        if (id) fetchStoreById(parseInt(id, 10));

        return () => clearSelectedStore();
    }, [id]);

    if (isLoading) {
        return <StoreDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                    <p className="font-semibold">Errore</p>
                    <p>{error}</p>
                </div>
                <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
                    ← Torna alla lista
                </Link>
            </div>
        );
    }

    if (!selectedStore) {
        return (
            <div className="max-w-4xl mx-auto">
                <p className="text-gray-500">Negozio non trovato</p>
                <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
                    ← Torna alla lista
                </Link>
            </div>
        );
    }

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitudine},${selectedStore.longitudine}`;

    return (
        <div className="max-w-6xl mx-auto">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Torna alla lista
            </Link>

            <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-140px)]">
                {/* Dettagli negozio */}
                <div className="w-full lg:w-1/2">
                    <div className="card">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            {selectedStore.nome}
                        </h1>

                        <div className="space-y-3">
                            <p className="flex items-start gap-3">
                                <span className="text-xl">📍</span>
                                <span>
                                    {selectedStore.indirizzo}
                                    <br />
                                    <span className="text-gray-500">{selectedStore.città}</span>
                                </span>
                            </p>

                            {selectedStore.telefono && (
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">📞</span>
                                    <a
                                        href={`tel:${selectedStore.telefono}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {selectedStore.telefono}
                                    </a>
                                </p>
                            )}

                            <p className="flex items-center gap-3">
                                <span className="text-xl">🖥️</span>
                                <span>
                                    Totem:{" "}
                                    {selectedStore.totem ? (
                                        <span className="text-green-600 font-medium">
                                            Disponibile
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">Non disponibile</span>
                                    )}
                                </span>
                            </p>
                        </div>

                        {/* Bottoni azione */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            {selectedStore.telefono && (
                                <a href={`tel:${selectedStore.telefono}`} className="btn btn-primary text-center">
                                    📞 Chiama
                                </a>
                            )}
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary text-center"
                            >
                                🗺️ Indicazioni
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mappa placeholder */}
                <div className="w-full lg:w-1/2 h-64 lg:h-auto min-h-0 rounded-lg">
                    <StoreDetailsMap store={selectedStore} />
                </div>
            </div>
        </div>
    );
}