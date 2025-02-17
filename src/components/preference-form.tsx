import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const preferenceSchema = z.object({
  roastLevel: z.string(),
  caffeinePreference: z.string(),
  intensity: z.number().min(1).max(5),
});

type PreferenceFormValues = z.infer<typeof preferenceSchema>;

interface PreferenceFormProps {
  onSubmit: (values: PreferenceFormValues) => void;
}

export function PreferenceForm({ onSubmit }: PreferenceFormProps) {
  const form = useForm<PreferenceFormValues>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      roastLevel: "",
      caffeinePreference: "",
      intensity: 3,
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Coffee Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="roastLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roast Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select roast level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caffeinePreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caffeine Preference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select caffeine preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="decaf">Decaf</SelectItem>
                      <SelectItem value="half-caf">Half Caf</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="intensity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flavor Intensity</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <FormDescription>
                    1 = Mild, 5 = Intense
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Get Recommendations
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}