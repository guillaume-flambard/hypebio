import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Politique de confidentialité - HypeBio",
  description: "Politique de confidentialité détaillant comment HypeBio collecte, utilise et protège vos données personnelles",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Chez HypeBio, nous accordons une grande importance à la protection de votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informations que nous collectons</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous collectons plusieurs types d&apos;informations à des fins diverses pour vous fournir et améliorer notre Service.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Données personnelles</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Lorsque vous utilisez notre Service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier (&quot;Données personnelles&quot;). Les informations personnellement identifiables peuvent inclure, mais ne sont pas limitées à:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Adresse e-mail</li>
              <li>Prénom et nom de famille</li>
              <li>Informations de paiement</li>
              <li>Centres d&apos;intérêt (pour la génération de bios)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Données d&apos;utilisation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous pouvons également collecter des informations sur la façon dont le Service est accédé et utilisé (&quot;Données d&apos;utilisation&quot;). Ces Données d&apos;utilisation peuvent inclure des informations telles que le type de navigateur que vous utilisez, les pages de notre Service que vous avez visitées, l&apos;heure et la date de votre visite, le temps passé sur ces pages, ainsi que d&apos;autres statistiques.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Utilisation des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio utilise les données collectées à diverses fins:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Pour fournir et maintenir notre Service</li>
              <li>Pour vous informer des changements apportés à notre Service</li>
              <li>Pour vous permettre de participer aux fonctionnalités interactives de notre Service lorsque vous choisissez de le faire</li>
              <li>Pour fournir un support client</li>
              <li>Pour recueillir des analyses ou des informations précieuses afin d&apos;améliorer notre Service</li>
              <li>Pour surveiller l&apos;utilisation de notre Service</li>
              <li>Pour détecter, prévenir et résoudre les problèmes techniques</li>
              <li>Pour générer des biographies personnalisées basées sur vos centres d&apos;intérêt</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Conservation des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio conservera vos Données personnelles aussi longtemps que nécessaire pour les finalités énoncées dans la présente Politique de confidentialité. Nous conserverons et utiliserons vos Données personnelles dans la mesure nécessaire pour nous conformer à nos obligations légales, résoudre les litiges et appliquer nos accords et politiques.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio conservera également les Données d&apos;utilisation à des fins d&apos;analyse interne. Les Données d&apos;utilisation sont généralement conservées pour une période plus courte, sauf lorsque ces données sont utilisées pour renforcer la sécurité ou pour améliorer la fonctionnalité de notre Service, ou lorsque nous sommes légalement obligés de conserver ces données pour des périodes plus longues.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Transfert des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Vos informations, y compris les Données personnelles, peuvent être transférées et maintenues sur des ordinateurs situés en dehors de votre état, province, pays ou autre juridiction gouvernementale où les lois sur la protection des données peuvent différer de celles de votre juridiction.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Votre consentement à cette Politique de confidentialité suivi de votre soumission de telles informations représente votre accord à ce transfert.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio prendra toutes les mesures raisonnablement nécessaires pour s&apos;assurer que vos données sont traitées en toute sécurité et conformément à la présente Politique de confidentialité et aucun transfert de vos Données personnelles n&apos;aura lieu vers une organisation ou un pays à moins qu&apos;il n&apos;y ait des contrôles adéquats en place, y compris la sécurité de vos données et autres informations personnelles.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Divulgation des données</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Exigences légales</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio peut divulguer vos Données personnelles en croyant de bonne foi qu&apos;une telle action est nécessaire pour:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Se conformer à une obligation légale</li>
              <li>Protéger et défendre les droits ou la propriété de HypeBio</li>
              <li>Prévenir ou enquêter sur d&apos;éventuels actes répréhensibles en relation avec le Service</li>
              <li>Protéger la sécurité personnelle des utilisateurs du Service ou du public</li>
              <li>Se protéger contre la responsabilité légale</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Sécurité des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              La sécurité de vos données est importante pour nous, mais rappelez-vous qu&apos;aucune méthode de transmission sur Internet ou méthode de stockage électronique n&apos;est sécurisée à 100%. Bien que nous nous efforcions d&apos;utiliser des moyens commercialement acceptables pour protéger vos Données personnelles, nous ne pouvons garantir leur sécurité absolue.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Vos droits de protection des données</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              HypeBio vise à prendre des mesures raisonnables pour vous permettre de corriger, modifier, supprimer ou limiter l&apos;utilisation de vos Données personnelles.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si vous souhaitez être informé des Données personnelles que nous détenons à votre sujet et si vous voulez qu&apos;elles soient supprimées de nos systèmes, veuillez nous contacter.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Dans certaines circonstances, vous avez les droits de protection des données suivants:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Le droit d&apos;accéder, de mettre à jour ou de supprimer les informations que nous avons sur vous</li>
              <li>Le droit de rectification</li>
              <li>Le droit d&apos;opposition</li>
              <li>Le droit de restriction</li>
              <li>Le droit à la portabilité des données</li>
              <li>Le droit de retirer son consentement</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Modifications de cette politique de confidentialité</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Il vous est conseillé de consulter cette politique de confidentialité périodiquement pour tout changement. Les modifications apportées à cette politique de confidentialité sont effectives lorsqu&apos;elles sont publiées sur cette page.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
              <li>Par email: <a href="mailto:privacy@hypebio.app" className="text-purple-600 hover:text-purple-500">privacy@hypebio.app</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 