import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioGeneratorForm from "@/components/forms/BioGeneratorForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Générez des Bios Virales en Quelques Secondes
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
                HypeBio crée automatiquement des bios optimisées pour TikTok, Instagram, Twitter, LinkedIn et OnlyFans. Boostez votre présence en ligne dès maintenant !
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all">
                  <a href="#generator">Générer ma bio</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/examples">Voir des exemples</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir HypeBio ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">⚡️</div>
                <h3 className="text-xl font-semibold mb-2">Rapide et Efficace</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Générez une bio optimisée en quelques secondes, sans effort.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Optimisé par Plateforme</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chaque bio est adaptée spécifiquement à la plateforme choisie.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">🔥</div>
                <h3 className="text-xl font-semibold mb-2">Style Personnalisé</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choisissez parmi différents styles pour correspondre à votre personnalité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Premium Features Section */}
        <section className="py-16 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Fonctionnalités Premium</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Découvrez nos outils avancés pour optimiser votre présence en ligne
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Branding Complet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Générez non seulement une bio, mais un ensemble complet avec nom d&apos;utilisateur, slogan et palette de couleurs.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/pricing">
                      Voir les forfaits
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Score et Optimisation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Obtenez un score détaillé de votre bio et des conseils d&apos;optimisation en temps réel pour maximiser votre impact.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/pricing">
                      Voir les forfaits
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">Idées de Posts</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Générez automatiquement des idées de contenu et des hashtags optimisés pour chaque plateforme.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/pricing">
                      Voir les forfaits
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">📄</div>
                <h3 className="text-xl font-semibold mb-2">Résumé Professionnel</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Créez un résumé professionnel pour LinkedIn ou un thread Twitter captivant basé sur votre profil.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/pricing">
                      Voir les forfaits
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-2">Mini-site Link-in-bio</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Créez automatiquement une page web personnalisée avec tous vos liens et votre branding - parfait pour Instagram et TikTok.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/pricing">
                      Voir les forfaits
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Link href="/pricing">
                  Voir tous les forfaits premium
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <section id="generator" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Générez votre bio maintenant</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour obtenir une bio optimisée pour votre plateforme préférée.
            </p>
            
            <BioGeneratorForm />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <span className="font-semibold text-purple-700">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sophie M.</h4>
                    <p className="text-sm text-gray-500">@sophie_mode</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  &ldquo;J&apos;ai gagné 500 followers sur Instagram en une semaine après avoir mis à jour ma bio avec HypeBio. Incroyable !&rdquo;
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                    <span className="font-semibold text-blue-700">T</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Thomas L.</h4>
                    <p className="text-sm text-gray-500">@thomas_gaming</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  &ldquo;Ma bio TikTok générée par HypeBio a complètement transformé mon profil. Je reçois beaucoup plus d&apos;engagement !&rdquo;
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mr-3">
                    <span className="font-semibold text-green-700">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Laura B.</h4>
                    <p className="text-sm text-gray-500">@laura_business</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  &ldquo;HypeBio m&apos;a aidée à créer une bio LinkedIn professionnelle qui a attiré l&apos;attention de plusieurs recruteurs.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à booster votre présence en ligne ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;utilisateurs qui ont déjà transformé leurs profils avec HypeBio.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <a href="#generator">Générer ma bio gratuitement</a>
            </Button>
        </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
