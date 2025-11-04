"use client";
import React, { useState } from "react";
import { Indicator } from "@/components/custom/Indicator";
import { Mail, ShoppingCart, MessageSquare, Bell, User } from "lucide-react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Button } from "../Button";

const code = ` "use client"
import { Indicator } from '@/components/ui/Indicator';
import { Button } from "@/components/ui/Button";

import { Mail, ShoppingCart, MessageSquare, Bell, User } from 'lucide-react';
import { useState } from 'react';

export default function IndicatorShowcase() {
  const [showIndicator, setShowIndicator] = useState(true);

  return (
    <div className="space-y-12 p-8">
      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Basic Usage</h3>
        <div className="flex items-center gap-8">
          <Indicator label="5">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="99+">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator dot>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </Indicator>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Positions</h3>
        <div className="flex items-start gap-8 flex-wrap">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Indicator label="1" position="top-start">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="2" position="top-center">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="3" position="top-end">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
            </div>
            <div className="flex gap-4">
              <Indicator label="4" position="middle-start">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="5" position="middle-center">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="6" position="middle-end">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
            </div>
            <div className="flex gap-4">
              <Indicator label="7" position="bottom-start">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="8" position="bottom-center">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
              <Indicator label="9" position="bottom-end">
                <div className="w-16 h-16 bg-card border border-border rounded-lg" />
              </Indicator>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Sizes & Styles</h3>
        <div className="flex items-center gap-8">
          <Indicator label="3" size={12}>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="12" size={20}>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="99" size={24}>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </Indicator>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Colors & Radius</h3>
        <div className="flex items-center gap-8">
          <Indicator label="New" color="bg-primary" radius="md">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="5" color="bg-green-500" radius="sm">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="!" color="bg-yellow-500" radius="none">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </Indicator>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Processing & Border</h3>
        <div className="flex items-center gap-8">
          <Indicator dot processing>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="Live" processing color="bg-red-500">
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="12" withBorder>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </Indicator>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">With Avatar</h3>
        <div className="flex items-center gap-8">
          <Indicator dot color="bg-green-500" position="bottom-end">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
              <User className="w-6 h-6" />
            </div>
          </Indicator>

          <Indicator label="3" position="top-end">
            <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-medium">
              JD
            </div>
          </Indicator>

          <Indicator dot processing color="bg-green-500" position="bottom-end" withBorder>
            <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-medium">
              SK
            </div>
          </Indicator>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4 text-muted-foreground">Offset & Inline</h3>
        <div className="flex items-center gap-8">
          <Indicator label="5" offset={5}>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <Mail className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="10" offset={-5}>
            <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </Indicator>

          <Indicator label="New" inline>
            <span className="px-3 py-1.5 bg-card border border-border rounded-md text-sm">
              Inline indicator
            </span>
          </Indicator>
        </div>
      </div>


         <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Conditional Display
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Indicator label={0} showZero>
                <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </Indicator>

              <div className="flex gap-4">
                <Indicator label="5" disabled={!showIndicator}>
                  <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </Indicator>

                <Button onClick={() => setShowIndicator(!showIndicator)}>
                  {showIndicator ? "Hide" : "Show"} Indicator
                </Button>
              </div>
            </div>
          </div>
        </div>

     
    </div>
  );
}`;

export function ComprehensiveExample() {
  const [showIndicator, setShowIndicator] = useState(true);

  return (
    <SnippetPreview code={code}>
      <div className="space-y-12">
        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Basic Usage
          </h3>
          <div className="flex items-center gap-8">
            <Indicator label="5">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="99+">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator dot>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Positions
          </h3>
          <div className="flex items-start gap-8 flex-wrap">
            <div className="space-y-4">
              <div className="flex gap-4">
                <Indicator label="1" position="top-start">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="2" position="top-center">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="3" position="top-end">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
              </div>
              <div className="flex gap-4">
                <Indicator label="4" position="middle-start">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="5" position="middle-center">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="6" position="middle-end">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
              </div>
              <div className="flex gap-4">
                <Indicator label="7" position="bottom-start">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="8" position="bottom-center">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
                <Indicator label="9" position="bottom-end">
                  <div className="w-16 h-16 bg-card border border-border rounded-lg" />
                </Indicator>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Sizes & Styles
          </h3>
          <div className="flex items-center gap-8">
            <Indicator label="3" size={12}>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="12" size={20}>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="99" size={24}>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Colors & Radius
          </h3>
          <div className="flex items-center gap-8">
            <Indicator label="New" color="bg-primary" radius="md">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="5" color="bg-green-500" radius="sm">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="!" color="bg-yellow-500" radius="none">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Processing & Border
          </h3>
          <div className="flex items-center gap-8">
            <Indicator dot processing>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="Live" processing color="bg-red-500">
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="12" withBorder>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            With Avatar
          </h3>
          <div className="flex items-center gap-8">
            <Indicator dot color="bg-green-500" position="bottom-end">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                <User className="w-6 h-6" />
              </div>
            </Indicator>

            <Indicator label="3" position="top-end">
              <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-medium">
                JD
              </div>
            </Indicator>

            <Indicator
              dot
              processing
              color="bg-green-500"
              position="bottom-end"
              withBorder
            >
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-medium">
                SK
              </div>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Offset & Inline
          </h3>
          <div className="flex items-center gap-8">
            <Indicator label="5" offset={5}>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="10" offset={-5}>
              <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </Indicator>

            <Indicator label="New" inline>
              <span className="px-3 py-1.5 bg-card border border-border rounded-md text-sm">
                Inline indicator
              </span>
            </Indicator>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Conditional Display
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <Indicator label={0} showZero>
                <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </Indicator>

              <div className="flex gap-4">
                <Indicator label="5" disabled={!showIndicator}>
                  <button className="p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </Indicator>

                <Button onClick={() => setShowIndicator(!showIndicator)}>
                  {showIndicator ? "Hide" : "Show"} Indicator
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
}
