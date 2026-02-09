import { useStoreLocator } from "../stores/useStoreLocator";

export const CityFilter = () => {
    const cities = useStoreLocator(s => s.cities);
    const selectedCity = useStoreLocator(s => s.selectedCity);
    const setSelectedCity = useStoreLocator(s => s.setSelectedCity);

    return (
        <div>
            <select
                id="city-filter"
                aria-label="Filtra per città"
                value={selectedCity || ""}
                onChange={(e) => setSelectedCity(e.target.value || null)}
                className="w-full px-3 py-2 min-h-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">Tutte le città</option>
                {cities.map((city) => (
                    <option key={city.città} value={city.città}>
                        {city.città} ({city.count})
                    </option>
                ))}
            </select>
        </div>
    );
};
