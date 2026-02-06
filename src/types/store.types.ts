import type z from "zod";
import {
    citiesResponseSchema,
    citySchema,
    paginationSchema,
    storeSchema,
    storesResponseSchema
} from "../schemas/store.schema";

export type Store = z.infer<typeof storeSchema>;

export type City = z.infer<typeof citySchema>;

export type Pagination = z.infer<typeof paginationSchema>;

export type StoresResponse = z.infer<typeof storesResponseSchema>;

export type CitiesResponse = z.infer<typeof citiesResponseSchema>;

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