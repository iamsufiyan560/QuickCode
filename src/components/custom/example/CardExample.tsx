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
import { Label } from "../Label";
import { Input } from "../Input";
import { Button } from "../Button";

export const DefaultCardExample = () => {
  const defaultCardCode = `
import { Card, CardHeader, CardContent,  CardFooter, CardTitle, CardDescription } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


export const DefaultCardExample = () => {
  return (
     <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Subscribe to our Newsletter</CardTitle>
          <CardDescription>
            Stay updated with the latest news and updates from QuickCode UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </CardFooter>
      </Card>
  );
};
`;

  return (
    <SnippetPreview title="Default Card" code={defaultCardCode}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Subscribe to our Newsletter</CardTitle>
          <CardDescription>
            Stay updated with the latest news and updates from QuickCode UI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Your name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </CardFooter>
      </Card>
    </SnippetPreview>
  );
};
