import { Link, useParams } from "react-router-dom";
import { useStoreLocator } from "../stores/useStoreLocator";
import { useEffect } from "react";
import { Loader } from "../components/common/Loader";

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
        return <Loader />;
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

            <div className="flex flex-col lg:flex-row gap-6">
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
                        <div className="flex flex-wrap gap-3 mt-6">
                            {selectedStore.telefono && (
                                <a href={`tel:${selectedStore.telefono}`} className="btn btn-primary">
                                    📞 Chiama
                                </a>
                            )}
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                🗺️ Indicazioni
                            </a>
                        </div>
                    </div>
                </div>

                {/* Mappa placeholder */}
                <div className="w-full lg:w-1/2 h-80 lg:h-auto min-h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                        <p className="text-4xl mb-2">🗺️</p>
                        <p>Leaflet Map</p>
                        <p className="text-sm">(da implementare)</p>
                        <p className="text-xs mt-2">
                            Lat: {selectedStore.latitudine}, Lng: {selectedStore.longitudine}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}