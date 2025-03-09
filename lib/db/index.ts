import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { join } from 'path';

// Initialiser la base de données SQLite
const sqlite = new Database(join(process.cwd(), 'sqlite.db'));

// Initialiser Drizzle avec notre schéma
export const db = drizzle(sqlite, { schema }); 