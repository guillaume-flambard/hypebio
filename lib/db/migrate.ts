import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';

// Cette fonction exécute les migrations SQLite pour initialiser la base de données
export async function runMigrations() {
  console.log('Running SQLite migrations...');
  migrate(db, { migrationsFolder: './drizzle' });
  console.log('Migrations completed successfully!');
}

// Exécuter les migrations si ce fichier est appelé directement
if (require.main === module) {
  runMigrations().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
} 