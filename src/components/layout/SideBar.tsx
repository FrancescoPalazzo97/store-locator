import { useState } from "react";
import { SearchBar } from "../filters/SearchBar";
import { TotemFilter } from "../filters/TotemFilter";
import { CityFilter } from "../CityFilter";
import { StoreList } from "../StoresList";
import { Pagination } from "../common/Pagination";
import { useStoreLocator } from "../../stores/useStoreLocator";

export const SideBar = () => {
    const [filtersOpen, setFiltersOpen] = useState(false);
    const selectedCity = useStoreLocator(s => s.selectedCity);
    const selectedTotem = useStoreLocator(s => s.selectedTotem);
    const searchQuery = useStoreLocator(s => s.searchQuery);
    const totalItems = useStoreLocator(s => s.totalItems);
    const totalPages = useStoreLocator(s => s.totalPages);

    const activeFilterCount = [
        selectedCity !== null,
        selectedTotem !== null,
        searchQuery !== "",
    ].filter(Boolean).length;

    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden">
            {/* Toggle filtri - solo mobile */}
            <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="lg:hidden btn btn-secondary flex items-center justify-between"
            >
                <span>
                    Filtri
                    {activeFilterCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </span>
                <span>{filtersOpen ? "\u25B2" : "\u25BC"}</span>
            </button>

            {/* Filtri - collassabili su mobile, sempre visibili su desktop */}
            <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
                <div className="card space-y-3">
                    <CityFilter />
                    <TotemFilter />
                    <SearchBar />
                </div>
            </div>

            <Pagination />

            {totalPages <= 1 && totalItems > 0 && (
                <p className="text-xs text-gray-500 px-2">
                    {totalItems} negozi trovati
                </p>
            )}

            <StoreList />
        </aside>
    );
};
