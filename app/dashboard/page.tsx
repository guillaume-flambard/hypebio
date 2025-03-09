import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/lib/db";
import { generatedBios } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata = {
  title: "Dashboard - HypeBio",
  description: "Gérez votre compte HypeBio et retrouvez l'historique de vos bios générées",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  // Récupérer les bios générées par l'utilisateur
  const userBios = await db
    .select()
    .from(generatedBios)
    .where(eq(generatedBios.userId, session.user.id))
    .orderBy(desc(generatedBios.createdAt))
    .limit(10);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bonjour, {session.user.name || session.user.email?.split('@')[0] || 'Utilisateur'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Bienvenue sur votre dashboard HypeBio
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compte</CardTitle>
                  <CardDescription>Informations sur votre compte</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-semibold w-24">Email:</span>
                      <span>{session.user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-24">Type:</span>
                      <span>{session.user.isPremium ? 'Premium' : 'Gratuit'}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/profile">
                      Gérer mon profil
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                  <CardDescription>Vos statistiques d&apos;utilisation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Bios générées:</span>
                      <span>{userBios.length}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Plateforme favorite:</span>
                      <span>
                        {userBios.length > 0
                          ? getMostFrequentPlatform(userBios)
                          : 'Aucune'}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full" disabled={userBios.length === 0}>
                    <Link href="#history">
                      Voir l&apos;historique
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan</CardTitle>
                  <CardDescription>Votre plan actuel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <p className="text-xl font-bold mb-2">
                      {session.user.isPremium ? 'Premium' : 'Gratuit'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {session.user.isPremium 
                        ? 'Accès à toutes les fonctionnalités premium'
                        : 'Fonctionnalités limitées'}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className={`w-full ${session.user.isPremium 
                      ? 'bg-gray-500 hover:bg-gray-600' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'}`}
                    disabled={session.user.isPremium}
                  >
                    <Link href="/pricing">
                      {session.user.isPremium ? 'Déjà Premium' : 'Passer à Premium'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="history" className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Historique de vos bios</h2>
            
            {userBios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userBios.map((bio) => (
                  <Card key={bio.id}>
                    <CardHeader>
                      <CardTitle className="capitalize">{bio.platform}</CardTitle>
                      <CardDescription>
                        Style: <span className="capitalize">{bio.style}</span> • 
                        {new Date(Number(bio.createdAt)).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-white dark:bg-gray-950 p-4 rounded-md">
                        {bio.content}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(bio.content)}>
                        Copier
                      </Button>
                      <Button variant="ghost" size="sm">
                        Régénérer
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Vous n&apos;avez pas encore généré de bios
                </p>
                <Button asChild>
                  <Link href="/#generator">
                    Générer ma première bio
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Fonction utilitaire pour trouver la plateforme la plus utilisée
function getMostFrequentPlatform(bios: typeof generatedBios.$inferSelect[]) {
  const platformCounts: Record<string, number> = {};
  
  bios.forEach(bio => {
    platformCounts[bio.platform] = (platformCounts[bio.platform] || 0) + 1;
  });
  
  let maxCount = 0;
  let maxPlatform = '';
  
  Object.entries(platformCounts).forEach(([platform, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxPlatform = platform;
    }
  });
  
  return maxPlatform.charAt(0).toUpperCase() + maxPlatform.slice(1);
} 