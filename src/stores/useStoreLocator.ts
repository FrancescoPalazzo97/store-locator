import { create } from 'zustand';
import type { Store, City } from '../types/store.types';
import { getStores, getStoreById, getCities } from '../services/api';

type StoreLocatorState = {
    // Data
    stores: Store[];
    selectedStore: Store | null;
    cities: City[];

    // Pagination
    currentPage: number;
    totalPages: number;
    totalItems: number;

    // Filters
    selectedCity: string | null;
    searchQuery: string;
    selectedTotem: boolean | null;

    // UI State
    isLoading: boolean;
    error: string | null;
    highlightedStoreId: number | null;
}

type StoreLocatorActions = {
    fetchStores: (page?: number) => Promise<void>;
    fetchStoreById: (id: number) => Promise<void>;
    fetchCities: () => Promise<void>;
    setSelectedCity: (city: string | null) => void;
    setSearchQuery: (query: string) => void;
    setSelectedTotem: (totem: boolean | null) => void;
    setHighlightedStore: (id: number | null) => void;
    clearSelectedStore: () => void;
    clearError: () => void;
}

const initialState = {
    stores: [],
    selectedStore: null,
    cities: [],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    selectedCity: null,
    searchQuery: "",
    selectedTotem: null,
    isLoading: false,
    error: null,
    highlightedStoreId: null,
}

type StoreLocator = StoreLocatorState & StoreLocatorActions;

let searchDebounceTimer: ReturnType<typeof setTimeout>;

export const useStoreLocator = create<StoreLocator>((set, get) => ({
    ...initialState,

    fetchStores: async (page = 1) => {
        set({ isLoading: true, error: null });

        const { selectedCity, searchQuery, selectedTotem } = get();

        const res = await getStores({
            città: selectedCity || undefined,
            nome: searchQuery || undefined,
            totem: selectedTotem ?? undefined,
            page
        });

        if (!res.success) {
            set({
                error: res.error.message,
                isLoading: false
            });
            return;
        }

        set({
            stores: res.data.stores,
            currentPage: res.data.pagination.currentPage,
            totalPages: res.data.pagination.totalPages,
            totalItems: res.data.pagination.totalItems,
            isLoading: false
        });
    },

    fetchStoreById: async (id) => {
        set({ isLoading: true, error: null });

        const res = await getStoreById(id);

        if (!res.success) {
            set({
                error: res.error.message,
                isLoading: false
            });
            return;
        }

        set({ selectedStore: res.data, isLoading: false });
    },

    fetchCities: async () => {
        const res = await getCities();

        if (!res.success) {
            console.error('Errore nel caricamento delle città: ', res.error);
            return;
        }

        set({ cities: res.data.cities });
    },

    setSelectedCity: (city) => {
        set({ selectedCity: city, currentPage: 1 });
        get().fetchStores();
    },

    setSearchQuery: (query) => {
        set({ searchQuery: query, currentPage: 1 });
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
            get().fetchStores();
        }, 400);
    },

    setSelectedTotem: (totem) => {
        set({ selectedTotem: totem, currentPage: 1 });
        get().fetchStores();
    },

    setHighlightedStore: (id) => {
        set({ highlightedStoreId: id });
    },

    clearSelectedStore: () => {
        set({ selectedStore: null });
    },

    clearError: () => {
        set({ error: null });
    },
}))