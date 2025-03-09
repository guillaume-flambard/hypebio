'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { trpc } from "@/providers/TRPCProvider";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

// Type pour les bios
interface Bio {
  id: string;
  userId: string | null;
  platform: string;
  style: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const pageSize = 6; // Nombre de bios par page
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  // Fetch user bios with pagination and search
  const {
    data: biosData,
    isLoading,
    refetch,
  } = trpc.bio.getMyBios.useQuery({
    page,
    pageSize,
    searchTerm,
  }, {
    // Ne pas charger avant que la session soit prête
    enabled: status === "authenticated",
  });

  // Get platform statistics
  const { data: statsData } = trpc.bio.getUserStats.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  // Fonction pour copier dans le presse-papier
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Contenu copié dans le presse-papier");
  };

  // Fonction pour supprimer une bio
  const deleteBioMutation = trpc.bio.deleteBio.useMutation({
    onSuccess: () => {
      toast.success("Bio supprimée avec succès");
      refetch();
    },
    onError: (error: Error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  // Fonction pour gérer la suppression
  const handleDelete = (bioId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette bio ?")) {
      deleteBioMutation.mutate({ bioId });
    }
  };

  // Extraction sécurisée des données avec guard patterns
  const bios: Bio[] = (biosData && 
                      'success' in biosData && 
                      biosData.success === true && 
                      'bios' in biosData && 
                      Array.isArray(biosData.bios)) 
                      ? biosData.bios 
                      : [];
                      
  const totalPages: number = (biosData && 
                              'success' in biosData && 
                              biosData.success === true && 
                              'totalPages' in biosData && 
                              typeof biosData.totalPages === 'number') 
                              ? biosData.totalPages 
                              : 1;
  
  // Statistiques avec guard patterns
  const totalBios: number = (statsData && 
                             'success' in statsData && 
                             statsData.success === true && 
                             'totalBios' in statsData && 
                             typeof statsData.totalBios === 'number') 
                             ? statsData.totalBios 
                             : 0;
                             
  const favoritePlatform: string = (statsData && 
                                    'success' in statsData && 
                                    statsData.success === true && 
                                    'favoritePlatform' in statsData) 
                                    ? statsData.favoritePlatform || 'Aucune' 
                                    : 'Aucune';
                                    
  const platformCounts: Record<string, number> = (statsData && 
                                                 'success' in statsData && 
                                                 statsData.success === true && 
                                                 'platformCounts' in statsData && 
                                                 statsData.platformCounts) 
                                                 ? statsData.platformCounts 
                                                 : {};

  if (status === "loading") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-xl">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-8 md:py-12 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bonjour, {session?.user?.name || session?.user?.email?.split('@')[0] || 'Utilisateur'}
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
                      <span>{session?.user?.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-24">Type:</span>
                      <span>{session?.user?.isPremium ? 'Premium' : 'Gratuit'}</span>
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
                      <span>{totalBios}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-32">Plateforme favorite:</span>
                      <span>
                        {favoritePlatform}
                      </span>
                    </div>
                    {Object.keys(platformCounts).length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Répartition par plateforme:</h4>
                        <div className="space-y-1 text-sm">
                          {Object.entries(platformCounts).map(([platform, count]) => (
                            <div key={platform} className="flex justify-between">
                              <span className="capitalize">{platform}:</span>
                              <span>{typeof count === 'number' ? count : '0'}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full" disabled={bios.length === 0}>
                    <a href="#history">
                      Voir l&apos;historique
                    </a>
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
                      {session?.user?.isPremium ? 'Premium' : 'Gratuit'}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {session?.user?.isPremium 
                        ? 'Accès à toutes les fonctionnalités premium'
                        : 'Fonctionnalités limitées'}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild 
                    className={`w-full ${session?.user?.isPremium 
                      ? 'bg-gray-500 hover:bg-gray-600' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'}`}
                    disabled={session?.user?.isPremium}
                  >
                    <Link href="/pricing">
                      {session?.user?.isPremium ? 'Déjà Premium' : 'Passer à Premium'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="history" className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Historique de vos bios</h2>
              
              <div className="relative w-full md:w-64 mt-4 md:mt-0">
                <Input 
                  placeholder="Rechercher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : bios.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bios.map((bio: Bio) => (
                    <Card key={bio.id} className="relative">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="capitalize">{bio.platform}</CardTitle>
                            <CardDescription>
                              Style: <span className="capitalize">{bio.style}</span> • 
                              {formatDistanceToNow(new Date(Number(bio.createdAt)), { 
                                addSuffix: true,
                                locale: fr
                              })}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                            onClick={() => handleDelete(bio.id)}
                          >
                            <span className="sr-only">Supprimer</span>
                            ✕
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-white dark:bg-gray-950 p-4 rounded-md">
                          {bio.content}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(bio.content)}
                          className="relative overflow-hidden group"
                        >
                          <span className="group-hover:opacity-0 transition-opacity duration-200">
                            Copier
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="transform transition-transform group-active:scale-90">Copié!</span>
                          </span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toast.info("Fonctionnalité bientôt disponible")}
                          className="relative overflow-hidden group"
                        >
                          <span className="group-hover:opacity-0 transition-opacity duration-200">
                            Régénérer
                          </span>
                          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="transform transition-transform group-active:scale-90">Bientôt!</span>
                          </span>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      {page > 1 && (
                        <PaginationItem>
                          <PaginationPrevious href={`/dashboard?page=${page - 1}`} />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                        const pageNumber = page <= 3 
                          ? i + 1 
                          : page >= totalPages - 2 
                            ? totalPages - 4 + i 
                            : page - 2 + i;
                            
                        if (pageNumber <= 0 || pageNumber > totalPages) return null;
                        
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink 
                              href={`/dashboard?page=${pageNumber}`}
                              isActive={pageNumber === page}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {totalPages > 5 && page < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {page < totalPages && (
                        <PaginationItem>
                          <PaginationNext href={`/dashboard?page=${page + 1}`} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchTerm 
                    ? "Aucun résultat trouvé pour votre recherche." 
                    : "Vous n'avez pas encore généré de bios."}
                </p>
                {!searchTerm && (
                  <Button asChild>
                    <Link href="/#generator">
                      Générer ma première bio
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 