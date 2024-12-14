"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${recipeId}`);
        setRecipe(response?.data?.data);
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

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircleIcon className="animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Recipe not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{recipe?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Image src={recipe?.image} alt={recipe?.title} className="w-full h-auto" width={500} height={300} />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Ingredients</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipe?.ingredients?.map((ingredient: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{ingredient?.name}</TableCell>
                    <TableCell>{ingredient?.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside">
              {recipe?.instructions?.map((instruction: any, index: number) => (
                <li key={index} className="mb-2">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetailPage;