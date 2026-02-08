import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Store } from "../../types/store.types";
import { ZOOM_STORE, TILE_URL, TILE_ATTRIBUTION } from "../../constants/mapConstants";

type StoreDetailsMapProps = {
    store: Store
}

const storeIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export const StoreDetailsMap = ({ store }: StoreDetailsMapProps) => {
    return (
        <MapContainer
            center={[store.latitudine, store.longitudine]}
            zoom={ZOOM_STORE}
            style={{ height: "100%", width: "100%" }}
            className="rounded-lg z-0"
        >
            <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />

            <Marker
                position={[store.latitudine, store.longitudine]}
                icon={storeIcon}
            >
                <Popup>
                    <div>
                        <h3 className="font-semibold text-sm">{store.nome}</h3>
                        <p className="text-xs text-gray-600">{store.indirizzo}</p>
                        <p className="text-xs text-gray-500">{store.città}</p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
};
