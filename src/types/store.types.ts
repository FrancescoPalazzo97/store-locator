export type Store = {
    id: number;
    nome: string;
    indirizzo: string;
    città: string;
    latitudine: number;
    longitudine: number;
    telefono: string | null;
    totem: boolean;
}

export type City = {
    città: string;
    count: number;
}

export type Pagination = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

export type StoresResponse = {
    stores: Store[];
    pagination: Pagination;
}

export type CitiesResponse = {
    cities: City[];
}

export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
}

export type ApiErrorResponse = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Array<{ field: string; message: string }>;
    };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;