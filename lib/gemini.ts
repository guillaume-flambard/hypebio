import { GoogleGenerativeAI } from "@google/generative-ai";

// Configurez l'API Gemini avec votre clé API
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

// Initialisation du client Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// Modèles disponibles
const models = {
  geminiPro: genAI.getGenerativeModel({ model: "gemini-1.5-pro" }),
};

// Types pour les options de génération
export type GenerateOptions = {
  name: string;
  platform: string;
  style: string;
  interests: string;
  isPremium: boolean;
  options: {
    generateBranding?: boolean;
    generatePostIdeas?: boolean;
    generateResume?: boolean;
    optimizeInRealTime?: boolean;
    generateLinkInBio?: boolean;
  };
};

// Types pour la réponse
export type BioResponse = {
  success: boolean;
  bio?: string;
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
  error?: string;
};

/**
 * Génère une bio à partir des paramètres fournis en utilisant l'API Gemini
 */
export async function generateBio(options: GenerateOptions): Promise<BioResponse> {
  try {
    // Construction du prompt pour Gemini
    const prompt = buildPrompt(options);
    
    // Génération avec Gemini
    const result = await models.geminiPro.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parsing du résultat
    return parseGeminiResponse(text, options);
  } catch (error) {
    console.error("Erreur lors de la génération avec Gemini:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la génération. Veuillez réessayer."
    };
  }
}

/**
 * Construit le prompt pour Gemini en fonction des options fournies
 */
function buildPrompt(options: GenerateOptions): string {
  const { name, platform, style, interests, isPremium, options: premiumOptions } = options;
  
  let prompt = `
  Génère une bio pour les réseaux sociaux avec les critères suivants:
  - Nom/Pseudo: ${name}
  - Plateforme: ${platform}
  - Style: ${style}
  - Intérêts: ${interests}

  Le résultat doit être au format JSON avec la structure suivante:
  {
    "bio": "Le texte de la bio généré",
    "score": 85, // Un score entre 0 et 100
    "scoreDetails": {
      "readability": 80, // Entre 0 et 100
      "engagement": 85, // Entre 0 et 100
      "uniqueness": 75, // Entre 0 et 100
      "platformRelevance": 90 // Entre 0 et 100
    }
  }
  `;

  // Si l'utilisateur est premium et a sélectionné des options spécifiques
  if (isPremium) {
    prompt += `\nEn tant qu'utilisateur premium, ajoute également :\n`;
    
    if (premiumOptions.generateBranding) {
      prompt += `
      "branding": {
        "username": "Suggestion de nom d'utilisateur basé sur ${name} et ${interests}",
        "slogan": "Un slogan accrocheur lié à ${interests} et ${style}",
        "colors": ["#couleur1", "#couleur2", "#couleur3"] // 3 couleurs hexadécimales qui correspondent au style et aux intérêts
      },
      `;
    }
    
    if (premiumOptions.generatePostIdeas) {
      prompt += `
      "postIdeas": [
        "Idée de post 1",
        "Idée de post 2",
        "Idée de post 3",
        "Idée de post 4"
      ],
      "hashtags": [
        "#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"
      ],
      `;
    }
    
    if (premiumOptions.generateResume) {
      prompt += `
      "resume": "Un résumé professionnel pour ${name} basé sur ${interests} et adapté pour ${platform}",
      `;
    }
  }

  prompt += `\nRéponds uniquement avec le JSON demandé, sans autre explication ou commentaire.`;
  
  return prompt;
}

/**
 * Parse la réponse texte de Gemini en objet structuré
 */
function parseGeminiResponse(responseText: string, options: GenerateOptions): BioResponse {
  try {
    // Nettoyage de la réponse pour extraire seulement le JSON
    const jsonStr = responseText.trim().replace(/```json|```/g, '').trim();
    const data = JSON.parse(jsonStr);
    
    // Si nous ne sommes pas en premium mais qu'on a quand même reçu des données premium,
    // on les supprime pour être cohérent avec le modèle d'affaires
    if (!options.isPremium) {
      delete data.branding;
      delete data.postIdeas;
      delete data.hashtags;
      delete data.resume;
    }

    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error("Erreur lors du parsing de la réponse Gemini:", error);
    console.log("Réponse brute:", responseText);
    
    // Si on ne peut pas parser la réponse mais qu'elle contient du texte,
    // on essaie d'extraire au moins la bio
    if (responseText && responseText.length > 10) {
      return {
        success: true,
        bio: responseText.substring(0, 500),
        score: 70,
        scoreDetails: {
          readability: 70,
          engagement: 70,
          uniqueness: 70,
          platformRelevance: 70
        }
      };
    }
    
    return {
      success: false,
      error: "Impossible de générer une bio. Veuillez réessayer avec des critères différents."
    };
  }
} 