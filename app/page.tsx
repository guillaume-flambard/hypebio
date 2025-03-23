'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioGeneratorForm, { BioGeneratorFormProps } from "@/components/forms/BioGeneratorForm";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";

// Définition des exemples prédéfinis
const EXAMPLES = [
  {
    id: "instagram-lifestyle",
    name: "Voyageur Nomade",
    platform: "instagram",
    style: "fun",
    interests: "voyage, photographie, cuisine, découvertes culturelles, sunset",
    label: "Bio Instagram lifestyle & voyage"
  },
  {
    id: "linkedin-pro",
    name: "Jean Dupont",
    platform: "linkedin",
    style: "professional",
    interests: "développement logiciel, gestion de projet, leadership, innovation, technologies cloud",
    label: "Profil professionnel LinkedIn"
  },
  {
    id: "tiktok-artist",
    name: "CreativeMind",
    platform: "tiktok",
    style: "creative",
    interests: "art digital, peinture, musique, danse, vidéo, créativité, expression artistique",
    label: "Bio créative pour artiste TikTok"
  }
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedExample, setSelectedExample] = useState(null);
  
  useEffect(() => {
    // Vérifier si un exemple est sélectionné dans l'URL
    const exampleId = searchParams.get('example');
    if (exampleId) {
      const example = EXAMPLES.find(ex => ex.id === exampleId);
      if (example) {
        setSelectedExample(example);
      }
    }
  }, [searchParams]);
  
  const handleExampleClick = (example) => {
    // D'abord mettre à jour l'état local
    setSelectedExample(example);
    
    // Ensuite, mettre à jour les paramètres d'URL sans redirection complète
    const params = new URLSearchParams(searchParams.toString());
    params.set('example', example.id);
    params.set('name', example.name);
    params.set('platform', example.platform);
    params.set('style', example.style);
    params.set('interests', example.interests);
    
    // Mettre à jour l'URL de manière douce sans recharger la page
    window.history.pushState({}, '', `${window.location.pathname}#generator?${params.toString()}`);
    
    // Délai court pour s'assurer que le DOM a été mis à jour
    setTimeout(() => {
      // Faire défiler vers la section du générateur
      const generatorElement = document.getElementById('generator');
      if (generatorElement) {
        generatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main>
        {/* Hero Section - Minimaliste et élégant */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/30 z-0"></div>
          
          {/* Éléments décoratifs subtils */}
          <div className="absolute w-full h-full">
            <motion.div 
              className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-400/10 dark:bg-indigo-400/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-purple-400/10 dark:bg-purple-400/5 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-5 px-3 py-1.5 text-sm bg-white/80 dark:bg-gray-900/80 text-indigo-600 dark:text-indigo-400 backdrop-blur-sm border-none">
                  Intelligence artificielle pour votre présence en ligne
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Des bios captivantes en quelques secondes
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Optimisez votre présence sur les réseaux sociaux avec des bios parfaitement adaptées à TikTok, Instagram, Twitter, LinkedIn et plus encore.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="rounded-full px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg">
                    <a href="#generator" className="flex items-center">
                      Générer ma bio <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-6 border-indigo-200 text-indigo-600 dark:border-indigo-800 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950">
                    <Link href="/pricing">Version Premium</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Comment ça marche - Simple et clair */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Comment ça fonctionne</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Un processus simple en trois étapes pour créer la bio parfaite
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              {[
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "Renseignez vos infos",
                  description: "Indiquez votre nom, plateforme et centres d'intérêt pour personnaliser votre bio."
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Génération IA",
                  description: "Notre intelligence artificielle crée une bio optimisée selon vos critères."
                },
                {
                  icon: <Target className="h-6 w-6" />,
                  title: "Résultats immédiats",
                  description: "Obtenez instantanément votre bio et copiez-la directement sur vos profils."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Générateur - Section principale */}
        <section id="generator" className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 px-3 py-1.5 text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border-none">
                Générateur
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Créez votre bio parfaite</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Complétez le formulaire ci-dessous pour générer une bio qui vous ressemble
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="border-0 rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  <BioGeneratorForm prefilledValues={selectedExample}/>
                </CardContent>
              </Card>
              
              {/* Suggestions d'exemples */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="w-full text-center text-sm text-gray-500 dark:text-gray-400 mb-2">Ou essayez un exemple :</p>
                {EXAMPLES.map((example) => (
                  <motion.div 
                    key={example.id}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }} 
                    className="bg-white dark:bg-gray-800 rounded-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer transition-colors hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    onClick={() => handleExampleClick(example)}
                  >
                    {example.label}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Avantages - Simple et efficace */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir HypeBio</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Des avantages conçus pour maximiser votre impact en ligne
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  emoji: "⚡️",
                  title: "Rapide et efficace",
                  description: "Créez une bio complète et optimisée en quelques secondes seulement.",
                },
                {
                  emoji: "🎯",
                  title: "Parfaitement adapté",
                  description: "Chaque bio est conçue spécifiquement pour la plateforme que vous utilisez.",
                },
                {
                  emoji: "🔍",
                  title: "Optimisé pour l'engagement",
                  description: "Des bios qui captent l'attention et génèrent plus d'interactions.",
                },
                {
                  emoji: "🔄",
                  title: "Générez à volonté",
                  description: "Testez différentes variantes pour trouver celle qui vous convient le mieux.",
                },
                {
                  emoji: "⭐️",
                  title: "Résultats de qualité",
                  description: "Des textes professionnels qui mettent en valeur votre personnalité.",
                },
                {
                  emoji: "🌈",
                  title: "Style personnalisé",
                  description: "Choisissez parmi plusieurs styles pour refléter votre identité unique.",
                }
              ].map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl"
                >
                  <div className="text-3xl mb-3">{advantage.emoji}</div>
                  <h3 className="text-xl font-medium mb-2">{advantage.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{advantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 z-0"></div>
          
          {/* Éléments décoratifs subtils */}
          <div className="absolute w-full h-full">
            <motion.div 
              className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 40, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-white/5 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                Prêt à transformer votre présence en ligne ?
              </motion.h2>
              
              <motion.p 
                className="text-xl mb-8 text-white/90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Rejoignez des milliers d'utilisateurs qui ont déjà boosté leur profil avec HypeBio
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button asChild size="lg" className="rounded-full px-8 py-6 bg-white hover:bg-white/90 text-indigo-600 font-medium shadow-lg hover:shadow-xl">
                  <a href="#generator">
                    Générer ma bio gratuitement
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
