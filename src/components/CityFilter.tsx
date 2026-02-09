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
                className="input-field min-h-11 appearance-none cursor-pointer"
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
