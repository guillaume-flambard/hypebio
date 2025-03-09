import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Conditions d'utilisation - HypeBio",
  description: "Conditions générales d'utilisation du service HypeBio",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions d&apos;utilisation</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptation des Conditions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              En accédant et en utilisant le service HypeBio, vous acceptez d&apos;être lié par ces conditions d&apos;utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables. Si vous n&apos;êtes pas d&apos;accord avec l&apos;une de ces conditions, il vous est interdit d&apos;utiliser ou d&apos;accéder à ce site. Les documents contenus dans ce site web sont protégés par les lois applicables en matière de droits d&apos;auteur et de marques commerciales.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description du Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio est un service de génération automatique de biographies pour les profils de réseaux sociaux utilisant l&apos;intelligence artificielle. Nous proposons des formules gratuites et premium avec différents niveaux de fonctionnalités.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Comptes Utilisateurs</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Pour accéder à certaines fonctionnalités du Service, vous devrez peut-être créer un compte. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe, y compris, mais sans s&apos;y limiter, de la restriction de l&apos;accès à votre ordinateur et/ou compte. Vous acceptez d&apos;assumer la responsabilité de toutes les activités qui se produisent sous votre compte et/ou mot de passe.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contenu Généré</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le contenu généré par HypeBio est créé par des algorithmes d&apos;intelligence artificielle et est fourni &quot;tel quel&quot;. Nous ne garantissons pas que le contenu généré sera approprié à toutes les utilisations ou qu&apos;il sera exempts d&apos;erreurs. Vous êtes entièrement responsable de l&apos;utilisation que vous faites du contenu généré.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio n&apos;est pas responsable de l&apos;utilisation du contenu généré d&apos;une manière qui violerait les lois ou réglementations en vigueur. Vous acceptez d&apos;utiliser le contenu généré conformément à toutes les lois et réglementations applicables.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Abonnements et Paiements</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio propose des services gratuits et payants. En souscrivant à un abonnement payant, vous acceptez de payer tous les frais spécifiés au moment de l&apos;achat. Les paiements sont traités par nos prestataires de services de paiement tiers. Les tarifs et frais sont susceptibles d&apos;être modifiés à tout moment.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Les abonnements se renouvellent automatiquement sauf si vous les annulez avant la date de renouvellement. Vous pouvez annuler votre abonnement à tout moment en accédant à votre compte et en suivant les instructions d&apos;annulation.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Propriété Intellectuelle</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le Service HypeBio et tout son contenu original, fonctionnalités et fonctionnalités sont et resteront la propriété exclusive de HypeBio et de ses concédants. Le Service est protégé par le droit d&apos;auteur, les marques commerciales, et d&apos;autres lois de la France et d&apos;autres pays.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Le contenu généré par notre service peut être utilisé par vous, mais nous nous réservons le droit d&apos;utiliser des exemples anonymisés à des fins de démonstration et d&apos;amélioration de nos algorithmes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Résiliation</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous nous réservons le droit de résilier ou de suspendre votre compte et votre accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez les Conditions d&apos;utilisation.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation de Responsabilité</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              En aucun cas, HypeBio ou ses fournisseurs ne seront responsables de tout dommage (y compris, sans limitation, les dommages pour perte de données ou de profit, ou en raison d&apos;une interruption d&apos;activité) découlant de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser les matériaux sur le Service HypeBio, même si HypeBio ou un représentant autorisé de HypeBio a été notifié oralement ou par écrit de la possibilité de tels dommages.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications des Conditions</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis de 30 jours avant que les nouvelles conditions ne prennent effet. Ce qui constitue un changement important sera déterminé à notre seule discrétion.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si vous avez des questions concernant ces Conditions, veuillez nous contacter à <a href="mailto:contact@hypebio.app" className="text-purple-600 hover:text-purple-500">contact@hypebio.app</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 