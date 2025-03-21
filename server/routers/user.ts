import { z } from 'zod';
import { protectedProcedure, router } from '@/lib/trpc';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  // Mettre à jour l'utilisateur vers le statut premium
  updatePremiumStatus: protectedProcedure
    .input(
      z.object({
        isPremium: z.boolean().default(true),
        // Ces champs pourraient être utilisés plus tard pour un système plus complet
        plan: z.enum(['premium', 'pro']).optional(),
        paymentId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!ctx.user?.id) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Vous devez être connecté pour accéder à cette fonctionnalité',
          });
        }

        // Simuler une validation de paiement (À remplacer par une vraie intégration de paiement)
        // Dans une vraie implémentation, ceci serait géré par Stripe ou un autre processeur de paiement
        const paymentSuccessful = true;
        
        if (!paymentSuccessful) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Le paiement a échoué. Veuillez réessayer',
          });
        }

        // Mettre à jour le statut premium de l'utilisateur dans la base de données
        await sql`
          UPDATE user 
          SET isPremium = ${input.isPremium ? 1 : 0} 
          WHERE id = ${ctx.user.id}
        `;

        return {
          success: true,
          message: 'Statut premium mis à jour avec succès',
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        console.error('Erreur lors de la mise à jour du statut premium:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Une erreur est survenue lors de la mise à jour de votre statut premium',
        });
      }
    }),

  // Obtenir les détails premium de l'utilisateur actuel
  getPremiumDetails: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        if (!ctx.user?.id) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Vous devez être connecté pour accéder à cette fonctionnalité',
          });
        }

        // Récupérer les détails de l'utilisateur
        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.id, ctx.user.id))
          .limit(1);

        const user = userResult[0];
        
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Utilisateur non trouvé',
          });
        }

        return {
          success: true,
          isPremium: !!user.isPremium,
          // Ces champs seraient utilisés dans une implémentation plus complète
          plan: user.isPremium ? 'premium' : 'free',
          expiryDate: null, // À implémenter avec une date d'expiration
          features: user.isPremium 
            ? [
                'Bios illimitées',
                'Bios jusqu\'à 250 caractères',
                'Tous les styles disponibles',
                'Modèle IA avancé (GPT-4)',
                'Branding Complet (Bio + Nom + Slogan + Couleurs)',
                'Idées de posts + Hashtags optimisés',
                'Bio + Résumé LinkedIn / Thread Twitter',
                'Score de Bio + Optimisation en Temps Réel',
              ]
            : [
                '5 bios par jour',
                'Bios jusqu\'à 150 caractères',
                'Styles de base',
                'Modèle IA standard',
                'Branding basique (Bio uniquement)',
                'Score de Bio simple',
              ],
        };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }
        
        console.error('Erreur lors de la récupération des détails premium:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Une erreur est survenue lors de la récupération de vos détails premium',
        });
      }
    }),
}); 