import { z } from "zod";

export const apiFxReqValidator = z.object({
    effect: z.string(),
    image: z.string(),
});

export const apiFxResValiator = z.object({
    image: z.string(),
});

export type FxRequest = z.infer<typeof apiFxReqValidator>;
export type FxResponse = z.infer<typeof apiFxResValiator>;
