"use client";

import { useUser } from "@clerk/nextjs";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { toast } from "react-hot-toast"
import { CreditCard } from 'lucide-react'



export default function SettingsPage() {

  const { user } = useUser();




  const handleSubscriptionChange = (plan: string) => {
    console.log("Subscription change requested:", plan);
    toast.success(`Subscription updated to ${plan}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Account Settings</h1>
      <Tabs defaultValue="account" className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <TabsList className="p-1 text-muted-foreground w-full  md:w-auto inline-flex h-10 items-center justify-center rounded-md bg-muted">
            <TabsTrigger
              value="account"
              className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Subscription
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              Integrations
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Account Information
                <CardDescription>Manage your account details</CardDescription>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user?.fullName || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <Input
                  id="username"
                  type="username"
                  defaultValue={user?.username || ""}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">
                Subscription Plan
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="className-y-4">
              <RadioGroup
                defaultValue="basic"
                onValueChange={handleSubscriptionChange}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pro" id="pro" />
                  <Label htmlFor="pro" className="text-sm md:text-base">
                    Pro Plan - $9.99/month
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <Label htmlFor="enterprise" className="text-sm md:text-base">
                    Enterprise Plan - Custom pricing
                  </Label>
                </div>
              </RadioGroup>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span className="text-sm md:text-base">
                    {" "}
                    Credit Card (Stripe)
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="****  **** **** 1234"
                  className="w-full"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiration Date</Label>
                <Input
                  id="card-expiry"
                  placeholder="MM/YY"
                  className="w-full"
                  disabled
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button className='w-full sm:w-auto'>Update Subscription</Button>
              <Button variant='outline' className='w-full sm:w-auto'>Update Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='security'>

        </TabsContent>
      </Tabs>
    </div>
  );
}
