import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { users, userCredentials } from '@/lib/db/schema';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

// Schema for validation
const registerSchema = z.object({
  name: z.string().min(2, {
    message: 'Le nom doit contenir au moins 2 caractères.',
  }),
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide.',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Données invalides', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // Check if user already exists
    const existingUserResults = await db.select().from(users).where(
      eq(users.email, email)
    ).limit(1);
    
    if (existingUserResults.length > 0) {
      return NextResponse.json(
        { message: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 10);
    
    // Create user with a unique ID
    const userId = nanoid();
    
    try {
      // Insert the user first
      await db.transaction(async (tx) => {
        await tx.insert(users).values({
          id: userId,
          email,
          name: name || null,
        } as typeof users.$inferInsert);
        
        // Then insert the credentials
        await tx.insert(userCredentials).values({
          id: nanoid(),
          userId,
          password: hashedPassword,
        });
      });
      
      return NextResponse.json(
        { message: 'Utilisateur créé avec succès' },
        { status: 201 }
      );
    } catch (dbError) {
      console.error('Database error in registration:', dbError);
      return NextResponse.json(
        { message: 'Erreur lors de la création du compte' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in register route:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
} 