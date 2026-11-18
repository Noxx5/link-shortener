import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  BASE_URL: z.url(),
});

export const env = schema.parse(process.env);
