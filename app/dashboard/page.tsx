"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Clock, Zap, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { user } = useUser();
  const [progress] = useState(0);
  const router = useRouter();
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  // Dummy data for flashcard sets
  const flashcardSets = [
    { id: 1, title: "Biology 101", cardCount: 50, progress: 75 },
    { id: 2, title: "World History", cardCount: 30, progress: 40 },
    { id: 3, title: "Mathematics", cardCount: 25, progress: 90 },
  ];

  const handleCreateNew = () => {
    router.push('/flashcards');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {user?.firstName || "Learner"}!
            </h1>
            <p className="text-gray-500">
              Here&apos;s an overview of your learning progress.
            </p>
          </div>
          <Dialog open={isQuickCreateOpen} onOpenChange={setIsQuickCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" /> Create New Set
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Flashcard Set</DialogTitle>
                <DialogDescription>
                  Choose how you want to create your flashcard set
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  onClick={handleCreateNew}
                  className="flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Generation
                </Button>
                <Button
                  onClick={handleCreateNew}
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Create Manually
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Study Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5 hours</div>
              <p className="text-sm text-muted-foreground">
                &gt;+2.5 hours from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Flashcards Reviewed
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&gt;1,284</div>
              <p className="text-xs text-muted-foreground">
                &gt;+210 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Progress
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&gt;{progress}%</div>
              <Progress value={progress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Your Flashcard Sets</CardTitle>
            <CardDescription>
              Review and manage your study materials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Sets</TabsTrigger>
                <TabsTrigger value="recent">Recently Studied</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {flashcardSets.map((set) => (
                  <div
                    key={set.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{set.title}</h3>
                      <p className="text-sm text-gray-500">
                        {set.cardCount} cards
                      </p>
                      <div />
                      <div className="flex items-center gap-4">
                        <Progress className="w-24" value={set.progress} />
                        <span className="text-sm font--medium">
                          {set.progress}%
                        </span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/study/${set.id}`}>Study</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recent">
                <p className="text-gray-500">
                  Your recently studied sets will appear here.
                </p>
              </TabsContent>
              <TabsContent className="text-gray-500" value="favorites">
                <p>Your favorite sets will appear here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Study Session</CardTitle>
            <CardDescription>
              Start a focused study seession with AI-powered recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-black text-white hover:bg-gray-800">
              Start 15-Minute Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
