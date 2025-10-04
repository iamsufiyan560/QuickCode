"use client";

import React, { useState } from "react";
import { ContextMenu } from "@/components/custom/ContextMenu";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import {
  Home,
  Settings,
  Users,
  FileText,
  Mail,
  Bell,
  Search,
} from "lucide-react";

export const RightClickExample = () => {
  const code = `import { ContextMenu } from "@/components/ui/ContextMenu";

export const RightClickExample = () => {
  return (
    <ContextMenu>
      <ContextMenu.Trigger triggerOn="contextmenu">
        <div className="flex h-[180px] w-full items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 px-8">
          <p className="text-sm text-muted-foreground">Right click here</p>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item>
          Copy
          <ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>
          Paste
          <ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Refresh</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
};`;

  return (
    <SnippetPreview title="Right Click" code={code}>
      <ContextMenu>
        <ContextMenu.Trigger triggerOn="contextmenu">
          <div className="flex h-[180px] w-full items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/50 px-8">
            <p className="text-sm text-muted-foreground">Right click here</p>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>
            Copy
            <ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item>
            Paste
            <ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Refresh</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </SnippetPreview>
  );
};

export const HoverIconNavigationExample = () => {
  const code = `import { ContextMenu } from "@/components/ui/ContextMenu";
import { Home, Settings, Users, FileText, Mail, Bell, Search } from "lucide-react";

export const HoverIconNavigationExample = () => {
  const navItems = [
    { icon: Home, label: "Dashboard", action: "View Dashboard" },
    { icon: Users, label: "Team", action: "Manage Team" },
    { icon: FileText, label: "Documents", action: "View Documents" },
    { icon: Mail, label: "Messages", action: "Check Messages" },
    { icon: Bell, label: "Notifications", action: "View Notifications" },
    { icon: Search, label: "Search", action: "Open Search" },
    { icon: Settings, label: "Settings", action: "Open Settings" },
  ];

  return (
    <div className="flex h-[400px] w-16 flex-col items-center gap-2 rounded-lg border border-border bg-card p-2">
      {navItems.map((item) => (
        <ContextMenu key={item.label}>
          <ContextMenu.Trigger triggerOn="hover">
            <button className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
              <item.icon className="h-5 w-5" />
            </button>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Label>{item.label}</ContextMenu.Label>
            <ContextMenu.Separator />
            <ContextMenu.Item>{item.action}</ContextMenu.Item>
            <ContextMenu.Item>Pin to Top</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Hide</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu>
      ))}
    </div>
  );
};`;

  const navItems = [
    { icon: Home, label: "Dashboard", action: "View Dashboard" },
    { icon: Users, label: "Team", action: "Manage Team" },
    { icon: FileText, label: "Documents", action: "View Documents" },
    { icon: Mail, label: "Messages", action: "Check Messages" },
    { icon: Bell, label: "Notifications", action: "View Notifications" },
    { icon: Search, label: "Search", action: "Open Search" },
    { icon: Settings, label: "Settings", action: "Open Settings" },
  ];

  return (
    <SnippetPreview title="Hover Navigation" code={code}>
      <div className="flex h-[400px] w-16 flex-col items-center gap-2 rounded-lg border border-border bg-card p-2">
        {navItems.map((item) => (
          <ContextMenu key={item.label}>
            <ContextMenu.Trigger triggerOn="hover">
              <button className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground">
                <item.icon className="h-5 w-5" />
              </button>
            </ContextMenu.Trigger>
            <ContextMenu.Content>
              <ContextMenu.Label>{item.label}</ContextMenu.Label>
              <ContextMenu.Separator />
              <ContextMenu.Item>{item.action}</ContextMenu.Item>
              <ContextMenu.Item>Pin to Top</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Hide</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu>
        ))}
      </div>
    </SnippetPreview>
  );
};

export const AdvancedFeaturesExample = () => {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullURLs, setShowFullURLs] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("john");

  const code = `import { ContextMenu } from "@/components/ui/ContextMenu";
import { useState } from "react";

export const AdvancedFeaturesExample = () => {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullURLs, setShowFullURLs] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState("john");

  return (
    <ContextMenu>
      <ContextMenu.Trigger triggerOn="click">
        <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
          Click for Advanced Menu
        </button>
      </ContextMenu.Trigger>
      <ContextMenu.Content className="w-56">
        <ContextMenu.Item inset>
          Back
          <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item inset disabled>
          Forward
          <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item inset>
          Reload
          <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
        </ContextMenu.Item>
        
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Save Page</ContextMenu.Item>
            <ContextMenu.Item>Create Shortcut</ContextMenu.Item>
            <ContextMenu.Item>Name Window</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Developer Tools</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        
        <ContextMenu.CheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks Bar
        </ContextMenu.CheckboxItem>
        <ContextMenu.CheckboxItem
          checked={showFullURLs}
          onCheckedChange={setShowFullURLs}
        >
          Show Full URLs
        </ContextMenu.CheckboxItem>

        <ContextMenu.Separator />
        
        <ContextMenu.RadioGroup value={selectedPerson} onValueChange={setSelectedPerson}>
          <ContextMenu.Label inset>Assign To</ContextMenu.Label>
          <ContextMenu.RadioItem value="john">John Doe</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="jane">Jane Smith</ContextMenu.RadioItem>
          <ContextMenu.RadioItem value="bob">Bob Johnson</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>

        <ContextMenu.Separator />
        <ContextMenu.Item variant="destructive">Delete Workspace</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
};`;

  return (
    <SnippetPreview title="On Click" code={code}>
      <ContextMenu>
        <ContextMenu.Trigger triggerOn="click">
          <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            Click for Advanced Menu
          </button>
        </ContextMenu.Trigger>
        <ContextMenu.Content className="w-56">
          <ContextMenu.Item inset>
            Back
            <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item inset disabled>
            Forward
            <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
          </ContextMenu.Item>
          <ContextMenu.Item inset>
            Reload
            <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
          </ContextMenu.Item>

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>Save Page</ContextMenu.Item>
              <ContextMenu.Item>Create Shortcut</ContextMenu.Item>
              <ContextMenu.Item>Name Window</ContextMenu.Item>
              <ContextMenu.Separator />
              <ContextMenu.Item>Developer Tools</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>

          <ContextMenu.Separator />

          <ContextMenu.CheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Show Bookmarks Bar
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem
            checked={showFullURLs}
            onCheckedChange={setShowFullURLs}
          >
            Show Full URLs
          </ContextMenu.CheckboxItem>

          <ContextMenu.Separator />

          <ContextMenu.RadioGroup
            value={selectedPerson}
            onValueChange={setSelectedPerson}
          >
            <ContextMenu.Label inset>Assign To</ContextMenu.Label>
            <ContextMenu.RadioItem value="john">John Doe</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="jane">
              Jane Smith
            </ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="bob">
              Bob Johnson
            </ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>

          <ContextMenu.Separator />
          <ContextMenu.Item variant="destructive">
            Delete Workspace
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    </SnippetPreview>
  );
};
