"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Save, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSearchParams } from 'next/navigation';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  lastReviewed?: Date;
  nextReview?: Date;
  difficulty?: number;
}

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState("");
  const [subject, setSubject] = useState("");
  const [generatedFlashcards, setGeneratedFlashcards] = useState<Flashcard[]>([]);
  const [isManualMode, setIsManualMode] = useState(mode === 'manual');

  const generateFlashcards = async () => {
    if (!inputText.trim() || !subject.trim()) {
      toast.error("Please provide both study material and subject");
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Replace with actual API call to AI service
      // This is a mock implementation
      const mockGeneratedCards = [
        {
          id: Date.now().toString(),
          question: "What is the main concept discussed in the text?",
          answer: "This is a sample answer generated from the input text.",
          subject: subject,
          lastReviewed: new Date(),
          nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
          difficulty: 0,
        },
      ];

      setGeneratedFlashcards(mockGeneratedCards);
      toast.success("Flashcards generated successfully!");
    } catch (error) {
      toast.error("Failed to generate flashcards");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveFlashcards = async () => {
    try {
      // TODO: Implement saving to database
      toast.success("Flashcards saved successfully!");
    } catch (error) {
      toast.error("Failed to save flashcards");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Create Flashcards</h1>
      
      <div className="flex gap-4 mb-6">
        <Button
          variant={!isManualMode ? "default" : "outline"}
          onClick={() => setIsManualMode(false)}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          AI Generation
        </Button>
        <Button
          variant={isManualMode ? "default" : "outline"}
          onClick={() => setIsManualMode(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Manual Creation
        </Button>
      </div>

      {!isManualMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate AI Flashcards</CardTitle>
            <CardDescription>
              Paste your study material and let AI create flashcards for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter subject (e.g., Biology, History)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="study-material">Study Material</Label>
              <Textarea
                id="study-material"
                placeholder="Paste your notes, textbook excerpts, or any study material here..."
                className="min-h-[200px]"
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={generateFlashcards}
                disabled={isGenerating}
                className="flex-1"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Flashcards"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setInputText("");
                  setSubject("");
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create Flashcards Manually</CardTitle>
            <CardDescription>
              Create your own flashcards one by one
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add manual creation form here */}
          </CardContent>
        </Card>
      )}

      {generatedFlashcards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Flashcards</CardTitle>
            <CardDescription>
              Review and edit your AI-generated flashcards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedFlashcards.map((card) => (
              <Card key={card.id}>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Question</Label>
                    <Textarea
                      defaultValue={card.question}
                      className="resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Answer</Label>
                    <Textarea
                      defaultValue={card.answer}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={saveFlashcards} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Flashcards
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 