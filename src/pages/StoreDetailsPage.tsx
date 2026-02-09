import { Link, useParams } from "react-router-dom";
import { useStoreLocator } from "../stores/useStoreLocator";
import { useEffect } from "react";
import { StoreDetailsMap } from "../components/map/StoreDetailsMap";

// Inline SVG icons (Heroicons outline style)
const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);

const MonitorIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
);

const StoreDetailSkeleton = () => (
    <div className="max-w-7xl mx-auto p-4 lg:p-6 w-full">
        <div className="h-10 bg-dark-surface-hover rounded-lg w-40 mb-4 animate-pulse"></div>
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/5">
                <div className="card animate-pulse space-y-4">
                    <div className="h-7 bg-dark-surface-hover rounded w-3/4"></div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-dark-surface-hover rounded shrink-0"></div>
                            <div className="h-4 bg-dark-surface-hover rounded w-full"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-dark-surface-hover rounded shrink-0"></div>
                            <div className="h-4 bg-dark-surface-hover rounded w-2/3"></div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-dark-surface-hover rounded shrink-0"></div>
                            <div className="h-4 bg-dark-surface-hover rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <div className="h-11 bg-dark-surface-hover rounded-lg flex-1"></div>
                        <div className="h-11 bg-dark-surface-hover rounded-lg flex-1"></div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-3/5 h-64 lg:h-auto bg-dark-surface-hover rounded-lg animate-pulse"></div>
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
            <div className="max-w-7xl mx-auto p-4 lg:p-6 w-full">
                <Link to="/" className="btn btn-secondary inline-flex items-center gap-2 mb-4">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Torna alla lista
                </Link>
                <div className="p-4 bg-accent-red/15 text-accent-red rounded-lg">
                    <p className="font-semibold">Errore</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!selectedStore) {
        return (
            <div className="max-w-7xl mx-auto p-4 lg:p-6 w-full">
                <Link to="/" className="btn btn-secondary inline-flex items-center gap-2 mb-4">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Torna alla lista
                </Link>
                <p className="text-dark-text-secondary">Negozio non trovato</p>
            </div>
        );
    }

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedStore.latitudine},${selectedStore.longitudine}`;

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-6 flex-1 flex flex-col w-full">
            {/* Back button */}
            <Link to="/" className="btn btn-secondary inline-flex items-center gap-2 mb-4 self-start">
                <ArrowLeftIcon className="w-4 h-4" />
                Torna alla lista
            </Link>

            {/* Content: side-by-side on desktop, stacked on mobile */}
            <div className="flex flex-col-reverse lg:flex-row gap-6 flex-1 min-h-0">
                {/* Store info card */}
                <div className="w-full lg:w-2/5">
                    <div className="card">
                        <h1 className="text-xl font-bold text-dark-text">
                            {selectedStore.nome}
                        </h1>

                        <div className="space-y-3 mt-4">
                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-dark-text-secondary mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-dark-text">{selectedStore.indirizzo}</p>
                                    <p className="text-dark-text-secondary text-sm">{selectedStore.città}</p>
                                </div>
                            </div>

                            {/* Phone */}
                            {selectedStore.telefono && (
                                <div className="flex items-center gap-3">
                                    <PhoneIcon className="w-5 h-5 text-dark-text-secondary shrink-0" />
                                    <a
                                        href={`tel:${selectedStore.telefono}`}
                                        className="text-primary hover:underline"
                                    >
                                        {selectedStore.telefono}
                                    </a>
                                </div>
                            )}

                            {/* Totem */}
                            <div className="flex items-center gap-3">
                                <MonitorIcon className="w-5 h-5 text-dark-text-secondary shrink-0" />
                                <span className="text-dark-text">
                                    Totem:{" "}
                                    {selectedStore.totem ? (
                                        <span className="text-accent-green font-medium">Disponibile</span>
                                    ) : (
                                        <span className="text-dark-text-secondary">Non disponibile</span>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 mt-6">
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline flex-1 text-center"
                            >
                                Indicazioni
                            </a>
                            {selectedStore.telefono && (
                                <a
                                    href={`tel:${selectedStore.telefono}`}
                                    className="btn btn-outline flex-1 text-center"
                                >
                                    Chiama
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="w-full lg:w-3/5 h-64 lg:h-auto min-h-64 rounded-lg overflow-hidden">
                    <StoreDetailsMap store={selectedStore} />
                </div>
            </div>
        </div>
    );
};
