import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .max(300, { message: "Too much characters!!" })
    .min(1, { message: "Cannot post an empty message!" }),
});
