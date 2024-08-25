import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://account:Y8lU7odCnXKN@ep-soft-meadow-a5pxoxrb.us-east-2.aws.neon.tech/Ai-Form-Builder?sslmode=require',
  }
});
