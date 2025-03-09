import { z } from 'zod';
import { publicProcedure, protectedProcedure, router } from '@/lib/trpc';
import { generateBio } from '@/lib/openai';
import { db } from '@/lib/db';
import { generatedBios } from '@/lib/db/schema';
import { nanoid } from 'nanoid';
import { eq, desc } from 'drizzle-orm';

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
        const bioContent = await generateBio(input);

        if (ctx.session?.user) {
          await db.insert(generatedBios).values({
            id: nanoid(),
            userId: ctx.session.user.id,
            platform: input.platform,
            style: input.style,
            content: bioContent || '',
          });
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