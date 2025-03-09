import type { Config } from 'drizzle-kit';
import { join } from 'path';

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: join(process.cwd(), 'sqlite.db'),
  },
} satisfies Config; 