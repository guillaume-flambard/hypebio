import { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./lib/db";
import { eq } from "drizzle-orm";
import { users } from "./lib/db/schema";

// Étendre les types de NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isPremium?: boolean;
    };
  }
  
  interface User {
    isPremium?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Cette partie nécessite une implémentation supplémentaire pour vérifier les identifiants
        // Utilisation d'un exemple simplifié pour l'instant
        // Dans un environnement de production, les mots de passe devraient être hachés
        const userResult = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        const user = userResult[0];

        if (!user) {
          return null;
        }

        // La partie ci-dessous nécessiterait une table d'authentification supplémentaire avec des mots de passe hachés
        // Ci-dessous une implémentation fictive
        // const isPasswordValid = await compare(credentials.password, user.hashedPassword);
        // if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          isPremium: !!user.isPremium,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        
        // Vérifier si l'utilisateur est premium
        const userResult = await db.select().from(users).where(eq(users.id, token.sub)).limit(1);
        const user = userResult[0];
        
        if (user) {
          session.user.isPremium = !!user.isPremium;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
}; 