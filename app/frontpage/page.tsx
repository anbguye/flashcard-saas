"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSwipeable } from "react-swipeable";
import {
  Sparkles,
  Brain,
  Clock,
  ArrowRight,
  Menu,
  Upload,
  Zap,
  Glasses,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";

export default function FrontPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpMenuOpen, setIsSignUpMenuOpen] = useState(false);
  const [isLearnMoreMenuOpen, setIsLearnMoreMenuOpen] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, user } = useUser();

  const flashcards = [
    {
      question: "What is the Krebs cycle?",
      answer:
        "A series of chemical reactions used by all aerobic organisms to release stored energy through the oxidation of acetyl-CoA derived from carbohydrates, fats, and proteins.",
      subject: "Biochemistry",
    },
    {
      question: "What is a Fourier Transform?",
      answer:
        "A mathematical transform that decomposes functions depending on space or time into functions depending on spatial or temporal frequency.",
      subject: "Electrical Engineering",
    },
    {
      question: "What is the Black-Scholes model?",
      answer:
        "A mathematical model for pricing options and derivative securities, widely used in the financial industry.",
      subject: "Finance",
    },
    {
      question: "What is the halting problem in computer science?",
      answer:
        "The problem of determining, from a description of an arbitrary computer program and an input, whether the program will finish running or continue to run forever.",
      subject: "Computer Science",
    },
    {
      question: "What is the significance of the Drake equation?",
      answer:
        "A probabilistic argument used to estimate the number of active, communicative extraterrestrial civilizations in the Milky Way galaxy.",
      subject: "Astrophysics",
    },
  ];

  const nextCard = () => {
    setCurrentFlashcardIndex(
      (prevIndex) => (prevIndex + 1) % flashcards.length
    );
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentFlashcardIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextCard,
    onSwipedRight: prevCard,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const heroOffset = heroRef.current.offsetTop;
        const parallaxEffect = Math.max(0, (scrollPosition - windowHeight) / 2);
        const scale = Math.max(
          1,
          1 + (scrollPosition - heroOffset) / (heroHeight * 5)
        );
        const opacity = Math.max(
          0,
          1 - (scrollPosition - heroOffset) / (heroHeight / 2)
        );

        heroRef.current.style.transform = `translateY(${parallaxEffect}px) scale(${scale})`;
        heroRef.current.style.opacity = `${opacity}`;
        heroRef.current.style.transformOrigin = "center center";
      }

      const animateSectionOnScroll = (
        ref: React.RefObject<HTMLDivElement>,
        delay: number,
        isKeySection: boolean
      ) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < windowHeight && rect.bottom >= 0;
          if (isVisible) {
            ref.current.style.opacity = "1";
            if (isKeySection) {
              ref.current.style.transform = "translateY(0)";
            }
            ref.current.style.transition = `opacity 0.5s ease-out ${delay}s${
              isKeySection ? `, transform 0.5s ease-out ${delay}s` : ""
            }`;
          }
        }
      };

      animateSectionOnScroll(featuresRef, 0, true);
      animateSectionOnScroll(howItWorksRef, 0.2, true);
      animateSectionOnScroll(pricingRef, 0.4, true);
      animateSectionOnScroll(faqRef, 0, false);
      animateSectionOnScroll(ctaRef, 0, false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set initial states

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleIsSignUpMenuOpen = () => {
    setIsSignUpMenuOpen(true);
  }

  const handleIsLearnMoreMenuOpen = () => {
    setIsLearnMoreMenuOpen(true);
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // placeholder for sign up logic, probably sending to db in future.
    console.log("Sign up form submitted");
    setIsSignUpMenuOpen(false);
  }

  const faqItems = [
    {
      question: "How does FlashAI generate flashcards?",
      answer:
        "FlashAI uses advanced natural language processing to analyze your study materials and create relevant, high-quality flashcards automatically.",
    },
    {
      question: "Can I customize the flashcards?",
      answer:
        "Yes, you can edit, add, or delete any flashcard generated by FlashAI to suit your learning needs.",
    },
    {
      question: "How does the spaced repetition system work?",
      answer:
        "Our spaced repetition algorithm tracks your performance and schedules reviews at optimal intervals to maximize long-term retention.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 text-black fixed w-full z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FlashAI</h1>
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Pricing
            </button>
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    className="text-black border-black hover:bg-gray-100 transition-colors duration-200"
                  >
                    Log In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-black text-white hover:gray-900 transition-colors duration-200">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-black text-white hover:bg-gray-900 transition-colors duration-200">
                  Dashboard
                </Button>
              </Link>
            )}
          </nav>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-black py-2 transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-black py-2 transition-colors duration-200"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-gray-600 hover:text-black py-2 transition-colors duration-200"
              >
                Pricing
              </button>
              <Button
                variant="outline"
                className="text-black border-black hover:bg-gray-100 w-full transition-colors duration-200"
              >
                Log In
              </Button>
              <Button className="bg-black text-white hover:bg-gray-900 w-full transition-colors duration-200">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen overflow-hidden">
          <div
            ref={heroRef}
            className="min-h-screen flex items-center pt-16 md:pt-0 pb-16 md:pb-0 px-4 relative"
          >
            <div className="container mx-auto flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Making learning easy.
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                  FlashAI combines the power of artificial intelligence with
                  proven learning techniques to help you master any subject
                  faster and more effectively.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleIsSignUpMenuOpen}
                    size="lg"
                    className="bg-black text-white hover:bg-gray-900 transform transition-all duration-200 hover:scale-105"
                  >
                    Start Learning for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleIsLearnMoreMenuOpen}
                    size="lg"
                    variant="outline"
                    className="border-black text-black hover:bg-gray-100 transform transition-all duration-200 hover:scale-105"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                <div
                  {...handlers}
                  className="relative w-full max-w-[400px] aspect-[4/3] perspective-1000 cursor-pointer group transition-transform duration-300 hover:scale-105"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 transform rotate-3 rounded-2xl"></div>
                  <div
                    className={`absolute inset-0 bg-white rounded-2xl shadow-lg transition-all duration-500 ease-in-out transform-style-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    } group-hover:shadow-xl`}
                  >
                    <div
                      className={`absolute inset-0 backface-hidden flex flex-col justify-center items-center p-4 transition-opacity duration-500 ${
                        isFlipped ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-center">
                        {flashcards[currentFlashcardIndex].question}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 text-center">
                        Tap to flip, swipe to change
                      </p>
                      <p className="text-xs md:text-sm font-semibold mt-2 text-blue-600">
                        {flashcards[currentFlashcardIndex].subject}
                      </p>
                    </div>
                    <div
                      className={`absolute inset-0 backface-hidden flex flex-col justify-center items-center p-4 rotate-y-180 transition-opacity duration-500 ${
                        isFlipped ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <p className="text-sm md:text-lg text-center">
                        {flashcards[currentFlashcardIndex].answer}
                      </p>
                      <p className="text-xs md:text-sm font-semibold mt-4 text-blue-600">
                        {flashcards[currentFlashcardIndex].subject}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex justify-between p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevCard();
                      }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                      <span className="sr-only">Previous card</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextCard();
                      }}
                    >
                      <ChevronRight className="h-6 w-6" />
                      <span className="sr-only">Next card</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={featuresRef}
          className="pt-16 md:pt-20 py-16 md:py-20 bg-gray-50 opacity-0 transform translate-y-10"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
              Why Choose FlashAI?
            </h2>
            <div className="grid  md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-md">
                <Sparkles className="h-12 w-12 text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-center">
                  AI-Powered Flashcards
                </h3>
                <p className="text-gray-600 text-center">
                  Our AI generates high-quality flashcards from your notes or
                  textbooks, saving you hours of manual work.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-md">
                <Brain className="h-12 w-12 text-green-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Adaptive Learning
                </h3>
                <p className="text-gray-600 text-center">
                  Our system adapts to your learning pace, focusing on areas
                  where you need the most improvement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm transform transition-all duration-200 hover:scale-105 hover:shadow-md">
                <Clock className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2 text-center">
                  Spaced Repetition
                </h3>
                <p className="text-gray-600 text-center">
                  Optimize your study schedule with our scientifically-proven
                  spaced repetition algorithm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          ref={howItWorksRef}
          className="py-16 md:py-20 bg-white opacity-0 transform translate-y-10"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
              How FlashAI Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center transform transition-all duration-200 hover:scale-105">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <Upload className="h-12 w-12 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  1. Upload Your Content
                </h3>
                <p className="text-gray-600 text-center">
                  Import your notes, textbooks, or study materials into FlashAI.
                </p>
              </div>
              <div className="flex flex-col items-center transform transition-all duration-200 hover:scale-105">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <Zap className="h-12 w-12 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  2. AI Generation
                </h3>
                <p className="text-gray-600 text-center">
                  Our AI analyzes your content and creates optimized flashcards.
                </p>
              </div>
              <div className="flex flex-col items-center transform transition-all duration-200 hover:scale-105">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <Glasses className="h-12 w-12 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  3. Start Learning
                </h3>
                <p className="text-gray-600 text-center">
                  Review your AI-generated flashcards and track your progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          ref={pricingRef}
          className="py-16 md:py-20 bg-gray-50 opacity-0 transform translate-y-10"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
              Choose Your Plan
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                <div
                  key={plan}
                  className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between transform transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{plan}</h3>
                    <p className="text-4xl font-bold mb-6">
                      {index === 2 ? "Custom" : `${index === 0 ? "0" : "9.99"}`}
                      {index !== 2 && (
                        <span className="text-lg font-normal text-gray-600">
                          /month
                        </span>
                      )}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {index === 0 && (
                        <>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>100 AI-generated flashcards/month</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Basic spaced repetition</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>1 study subject</span>
                          </li>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Unlimited AI-generated flashcards</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Advanced spaced repetition</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>5 study subjects</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Progress tracking</span>
                          </li>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>All Pro features</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Unlimited study subjects</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>API access</span>
                          </li>
                          <li className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            <span>Dedicated support</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <Button
                    className={`w-full ${
                      index === 1 ? "bg-black text-white hover:bg-gray-900" : ""
                    } transition-colors duration-200`}
                    variant={index === 2 ? "outline" : "default"}
                  >
                    {index === 0
                      ? "Get Started"
                      : index === 1
                      ? "Choose Pro"
                      : "Contact Sales"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-16 md:py-20 bg-white opacity-0">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <button
                    className="flex justify-between items-center w-full text-left p-4 bg-gray-50 rounded-lg focus:outline-none transition-colors duration-200 hover:bg-gray-100"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-semibold">{item.question}</span>
                    <ChevronDown
                      className={`transform transition-transform duration-200 ${
                        activeAccordion === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === index && (
                    <div className="p-4 bg-white border border-gray-100 rounded-b-lg">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-16 md:py-20 bg-black text-white text-center opacity-0"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Elevate Your Learning?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students and researchers who are already
              experiencing the power of AI-assisted learning.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 flex-grow"
              />
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto transform transition-all duration-200 hover:scale-105"
              >
                Get Started
              </Button>
            </form>
          </div>
        </section>
      </main>

      {/* Learn More Modal */}
      <Dialog open={isLearnMoreMenuOpen} onOpenChange={setIsLearnMoreMenuOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Learn More About FlashAI</DialogTitle>
            <DialogDescription>
              Discover how FlashAI can revolutionize your learning experience.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">
              FlashAI uses advanced artificial intelligence to create
              personalized flashcards tailored to your learning style and needs.
              Our spaced repetition algorithm ensures you review information at
              optimal intervals for maximum retention.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <Check className="h-4 w-5 text-green-500 mr-2" />
                <span>AI-powered flashcard generation</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-5 text-green-500 mr-2" />
                <span>Adaptive learning paths</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-5 text-green-500 mr-2" />
                <span>Progress tracking and analytics</span>
              </li>
            </ul>
          </div>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}

      <Dialog open={isSignUpMenuOpen} onOpenChange={setIsSignUpMenuOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle> Sign Up for FlashAI</DialogTitle>
            <DialogDescription>
              Create your account to start learning with AI-powered flashcards.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-50 text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">FlashAI</h4>
              <p>Empowering learners with AI-driven study tools.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-gray-600 transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p>&copy; 2024 FlashAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
