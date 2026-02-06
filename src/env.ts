import { envSchema } from "./schemas/env.schema";

const validation = envSchema.safeParse(import.meta.env);

if (!validation.success) {
    console.error(validation.error);
    throw new Error('Errore nelle variabili d\'ambiente');
}

export const env = validation.data;