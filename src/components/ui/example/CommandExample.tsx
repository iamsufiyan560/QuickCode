"use client";
import React from "react";
import { BookOpen, Globe, Inbox, Mail, MapPin, Music } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/Command";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const commandPaletteCode = `"use client"

import React from 'react';
import {
  BookOpen,
  Globe,
  Inbox,
  Mail,
  MapPin,
  Music,
} from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/Command';

export default function CommandPaletteExample() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (value: string) => {
    console.log('Command Selected:', value);
    setOpen(false);
  };

  return (
    <div className="w-full p-8">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Press <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-xs">⌘K</kbd> to open quick actions
        </p>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Search actions..." />
            <CommandList>
              <CommandEmpty>No actions available.</CommandEmpty>

              <CommandGroup heading="Navigation">
                <CommandItem value="open-map" onSelect={handleSelect}>
                  <MapPin />
                  <span>Open Map</span>
                </CommandItem>
                <CommandItem value="browse-web" onSelect={handleSelect}>
                  <Globe />
                  <span>Browse Web</span>
                </CommandItem>
                <CommandItem value="read-articles" disabled>
                  <BookOpen />
                  <span>Read Articles</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Communication">
                <CommandItem value="inbox" onSelect={handleSelect}>
                  <Inbox />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem value="compose-mail" onSelect={handleSelect}>
                  <Mail />
                  <span>Compose Mail</span>
                  <CommandShortcut>⌘M</CommandShortcut>
                </CommandItem>
                <CommandItem value="play-music" onSelect={handleSelect}>
                  <Music />
                  <span>Play Music</span>
                  <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
              </CommandGroup>

            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </div>
  );
}`;

export function CommandPaletteExample() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (value: string) => {
    setOpen(false);
  };

  return (
    <SnippetPreview code={commandPaletteCode}>
      <>
        <p className="text-sm text-muted-foreground">
          Press{" "}
          <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-xs">
            ⌘K
          </kbd>{" "}
          to open quick actions
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Search actions..." />
            <CommandList>
              <CommandEmpty>No actions available.</CommandEmpty>

              <CommandGroup heading="Navigation">
                <CommandItem value="open-map" onSelect={handleSelect}>
                  <MapPin />
                  <span>Open Map</span>
                </CommandItem>
                <CommandItem value="browse-web" onSelect={handleSelect}>
                  <Globe />
                  <span>Browse Web</span>
                </CommandItem>
                <CommandItem value="read-articles" disabled>
                  <BookOpen />
                  <span>Read Articles</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup heading="Communication">
                <CommandItem value="inbox" onSelect={handleSelect}>
                  <Inbox />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem value="compose-mail" onSelect={handleSelect}>
                  <Mail />
                  <span>Compose Mail</span>
                  <CommandShortcut>⌘M</CommandShortcut>
                </CommandItem>
                <CommandItem value="play-music" onSelect={handleSelect}>
                  <Music />
                  <span>Play Music</span>
                  <CommandShortcut>⌘U</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </>
    </SnippetPreview>
  );
}
