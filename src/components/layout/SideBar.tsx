import { SearchBar } from "../filters/SearchBar";
import { CityFilter } from "../CityFilter";
import { StoreList } from "../StoresList";
import { Pagination } from "../common/Pagination";

export const SideBar = () => {


    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden">
            <CityFilter />

            <SearchBar />

            <Pagination />

            <StoreList />
        </aside>
    );
};
