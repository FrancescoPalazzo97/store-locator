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
                    className="w-full px-3 py-2 min-h-11 bg-dark-bg border border-dark-border text-dark-text placeholder-dark-text-secondary rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
            </label>
        </div>
    );
};
