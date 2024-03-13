import { z } from "zod";

// FX Request Schema
export const apiFxReqValidator = z.object({
  effect: z.string(),
  intensity: z.number().min(0).max(100),
  image: z.string(),
  fileName: z.string(),
});

// FX Response Schema
export const apiFxResValiator = z.object({
  image: z.string(),
  extension: z.string(),
  fileSize: z.number(),
  fileName: z.string(),
});

export type FxRequest = z.infer<typeof apiFxReqValidator>;
export type FxResponse = z.infer<typeof apiFxResValiator>;
