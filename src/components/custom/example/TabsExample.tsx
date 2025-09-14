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
  Home,
  Bell,
} from "lucide-react";

// Default Tabs Example
export const DefaultTabsExample = () => {
  const defaultTabsCode = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/custom/Tabs";
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
          <TabsTrigger value="vibe">Vibe Check</TabsTrigger>
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/custom/Tabs";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/custom/Tabs";

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

export const VerticalTabsExample = () => {
  const verticalCode = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/custom/Tabs";
import { Home, Settings, User, Bell } from "lucide-react";

export const VerticalTabsExample = () => {
  return (
    <Tabs defaultValue="dashboard" orientation="vertical">
      <TabsList>
        <TabsTrigger value="dashboard" activeColor="#3b82f6">
          <Home className="w-4 h-4 mr-2" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="profile" activeColor="#10b981">
          <User className="w-4 h-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" activeColor="#f59e0b">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="settings" activeColor="#8b5cf6">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
          <h3 className="text-lg font-semibold mb-3">Dashboard Overview</h3>
          <p className="text-muted-foreground mb-4">
            Welcome to your dashboard. Here you can view analytics, recent activity, and key metrics.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Users</p>
              <p className="text-2xl font-bold">12,345</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
              <p className="text-sm text-green-600 dark:text-green-400">Revenue</p>
              <p className="text-2xl font-bold">$54,321</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
          <h3 className="text-lg font-semibold mb-3">User Profile</h3>
          <p className="text-muted-foreground mb-4">
            Manage your personal information and account preferences.
          </p>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-muted-foreground">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
          <h3 className="text-lg font-semibold mb-3">Notifications</h3>
          <p className="text-muted-foreground mb-4">
            Stay updated with the latest alerts and messages.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-amber-500/10 rounded border border-amber-500/20">
              <p className="text-sm font-medium">New message received</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
              <p className="text-sm font-medium">System update available</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
          <h3 className="text-lg font-semibold mb-3">Application Settings</h3>
          <p className="text-muted-foreground mb-4">
            Configure your application preferences and privacy options.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <span className="text-xs text-muted-foreground">Auto</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <span className="text-xs text-muted-foreground">Enabled</span>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
`;

  return (
    <SnippetPreview title="Vertical Sidebar" code={verticalCode}>
      <Tabs defaultValue="dashboard" orientation="vertical">
        <TabsList>
          <TabsTrigger
            className="flex items-center gap-2"
            value="dashboard"
            activeColor="#3b82f6"
          >
            <Home className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center gap-2"
            value="profile"
            activeColor="#10b981"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center gap-2"
            value="notifications"
            activeColor="#f59e0b"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            className="flex items-center gap-2"
            value="settings"
            activeColor="#8b5cf6"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
            <h3 className="text-lg font-semibold mb-3">Dashboard Overview</h3>
            <p className="text-muted-foreground mb-4">
              Welcome to your dashboard. Here you can view analytics, recent
              activity, and key metrics.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold">12,345</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Revenue
                </p>
                <p className="text-2xl font-bold">$54,321</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
            <h3 className="text-lg font-semibold mb-3">User Profile</h3>
            <p className="text-muted-foreground mb-4">
              Manage your personal information and account preferences.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <p className="text-muted-foreground">John Doe</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
            <h3 className="text-lg font-semibold mb-3">Notifications</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest alerts and messages.
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-amber-500/10 rounded border border-amber-500/20">
                <p className="text-sm font-medium">New message received</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                <p className="text-sm font-medium">System update available</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="p-6 bg-muted/30 rounded-lg border border-border/20">
            <h3 className="text-lg font-semibold mb-3">Application Settings</h3>
            <p className="text-muted-foreground mb-4">
              Configure your application preferences and privacy options.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <span className="text-xs text-muted-foreground">Auto</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <span className="text-xs text-muted-foreground">Enabled</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </SnippetPreview>
  );
};
