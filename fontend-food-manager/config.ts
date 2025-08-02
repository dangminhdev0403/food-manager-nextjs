import { z } from "zod";
const configSchema = z.object({
  NEXT_PUBLIC_API_ENPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENPOINT: process.env.NEXT_PUBLIC_API_ENPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!configProject.success) {
  console.error("Invalid environment variables:");
  for (const issue of configProject.error.issues) {
    console.error(`❌ ${issue.path.join(".")}: ${issue.message}`);
  }
  throw new Error("Invalid environment variables");
}

export const envConfig = configProject.data;
