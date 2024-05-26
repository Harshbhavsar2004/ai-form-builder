import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://ai-sender_owner:RlndPJUVQ7F8@ep-yellow-fire-a14r3p4x.ap-southeast-1.aws.neon.tech/ai-sender?sslmode=require',
  }
});