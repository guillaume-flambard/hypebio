'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { trpc } from '@/providers/TRPCProvider';
import { motion } from 'framer-motion';

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
  };
  branding?: {
    username: string;
    slogan: string;
    colors: string[];
  };
  postIdeas?: string[];
  hashtags?: string[];
  resume?: string;
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
    
    if (hasPremiumFeature) {
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
      isPremium: false,
    });
  };

  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papier!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Styled Form Card with Gradient Border */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 border border-transparent relative before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-purple-500 before:to-blue-500 before:-z-10 before:border-transparent">
              <h3 className="text-xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Personnalisez votre bio
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {/* Nom/Pseudo */}
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">Nom ou pseudo</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Votre nom ou pseudo" 
                            {...field} 
                            className="w-full h-12 px-4 rounded-md border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all" 
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Plateforme */}
                <div>
                  <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">Plateforme</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full h-12 px-4 rounded-md border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all">
                              <SelectValue placeholder="Sélectionnez une plateforme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="onlyfans">OnlyFans</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="mt-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Style */}
                <div>
                  <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full h-12 px-4 rounded-md border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all">
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
                        <FormMessage className="mt-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Intérêts */}
                <div>
                  <FormField
                    control={form.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-medium mb-2">Intérêts (séparés par des virgules)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Ex: voyage, photo, cuisine, sport..." 
                            {...field} 
                            className="w-full min-h-[96px] px-4 py-3 rounded-md resize-none border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring focus:ring-purple-200 dark:focus:ring-purple-900 transition-all"
                          />
                        </FormControl>
                        <FormMessage className="mt-1 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Séparateur */}
              <div className="my-8 border-t border-gray-200 dark:border-gray-800"></div>
              
              {/* Options Premium */}
              <div>
                <h4 className="text-md font-semibold mb-6">Options premium</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Branding */}
                  <div>
                    <FormField
                      control={form.control}
                      name="options.generateBranding"
                      render={({ field }) => (
                        <FormItem className="h-[76px] flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div>
                            <FormLabel className="block text-sm font-medium">Branding</FormLabel>
                            <FormDescription className="mt-1 text-xs text-gray-500">
                              Générer un branding complet
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                handleOptionsChange();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Posts */}
                  <div>
                    <FormField
                      control={form.control}
                      name="options.generatePostIdeas"
                      render={({ field }) => (
                        <FormItem className="h-[76px] flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div>
                            <FormLabel className="block text-sm font-medium">Posts</FormLabel>
                            <FormDescription className="mt-1 text-xs text-gray-500">
                              Idées de contenu et hashtags
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                handleOptionsChange();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Résumé */}
                  <div>
                    <FormField
                      control={form.control}
                      name="options.generateResume"
                      render={({ field }) => (
                        <FormItem className="h-[76px] flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div>
                            <FormLabel className="block text-sm font-medium">Résumé</FormLabel>
                            <FormDescription className="mt-1 text-xs text-gray-500">
                              Résumé professionnel avancé
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                handleOptionsChange();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Optimisation */}
                  <div>
                    <FormField
                      control={form.control}
                      name="options.optimizeInRealTime"
                      render={({ field }) => (
                        <FormItem className="h-[76px] flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div>
                            <FormLabel className="block text-sm font-medium">Optimisation</FormLabel>
                            <FormDescription className="mt-1 text-xs text-gray-500">
                              Optimiser en temps réel
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                handleOptionsChange();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Link in bio */}
                  <div>
                    <FormField
                      control={form.control}
                      name="options.generateLinkInBio"
                      render={({ field }) => (
                        <FormItem className="h-[76px] flex flex-row items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div>
                            <FormLabel className="block text-sm font-medium">Link-in-bio</FormLabel>
                            <FormDescription className="mt-1 text-xs text-gray-500">
                              Mini-site de présentation
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(value) => {
                                field.onChange(value);
                                handleOptionsChange();
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Alerte Premium */}
                {isPremiumFeatureSelected && (
                  <div className="mt-6 bg-amber-50 border border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 rounded-lg p-4 text-amber-800 dark:text-amber-200 text-sm">
                    ⚠️ Les options sélectionnées nécessitent un abonnement Premium ou Pro. <a href="/pricing" className="underline font-medium">Voir les tarifs</a>
                  </div>
                )}
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="px-10 py-6 text-lg font-medium bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Génération en cours...
                  </>
                ) : (
                  "Générer ma bio"
                )}
              </Button>
            </div>
          </form>
        </Form>

        {generatedBio && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="bio" className="flex items-center gap-2">
                  <span>Bio</span>
                  {bioScore && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs py-0.5 px-1.5 rounded-full">
                      {bioScore}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="branding" disabled={!branding}>Branding</TabsTrigger>
                <TabsTrigger value="posts" disabled={!postIdeas}>Posts & Hashtags</TabsTrigger>
                <TabsTrigger value="resume" disabled={!resume}>Résumé</TabsTrigger>
                <TabsTrigger value="score" disabled={!bioScore}>Score</TabsTrigger>
              </TabsList>
              
              {/* Tab: Bio */}
              <TabsContent value="bio" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">Votre bio générée :</h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4 whitespace-pre-wrap">
                      {generatedBio}
                    </div>
                    
                    {bioScore && (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Score de qualité</span>
                          <span className="text-sm font-medium">{bioScore}/100</span>
                        </div>
                        <Progress value={bioScore} className="h-2" />
                      </div>
                    )}
                    
                    <Button onClick={() => copyToClipboard(generatedBio)} variant="outline" className="w-full">
                      Copier la bio
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab: Branding */}
              <TabsContent value="branding" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {branding ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Votre branding :</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Nom d&apos;utilisateur suggéré</h4>
                            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                              {branding.username}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Slogan</h4>
                            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                              {branding.slogan}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Palette de couleurs</h4>
                          <div className="flex gap-2 flex-wrap">
                            {branding.colors.map((color, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <div 
                                  className="w-12 h-12 rounded-md border border-gray-200 dark:border-gray-800"
                                  style={{ backgroundColor: color }}
                                ></div>
                                <span className="text-xs mt-1">{color}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button onClick={() => copyToClipboard(`Nom: ${branding.username}\nSlogan: ${branding.slogan}\nCouleurs: ${branding.colors.join(', ')}`)} variant="outline" className="w-full">
                          Copier le branding
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Branding non disponible</p>
                        <p className="text-sm">Cette fonctionnalité nécessite un plan Premium.</p>
                        <Button asChild className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500">
                          <a href="/pricing">Voir les formules</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab: Posts & Hashtags */}
              <TabsContent value="posts" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {postIdeas && hashtags ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Idées de posts :</h3>
                          <ul className="space-y-2">
                            {postIdeas.map((idea, index) => (
                              <li key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md flex justify-between items-center">
                                <span>{idea}</span>
                                <Button onClick={() => copyToClipboard(idea)} variant="ghost" size="sm" className="ml-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                  Copier
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Hashtags recommandés :</h3>
                          <div className="flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                            {hashtags.map((tag, index) => (
                              <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded-md text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Button onClick={() => copyToClipboard(hashtags.join(' '))} variant="outline" className="w-full mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                            Copier tous les hashtags
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Idées de posts non disponibles</p>
                        <p className="text-sm">Cette fonctionnalité nécessite un plan Premium.</p>
                        <Button asChild className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500">
                          <a href="/pricing">Voir les formules</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab: Résumé */}
              <TabsContent value="resume" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {resume ? (
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Votre résumé professionnel :</h3>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4 whitespace-pre-wrap">
                          {resume}
                        </div>
                        <Button onClick={() => copyToClipboard(resume)} variant="outline" className="w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                          Copier le résumé
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Résumé non disponible</p>
                        <p className="text-sm">Cette fonctionnalité nécessite un plan Premium.</p>
                        <Button asChild className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500">
                          <a href="/pricing">Voir les formules</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Tab: Score */}
              <TabsContent value="score" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    {scoreDetails ? (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Analyse de votre bio :</h3>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Score global</span>
                            <span className="text-sm font-medium">{bioScore}/100</span>
                          </div>
                          <Progress value={bioScore || 0} className="h-3 mb-4" />
                          
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Lisibilité</span>
                                <span className="text-sm">{scoreDetails.readability}/100</span>
                              </div>
                              <Progress value={scoreDetails.readability} className="h-1.5" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Engagement potentiel</span>
                                <span className="text-sm">{scoreDetails.engagement}/100</span>
                              </div>
                              <Progress value={scoreDetails.engagement} className="h-1.5" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Originalité</span>
                                <span className="text-sm">{scoreDetails.uniqueness}/100</span>
                              </div>
                              <Progress value={scoreDetails.uniqueness} className="h-1.5" />
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Pertinence plateforme</span>
                                <span className="text-sm">{scoreDetails.platformRelevance}/100</span>
                              </div>
                              <Progress value={scoreDetails.platformRelevance} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                        
                        {optimizationTip && (
                          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-blue-800 dark:text-blue-200 text-sm">
                            💡 <strong>Conseil d&apos;optimisation :</strong> {optimizationTip}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">Analyse détaillée non disponible</p>
                        <p className="text-sm">Cette fonctionnalité nécessite un plan Premium.</p>
                        <Button asChild className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500">
                          <a href="/pricing">Voir les formules</a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 