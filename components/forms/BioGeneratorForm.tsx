'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc-client';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
});

type FormSchema = z.infer<typeof formSchema>;

// Define response types
type BioResponse = {
  success: boolean;
  bio?: string;
  error?: string;
};

export default function BioGeneratorForm() {
  const [generatedBio, setGeneratedBio] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBioMutation = trpc.bio.generate.useMutation({
    onSuccess: (data: BioResponse) => {
      setIsLoading(false);
      if (data.success && data.bio) {
        setGeneratedBio(data.bio);
        toast.success('Bio générée avec succès!');
      } else {
        toast.error(data.error || 'Une erreur est survenue lors de la génération de la bio.');
      }
    },
    onError: (error) => {
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
    },
  });

  // Handle form submission
  const onSubmit = (values: FormSchema) => {
    setIsLoading(true);
    generateBioMutation.mutate({
      ...values,
      isPremium: false, // Set to true for premium users
    });
  };

  // Handle copy to clipboard
  const copyToClipboard = () => {
    if (generatedBio) {
      navigator.clipboard.writeText(generatedBio);
      toast.success('Bio copiée dans le presse-papier!');
    }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom ou pseudo</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom ou pseudo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plateforme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
                        <SelectTrigger>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Intérêts (séparés par des virgules)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: voyage, photo, cuisine, sport..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Génération...' : 'Générer ma bio 🚀'}
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
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Votre bio générée :</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4 whitespace-pre-wrap">
                  {generatedBio}
                </div>
                <Button onClick={copyToClipboard} variant="outline" className="w-full">
                  Copier la bio
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 