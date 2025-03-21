// Type pour les réponses de l'API Bio
interface BioResponse {
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
}

// Type pour les bios retournées
interface Bio {
  id: string;
  userId: string | null;
  platform: string;
  style: string;
  content: string;
  createdAt: string;
}

// Type pour getUserStats
interface UserStatsResponse {
  success: boolean;
  totalBios: number;
  favoritePlatform: string | null;
  platformCounts: Record<string, number>;
  error?: string;
}

// Type pour getMyBios
interface MyBiosResponse {
  success: boolean;
  bios: Bio[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  error?: string;
}

// Type pour les paramètres de génération
interface GenerateInput {
  name: string;
  platform: string;
  style: string;
  interests: string;
  isPremium?: boolean;
  options?: {
    generateBranding?: boolean;
    generatePostIdeas?: boolean;
    generateResume?: boolean;
    optimizeInRealTime?: boolean;
    generateLinkInBio?: boolean;
  };
}

// Surcharge du module TRPC Provider
declare module '@/providers/TRPCProvider' {
  export const trpc: {
    bio: {
      generate: {
        useMutation: (options: {
          onSuccess?: (data: BioResponse) => void;
          onError?: (error: Error) => void;
        }) => {
          mutate: (variables: GenerateInput) => void;
          isLoading: boolean;
        };
      };
      getMyBios: {
        useQuery: (
          variables: {
            page: number;
            pageSize: number;
            searchTerm?: string;
          },
          options?: {
            enabled?: boolean;
          }
        ) => {
          data?: MyBiosResponse;
          isLoading: boolean;
          refetch: () => void;
        };
      };
      getUserStats: {
        useQuery: (
          variables: undefined,
          options?: {
            enabled?: boolean;
          }
        ) => {
          data?: UserStatsResponse;
          isLoading: boolean;
        };
      };
      deleteBio: {
        useMutation: (options: {
          onSuccess?: () => void;
          onError?: (error: Error) => void;
        }) => {
          mutate: (variables: { bioId: string }) => void;
          isLoading: boolean;
        };
      };
    };
  };
} 