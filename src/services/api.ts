import type {
    ApiResponse,
    StoresResponse,
    CitiesResponse,
    Store,
} from "../types/store.types";
import { env } from "../env";

const { VITE_API_URL: API_URL } = env;

const fetchApi = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`);
        const data = await res.json();
        return data as ApiResponse<T>;
    } catch {
        return {
            success: false,
            error: {
                code: "NETWORK_ERROR",
                message: "Errore di connessione al server",
            },
        };
    }
};

export type GetStoresParams = {
    città?: string;
    nome?: string;
    totem?: boolean;
    page?: number;
    limit?: number;
};

export const getStores = async (
    params?: GetStoresParams,
): Promise<ApiResponse<StoresResponse>> => {
    const searchParams = new URLSearchParams();

    if (params?.città) searchParams.set("città", params.città);
    if (params?.nome) searchParams.set("nome", params.nome);
    if (params?.totem !== undefined)
        searchParams.set("totem", String(params.totem));
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));

    const queryString = searchParams.toString();
    const endpoint = `/stores${queryString ? `?${queryString}` : ""}`;

    return fetchApi<StoresResponse>(endpoint);
};

export const getStoreById = async (id: number): Promise<ApiResponse<Store>> =>
    fetchApi<Store>(`/stores/${id}`);

export const getCities = async (): Promise<ApiResponse<CitiesResponse>> => {
    return fetchApi<CitiesResponse>("/stores/cities");
};

export const healthCheck = async (): Promise<
    ApiResponse<{ status: string; timespamp: string }>
> => {
    return fetchApi("/health");
};
