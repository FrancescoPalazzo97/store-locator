import { useStoreLocator } from "../../stores/useStoreLocator";

const options = [
    { label: "Tutti", value: null },
    { label: "Con Totem", value: true },
    { label: "Senza Totem", value: false },
] as const;

export const TotemFilter = () => {
    const selectedTotem = useStoreLocator(s => s.selectedTotem);
    const setSelectedTotem = useStoreLocator(s => s.setSelectedTotem);

    return (
        <div>
            <label className="block text-sm font-medium text-dark-text-secondary mb-2">
                Totem
            </label>
            <div className="flex rounded-lg border border-dark-border overflow-hidden">
                {options.map((option) => (
                    <button
                        key={String(option.value)}
                        onClick={() => setSelectedTotem(option.value)}
                        className={`flex-1 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                            selectedTotem === option.value
                                ? "bg-primary text-white"
                                : "bg-dark-bg text-dark-text-secondary hover:bg-dark-surface-hover"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
