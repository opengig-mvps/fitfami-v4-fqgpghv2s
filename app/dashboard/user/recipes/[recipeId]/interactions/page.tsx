"use client";

import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Heart, LoaderCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const RecipeInteractionsPage = () => {
  const { data: session } = useSession();
  const { recipeId } = useParams<{ recipeId: string }>();
  
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const [likesRes, commentsRes] = await Promise.all([
          axios.get(`/api/recipes/${recipeId}/likes`),
          axios.get(`/api/recipes/${recipeId}/comments`),
        ]);
        setLikes(likesRes?.data?.data?.likes);
        setHasLiked(likesRes?.data?.data?.hasLiked);
        setComments(commentsRes?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInteractions();
  }, [recipeId]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/recipes/${recipeId}/like`, {
        userId: session?.user?.id,
      });
      if (response?.data?.success) {
        setLikes(response?.data?.data?.likes);
        setHasLiked(true);
        toast.success("Liked!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleCommentSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/recipes/${recipeId}/comments`, {
        userId: session?.user?.id,
        comment: newComment,
      });
      if (response?.data?.success) {
        setComments((prev) => [...prev, response?.data?.data]);
        setNewComment("");
        toast.success("Comment added!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <main className="flex-1">
        <section className="container px-4 md:px-6 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" size="icon" onClick={handleLike} disabled={hasLiked}>
                <Heart className={`h-5 w-5 ${hasLiked ? "text-red-500" : ""}`} />
                <span className="sr-only">Like</span>
              </Button>
              <span>{likes} {likes === 1 ? "like" : "likes"}</span>
            </CardContent>
            <CardFooter>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="comment">Add a Comment</Label>
                  <Textarea
                    id="comment"
                    value={newComment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e?.target?.value)}
                    placeholder="Write your comment here..."
                  />
                  <Button className="w-full" onClick={handleCommentSubmit} disabled={loading || !newComment.trim()}>
                    {loading ? <LoaderCircleIcon className="animate-spin" /> : "Submit Comment"}
                  </Button>
                </div>
                <div className="space-y-4">
                  {comments?.map((comment: any) => (
                    <Card key={comment?.id}>
                      <CardHeader>
                        <CardTitle>{comment?.user?.username}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{comment?.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default RecipeInteractionsPage;