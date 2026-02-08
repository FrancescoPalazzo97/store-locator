import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";

type FitBoundsProps = {
    bounds: LatLngBoundsExpression | null
}

export const FitBounds = ({ bounds }: FitBoundsProps) => {
    const map = useMap();

    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, bounds]);

    return null;
};
