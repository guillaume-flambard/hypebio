'use client';

import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BioGeneratorForm from "@/components/forms/BioGeneratorForm";
import Link from "next/link";
import { motion } from "framer-motion";
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
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const heroText = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12 
      }
    }
  };

  const cardHover = {
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={heroText}>
                <Badge variant="outline" className="mb-6 px-3 py-1 text-sm bg-white/10 border-white/20 hover:bg-white/20">
                  Boostez vos réseaux sociaux
                </Badge>
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
                variants={heroText}
              >
                Générez des Bios Virales en Quelques Secondes
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl"
                variants={heroText}
              >
                HypeBio crée automatiquement des bios optimisées pour TikTok, Instagram, Twitter, LinkedIn et OnlyFans. Boostez votre présence en ligne dès maintenant !
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={heroText}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all">
                    <a href="#generator">Générer ma bio</a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <Link href="/examples">Voir des exemples</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section - Expanded with more benefits */}
        <section className="py-16 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-6">Pourquoi choisir HypeBio ?</h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Notre technologie d&apos;IA avancée crée des bios captivantes qui génèrent plus d&apos;engagement
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} whileHover={cardHover.hover}>
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardHeader>
                    <motion.div 
                      className="text-3xl mb-4"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >⚡️</motion.div>
                    <CardTitle>Rapide et Efficace</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Générez une bio optimisée en quelques secondes, sans effort et adaptée à votre style.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                whileHover={cardHover.hover}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardHeader>
                    <motion.div 
                      className="text-3xl mb-4"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.5
                      }}
                    >🎯</motion.div>
                    <CardTitle>Optimisé par Plateforme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Chaque bio est spécifiquement adaptée aux exigences et au format de la plateforme choisie.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div 
                variants={fadeIn} 
                whileHover={cardHover.hover}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardHeader>
                    <motion.div 
                      className="text-3xl mb-4"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 1
                      }}
                    >🔥</motion.div>
                    <CardTitle>Style Personnalisé</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choisissez parmi différents styles pour correspondre à votre personnalité et votre audience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Premium Features Section - Condensed */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-center mb-4">Fonctionnalités Premium</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
                Découvrez nos outils avancés pour optimiser votre présence en ligne
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <Tabs defaultValue="branding" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="branding">Branding</TabsTrigger>
                  <TabsTrigger value="score">Analyse</TabsTrigger>
                  <TabsTrigger value="content">Contenu</TabsTrigger>
                  <TabsTrigger value="advanced">Avancé</TabsTrigger>
                </TabsList>
                
                <TabsContent value="branding">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <motion.div 
                            className="text-3xl mr-4"
                            animate={{ 
                              rotate: [0, 10, 0, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >🎨</motion.div>
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
                        <motion.div 
                          className="flex justify-end"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Link href="/pricing">
                              Voir les forfaits
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="score">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <motion.div 
                            className="text-3xl mr-4"
                            animate={{ 
                              y: [0, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >📊</motion.div>
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
                        <motion.div 
                          className="flex justify-end"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Link href="/pricing">
                              Voir les forfaits
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="content">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <motion.div 
                            className="text-3xl mr-4"
                            animate={{ 
                              rotateZ: [0, 10, 0, -10, 0]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >📝</motion.div>
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
                        <motion.div 
                          className="flex justify-end"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Link href="/pricing">
                              Voir les forfaits
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="advanced">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center mb-2">
                          <motion.div 
                            className="text-3xl mr-4"
                            animate={{ 
                              rotate: [0, 360],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{ 
                              rotate: {
                                duration: 10, 
                                repeat: Infinity,
                                ease: "linear"
                              },
                              scale: {
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }
                            }}
                          >🌐</motion.div>
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
                        <motion.div 
                          className="flex justify-end"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Button asChild variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <Link href="/pricing">
                              Voir les forfaits
                            </Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
            
            <motion.div 
              className="mt-12 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              variants={fadeIn}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg">
                  <Link href="/pricing">
                    Voir tous les forfaits premium
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Generator Section */}
        <section id="generator" className="py-16 bg-white dark:bg-gray-950 relative overflow-hidden">
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-70"
            animate={{
              scale: [1, 1.2, 1],
              x: ["-50%", "-45%", "-50%"],
              y: ["-50%", "-55%", "-50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl opacity-70"
            animate={{
              scale: [1, 1.3, 1],
              x: ["33%", "30%", "33%"],
              y: ["33%", "36%", "33%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-xl mx-auto text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <Badge variant="outline" className="mb-4 px-3 py-1 text-sm border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Générateur de bio
                </Badge>
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
                variants={fadeIn}
              >
                Créez votre bio parfaite maintenant
              </motion.h2>
              <motion.p 
                className="text-slate-600 dark:text-slate-400 mb-0"
                variants={fadeIn}
              >
                Remplissez le formulaire ci-dessous pour obtenir une bio optimisée pour votre plateforme préférée.
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="border-0 shadow-xl bg-white dark:bg-gray-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"></div>
                <CardContent className="p-0">
                  <BioGeneratorForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Ce que disent nos utilisateurs
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { type: "spring", stiffness: 400 } }}>
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3"
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="font-semibold text-indigo-700 dark:text-indigo-400">S</span>
                      </motion.div>
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
              </motion.div>
              
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { type: "spring", stiffness: 400 } }}>
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-3"
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="font-semibold text-purple-700 dark:text-purple-400">T</span>
                      </motion.div>
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
              </motion.div>
              
              <motion.div variants={fadeIn} whileHover={{ y: -10, transition: { type: "spring", stiffness: 400 } }}>
                <Card className="border-0 shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center mr-3"
                        whileHover={{ scale: 1.2 }}
                      >
                        <span className="font-semibold text-pink-700 dark:text-pink-400">L</span>
                      </motion.div>
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-3xl font-bold mb-6"
                variants={fadeIn}
              >
                Prêt à booster votre présence en ligne ?
              </motion.h2>
              <motion.p 
                className="text-xl mb-8 max-w-2xl mx-auto"
                variants={fadeIn}
              >
                Rejoignez des milliers d&apos;utilisateurs qui ont déjà transformé leurs profils avec HypeBio.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-white/90 shadow-lg hover:shadow-xl">
                  <a href="#generator">Générer ma bio gratuitement</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
