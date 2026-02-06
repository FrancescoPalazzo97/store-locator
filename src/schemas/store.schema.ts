import z from "zod";

export const storeSchema = z.object({
    id: z.number(),
    nome: z.string(),
    indirizzo: z.string(),
    città: z.string(),
    latitudine: z.number(),
    longitudine: z.number(),
    telefono: z.string().nullable(),
    totem: z.boolean(),
});

export const citySchema = z.object({
    città: z.string(),
    count: z.number(),
});

export const paginationSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    itemsPerPage: z.number(),
});

export const storesResponseSchema = z.object({
    stores: z.array(storeSchema),
    pagination: paginationSchema,
});

export const citiesResponseSchema = z.object({
    cities: z.array(citySchema),
});