"use client";

import { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

const RecipeFeedPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${session?.user?.id}/recipes`);
        setRecipes(res?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchRecipes();
    }
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes?.map((recipe: any, i: number) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{recipe?.title}</CardTitle>
                  <CardDescription>{recipe?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={recipe?.image}
                    alt={recipe?.title}
                    className="w-full h-auto aspect-square object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipeFeedPage;