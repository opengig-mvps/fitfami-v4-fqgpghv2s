'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Star, Info, Image, Camera, VideoIcon, ArrowRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-500 to-purple-700 text-white">
      <main className="flex-1 space-y-12">
        <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Welcome to FoodieGram
            </h1>
            <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl lg:text-2xl">
              Discover, share, and explore delicious recipes with a community of food enthusiasts!
            </p>
            <div className="mt-8 space-x-4">
              <Button className="bg-white text-purple-700 hover:bg-gray-200">Get Started</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-purple-600">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-center">
              Trending Recipes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <CardTitle>Delicious Pasta</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="Delicious Pasta" className="w-full h-48 object-cover rounded-md"/>
                  <p className="mt-4 text-sm">Pasta with rich and creamy sauce topped with fresh herbs.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <CardTitle>Gourmet Burger</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" alt="Gourmet Burger" className="w-full h-48 object-cover rounded-md"/>
                  <p className="mt-4 text-sm">Juicy burger with gourmet toppings and special sauce.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <CardTitle>Healthy Salad</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="Healthy Salad" className="w-full h-48 object-cover rounded-md"/>
                  <p className="mt-4 text-sm">A refreshing salad with a variety of fresh vegetables.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <CardTitle>Chocolate Cake</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src="https://picsum.photos/seed/picsum/200/300" alt="Chocolate Cake" className="w-full h-48 object-cover rounded-md"/>
                  <p className="mt-4 text-sm">Decadent chocolate cake with a rich frosting.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Join Our Community</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl lg:text-2xl">
              Connect with fellow food lovers and share your favorite recipes!
            </p>
            <div className="mt-8">
              <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3h3Z2cwOThud2U4aGppOWFpOWI2dXRtNWhpcnNmdGUzN2VwcTZ3MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12voxtUHROcg7K/giphy.gif" alt="Community" className="mx-auto rounded-md"/>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-purple-600 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Top Food Influencers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Alice Brown</CardTitle>
                      <p className="text-sm text-gray-500">@alicebrown</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mt-4">Alice shares amazing vegan recipes that are both delicious and healthy.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>John Smith</CardTitle>
                      <p className="text-sm text-gray-500">@johnsmith</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mt-4">John’s BBQ recipes are a hit, making him a top influencer in grilling.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Maria Sanchez</CardTitle>
                      <p className="text-sm text-gray-500">@mariasanchez</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mt-4">Maria’s desserts are both beautiful and delectable, making her a favorite.</p>
                </CardContent>
              </Card>
              <Card className="bg-white text-purple-700">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                      <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Chris Martin</CardTitle>
                      <p className="text-sm text-gray-500">@chrismartin</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mt-4">Chris is known for his quick and easy recipes that are perfect for busy people.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-700 p-6 md:py-12 w-full text-center text-sm">
        <div className="container mx-auto">
          <p>&copy; 2023 FoodieGram. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;