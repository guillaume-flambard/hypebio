import { z } from "zod";
import { publicProcedure, privateProcedure, router } from "../../trpc";
import { db } from "@/lib/db";
import { generatedBios } from "@/lib/db/schema";
import { eq, desc, and, like, count, SQL } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from 'uuid';

// Types spécifiques pour le routeur
type PlatformStat = {
  platform: string;
  count: number;
};

export const bioRouter = router({
  // Générer une bio
  generate: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      platform: z.string().min(1),
      style: z.string().min(1),
      interests: z.string().min(1),
      isPremium: z.boolean().default(false),
      options: z.object({
        generateBranding: z.boolean().default(false),
        generatePostIdeas: z.boolean().default(false),
        generateResume: z.boolean().default(false),
        optimizeInRealTime: z.boolean().default(false),
        generateLinkInBio: z.boolean().default(false),
      }).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        // Exemple de génération
        let bioContent = `Je suis ${input.name}. `;
        
        if (input.platform === 'instagram') {
          bioContent += "📸 Créateur de contenu visuel. ";
        } else if (input.platform === 'tiktok') {
          bioContent += "🎵 Créateur de tendances. ";
        } else if (input.platform === 'linkedin') {
          bioContent += "💼 Professionnel passionné. ";
        } else if (input.platform === 'twitter') {
          bioContent += "💬 Partageur d'idées. ";
        }
        
        if (input.style === 'fun') {
          bioContent += "Toujours prêt à faire sourire! 😄";
        } else if (input.style === 'professional') {
          bioContent += "Expert dans mon domaine, à votre service.";
        } else if (input.style === 'creative') {
          bioContent += "Créatif et innovant dans tout ce que je fais! ✨";
        } else if (input.style === 'minimal') {
          bioContent += "Simplicité. Efficacité.";
        }
        
        // Ajoutez les intérêts
        if (input.interests) {
          const interestsList = input.interests.split(',').map((i: string) => i.trim());
          if (interestsList.length > 0) {
            bioContent += " Passionné de " + interestsList.slice(0, 3).join(', ') + ".";
          }
        }

        // Si l'utilisateur est connecté, sauvegarder la bio générée
        if (ctx.session?.user?.id) {
          // Générer un ID unique pour la bio
          const bioId = uuidv4();
          const now = new Date();
          
          // S'assurer que tous les champs requis sont présents
          await db.insert(generatedBios).values({
            id: bioId,
            platform: input.platform,
            style: input.style,
            content: bioContent,
            userId: ctx.session.user.id,
            createdAt: now,
          });
        }

        // Pour les utilisateurs premium, générer les fonctionnalités supplémentaires
        if (input.isPremium && input.options) {
          const response: {
            success: boolean;
            bio: string;
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
          } = {
            success: true,
            bio: bioContent,
          };

          if (input.options.optimizeInRealTime) {
            response.score = Math.floor(Math.random() * 30) + 70; // Score entre 70 et 100
            response.scoreDetails = {
              readability: Math.floor(Math.random() * 30) + 70,
              engagement: Math.floor(Math.random() * 30) + 70,
              uniqueness: Math.floor(Math.random() * 30) + 70,
              platformRelevance: Math.floor(Math.random() * 30) + 70,
            };
          }

          if (input.options.generateBranding) {
            response.branding = {
              username: `${input.name.toLowerCase().replace(/\s+/g, '')}${Math.floor(Math.random() * 1000)}`,
              slogan: `${input.style === 'fun' ? 'Amusez-vous avec moi!' : input.style === 'professional' ? 'Excellence et expertise.' : input.style === 'creative' ? 'Créativité sans limites.' : 'Simplement efficace.'}`,
              colors: [
                '#' + Math.floor(Math.random()*16777215).toString(16),
                '#' + Math.floor(Math.random()*16777215).toString(16),
                '#' + Math.floor(Math.random()*16777215).toString(16),
              ],
            };
          }

          if (input.options.generatePostIdeas) {
            response.postIdeas = [
              `Comment j'ai découvert ma passion pour ${input.interests.split(',')[0]}`,
              `3 astuces pour progresser en ${input.interests.split(',')[0]}`,
              `Ma routine quotidienne de ${input.style === 'professional' ? 'productivité' : input.style === 'creative' ? 'créativité' : 'motivation'}`,
            ];
            
            response.hashtags = [
              `#${input.platform}Creator`,
              `#${input.interests.split(',')[0].replace(/\s+/g, '')}`,
              `#${input.style}Content`,
              `#${input.name.replace(/\s+/g, '')}`,
              `#Create${input.platform.charAt(0).toUpperCase() + input.platform.slice(1)}`,
            ];
          }

          if (input.options.generateResume) {
            response.resume = `${input.name} | ${input.style === 'professional' ? 'Expert' : input.style === 'creative' ? 'Créateur' : 'Influenceur'} ${input.platform.charAt(0).toUpperCase() + input.platform.slice(1)}\n\nSpécialisé en ${input.interests.split(',').join(', ')}. ${input.style === 'fun' ? 'Apporte joie et divertissement' : input.style === 'professional' ? 'Offre expertise et conseils professionnels' : input.style === 'creative' ? 'Crée du contenu innovant et inspirant' : 'Propose du contenu direct et efficace'} à une communauté engagée.`;
          }

          return response;
        }

        return {
          success: true,
          bio: bioContent,
        };
      } catch (error) {
        console.error("Erreur lors de la génération:", error);
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
}); 