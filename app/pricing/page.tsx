import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CheckIcon, XIcon } from "lucide-react";

export const metadata = {
  title: "Tarifs - HypeBio",
  description: "Découvrez nos offres Premium pour générer des bios encore plus percutantes sur tous vos réseaux sociaux",
};

export default function PricingPage() {
  const features = {
    free: {
      "5 bios par jour": true,
      "Bios jusqu'à 150 caractères": true,
      "Styles de base": true,
      "Modèle IA standard": true,
      "Branding basique (Bio uniquement)": true,
      "Score de Bio simple": true,
      "Branding Complet (Bio + Nom + Slogan + Couleurs)": false,
      "Idées de posts + Hashtags optimisés": false,
      "Bio + Résumé LinkedIn / Thread Twitter": false,
      "Score de Bio + Optimisation en Temps Réel": false,
      "Mini-site link-in-bio auto-généré": false,
    },
    premium: {
      "Bios illimitées": true,
      "Bios jusqu'à 250 caractères": true,
      "Tous les styles disponibles": true,
      "Modèle IA avancé (GPT-4)": true,
      "Branding Complet (Bio + Nom + Slogan + Couleurs)": true,
      "Idées de posts + Hashtags optimisés": true,
      "Bio + Résumé LinkedIn / Thread Twitter": true,
      "Score de Bio + Optimisation en Temps Réel": true,
      "Mini-site link-in-bio auto-généré": false,
    },
    pro: {
      "Tout ce qui est inclus dans Premium": true,
      "Mini-site link-in-bio auto-généré": true,
      "Analyses de performance": true,
      "Accès API": true,
      "Support prioritaire": true,
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Des Tarifs Simples et Transparents
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Choisissez l&apos;offre qui correspond à vos besoins pour générer des bios percutantes et un branding complet
            </p>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Gratuit</CardTitle>
                  <div className="text-4xl font-bold my-4">0€</div>
                  <CardDescription>Pour découvrir HypeBio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {Object.entries(features.free).map(([feature, included]) => (
                      <li key={feature} className={`flex items-center ${!included ? 'text-gray-400' : ''}`}>
                        {included ? (
                          <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                          <XIcon className="w-5 h-5 mr-2 text-gray-400" />
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/#generator">
                      Essayer gratuitement
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="border-2 border-purple-500 dark:border-purple-600 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <div className="text-4xl font-bold my-4">9,99€<span className="text-base font-normal text-gray-500">/mois</span></div>
                  <CardDescription>Pour les créateurs de contenu</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {Object.entries(features.premium).map(([feature, included]) => (
                      <li key={feature} className={`flex items-center ${!included ? 'text-gray-400' : ''}`}>
                        {included ? (
                          <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                          <XIcon className="w-5 h-5 mr-2 text-gray-400" />
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    <Link href="/auth/login?plan=premium">
                      Commencer maintenant
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="border border-gray-200 dark:border-gray-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <div className="text-4xl font-bold my-4">19,99€<span className="text-base font-normal text-gray-500">/mois</span></div>
                  <CardDescription>Pour les professionnels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {Object.entries(features.pro).map(([feature, included]) => (
                      <li key={feature} className={`flex items-center ${!included ? 'text-gray-400' : ''}`}>
                        {included ? (
                          <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                        ) : (
                          <XIcon className="w-5 h-5 mr-2 text-gray-400" />
                        )}
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/auth/login?plan=pro">
                      Obtenir Pro
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Nos fonctionnalités exclusives</h2>
            
            <div className="space-y-16">
              {/* Feature 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-tr from-purple-600 to-blue-600 aspect-video rounded-lg flex items-center justify-center overflow-hidden p-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg w-full h-full border border-white/20 flex flex-col items-center justify-center text-white">
                    <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">Brand+</div>
                    <div className="text-xl mt-2">CreativeAgency</div>
                    <div className="text-sm mt-4 text-blue-100">Innovate. Create. Inspire.</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Branding Complet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ne vous contentez pas d&apos;une simple bio ! Notre outil de Branding Complet génère harmonieusement :
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Bio optimisée pour chaque plateforme
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Suggestions de noms d&apos;utilisateur créatifs
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Slogan accrocheur qui reflète votre identité
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Palette de couleurs personnalisée pour un branding cohérent
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
                <div className="md:order-2 bg-gradient-to-br from-indigo-600 to-purple-600 aspect-video rounded-lg flex items-center justify-center overflow-hidden p-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg w-full h-full border border-white/20 flex flex-col items-center justify-center text-white space-y-2">
                    <div className="text-xl">✨ Idée de Post #128</div>
                    <div className="text-sm">Comment j&apos;ai doublé mon engagement en 1 semaine</div>
                    <div className="text-xs mt-4">
                      #croissanceorganique #algorithme #astuceengagement #contentcreator #tiktoktips
                    </div>
                  </div>
                </div>
                <div className="md:order-1">
                  <h3 className="text-2xl font-bold mb-4">Idées de posts + Hashtags optimisés</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ne soyez plus jamais à court d&apos;idées de contenu ! Notre IA génère :
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Des idées de posts adaptées à votre niche
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Des hashtags optimisés pour maximiser votre portée
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Des suggestions de sujets tendance dans votre domaine
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Un calendrier de contenu personnalisé
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 aspect-video rounded-lg flex items-center justify-center overflow-hidden p-8">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg w-full h-full border border-white/20 flex flex-col justify-center text-white">
                    <div className="text-sm text-blue-200 mb-2">www.hypebio.link/thomas-design</div>
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-300"></div>
                      <div className="w-8 h-8 rounded-full bg-purple-300"></div>
                      <div className="w-8 h-8 rounded-full bg-pink-300"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 w-full rounded-md bg-white/20"></div>
                      <div className="h-10 w-full rounded-md bg-white/20"></div>
                      <div className="h-10 w-full rounded-md bg-white/20"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Mini-site link-in-bio auto-généré</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Votre propre site web en quelques clics seulement ! Notre fonctionnalité exclusive :
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Crée automatiquement une page &quot;link-in-bio&quot; professionnelle
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Design personnalisé selon votre palette de couleurs
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      Liens vers tous vos réseaux et projets
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                      URL personnalisée et hébergement inclus (plan Pro uniquement)
                    </li>
                  </ul>
                  <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    <Link href="/auth/login?plan=pro">
                      Essayer la version Pro
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Questions fréquentes</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div>
                <h3 className="text-xl font-semibold mb-2">Puis-je annuler à tout moment ?</h3>
                <p className="text-gray-600 dark:text-gray-400">Oui, vous pouvez annuler votre abonnement à tout moment et vous ne serez pas facturé pour le mois suivant.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comment fonctionne le mini-site link-in-bio ?</h3>
                <p className="text-gray-600 dark:text-gray-400">Notre système génère automatiquement une page web personnalisée avec vos liens et votre branding. Avec le plan Pro, vous obtenez également un nom de domaine personnalisé.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Les bios sont-elles uniques ?</h3>
                <p className="text-gray-600 dark:text-gray-400">Absolument ! Chaque bio est générée spécifiquement pour vous et n&apos;est jamais dupliquée.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comment fonctionne le score de bio ?</h3>
                <p className="text-gray-600 dark:text-gray-400">Notre algorithme analyse votre bio selon plusieurs critères : lisibilité, impact, pertinence pour votre plateforme et potentiel d&apos;engagement. Vous recevez un score et des suggestions d&apos;amélioration en temps réel.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre présence en ligne ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;utilisateurs qui ont déjà amélioré leur profil avec HypeBio et notre suite d&apos;outils premium.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              <Link href="/#generator">
                Générer ma bio gratuitement
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 