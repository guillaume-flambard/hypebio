import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold">HypeBio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Générateur automatique de bios virales pour vos réseaux sociaux préférés.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-md font-semibold">Liens Rapides</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Accueil
              </Link>
              <Link href="/pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Tarifs
              </Link>
              <Link href="/examples" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Exemples
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-md font-semibold">Réseaux Sociaux</h3>
            <div className="flex flex-col space-y-2">
              <a href="https://twitter.com/hypebioapp" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Twitter
              </a>
              <a href="https://instagram.com/hypebioapp" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Instagram
              </a>
              <a href="https://tiktok.com/@hypebioapp" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                TikTok
              </a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-md font-semibold">Légal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Conditions d&apos;utilisation
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} HypeBio. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
} 