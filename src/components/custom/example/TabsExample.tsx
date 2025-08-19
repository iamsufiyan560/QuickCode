"use client";

import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/custom/Tabs";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import {
  AppWindowIcon,
  CodeIcon,
  Zap,
  Palette,
  Settings,
  User,
} from "lucide-react";

export const DefaultTabsExample = () => {
  const defaultTabsCode = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { AppWindowIcon, CodeIcon, Zap } from "lucide-react";

export const DefaultTabsExample = () => {
  return (
    <Tabs defaultValue="vibe">
      <TabsList>
        <TabsTrigger value="vibe">Vibe Check</TabsTrigger>
        <TabsTrigger value="code">Code Mode</TabsTrigger>
        <TabsTrigger value="hype">Hype Zone</TabsTrigger>
      </TabsList>
      <TabsContent value="vibe">
        <div className="p-4 bg-muted/50 rounded-lg">
          <AppWindowIcon className="w-6 h-6 mb-2 text-primary" />
          <h3 className="font-semibold mb-2">Vibe Check</h3>
          <p className="text-muted-foreground">Checking the vibes with a clean, modern interface.</p>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div className="p-4 bg-muted/50 rounded-lg">
          <CodeIcon className="w-6 h-6 mb-2 text-primary" />
          <h3 className="font-semibold mb-2">Code Mode</h3>
          <p className="text-muted-foreground">Drop into code mode with some slick snippets.</p>
        </div>
      </TabsContent>
      <TabsContent value="hype">
        <div className="p-4 bg-muted/50 rounded-lg">
          <Zap className="w-6 h-6 mb-2 text-primary" />
          <h3 className="font-semibold mb-2">Hype Zone</h3>
          <p className="text-muted-foreground">Hype zone activated! Ready for some high-energy content.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
`;

  return (
    <SnippetPreview title="Default Tabs" code={defaultTabsCode}>
      <Tabs defaultValue="vibe">
        <TabsList className="h-fit">
          <TabsTrigger value="vibe">Vibe mode</TabsTrigger>
          <TabsTrigger value="code">Code Mode</TabsTrigger>
          <TabsTrigger value="hype">Hype Zone</TabsTrigger>
        </TabsList>
        <TabsContent value="vibe">
          <div className="p-4 bg-muted/50 rounded-lg">
            <AppWindowIcon className="w-6 h-6 mb-2 text-primary" />
            <h3 className="font-semibold mb-2">Vibe Check</h3>
            <p className="text-muted-foreground">
              Checking the vibes with a clean, modern interface.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="p-4 bg-muted/50 rounded-lg">
            <CodeIcon className="w-6 h-6 mb-2 text-primary" />
            <h3 className="font-semibold mb-2">Code Mode</h3>
            <p className="text-muted-foreground">
              Drop into code mode with some slick snippets.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="hype">
          <div className="p-4 bg-muted/50 rounded-lg">
            <Zap className="w-6 h-6 mb-2 text-primary" />
            <h3 className="font-semibold mb-2">Hype Zone</h3>
            <p className="text-muted-foreground">
              Hype zone activated! Ready for some high-energy content.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </SnippetPreview>
  );
};

export const CustomColorTabsExample = () => {
  const customColorCode = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Palette, Settings, User } from "lucide-react";

export const CustomColorTabsExample = () => {
  return (
    <Tabs defaultValue="design">
      <TabsList>
        <TabsTrigger value="design" activeColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          Design
        </TabsTrigger>
        <TabsTrigger value="settings" activeColor="#10b981">
          Settings
        </TabsTrigger>
        <TabsTrigger value="profile" activeColor="rgb(236, 72, 153)">
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="design">
        <div className="p-4 bg-muted/50 rounded-lg">
          <Palette className="w-6 h-6 mb-2 text-purple-500" />
          <h3 className="font-semibold mb-2">Design Tools</h3>
          <p className="text-muted-foreground">Create beautiful interfaces with gradient backgrounds.</p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 bg-muted/50 rounded-lg">
          <Settings className="w-6 h-6 mb-2 text-emerald-500" />
          <h3 className="font-semibold mb-2">App Settings</h3>
          <p className="text-muted-foreground">Customize your application preferences.</p>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-4 bg-muted/50 rounded-lg">
          <User className="w-6 h-6 mb-2 text-pink-500" />
          <h3 className="font-semibold mb-2">User Profile</h3>
          <p className="text-muted-foreground">Manage your account and personal information.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
`;

  return (
    <SnippetPreview title="Custom Colors" code={customColorCode}>
      <Tabs defaultValue="design">
        <TabsList>
          <TabsTrigger
            value="design"
            activeColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            Design
          </TabsTrigger>
          <TabsTrigger value="settings" activeColor="#10b981">
            Settings
          </TabsTrigger>
          <TabsTrigger value="profile" activeColor="rgb(236, 72, 153)">
            Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="design">
          <div className="p-4 bg-muted/50 rounded-lg">
            <Palette className="w-6 h-6 mb-2 text-purple-500" />
            <h3 className="font-semibold mb-2">Design Tools</h3>
            <p className="text-muted-foreground">
              Create beautiful interfaces with gradient backgrounds.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-4 bg-muted/50 rounded-lg">
            <Settings className="w-6 h-6 mb-2 text-emerald-500" />
            <h3 className="font-semibold mb-2">App Settings</h3>
            <p className="text-muted-foreground">
              Customize your application preferences.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="p-4 bg-muted/50 rounded-lg">
            <User className="w-6 h-6 mb-2 text-pink-500" />
            <h3 className="font-semibold mb-2">User Profile</h3>
            <p className="text-muted-foreground">
              Manage your account and personal information.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </SnippetPreview>
  );
};

export const GlassTabsExample = () => {
  const glassCode = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

export const GlassTabsExample = () => {
  return (
    <Tabs defaultValue="ruby" className="bg-muted/20 dark:bg-black/20 p-6 rounded-xl">
      <TabsList className="bg-muted/30 dark:bg-white/10 border border-border/30 dark:border-white/20">
        <TabsTrigger 
          value="ruby" 
          activeColor="linear-gradient(135deg, #dc2626, #ef4444)"
        >
          Ruby
        </TabsTrigger>
        <TabsTrigger 
          value="emerald" 
          activeColor="linear-gradient(135deg, #059669, #10b981)"
        >
          Emerald
        </TabsTrigger>
        <TabsTrigger 
          value="sapphire" 
          activeColor="linear-gradient(135deg, #1d4ed8, #3b82f6)"
        >
          Sapphire
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ruby">
        <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
          <h3 className="font-semibold mb-2">Ruby Premium</h3>
          <p className="text-muted-foreground">Powerful features with premium support and advanced analytics.</p>
        </div>
      </TabsContent>
      <TabsContent value="emerald">
        <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
          <h3 className="font-semibold mb-2">Emerald Pro</h3>
          <p className="text-muted-foreground">Professional tools for growing businesses and teams.</p>
        </div>
      </TabsContent>
      <TabsContent value="sapphire">
        <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
          <h3 className="font-semibold mb-2">Sapphire Enterprise</h3>
          <p className="text-muted-foreground">Enterprise-grade solutions with unlimited scalability.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
`;

  return (
    <SnippetPreview title="Premium Gems" code={glassCode}>
      <Tabs
        defaultValue="ruby"
        className="bg-gray-200 dark:bg-black/20 p-6 rounded-xl"
      >
        <TabsList className="bg-gray-50 dark:bg-white/10 border border-border/30 dark:border-white/20">
          <TabsTrigger
            value="ruby"
            activeColor="linear-gradient(135deg, #dc2626, #ef4444)"
          >
            Ruby
          </TabsTrigger>
          <TabsTrigger
            value="emerald"
            activeColor="linear-gradient(135deg, #059669, #10b981)"
          >
            Emerald
          </TabsTrigger>
          <TabsTrigger
            value="sapphire"
            activeColor="linear-gradient(135deg, #1d4ed8, #3b82f6)"
          >
            Sapphire
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ruby">
          <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
            <h3 className="font-semibold mb-2">Ruby Premium</h3>
            <p className="text-muted-foreground">
              Powerful features with premium support and advanced analytics.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="emerald">
          <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
            <h3 className="font-semibold mb-2">Emerald Pro</h3>
            <p className="text-muted-foreground">
              Professional tools for growing businesses and teams.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="sapphire">
          <div className="p-4 bg-muted/20 dark:bg-white/5 rounded-lg border border-border/20 dark:border-white/10">
            <h3 className="font-semibold mb-2">Sapphire Enterprise</h3>
            <p className="text-muted-foreground">
              Enterprise-grade solutions with unlimited scalability.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </SnippetPreview>
  );
};
