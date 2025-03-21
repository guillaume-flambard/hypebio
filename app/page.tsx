import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioGeneratorForm from "@/components/forms/BioGeneratorForm";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <Badge variant="outline" className="mb-6 px-3 py-1 text-sm bg-white/10 border-white/20 hover:bg-white/20">
                Boostez vos réseaux sociaux
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Générez des Bios Virales en Quelques Secondes
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
                HypeBio crée automatiquement des bios optimisées pour TikTok, Instagram, Twitter, LinkedIn et OnlyFans. Boostez votre présence en ligne dès maintenant !
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                  <a href="#generator">Générer ma bio</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/examples">Voir des exemples</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Expanded with more benefits */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Pourquoi choisir HypeBio ?</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Notre technologie d&apos;IA avancée crée des bios captivantes qui génèrent plus d&apos;engagement
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-3xl mb-4">⚡️</div>
                  <CardTitle>Rapide et Efficace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Générez une bio optimisée en quelques secondes, sans effort et adaptée à votre style.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-3xl mb-4">🎯</div>
                  <CardTitle>Optimisé par Plateforme</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Chaque bio est spécifiquement adaptée aux exigences et au format de la plateforme choisie.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-3xl mb-4">🔥</div>
                  <CardTitle>Style Personnalisé</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choisissez parmi différents styles pour correspondre à votre personnalité et votre audience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Features Section - Condensed */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Fonctionnalités Premium</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Découvrez nos outils avancés pour optimiser votre présence en ligne
            </p>
            
            <Tabs defaultValue="branding" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="score">Analyse</TabsTrigger>
                <TabsTrigger value="content">Contenu</TabsTrigger>
                <TabsTrigger value="advanced">Avancé</TabsTrigger>
              </TabsList>
              
              <TabsContent value="branding">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="text-3xl mr-4">🎨</div>
                      <CardTitle>Branding Complet</CardTitle>
                    </div>
                    <CardDescription>
                      Créez une identité visuelle cohérente et professionnelle
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Générez un ensemble complet avec bio, nom d&apos;utilisateur, slogan et palette de couleurs. Créez une identité visuelle cohérente sur tous vos réseaux.
                    </p>
                    <div className="flex justify-end">
                      <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Link href="/pricing">
                          Voir les forfaits
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="score">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="text-3xl mr-4">📊</div>
                      <CardTitle>Score et Optimisation</CardTitle>
                    </div>
                    <CardDescription>
                      Analysez et améliorez l'impact de vos bios
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Obtenez un score détaillé de votre bio avec conseils d&apos;optimisation en temps réel. Analysez la lisibilité, l&apos;engagement et la pertinence pour maximiser votre impact.
                    </p>
                    <div className="flex justify-end">
                      <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Link href="/pricing">
                          Voir les forfaits
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="text-3xl mr-4">📝</div>
                      <CardTitle>Contenu et Stratégie</CardTitle>
                    </div>
                    <CardDescription>
                      Des outils pour planifier et optimiser votre présence
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Générez automatiquement des idées de posts, des hashtags optimisés et construisez une stratégie cohérente pour augmenter votre visibilité et votre engagement.
                    </p>
                    <div className="flex justify-end">
                      <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Link href="/pricing">
                          Voir les forfaits
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      <div className="text-3xl mr-4">🌐</div>
                      <CardTitle>Solutions Avancées</CardTitle>
                    </div>
                    <CardDescription>
                      Des fonctionnalités exclusives pour se démarquer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Accédez à des fonctionnalités premium comme le résumé professionnel pour LinkedIn, le mini-site Link-in-bio pour Instagram et TikTok, et plus encore.
                    </p>
                    <div className="flex justify-end">
                      <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                        <Link href="/pricing">
                          Voir les forfaits
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg">
                <Link href="/pricing">
                  Voir tous les forfaits premium
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <section id="generator" className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl opacity-70"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-xl mx-auto text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                Générateur de bio
              </Badge>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Créez votre bio parfaite maintenant
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-0">
                Remplissez le formulaire ci-dessous pour obtenir une bio optimisée pour votre plateforme préférée.
              </p>
            </div>
            
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-900 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
              <CardContent className="p-0">
                <BioGeneratorForm />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3">
                      <span className="font-semibold text-indigo-700 dark:text-indigo-400">S</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Sophie M.</h4>
                      <p className="text-sm text-gray-500">@sophie_mode</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    &ldquo;J&apos;ai gagné 500 followers sur Instagram en une semaine après avoir mis à jour ma bio avec HypeBio. Incroyable !&rdquo;
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3">
                      <span className="font-semibold text-purple-700 dark:text-purple-400">T</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Thomas L.</h4>
                      <p className="text-sm text-gray-500">@thomas_gaming</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    &ldquo;Ma bio TikTok générée par HypeBio a complètement transformé mon profil. Je reçois beaucoup plus d&apos;engagement !&rdquo;
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center mr-3">
                      <span className="font-semibold text-pink-700 dark:text-pink-400">L</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Laura B.</h4>
                      <p className="text-sm text-gray-500">@laura_business</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    &ldquo;HypeBio m&apos;a aidée à créer une bio LinkedIn professionnelle qui a attiré l&apos;attention de plusieurs recruteurs.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à booster votre présence en ligne ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;utilisateurs qui ont déjà transformé leurs profils avec HypeBio.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg hover:shadow-xl">
              <a href="#generator">Générer ma bio gratuitement</a>
            </Button>
        </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
