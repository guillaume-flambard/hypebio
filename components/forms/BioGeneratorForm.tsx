'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { trpc } from '@/providers/TRPCProvider';
import { useRouter } from "next/navigation";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, Copy, CheckCircle2 } from "lucide-react";

// Define the form schema with zod
const formSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  platform: z.enum(['tiktok', 'instagram', 'twitter', 'linkedin', 'onlyfans']),
  style: z.enum(['fun', 'professional', 'gaming', 'sexy', 'mysterious', 'creative']),
  interests: z.string().min(1, { message: 'Veuillez indiquer au moins un intérêt' }),
  options: z.object({
    generateBranding: z.boolean().default(false),
    generatePostIdeas: z.boolean().default(false),
    generateResume: z.boolean().default(false),
    optimizeInRealTime: z.boolean().default(false),
    generateLinkInBio: z.boolean().default(false),
  }),
});

type FormSchema = z.infer<typeof formSchema>;

// Define response types
type BioResponse = {
  success: boolean;
  bio?: string;
  score?: number;
  scoreDetails?: {
    readability: number;
    engagement: number;
    uniqueness: number;
    platformRelevance: number;
    analysis?: string;
  };
  branding?: {
    username: string;
    slogan: string;
    colors: string[];
  };
  postIdeas?: string[];
  hashtags?: string[];
  resume?: string;
  linkInBio?: {
    sections: Array<{
      title: string;
      content?: string;
      links?: Array<{ label: string; url: string }>;
    }>;
    cta: string;
    themeColor: string;
  };
  error?: string;
};

export default function BioGeneratorForm() {
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [bioScore, setBioScore] = useState<number | null>(null);
  const [scoreDetails, setScoreDetails] = useState<BioResponse['scoreDetails'] | null>(null);
  const [branding, setBranding] = useState<BioResponse['branding'] | null>(null);
  const [postIdeas, setPostIdeas] = useState<string[] | null>(null);
  const [hashtags, setHashtags] = useState<string[] | null>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [linkInBio, setLinkInBio] = useState<BioResponse['linkInBio'] | null>(null);
  const [activeTab, setActiveTab] = useState('bio');
  const [isPremiumFeatureSelected, setIsPremiumFeatureSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationTip, setOptimizationTip] = useState<string | null>("Pour améliorer votre score, essayez d'ajouter plus de détails sur vos intérêts spécifiques et utilisez quelques émojis pertinents.");

  const generateBioMutation = trpc.bio.generate.useMutation({
    onSuccess: (data: BioResponse) => {
      setIsLoading(false);
      if (data.success && data.bio) {
        setGeneratedBio(data.bio);
        setBioScore(data.score || null);
        setScoreDetails(data.scoreDetails || null);
        setBranding(data.branding || null);
        setPostIdeas(data.postIdeas || null);
        setHashtags(data.hashtags || null);
        setResume(data.resume || null);
        setLinkInBio(data.linkInBio || null);
        
        // Si on a générés des éléments supplémentaires, changer l'onglet actif pour l'élément le plus important
        if (data.branding) setActiveTab('branding');
        toast.success('Génération réussie!');
      } else {
        toast.error(data.error || 'Une erreur est survenue lors de la génération.');
      }
    },
    onError: (error) => {
      console.error('Erreur de génération:', error);
      setIsLoading(false);
      toast.error(`Erreur: ${error.message}`);
    },
  });

  // Initialize the form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      platform: 'instagram',
      style: 'fun',
      interests: '',
      options: {
        generateBranding: false,
        generatePostIdeas: false,
        generateResume: false,
        optimizeInRealTime: false,
        generateLinkInBio: false,
      },
    },
  });

  // Update premium features selection
  const handleOptionsChange = () => {
    const options = form.getValues('options');
    const hasPremiumFeature = Object.values(options).some(value => value === true);
    setIsPremiumFeatureSelected(hasPremiumFeature);
  };

  // Handle form submission
  const onSubmit = (values: FormSchema) => {
    setIsLoading(true);
    
    // Check if user has selected premium features
    const hasPremiumFeature = Object.values(values.options).some(value => value === true);
    let isPremiumUser = false;
    
    if (hasPremiumFeature) {
      // Allow titi@gmail.com to use premium features
      isPremiumUser = localStorage.getItem('userEmail') === 'titi@gmail.com';
      
      if (!isPremiumUser) {
        // En production, vérifiez si l'utilisateur a un compte premium
        // Pour l'instant, simulons une redirection vers la page de tarification
        toast.error('Cette fonctionnalité nécessite un compte premium!');
        toast('Redirection vers les options tarifaires...', {
          duration: 3000,
        });
        
        // Redirection simulée (en production, utilisez router.push)
        setTimeout(() => {
          window.location.href = '/pricing';
        }, 3000);
        
        setIsLoading(false);
        return;
      }
    }
    
    // Assurez-vous que les champs requis sont définis (requis par GenerateInput)
    if (!values.name) {
      toast.error('Le nom est requis');
      setIsLoading(false);
      return;
    }
    
    if (!values.platform) {
      toast.error('La plateforme est requise');
      setIsLoading(false);
      return;
    }
    
    if (!values.style) {
      toast.error('Le style est requis');
      setIsLoading(false);
      return;
    }
    
    if (!values.interests) {
      toast.error('Les intérêts sont requis');
      setIsLoading(false);
      return;
    }
    
    // Envoi de la mutation avec tous les champs requis explicitement définis
    generateBioMutation.mutate({
      name: values.name,
      platform: values.platform,
      style: values.style,
      interests: values.interests,
      options: values.options,
      isPremium: isPremiumUser,
    });
  };

  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papier!');
  };

  const router = useRouter();

  return (
    <div className="p-0">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Formulaire */}
        <div className="p-6 md:p-8 border-r border-gray-100 dark:border-gray-800">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Personnalisation</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Renseignez ces informations pour générer une bio adaptée à vos besoins
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom / Pseudo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Entrez votre nom ou pseudo" 
                        {...field}
                        className="border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
                      />
                    </FormControl>
                    <FormDescription>
                      Le nom qui apparaîtra dans votre bio
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plateforme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Sélectionnez une plateforme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="onlyfans">OnlyFans</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        La plateforme où vous utiliserez cette bio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Sélectionnez un style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fun">Fun</SelectItem>
                          <SelectItem value="professional">Professionnel</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="sexy">Sexy</SelectItem>
                          <SelectItem value="mysterious">Mystérieux</SelectItem>
                          <SelectItem value="creative">Créatif</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Le ton et le style de votre bio
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centres d&apos;intérêt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vos centres d'intérêt (séparés par des virgules)"
                        className="resize-none border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Vos passions, hobbies et sujets préférés (séparés par des virgules)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="border border-gray-100 dark:border-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">Options Premium</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Fonctionnalités exclusives pour les comptes premium
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300">
                    Premium
                  </Badge>
                </div>
                <Separator className="mb-4" />
                
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="options.generateBranding"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">Branding</FormLabel>
                          <FormDescription className="text-xs">
                            Générer nom d&apos;utilisateur, palette de couleurs et tone de voix
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              handleOptionsChange();
                            }}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="options.generatePostIdeas"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">Idées de posts</FormLabel>
                          <FormDescription className="text-xs">
                            Suggestions de contenu adaptées à votre bio
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              handleOptionsChange();
                            }}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="options.generateResume"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">Résumé pro</FormLabel>
                          <FormDescription className="text-xs">
                            CV court pour LinkedIn et profils professionnels
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              handleOptionsChange();
                            }}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="options.optimizeInRealTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">Optimisation temps réel</FormLabel>
                          <FormDescription className="text-xs">
                            Analyse et suggestions d&apos;amélioration détaillées
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              handleOptionsChange();
                            }}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="options.generateLinkInBio"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-y-0">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">Link-in-bio</FormLabel>
                          <FormDescription className="text-xs">
                            Générer un mini-site adapté pour tous vos liens
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                              handleOptionsChange();
                            }}
                            className="data-[state=checked]:bg-indigo-600"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Génération en cours...
                  </>
                ) : "Générer ma bio"}
              </Button>
            </form>
          </Form>
        </div>
        
        {/* Résultats */}
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50">
          {generatedBio ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Résultats</h3>
                {bioScore && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score:</span>
                    <Badge variant="outline" className={`${bioScore >= 80 ? 'text-green-500' : bioScore >= 60 ? 'text-yellow-500' : 'text-red-500'} font-medium`}>
                      {bioScore}/100
                    </Badge>
                  </div>
                )}
              </div>

              {/* Section d'analyse globale */}
              {scoreDetails && (
                <Card className="border-0 shadow-sm bg-white dark:bg-gray-800 mb-6">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex flex-col items-center">
                        <div className={`text-5xl font-bold mb-2 ${scoreDetails.readability >= 80 ? 'text-green-500' : scoreDetails.readability >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {bioScore}/100
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Score global
                        </p>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Lisibilité</span>
                            <div className="flex items-center">
                              <span className={`font-medium mr-2 ${scoreDetails.readability >= 80 ? 'text-green-500' : scoreDetails.readability >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {scoreDetails.readability}
                              </span>
                              <Progress value={scoreDetails.readability} className="h-2 w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Engagement</span>
                            <div className="flex items-center">
                              <span className={`font-medium mr-2 ${scoreDetails.engagement >= 80 ? 'text-green-500' : scoreDetails.engagement >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {scoreDetails.engagement}
                              </span>
                              <Progress value={scoreDetails.engagement} className="h-2 w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Unicité</span>
                            <div className="flex items-center">
                              <span className={`font-medium mr-2 ${scoreDetails.uniqueness >= 80 ? 'text-green-500' : scoreDetails.uniqueness >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {scoreDetails.uniqueness}
                              </span>
                              <Progress value={scoreDetails.uniqueness} className="h-2 w-full" />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Pertinence</span>
                            <div className="flex items-center">
                              <span className={`font-medium mr-2 ${scoreDetails.platformRelevance >= 80 ? 'text-green-500' : scoreDetails.platformRelevance >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                {scoreDetails.platformRelevance}
                              </span>
                              <Progress value={scoreDetails.platformRelevance} className="h-2 w-full" />
                            </div>
                          </div>
                        </div>
                        
                        {scoreDetails.analysis && (
                          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700">
                            <h4 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">Analyse et conseils</h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{scoreDetails.analysis}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
                  <TabsTrigger value="bio">Bio</TabsTrigger>
                  <TabsTrigger value="branding" disabled={!branding}>Branding</TabsTrigger>
                  <TabsTrigger value="postIdeas" disabled={!postIdeas}>Posts</TabsTrigger>
                  <TabsTrigger value="resume" disabled={!resume}>CV</TabsTrigger>
                  <TabsTrigger value="linkInBio" disabled={!linkInBio}>Link in Bio</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bio" className="mt-0">
                  <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                        {generatedBio}
                      </div>
                      <div className="flex justify-end">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(generatedBio)}
                                className="text-gray-500 border-gray-200 dark:border-gray-700"
                              >
                                <Copy className="mr-2 h-4 w-4" /> Copier
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copier la bio dans le presse-papier</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="branding" className="mt-0">
                  {branding ? (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                          {branding.username}
                        </div>
                        <div className="flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(`Nom: ${branding.username}\nSlogan: ${branding.slogan}\nCouleurs: ${branding.colors.join(', ')}`)}
                                  className="text-gray-500 border-gray-200 dark:border-gray-700"
                                >
                                  <Copy className="mr-2 h-4 w-4" /> Copier
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copier le branding dans le presse-papier</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          Activez l&apos;option Branding dans les fonctionnalités premium pour générer ces informations.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-gray-200 dark:border-gray-700"
                          onClick={() => {
                            form.setValue("options.generateBranding", true);
                            setActiveTab("bio");
                          }}
                        >
                          Activer maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="postIdeas" className="mt-0">
                  {postIdeas && hashtags ? (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                          {postIdeas.join('\n')}
                        </div>
                        <div className="flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(postIdeas.join('\n'))}
                                  className="text-gray-500 border-gray-200 dark:border-gray-700"
                                >
                                  <Copy className="mr-2 h-4 w-4" /> Copier
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copier les idées de posts dans le presse-papier</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          Activez l&apos;option Idées de posts dans les fonctionnalités premium pour générer ces informations.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-gray-200 dark:border-gray-700"
                          onClick={() => {
                            form.setValue("options.generatePostIdeas", true);
                            setActiveTab("bio");
                          }}
                        >
                          Activer maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="resume" className="mt-0">
                  {resume ? (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                          {resume}
                        </div>
                        <div className="flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(resume)}
                                  className="text-gray-500 border-gray-200 dark:border-gray-700"
                                >
                                  <Copy className="mr-2 h-4 w-4" /> Copier
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Copier le résumé dans le presse-papier</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          Activez l&apos;option Résumé pro dans les fonctionnalités premium pour générer ces informations.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-gray-200 dark:border-gray-700"
                          onClick={() => {
                            form.setValue("options.generateResume", true);
                            setActiveTab("bio");
                          }}
                        >
                          Activer maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="linkInBio" className="mt-0">
                  {linkInBio ? (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="mb-4 rounded-md">
                          <h3 className="text-lg font-medium mb-3">Votre Link in Bio</h3>
                          
                          {linkInBio.sections.map((section, index) => (
                            <div key={index} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                              <h4 className="font-medium text-md mb-2">{section.title}</h4>
                              
                              {section.content && (
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{section.content}</p>
                              )}
                              
                              {section.links && section.links.length > 0 && (
                                <div className="flex flex-col gap-2 mt-2">
                                  {section.links.map((link, linkIndex) => (
                                    <div key={linkIndex} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                                      <span className="font-medium">{link.label}:</span>
                                      <span className="text-indigo-600 dark:text-indigo-400">{link.url}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md border border-indigo-100 dark:border-indigo-800">
                            <p className="font-medium text-indigo-700 dark:text-indigo-300">{linkInBio.cta}</p>
                          </div>
                          
                          <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Couleur du thème:</span>
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600" 
                              style={{ backgroundColor: linkInBio.themeColor }}
                            ></div>
                            <span className="text-sm font-mono">{linkInBio.themeColor}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(JSON.stringify(linkInBio, null, 2))}
                                  className="text-gray-500 border-gray-200 dark:border-gray-700"
                                >
                                  <Copy className="mr-2 h-4 w-4" /> Exporter
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Exporter les données du Link in Bio</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-0 shadow-sm bg-white dark:bg-gray-800">
                      <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          Activez l&apos;option Link-in-bio dans les fonctionnalités premium pour générer ces informations.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-4 border-gray-200 dark:border-gray-700"
                          onClick={() => {
                            form.setValue("options.generateLinkInBio", true);
                            setActiveTab("bio");
                          }}
                        >
                          Activer maintenant
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-col gap-4 mt-4">
                <Button 
                  onClick={() => router.push("/dashboard")} 
                  variant="outline"
                  className="w-full border-gray-200 dark:border-gray-700"
                >
                  Voir mon historique
                </Button>
                <Button 
                  onClick={() => {
                    setGeneratedBio(null);
                    setBranding(null);
                    setPostIdeas(null);
                    setHashtags(null);
                    setResume(null);
                    setScoreDetails(null);
                    setLinkInBio(null);
                    form.reset();
                  }}
                  variant="link"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  Recommencer
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="text-7xl mb-6">✨</div>
              <h3 className="text-xl font-medium mb-2">Votre bio apparaîtra ici</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                Remplissez le formulaire et cliquez sur &quot;Générer ma bio&quot; pour créer une bio optimisée pour votre plateforme.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-md p-3 text-center">
                  <span className="block text-2xl mb-1">🔥</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Engagement accru</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-md p-3 text-center">
                  <span className="block text-2xl mb-1">⚡️</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Rapide et efficace</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-md p-3 text-center">
                  <span className="block text-2xl mb-1">🎯</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Bio optimisée</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800/50 rounded-md p-3 text-center">
                  <span className="block text-2xl mb-1">🔄</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Générez à volonté</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 