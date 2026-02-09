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
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Totem
            </label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                {options.map((option) => (
                    <button
                        key={String(option.value)}
                        onClick={() => setSelectedTotem(option.value)}
                        className={`flex-1 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                            selectedTotem === option.value
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
