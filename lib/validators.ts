import { z } from "zod";

// FX Request Schema
export const apiFxReqValidator = z.object({
    effect: z.string(),
    image: z.string(),
});

// FX Response Schema
export const apiFxResValiator = z.object({
    image: z.string(),
    ext: z.string(),
});

export type FxRequest = z.infer<typeof apiFxReqValidator>;
export type FxResponse = z.infer<typeof apiFxResValiator>;
