import { useStoreLocator } from "../../stores/useStoreLocator";

type SearchBarProps = {
    placeholder?: string
}

export const SearchBar = ({ placeholder = 'Cerca negozio...' }: SearchBarProps) => {
    const searchQuery = useStoreLocator(s => s.searchQuery);
    const setSearchQuery = useStoreLocator(s => s.setSearchQuery);

    return (
        <div>
            <label className="flex flex-col gap-2 text-sm font-medium text-dark-text-secondary mb-2">
                <span>Cerca per nome</span>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className="input-field min-h-11"
                />
            </label>
        </div>
    );
};
