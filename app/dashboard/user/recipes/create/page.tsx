'use client';
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, X, LoaderCircleIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import axios from "axios";

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  quantity: z.string().min(1, "Quantity is required"),
});

const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title is required"),
  description: z.string().min(1, "Recipe description is required"),
  ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required"),
  instructions: z.string().min(1, "Instructions are required"),
  images: z.array(z.any()).min(1, "At least one image is required"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const CreateRecipeForm: React.FC = () => {
  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onSubmit = async (data: RecipeFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      data?.ingredients?.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}][name]`, ingredient?.name);
        formData.append(`ingredients[${index}][quantity]`, ingredient?.quantity);
      });
      formData.append("instructions", data?.instructions);
      selectedImages?.forEach((image) => {
        formData.append("images", image);
      });

      const response = await api.post(`/api/users/${session?.user?.id}/recipes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Recipe created successfully!");
        reset();
        setSelectedImages([]);
      }
    } catch (error: any) {
      if (axios?.isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setSelectedImages(Array.from(e?.target?.files));
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Recipe</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input {...register("title")} placeholder="Enter recipe title" />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors?.title?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Describe the recipe"
              />
              {errors?.description && (
                <p className="text-red-500 text-sm">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Ingredients</Label>
                <Button
                  type="button"
                  onClick={() => append({ name: "", quantity: "" })}
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>

              {fields?.map((field, index) => (
                <div key={field?.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Ingredient {index + 1}</h4>
                    {fields?.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        {...register(`ingredients.${index}.name` as const)}
                        placeholder="Enter ingredient name"
                      />
                      {errors?.ingredients?.[index]?.name && (
                        <p className="text-red-500 text-sm">
                          {errors?.ingredients?.[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        {...register(`ingredients.${index}.quantity` as const)}
                        placeholder="Enter quantity"
                      />
                      {errors?.ingredients?.[index]?.quantity && (
                        <p className="text-red-500 text-sm">
                          {errors?.ingredients?.[index]?.quantity?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                {...register("instructions")}
                placeholder="Enter cooking instructions"
              />
              {errors?.instructions && (
                <p className="text-red-500 text-sm">
                  {errors?.instructions?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
              {errors?.images && (
                <p className="text-red-500 text-sm">{errors?.images?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Recipe...
                </>
              ) : (
                "Create Recipe"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateRecipeForm;