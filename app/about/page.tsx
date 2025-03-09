import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "À propos - HypeBio",
  description: "Découvrez l'histoire, la mission et l'équipe derrière HypeBio, votre générateur de bios personnalisées",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              À propos de HypeBio
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Notre mission est de vous aider à briller sur les réseaux sociaux avec des bios percutantes
            </p>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  HypeBio est né d&apos;un constat simple : créer une bio percutante et originale pour ses réseaux sociaux est souvent un défi. Combien de temps avez-vous passé à contempler ce petit espace vide en vous demandant comment vous présenter au monde ?
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Fondé en 2024, notre service utilise l&apos;intelligence artificielle de pointe pour générer des bios uniques et personnalisées qui reflètent votre personnalité tout en optimisant votre présence en ligne.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Notre approche combine créativité, psychologie sociale et optimisation pour les algorithmes des plateformes afin de vous garantir une bio qui attire l&apos;attention et suscite l&apos;engagement.
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-1">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-8">
                  <div className="text-4xl mb-6 text-center">🚀</div>
                  <blockquote className="italic text-lg text-gray-700 dark:text-gray-300 text-center">
                    &ldquo;Notre vision chez HypeBio est de démocratiser l&apos;accès à des bios professionnelles et impactantes, quelle que soit la plateforme. Nous croyons que chacun mérite de se présenter sous son meilleur jour.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-center font-semibold">— L&apos;équipe HypeBio</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Notre Équipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">TS</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Thomas Serpico</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Fondateur & CEO</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Expert en marketing digital et passionné d&apos;IA, Thomas a créé HypeBio pour résoudre un problème qu&apos;il rencontrait quotidiennement.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">SL</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sophie Leclair</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">CTO & Lead Developer</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Ingénieure en IA, Sophie a développé les algorithmes avancés qui permettent à HypeBio de générer des bios uniques et percutantes.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">AM</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Antoine Moreau</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">CMO</p>
                <p className="text-gray-700 dark:text-gray-300">
                  Avec 10 ans d&apos;expérience en social media, Antoine comprend les subtilités de chaque plateforme pour optimiser l&apos;impact de vos bios.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Notre Technologie</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              HypeBio utilise des modèles d&apos;IA de pointe et des algorithmes propriétaires pour créer des bios parfaitement adaptées à chaque plateforme.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-3xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold mb-2">IA Avancée</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre technologie s&apos;appuie sur des modèles de langage de pointe pour générer du contenu créatif et pertinent.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Analyse de Données</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Nous analysons les tendances pour comprendre ce qui fonctionne sur chaque plateforme.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-3xl mb-4">🛠️</div>
                <h3 className="text-lg font-semibold mb-2">Personnalisation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Notre algorithme adapte chaque bio à votre style et à vos centres d&apos;intérêt.
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold mb-2">Sécurité</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vos données sont protégées et ne sont jamais partagées avec des tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre présence en ligne ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d&apos;utilisateurs qui ont déjà amélioré leur profil avec HypeBio
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