import z from "zod";

export const envSchema = z.object({
    VITE_API_URL: z.url()
        .default('http://localhost:3000/api')
})