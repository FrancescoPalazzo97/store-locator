import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from 'leaflet';
import { FitBounds } from "./FitBounds";
import {
    ITALY_CENTER,
    ZOOM_ITALY,
    TILE_URL,
    TILE_ATTRIBUTION
} from "../../constants/mapConstants";
import { useStoreLocator } from "../../stores/useStoreLocator";


const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const highlightedIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export const StoreMap = () => {
    const stores = useStoreLocator(s => s.stores);
    const highlightedStoreId = useStoreLocator(s => s.highlightedStoreId);
    const setHighlightedStore = useStoreLocator(s => s.setHighlightedStore);

    const bounds = useMemo(() => {
        if (stores.length === 0) return null;

        const latLngs = stores.map(store => {
            const storeCoordinates = [store.latitudine, store.longitudine] as [number, number];
            return storeCoordinates;
        });

        return L.latLngBounds(latLngs);
    }, [stores]);

    return (
        <MapContainer
            center={[ITALY_CENTER.lat, ITALY_CENTER.lng]}
            zoom={ZOOM_ITALY}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg z-0"
        >
            <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

            <FitBounds bounds={bounds} />

            {stores.map((store) => (
                <Marker
                    key={store.id}
                    position={[store.latitudine, store.longitudine]}
                    icon={store.id === highlightedStoreId ? highlightedIcon : defaultIcon}
                    eventHandlers={{
                        click: () => setHighlightedStore(store.id),
                    }}
                >
                    <Popup>
                        <div className="min-w-45">
                            <h3 className="font-semibold text-sm">{store.nome}</h3>
                            <p className="text-xs text-gray-600 mt-1">{store.indirizzo}</p>
                            <p className="text-xs text-gray-500">{store.città}</p>
                            {store.totem && (
                                <span className="inline-block text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full mt-1">
                                    Totem
                                </span>
                            )}
                            <Link
                                to={`/store/${store.id}`}
                                className="block text-xs text-blue-600 hover:underline mt-2"
                            >
                                Vedi dettagli →
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))
            }
        </MapContainer >
    );
};
