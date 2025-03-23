'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { trpc } from '@/providers/TRPCProvider';
import { motion, AnimatePresence } from 'framer-motion';
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

export interface BioGeneratorFormProps {
  prefilledValues?: {
    name?: string;
    platform?: string;
    style?: string;
    interests?: string;
  };
}

export default function BioGeneratorForm({ prefilledValues }: BioGeneratorFormProps) {
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

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', duration: 0.5 }
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };

  return (
    <div className="p-0">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Formulaire */}
        <motion.div 
          className="p-6 md:p-8 border-r border-gray-100 dark:border-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-medium mb-2">Personnalisation</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Renseignez ces informations pour générer une bio adaptée à vos besoins
            </p>
          </motion.div>
          
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
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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
              </motion.div>
            </form>
          </Form>
        </motion.div>
        
        {/* Résultats */}
        <motion.div 
          className="p-6 md:p-8 bg-gray-50 dark:bg-gray-900/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {generatedBio ? (
              <motion.div 
                className="space-y-6"
                key="results"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-medium">Résultats</h3>
                  {bioScore && (
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 10, delay: 0.5 }}
                    >
                      <span className="text-sm text-gray-500 dark:text-gray-400">Score:</span>
                      <Badge variant="outline" className={`${bioScore >= 80 ? 'text-green-500' : bioScore >= 60 ? 'text-yellow-500' : 'text-red-500'} font-medium`}>
                        {bioScore}/100
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>

                {/* Section d'analyse globale */}
                {scoreDetails && (
                  <motion.div
                    variants={itemVariants}
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      className="border-0 shadow-sm bg-white dark:bg-gray-800 mb-6 rounded-lg overflow-hidden"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <motion.div 
                            className="flex flex-col items-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.4 }}
                          >
                            <div className={`text-5xl font-bold mb-2 ${scoreDetails.readability >= 80 ? 'text-green-500' : scoreDetails.readability >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                              {bioScore}/100
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Score global
                            </p>
                          </motion.div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {["readability", "engagement", "uniqueness", "platformRelevance"].map((metric, index) => (
                                <motion.div 
                                  key={metric} 
                                  className="flex flex-col"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.6 + (index * 0.1) }}
                                >
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {metric === "readability" && "Lisibilité"}
                                    {metric === "engagement" && "Engagement"}
                                    {metric === "uniqueness" && "Unicité"}
                                    {metric === "platformRelevance" && "Pertinence"}
                                  </span>
                                  <div className="flex items-center">
                                    <span className={`font-medium mr-2 ${scoreDetails[metric] >= 80 ? 'text-green-500' : scoreDetails[metric] >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                      {scoreDetails[metric]}
                                    </span>
                                    <motion.div 
                                      className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                      initial={{ width: 0 }}
                                      animate={{ width: '100%' }}
                                      transition={{ duration: 0.5, delay: 0.7 + (index * 0.1) }}
                                    >
                                      <motion.div 
                                        className={`h-full ${scoreDetails[metric] >= 80 ? 'bg-green-500' : scoreDetails[metric] >= 60 ? 'bg-yellow-500' : 'bg-red-500'} rounded-full`}
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${scoreDetails[metric]}%` }}
                                        transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                                      />
                                    </motion.div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            
                            {scoreDetails.analysis && (
                              <motion.div 
                                className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md border border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                              >
                                <h4 className="font-medium mb-2 text-indigo-600 dark:text-indigo-400">Analyse et conseils</h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{scoreDetails.analysis}</p>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.div variants={itemVariants}>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
                      <TabsTrigger value="bio">Bio</TabsTrigger>
                      <TabsTrigger value="branding" disabled={!branding}>Branding</TabsTrigger>
                      <TabsTrigger value="postIdeas" disabled={!postIdeas}>Posts</TabsTrigger>
                      <TabsTrigger value="resume" disabled={!resume}>CV</TabsTrigger>
                      <TabsTrigger value="linkInBio" disabled={!linkInBio}>Link in Bio</TabsTrigger>
                    </TabsList>
                    
                    <AnimatePresence mode="wait">
                      <TabsContent value={activeTab} className="mt-0">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {activeTab === "bio" && (
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                            >
                              <CardContent className="p-6">
                                <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                                  {generatedBio}
                                </div>
                                <motion.div 
                                  className="flex justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(generatedBio)}
                                            className="text-gray-500 border-gray-200 dark:border-gray-700"
                                          >
                                            <Copy className="mr-2 h-4 w-4" /> Copier
                                          </Button>
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copier la bio dans le presse-papier</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </motion.div>
                              </CardContent>
                            </motion.div>
                          )}

                          {activeTab === "branding" && (
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                            >
                              <CardContent className="p-6">
                                <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                                  {branding?.username}
                                </div>
                                <motion.div 
                                  className="flex justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(`Nom: ${branding?.username}\nSlogan: ${branding?.slogan}\nCouleurs: ${branding?.colors.join(', ')}`)}
                                            className="text-gray-500 border-gray-200 dark:border-gray-700"
                                          >
                                            <Copy className="mr-2 h-4 w-4" /> Copier
                                          </Button>
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copier le branding dans le presse-papier</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </motion.div>
                              </CardContent>
                            </motion.div>
                          )}

                          {activeTab === "postIdeas" && (
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                            >
                              <CardContent className="p-6">
                                <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                                  {postIdeas?.join('\n')}
                                </div>
                                <motion.div 
                                  className="flex justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(postIdeas?.join('\n') || '')}
                                            className="text-gray-500 border-gray-200 dark:border-gray-700"
                                          >
                                            <Copy className="mr-2 h-4 w-4" /> Copier
                                          </Button>
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copier les idées de posts dans le presse-papier</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </motion.div>
                              </CardContent>
                            </motion.div>
                          )}

                          {activeTab === "resume" && (
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                            >
                              <CardContent className="p-6">
                                <div className="mb-4 whitespace-pre-wrap rounded-md font-medium text-gray-700 dark:text-gray-300">
                                  {resume}
                                </div>
                                <motion.div 
                                  className="flex justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(resume || '')}
                                            className="text-gray-500 border-gray-200 dark:border-gray-700"
                                          >
                                            <Copy className="mr-2 h-4 w-4" /> Copier
                                          </Button>
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Copier le résumé dans le presse-papier</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </motion.div>
                              </CardContent>
                            </motion.div>
                          )}

                          {activeTab === "linkInBio" && (
                            <motion.div
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              className="border-0 shadow-sm bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
                            >
                              <CardContent className="p-6">
                                <div className="mb-4 rounded-md">
                                  <h3 className="text-lg font-medium mb-3">Votre Link in Bio</h3>
                                  
                                  {linkInBio?.sections.map((section, index) => (
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
                                    <p className="font-medium text-indigo-700 dark:text-indigo-300">{linkInBio?.cta}</p>
                                  </div>
                                  
                                  <div className="mt-4 flex items-center gap-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Couleur du thème:</span>
                                    <div 
                                      className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600" 
                                      style={{ backgroundColor: linkInBio?.themeColor }}
                                    ></div>
                                    <span className="text-sm font-mono">{linkInBio?.themeColor}</span>
                                  </div>
                                </div>
                                
                                <motion.div 
                                  className="flex justify-end"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.5 }}
                                >
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyToClipboard(JSON.stringify(linkInBio, null, 2))}
                                            className="text-gray-500 border-gray-200 dark:border-gray-700"
                                          >
                                            <Copy className="mr-2 h-4 w-4" /> Exporter
                                          </Button>
                                        </motion.div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Exporter les données du Link in Bio</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </motion.div>
                              </CardContent>
                            </motion.div>
                          )}
                        </motion.div>
                      </TabsContent>
                    </AnimatePresence>
                  </Tabs>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col gap-4 mt-4"
                  variants={itemVariants}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={() => router.push("/dashboard")} 
                      variant="outline"
                      className="w-full border-gray-200 dark:border-gray-700"
                    >
                      Voir mon historique
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }}>
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
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="text-7xl mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >✨</motion.div>
                <motion.h3 
                  className="text-xl font-medium mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >Votre bio apparaîtra ici</motion.h3>
                <motion.p 
                  className="text-gray-500 dark:text-gray-400 mb-8 max-w-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Remplissez le formulaire et cliquez sur &quot;Générer ma bio&quot; pour créer une bio optimisée pour votre plateforme.
                </motion.p>
                <motion.div 
                  className="grid grid-cols-2 gap-4 max-w-md w-full"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.4
                      }
                    }
                  }}
                >
                  {[
                    { icon: "🔥", text: "Engagement accru" },
                    { icon: "⚡️", text: "Rapide et efficace" },
                    { icon: "🎯", text: "Bio optimisée" },
                    { icon: "🔄", text: "Générez à volonté" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800/50 rounded-md p-3 text-center"
                      variants={{
                        hidden: { y: 20, opacity: 0 },
                        visible: { 
                          y: 0, 
                          opacity: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 24
                          }
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 15px rgba(0,0,0,0.1)" 
                      }}
                    >
                      <motion.span 
                        className="block text-2xl mb-1"
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: index * 0.2
                        }}
                      >{item.icon}</motion.span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 