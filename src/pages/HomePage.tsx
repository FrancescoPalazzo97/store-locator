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
            <div className="p-4 bg-accent-red/15 text-accent-red rounded-lg">
                <p className="font-semibold">Errore</p>
                <p>{error}</p>
                <button
                    onClick={() => fetchStores()}
                    className="mt-3 btn btn-primary"
                >
                    Riprova
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-1 h-[calc(100vh-130px)]">
            <SideBar />

            <main className="flex-1 h-64 lg:h-auto min-h-0 rounded-lg">
                <StoreMap />
            </main>
        </div>
    )
}
