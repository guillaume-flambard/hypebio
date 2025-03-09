import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Exemples de Bios - HypeBio",
  description: "Découvrez des exemples de bios générées par HypeBio pour Instagram, Twitter, LinkedIn, TikTok et OnlyFans",
};

const examples = {
  instagram: [
    {
      name: "Alex",
      interests: "photographie, voyage, cuisine",
      style: "fun",
      bio: "📸 Chasseur de couchers de soleil & explorateur de cuisines 🌍✨ La vie est trop courte pour une mauvaise photo... ou un mauvais repas ! 🍜 #VoyageurGourmand",
    },
    {
      name: "Sophie",
      interests: "yoga, méditation, plantes",
      style: "mysterious",
      bio: "✨ Âme en quête d'équilibre entre ciel et terre 🌱 Yogi | Plante addict | Chercheuse de paix intérieure 🧘‍♀️ Créer du beau dans le chaos quotidien ☯️",
    },
    {
      name: "Thomas",
      interests: "fitness, nutrition, entrepreneuriat",
      style: "professional",
      bio: "💪 Coach fitness & entrepreneur | Helping you become the best version of yourself | Nutrition fanatic & mindset mentor | Let's connect and grow together 🌱 #FitnessJourney",
    },
  ],
  twitter: [
    {
      name: "Marie",
      interests: "tech, startups, investissement",
      style: "professional",
      bio: "👩‍💻 Tech enthusiast & angel investor | Building the future @TechStartupHQ | Ex-Google | Helping founders turn ideas into unicorns ✨ | DMs open for pitch decks 💼",
    },
    {
      name: "Léo",
      interests: "gaming, anime, memes",
      style: "gaming",
      bio: "🎮 Pro gamer & Anime obsessed | Twitch streamer | Meme lord 🤣 | Je ne suis pas accro aux jeux vidéo, je suis en relation compliquée avec la réalité 👾 #GamerLife",
    },
    {
      name: "Camille",
      interests: "politique, journalisme, actualités",
      style: "creative",
      bio: "📝 Journaliste indépendante | Décrypte l'actu sans filtre | Les mots ont du pouvoir, je les utilise pour faire bouger les choses 🔥 | Opinions ≠ RT #TruthSeeker",
    },
  ],
  linkedin: [
    {
      name: "Pierre",
      interests: "marketing digital, e-commerce, management",
      style: "professional",
      bio: "📊 CMO @BigTechCorp | 15+ ans d'expérience en marketing digital et stratégie e-commerce | Conférencier & mentor | Passionné par la transformation digitale des entreprises | Toujours à la recherche de nouveaux défis 💼",
    },
    {
      name: "Emilie",
      interests: "développement web, IA, UX design",
      style: "professional",
      bio: "👩‍💻 Full Stack Developer | TypeScript, React, Node.js | Enthousiaste IA & passionnée UX | Diplômée Epitech | Bâtir des solutions numériques qui font la différence | Ouverte aux opportunités 🚀",
    },
    {
      name: "Nicolas",
      interests: "finance, blockchain, investissement",
      style: "professional",
      bio: "💼 Financial Analyst & Crypto Enthusiast | M&A Expert | HEC Paris Graduate | Helping businesses navigate the financial landscape | Blockchain advocate | Building bridges between traditional finance & Web3 🌐",
    },
  ],
  tiktok: [
    {
      name: "Jade",
      interests: "danse, mode, lifestyle",
      style: "fun",
      bio: "💃 Danseuse mi-pro mi-catastrophe 👗 Obsédée de mode | 22 ans & perdue dans la vie (mais avec style!) 💅✨ #DanceLife #FashionLover",
    },
    {
      name: "Lucas",
      interests: "humour, sketchs, pranks",
      style: "fun",
      bio: "🤣 Créateur de sourires professionnels | J'transforme l'ordinaire en extraordinaire | Prépare-toi à pleurer de rire 😂 | 1M de fous sur Insta | Management: @contact",
    },
    {
      name: "Zoé",
      interests: "maquillage, skincare, ASMR",
      style: "creative",
      bio: "✨ Artist des visages | Murmureuse ASMR | 💄 Transformations incroyables | Skincare addict | Rejoins ma famille de beautés uniques 💖 | Collab: DM 📩",
    },
  ],
  onlyfans: [
    {
      name: "Chloé",
      interests: "fitness, lifestyle, photographie",
      style: "sexy",
      bio: "🔥 Fitness model & lifestyle creator | Contenu exclusif qui va t'inspirer et plus encore... | Entraînements personnalisés & conseils nutrition | Réponds à tous mes VIP 💌 | -50% nouveaux abonnés 💫",
    },
    {
      name: "Maxime",
      interests: "voyage, photographie, lifestyle",
      style: "mysterious",
      bio: "🌙 Créateur de contenu nocturne | Photographe lifestyle & voyage | Ce que vous ne voyez pas ailleurs | Messages privés toujours répondus | Rejoins l'aventure... 🔥",
    },
    {
      name: "Léa",
      interests: "danse, musique, mode",
      style: "creative",
      bio: "💋 Danseuse professionnelle & passionnée de mode | Contenus artistiques & sensuels | Shows privés & chorégraphies exclusives | Je réalise tes fantasmes... musicaux bien sûr 😏 | DM pour personnalisation 💌",
    },
  ],
};

export default function ExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Exemples de Bios Générées
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Découvrez ce que HypeBio peut créer pour différentes plateformes et styles
            </p>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="instagram" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                <TabsTrigger value="onlyfans">OnlyFans</TabsTrigger>
              </TabsList>
              
              {Object.entries(examples).map(([platform, bios]) => (
                <TabsContent key={platform} value={platform} className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {bios.map((example, index) => (
                      <Card key={index} className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle>{example.name}</CardTitle>
                          <CardDescription>
                            Style: <span className="font-semibold capitalize">{example.style}</span><br />
                            Intérêts: {example.interests}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                            {example.bio}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Link href="/#generator">
                  Créer ma bio maintenant
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pourquoi utiliser HypeBio ?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto">
              Notre générateur utilise l&apos;IA pour créer des bios uniques et optimisées pour chaque plateforme
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">⚡️</div>
                <h3 className="text-xl font-semibold mb-2">Rapide et Simple</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Générez des bios optimisées en quelques secondes en indiquant simplement vos intérêts et le style souhaité.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Adapté à chaque plateforme</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chaque réseau social a ses codes. Nos bios sont spécifiquement optimisées pour chaque plateforme.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Booste votre présence</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Une bio bien conçue attire plus de visiteurs et améliore votre visibilité sur les réseaux sociaux.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 