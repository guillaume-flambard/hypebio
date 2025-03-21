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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRightIcon,
  ClipboardCopyIcon,
  SearchIcon,
  XIcon,
  TrashIcon,
  RefreshCcwIcon,
  MoreHorizontalIcon,
  UserIcon,
  StarIcon,
  SettingsIcon,
  PlusIcon
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";

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
  const form = useForm();
  
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
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-8">
              <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[350px]" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-[230px] rounded-lg" />
                ))}
              </div>
              
              <div className="space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-[200px] rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1">
        <section className="py-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-4 border-white/20 shadow-xl">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'User'} />
                  <AvatarFallback className="bg-white/10 text-white text-xl font-medium">
                    {session?.user?.name 
                      ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()
                      : session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white">
                    Bonjour, {session?.user?.name || session?.user?.email?.split('@')[0] || 'Utilisateur'}
                  </h1>
                  <div className="flex items-center gap-3">
                    <Badge variant={session?.user?.isPremium ? "default" : "outline"} 
                      className={session?.user?.isPremium 
                        ? "bg-amber-400 text-amber-950 hover:bg-amber-300 border-0" 
                        : "bg-white/10 hover:bg-white/20 border-0"}>
                      {session?.user?.isPremium ? 'Premium' : 'Gratuit'}
                    </Badge>
                    <span className="text-white/80 text-sm">{session?.user?.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 border-0 text-white" asChild>
                  <Link href="/#generator">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Nouvelle bio
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 border-0 text-white">
                      Mon compte <ChevronRightIcon className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Mon profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer flex items-center">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                      </Link>
                    </DropdownMenuItem>
                    {!session?.user?.isPremium && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/pricing" className="cursor-pointer flex items-center text-amber-500">
                            <StarIcon className="mr-2 h-4 w-4" />
                            <span>Passer à Premium</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-6 bg-white dark:bg-slate-800 shadow-sm rounded-lg p-1">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-slate-800">
                  <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-700">
                    <CardTitle>Vue d'ensemble</CardTitle>
                    <CardDescription>Activité sur votre compte</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-100 dark:border-slate-700">
                      <span className="text-slate-600 dark:text-slate-400">Bios générées</span>
                      <span className="font-semibold text-lg">{totalBios}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Plateforme favorite</span>
                      <Badge variant="secondary" className="capitalize">{favoritePlatform}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex items-center justify-between">
                    <Button variant="ghost" size="sm" className="px-0 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300" asChild>
                      <Link href="#history">
                        Voir l'historique
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-slate-800">
                  <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-700">
                    <CardTitle>Statistiques</CardTitle>
                    <CardDescription>Répartition par plateforme</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    {Object.keys(platformCounts).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(platformCounts).map(([platform, count]) => (
                          <div key={platform} className="flex items-center justify-between">
                            <span className="capitalize text-slate-600 dark:text-slate-400">{platform}</span>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={Math.min(100, (typeof count === 'number' ? count : 0) / totalBios * 100)} 
                                className="h-2 w-28 bg-slate-200 dark:bg-slate-700"
                              />
                              <span className="text-sm font-medium w-5 text-right">{typeof count === 'number' ? count : '0'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                        Aucune donnée disponible
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white dark:bg-slate-800">
                  <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-700">
                    <CardTitle>Votre plan</CardTitle>
                    <CardDescription>Fonctionnalités disponibles</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <div className="text-center py-2">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 mb-3">
                        <span className={`text-2xl ${session?.user?.isPremium ? 'text-amber-400' : 'text-slate-400'}`}>
                          {session?.user?.isPremium ? '★' : '☆'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        Plan {session?.user?.isPremium ? 'Premium' : 'Gratuit'}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
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
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}
                      disabled={session?.user?.isPremium}
                    >
                      <Link href="/pricing">
                        {session?.user?.isPremium ? 'Déjà Premium' : 'Passer à Premium'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6" id="history">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Historique de vos bios</h2>
                  
                  <Form {...form}>
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem className="relative w-full md:w-64 mt-4 md:mt-0">
                          <FormControl>
                            <div className="relative">
                              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input 
                                placeholder="Rechercher..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-full bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                              />
                              {searchTerm && (
                                <button 
                                  onClick={() => setSearchTerm("")}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                  <XIcon className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Form>
                </div>
                
                <Separator className="my-4" />
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-[200px] rounded-lg" />
                    ))}
                  </div>
                ) : bios.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {bios.map((bio: Bio) => (
                        <Card key={bio.id} className="group border-0 shadow-md hover:shadow-xl transition-all duration-200 bg-white dark:bg-slate-800 overflow-hidden">
                          <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="capitalize bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800">
                                  {bio.platform}
                                </Badge>
                                <Badge variant="secondary" className="capitalize">
                                  {bio.style}
                                </Badge>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-slate-400 hover:text-slate-700"
                                  >
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => copyToClipboard(bio.content)} className="cursor-pointer">
                                    <ClipboardCopyIcon className="mr-2 h-4 w-4" />
                                    <span>Copier</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => toast.info("Fonctionnalité bientôt disponible")}
                                    className="cursor-pointer"
                                  >
                                    <RefreshCcwIcon className="mr-2 h-4 w-4" />
                                    <span>Régénérer</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleDelete(bio.id)}
                                    className="cursor-pointer text-red-500 focus:text-red-500"
                                  >
                                    <TrashIcon className="mr-2 h-4 w-4" />
                                    <span>Supprimer</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <CardDescription>
                              {formatDistanceToNow(new Date(Number(bio.createdAt)), { 
                                addSuffix: true,
                                locale: fr
                              })}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-md border border-slate-100 dark:border-slate-700">
                              {bio.content}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between bg-white/80 dark:bg-transparent">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => copyToClipboard(bio.content)}
                                    className="gap-1 bg-transparent"
                                  >
                                    <ClipboardCopyIcon className="h-3.5 w-3.5" />
                                    Copier
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Copier le contenu</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => toast.info("Fonctionnalité bientôt disponible")}
                                    className="gap-1 bg-transparent"
                                  >
                                    <RefreshCcwIcon className="h-3.5 w-3.5" />
                                    Régénérer
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Bientôt disponible</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
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
                  <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/20">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/20 mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                      {searchTerm 
                        ? "Aucun résultat trouvé pour votre recherche." 
                        : "Vous n'avez pas encore généré de bios."}
                    </p>
                    {!searchTerm && (
                      <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        <Link href="/#generator">
                          Générer ma première bio
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
} 