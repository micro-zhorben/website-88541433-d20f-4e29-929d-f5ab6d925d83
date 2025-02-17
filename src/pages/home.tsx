import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { Typography } from "@/components/ui/typography";
import { PreferenceForm } from "@/components/preference-form";
import { CoffeeRecommendationCard } from "@/components/coffee-recommendation-card";
import { LoadingSpinner } from "@/components/loading-spinner";

interface CoffeeRecommendation {
  id: number;
  name: string;
  description: string;
  strength: number;
}

const mockRecommendations: CoffeeRecommendation[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "A light roast with delicate floral notes and bright citrus acidity. Perfect for those who enjoy a complex, tea-like coffee.",
    strength: 3,
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Medium roast with a balanced profile featuring caramel sweetness and a nutty finish. A crowd-pleasing classic.",
    strength: 4,
  },
];

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CoffeeRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handlePreferenceSubmit = async (values: unknown) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRecommendations(mockRecommendations);
    setShowRecommendations(true);
    setIsLoading(false);
  };

  const handleFeedback = (liked: boolean, coffeeId: number) => {
    console.log(`Coffee ${coffeeId} feedback: ${liked ? 'liked' : 'disliked'}`);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <header className="container mx-auto mb-8 flex items-center justify-between">
        <Typography.H1>AI Coffee Recommender</Typography.H1>
        <ModeToggle />
      </header>

      <main className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <Typography.Lead className="mb-8">
            Find your perfect coffee match with our AI-powered recommendation system.
            Tell us your preferences, and we'll suggest the ideal brew for you.
          </Typography.Lead>

          {!showRecommendations && (
            <div className="mx-auto max-w-md">
              <PreferenceForm onSubmit={handlePreferenceSubmit} />
            </div>
          )}

          {isLoading && (
            <div className="mt-12">
              <LoadingSpinner size="lg" />
              <Typography.P className="mt-4">Brewing your recommendations...</Typography.P>
            </div>
          )}

          {showRecommendations && !isLoading && (
            <div className="mt-12 space-y-6">
              <Typography.H2>Your Personalized Recommendations</Typography.H2>
              <div className="grid gap-6 md:grid-cols-2">
                {recommendations.map((coffee) => (
                  <CoffeeRecommendationCard
                    key={coffee.id}
                    coffeeName={coffee.name}
                    description={coffee.description}
                    strength={coffee.strength}
                    onFeedback={(liked) => handleFeedback(liked, coffee.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}