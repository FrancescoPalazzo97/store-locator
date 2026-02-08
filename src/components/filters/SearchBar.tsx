import { useEffect } from "react";
import { useStoreLocator } from "../../stores/useStoreLocator";

type SearchBarProps = {
    //onSearch: (query: string) => void;
    placeholder?: string
}

export const SearchBar = ({ placeholder = 'Cerca negozio...' }: SearchBarProps) => {
    const searchQuery = useStoreLocator(s => s.searchQuery);
    const setSearchQuery = useStoreLocator(s => s.setSearchQuery);

    useEffect(() => {
        console.log('SearchBar: mounted');

        return () => console.log('SearchBar: unmounted');
    }, []);

    return (
        <div>
            <label className="flex flex-col gap-2 text-sm font-medium text-gray-700 mb-2">
                <span>Cerca per nome</span>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </label>
        </div>
    );
};
