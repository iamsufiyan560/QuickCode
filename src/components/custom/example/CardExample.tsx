"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/custom/Card";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Button } from "@/components/custom/Button";
import {
  Heart,
  MessageCircle,
  Share2,
  User,
  Calendar,
  MapPin,
} from "lucide-react";

export const DefaultCardExample = () => {
  const defaultCardCode = `
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";

export const DefaultCardExample = () => {
  return (
    <Card className"w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>Latest progress on the dashboard redesign</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground">
          We've completed the user research phase and are now moving into the 
          design system creation. The team has identified key pain points and 
          opportunities for improvement.
        </p>
      </CardContent>
    </Card>
  );
};
`;

  return (
    <SnippetPreview title="Default Card" code={defaultCardCode}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Project Update</CardTitle>
          <CardDescription>
            Latest progress on the dashboard redesign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            We've completed the user research phase and are now moving into the
            design system creation. The team has identified key pain points and
            opportunities for improvement.
          </p>
        </CardContent>
      </Card>
    </SnippetPreview>
  );
};

export const InteractiveCardExample = () => {
  const interactiveCardCode = `
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export const InteractiveCardExample = () => {
  return (
    <Card  className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Amazing Product Launch</CardTitle>
        <CardDescription>2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          Just launched our new feature that helps teams collaborate more effectively. 
          The response from early users has been incredible!
        </p>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Product</span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">Launch</span>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            24
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            12
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
`;

  return (
    <SnippetPreview title="Interactive Card" code={interactiveCardCode}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Amazing Product Launch</CardTitle>
          <CardDescription>2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground mb-4">
            Just launched our new feature that helps teams collaborate more
            effectively. The response from early users has been incredible!
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full ">
              Product
            </span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              Launch
            </span>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-1" />
              24
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              12
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
    </SnippetPreview>
  );
};

export const ProfileCardExample = () => {
  const profileCardCode = `
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { User, Calendar, MapPin } from "lucide-react";

export const ProfileCardExample = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-primary" />
        </div>
        <CardTitle>Sarah Johnson</CardTitle>
        <CardDescription>Senior Product Designer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Joined March 2023
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          San Francisco, CA
        </div>
        <p className="text-sm text-foreground">
          Passionate about creating user-centered designs that solve real problems. 
          Love working with cross-functional teams to bring ideas to life.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};
`;

  return (
    <SnippetPreview title="Profile Card" code={profileCardCode}>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <CardTitle>Sarah Johnson</CardTitle>
          <CardDescription>Senior Product Designer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Joined March 2023
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            San Francisco, CA
          </div>
          <p className="text-sm text-foreground">
            Passionate about creating user-centered designs that solve real
            problems. Love working with cross-functional teams to bring ideas to
            life.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">View Profile</Button>
        </CardFooter>
      </Card>
    </SnippetPreview>
  );
};
