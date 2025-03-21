import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '@/lib/trpc';
import { generateBio } from '@/lib/openai';
import { db } from '@/lib/db';
import { generatedBios } from '@/lib/db/schema';
import { nanoid } from 'nanoid';
import { eq, desc, sql } from 'drizzle-orm';

export const bioRouter = router({
  generate: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: 'Le nom est requis' }),
        platform: z.enum(['tiktok', 'instagram', 'twitter', 'linkedin', 'onlyfans']),
        style: z.enum(['fun', 'professional', 'gaming', 'sexy', 'mysterious', 'creative']),
        interests: z.string().min(1, { message: 'Veuillez indiquer au moins un intérêt' }),
        isPremium: z.boolean().default(false),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        if (!input.name || !input.platform || !input.style || !input.interests) {
          throw new Error('Données manquantes pour générer la bio');
        }
        
        const bioContent = await generateBio({
          name: input.name,
          platform: input.platform,
          style: input.style,
          interests: input.interests,
          isPremium: input.isPremium
        });

        if (ctx.session?.user?.id) {
          await sql`
            INSERT INTO generatedBio (id, userId, platform, style, content, createdAt)
            VALUES (
              ${nanoid()},
              ${ctx.session.user.id},
              ${input.platform},
              ${input.style},
              ${bioContent || ''},
              ${Date.now()}
            )
          `;
        }

        return { success: true, bio: bioContent };
      } catch (error) {
        console.error('Error in generate bio mutation:', error);
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Une erreur est survenue',
        };
      }
    }),

  getMyBios: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const bios = await db.select().from(generatedBios)
          .where(eq(generatedBios.userId, ctx.user.id))
          .orderBy(desc(generatedBios.createdAt));
        
        return { success: true, bios };
      } catch (error) {
        console.error('Error fetching user bios:', error);
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Une erreur est survenue',
        };
      }
    }),
}); 