import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Cannot post without a title!!" }),
  content: z
    .string()
    .max(300, { message: "Too much characters!!" })
    .min(1, { message: "Cannot post an empty message!" }),
});
