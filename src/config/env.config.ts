import dotenv from "dotenv";
import { z, ZodError } from "zod";
import { ParseEnvError } from "../shared/errors/config/parse-env.error";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    }).default("3000"),
  DB_HOST: z.string().default("localhost"),
  DB_PORT: z.string().transform(Number).default("27017"),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("1d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = (parsedEnv.error as ZodError).issues;
  const messages = issues.map(
    (issue) => `${issue.path.join(".")}: ${issue.message}`
  );
  throw new ParseEnvError(messages);
}

const envParsed = parsedEnv.data;

export const env = Object.freeze({
  NODE_ENV: envParsed.NODE_ENV,
  PORT: envParsed.PORT,

  DB: {
    HOST: envParsed.DB_HOST,
    PORT: envParsed.DB_PORT,
    NAME: envParsed.DB_NAME,
    USER: envParsed.DB_USER,
    PASSWORD: envParsed.DB_PASSWORD,
    URI: `mongodb://${envParsed.DB_USER}:${envParsed.DB_PASSWORD}@${envParsed.DB_HOST}:${envParsed.DB_PORT}/${envParsed.DB_NAME}`, //mongodb config uri
  },

  JWT: {
    SECRET: envParsed.JWT_SECRET,
    EXPIRES_IN: envParsed.JWT_EXPIRES_IN,
  },
});
