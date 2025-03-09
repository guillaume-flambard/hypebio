import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export const metadata = {
  title: "Profil - HypeBio",
  description: "Gérez votre profil et vos préférences sur HypeBio",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Profil Utilisateur
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Consultez et modifiez vos informations personnelles
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>Consultez et modifiez vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || '?'}
                      </div>
                    </div>
                    
                    {/* Nom */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom
                      </label>
                      <Input 
                        id="name" 
                        type="text" 
                        defaultValue={session.user.name || ''} 
                        readOnly 
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                      <p className="text-xs text-gray-500">
                        Cette information provient de votre fournisseur d&apos;authentification.
                      </p>
                    </div>
                    
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={session.user.email || ''} 
                        readOnly 
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                      <p className="text-xs text-gray-500">
                        Votre adresse email est utilisée pour vous connecter et vous envoyer des notifications.
                      </p>
                    </div>
                    
                    {/* Type de compte */}
                    <div className="space-y-2">
                      <label htmlFor="account-type" className="text-sm font-medium">
                        Type de compte
                      </label>
                      <Input 
                        id="account-type" 
                        type="text" 
                        defaultValue={session.user.isPremium ? 'Premium' : 'Gratuit'} 
                        readOnly 
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                      {!session.user.isPremium && (
                        <p className="text-xs text-gray-500">
                          <Link href="/pricing" className="text-blue-500 hover:underline">
                            Passez à Premium
                          </Link> pour bénéficier de fonctionnalités avancées.
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    Retour au dashboard
                  </Link>
                </Button>
                {!session.user.isPremium && (
                  <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    <Link href="/pricing">
                      Passer à Premium
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences</CardTitle>
                  <CardDescription>Personnalisez votre expérience HypeBio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notifications par email</h3>
                        <p className="text-sm text-gray-500">Recevez des emails pour les nouvelles fonctionnalités et offres spéciales</p>
                      </div>
                      <div className="h-6 w-11 bg-gray-200 rounded-full flex items-center p-1 cursor-not-allowed">
                        <div className="h-4 w-4 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Thème sombre</h3>
                        <p className="text-sm text-gray-500">Utiliser le thème sombre pour l&apos;interface</p>
                      </div>
                      <div className="h-6 w-11 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center p-1 cursor-not-allowed">
                        <div className="h-4 w-4 rounded-full bg-gray-400 dark:bg-gray-600 ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500 italic">
                    Les préférences seront bientôt disponibles.
                  </p>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8">
              <Card className="border-red-200 dark:border-red-900">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Danger</CardTitle>
                  <CardDescription>Actions irréversibles pour votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Ces actions sont permanentes et ne peuvent pas être annulées. Veuillez être certain avant de procéder.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" disabled className="opacity-50 cursor-not-allowed">
                    Supprimer mon compte
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 