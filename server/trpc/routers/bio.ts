import { z } from "zod";
import { publicProcedure, privateProcedure, router } from "../../trpc";
import { db } from "@/lib/db";
import { generatedBios } from "@/lib/db/schema";
import { eq, desc, and, like, count, SQL } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from 'uuid';
import { generateBio, type BioResponse, type GenerateOptions } from '@/lib/gemini';
import { nanoid } from 'nanoid';

// Types spécifiques pour le routeur
type PlatformStat = {
  platform: string;
  count: number;
};

// Schéma de validation pour la génération de bio
const generateInputSchema = z.object({
  name: z.string().min(1, { message: 'Le nom est requis' }),
  platform: z.enum(['tiktok', 'instagram', 'twitter', 'linkedin', 'onlyfans']),
  style: z.enum(['fun', 'professional', 'gaming', 'sexy', 'mysterious', 'creative']),
  interests: z.string().min(1, { message: 'Les intérêts sont requis' }),
  isPremium: z.boolean().default(false),
  options: z.object({
    generateBranding: z.boolean().default(false),
    generatePostIdeas: z.boolean().default(false),
    generateResume: z.boolean().default(false),
    optimizeInRealTime: z.boolean().default(false),
    generateLinkInBio: z.boolean().default(false),
  }).default({
    generateBranding: false,
    generatePostIdeas: false,
    generateResume: false,
    optimizeInRealTime: false,
    generateLinkInBio: false,
  }),
});

export type GenerateInput = z.infer<typeof generateInputSchema>;

export const bioRouter = router({
  // Route publique pour générer une bio sans inscription
  generate: publicProcedure
    .input(generateInputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Génération de bio avec entrées:", {
          name: input.name,
          platform: input.platform,
          style: input.style,
          interestsLength: input.interests.length
        });

        // Convertir l'input pour s'assurer que tous les champs requis sont présents
        const geminiInput: GenerateOptions = {
          name: input.name,
          platform: input.platform,
          style: input.style,
          interests: input.interests,
          isPremium: input.isPremium,
          options: input.options
        };

        // Utiliser l'API Gemini pour générer une bio
        const result = await generateBio(geminiInput);
        
        return result;
      } catch (error) {
        console.error("Erreur lors de la génération de bio:", error);
        return {
          success: false,
          error: "Une erreur est survenue lors de la génération de la bio."
        };
      }
    }),

  // Récupérer les bios avec pagination et recherche
  getMyBios: privateProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      pageSize: z.number().min(1).max(50).default(10),
      searchTerm: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        const offset = (input.page - 1) * input.pageSize;
        
        // Prépare la condition de recherche si un searchTerm est fourni
        let conditions: SQL = eq(generatedBios.userId, userId);
        if (input.searchTerm && input.searchTerm.trim() !== '') {
          const searchCondition = like(generatedBios.content, `%${input.searchTerm}%`);
          conditions = and(conditions, searchCondition) as SQL;
        }
        
        // Récupère les bios avec pagination
        const bios = await db
          .select()
          .from(generatedBios)
          .where(conditions)
          .orderBy(desc(generatedBios.createdAt))
          .limit(input.pageSize)
          .offset(offset);
        
        // Récupère le nombre total pour le calcul de pagination
        const totalCountResult = await db
          .select({ count: count() })
          .from(generatedBios)
          .where(conditions);
          
        const totalCount = totalCountResult[0].count;
        const totalPages = Math.ceil(totalCount / input.pageSize);
        
        return {
          success: true,
          bios,
          totalCount,
          totalPages,
          currentPage: input.page,
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des bios:", error);
        return {
          success: false,
          error: "Une erreur est survenue lors de la récupération de vos bios."
        };
      }
    }),
    
  // Supprimer une bio
  deleteBio: privateProcedure
    .input(z.object({
      bioId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        
        // Vérifier que la bio appartient bien à l'utilisateur
        const bio = await db
          .select()
          .from(generatedBios)
          .where(and(
            eq(generatedBios.id, input.bioId),
            eq(generatedBios.userId, userId)
          ))
          .limit(1);
          
        if (bio.length === 0) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: "Vous n'êtes pas autorisé à supprimer cette bio."
          });
        }
        
        // Supprimer la bio
        await db
          .delete(generatedBios)
          .where(eq(generatedBios.id, input.bioId));
          
        return {
          success: true,
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        console.error("Erreur lors de la suppression:", error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Une erreur est survenue lors de la suppression de la bio."
        });
      }
    }),
    
  // Récupérer les statistiques de l'utilisateur
  getUserStats: privateProcedure
    .query(async ({ ctx }) => {
      try {
        const userId = ctx.session.user.id;
        
        // Récupère le nombre total de bios
        const totalBiosResult = await db
          .select({ count: count() })
          .from(generatedBios)
          .where(eq(generatedBios.userId, userId));
          
        const totalBios = totalBiosResult[0].count;
        
        // Si l'utilisateur n'a pas de bios, retourner des statistiques vides
        if (totalBios === 0) {
          return {
            success: true,
            totalBios: 0,
            favoritePlatform: null,
            platformCounts: {},
          };
        }
        
        // Récupère les statistiques par plateforme directement via SQL
        const platformStats = await db
          .select({
            platform: generatedBios.platform,
            count: count(),
          })
          .from(generatedBios)
          .where(eq(generatedBios.userId, userId))
          .groupBy(generatedBios.platform);
        
        // Transforme les résultats en objet pour faciliter l'accès côté client
        const platformCounts: Record<string, number> = {};
        let maxCount = 0;
        let favoritePlatform = "";
        
        platformStats.forEach((stat: PlatformStat) => {
          platformCounts[stat.platform] = stat.count;
          
          if (stat.count > maxCount) {
            maxCount = stat.count;
            favoritePlatform = stat.platform;
          }
        });
        
        // Formater la plateforme favorite avec une majuscule
        const formattedFavoritePlatform = favoritePlatform 
          ? favoritePlatform.charAt(0).toUpperCase() + favoritePlatform.slice(1) 
          : null;
        
        return {
          success: true,
          totalBios,
          favoritePlatform: formattedFavoritePlatform,
          platformCounts,
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques:", error);
        return {
          success: false,
          error: "Une erreur est survenue lors de la récupération de vos statistiques."
        };
      }
    }),

  // Route privée pour récupérer l'historique des bios d'un utilisateur
  getUserBios: privateProcedure
    .query(async ({ ctx }) => {
      try {
        const userId = ctx.session.user.id;
        
        // Récupérer les bios sauvegardées de l'utilisateur depuis la base de données
        const userBios = await db
          .select()
          .from(generatedBios)
          .where(eq(generatedBios.userId, userId));
        
        return {
          success: true,
          bios: userBios
        };
      } catch (error) {
        console.error("Erreur lors de la récupération des bios:", error);
        return {
          success: false,
          error: "Une erreur est survenue lors de la récupération de vos bios."
        };
      }
    }),
  
  // Route privée pour sauvegarder une bio générée
  saveBio: privateProcedure
    .input(z.object({
      bio: z.string(),
      score: z.number().optional(),
      platform: z.string(),
      style: z.string(),
      interests: z.string(),
      // Autres champs optionnels pour les fonctionnalités premium
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = ctx.session.user.id;
        
        // Générer un ID unique pour la bio
        const bioId = nanoid();
        
        // Enregistrer la bio dans la base de données
        await db.insert(generatedBios).values({
          id: bioId,
          userId: userId,
          content: input.bio,
          score: input.score || 0,
          platform: input.platform,
          style: input.style,
          interests: input.interests,
          createdAt: new Date(),
        });
        
        return {
          success: true,
          bioId
        };
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de la bio:", error);
        return {
          success: false,
          error: "Une erreur est survenue lors de la sauvegarde de votre bio."
        };
      }
    }),
}); 