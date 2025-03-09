import OpenAI from 'openai';

// Create an instance of the OpenAI client with the API key from environment variables
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate a bio using OpenAI
export async function generateBio({
  name,
  platform,
  style,
  interests,
  isPremium = false,
}: {
  name: string;
  platform: 'tiktok' | 'instagram' | 'twitter' | 'linkedin' | 'onlyfans';
  style: 'fun' | 'professional' | 'gaming' | 'sexy' | 'mysterious' | 'creative';
  interests: string;
  isPremium?: boolean;
}) {
  const maxTokens = isPremium ? 300 : 150;
  const maxLength = isPremium ? 250 : 150;
  
  // Create a system prompt based on the user's inputs
  const systemPrompt = `Tu es un expert en marketing digital spécialisé dans la création de bios pour ${platform}.
Tu vas créer une bio captivante de style "${style}" pour quelqu'un nommé "${name}" qui s'intéresse à: ${interests}.
La bio doit être originale, engageante et optimisée pour attirer l'attention sur ${platform}.

${isPremium ? 'Fournis une bio détaillée avec des émojis et des hooks accrocheurs.' : 'Fournis une bio courte et efficace.'}

IMPORTANT: Ne dépasse pas ${maxLength} caractères. Sois concis et impactant.
Inclus des émojis pertinents.`;

  const userPrompt = `Crée une bio ${style} pour ${platform} pour ${name} qui s'intéresse à: ${interests}`;

  try {
    const response = await openai.chat.completions.create({
      model: isPremium ? 'gpt-4o' : 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.8,
    });

    return response.choices[0].message.content?.trim();
  } catch (error) {
    console.error('Error generating bio:', error);
    throw new Error('Erreur lors de la génération de la bio. Veuillez réessayer.');
  }
} 