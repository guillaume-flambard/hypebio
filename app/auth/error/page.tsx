'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = 'Une erreur est survenue lors de l\'authentification.';
  
  if (error === 'CredentialsSignin') {
    errorMessage = 'Identifiants invalides. Veuillez réessayer.';
  } else if (error === 'OAuthAccountNotLinked') {
    errorMessage = 'Cet email est déjà associé à un autre compte. Veuillez vous connecter avec la méthode utilisée précédemment.';
  } else if (error === 'OAuthSignin') {
    errorMessage = 'Erreur lors de la connexion avec le fournisseur d\'authentification.';
  } else if (error === 'AccessDenied') {
    errorMessage = 'Accès refusé. Vous n\'avez pas les permissions nécessaires.';
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-red-500">Erreur d&apos;authentification</CardTitle>
            <CardDescription>
              {errorMessage}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/auth/login">Retour à la connexion</Link>
            </Button>
            <Button asChild>
              <Link href="/">Retour à l&apos;accueil</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
} 