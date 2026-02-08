import { useEffect } from "react";
import { useStoreLocator } from "../stores/useStoreLocator";
import { StoreMap } from "../components/map/StoreMap";
import { SideBar } from "../components/layout/SideBar";

export const HomePage = () => {
    const error = useStoreLocator(s => s.error);
    const fetchStores = useStoreLocator(s => s.fetchStores);
    const fetchCities = useStoreLocator(s => s.fetchCities);

    useEffect(() => {
        fetchStores();
        fetchCities();
    }, []);

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
            <SideBar />

            <main className="flex-1 bg-gray-200 rounded-lg flex items-center justify-center min-h-75 lg:min-h-0">
                <StoreMap />
            </main>
        </div>
    )
}