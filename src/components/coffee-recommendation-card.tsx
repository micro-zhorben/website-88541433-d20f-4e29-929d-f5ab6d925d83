import { Coffee, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

interface CoffeeRecommendationProps {
  coffeeName: string;
  description: string;
  strength: number;
  onFeedback?: (liked: boolean) => void;
}

export function CoffeeRecommendationCard({
  coffeeName,
  description,
  strength,
  onFeedback,
}: CoffeeRecommendationProps) {
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (liked: boolean) => {
    if (!feedbackGiven) {
      onFeedback?.(liked);
      setFeedbackGiven(true);
    }
  };

  return (
    <Card className="w-full max-w-md transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Coffee className="h-6 w-6 text-primary" />
          <CardTitle>{coffeeName}</CardTitle>
        </div>
        <CardDescription>Strength: {strength}/5</CardDescription>
      </CardHeader>
      <CardContent>
        <Typography.P>{description}</Typography.P>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            className="text-foreground"
            onClick={() => handleFeedback(false)}
            disabled={feedbackGiven}
          >
            <ThumbsDown />
            Not for me
          </Button>
          <Button
            variant="default"
            onClick={() => handleFeedback(true)}
            disabled={feedbackGiven}
          >
            <ThumbsUp />
            Love it
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}