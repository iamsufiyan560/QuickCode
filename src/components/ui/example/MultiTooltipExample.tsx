"use client";

import React from "react";
import { MultiTooltip } from "@/components/ui/MultiTooltip";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Heart, Pizza, Code, Music } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const MultiTooltipExample = () => {
  const multiTooltipCode = `
import { MultiTooltip } from "@/components/ui/MultiTooltip";
import { Heart, Coffee, Pizza, Code } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const MultiTooltipExample = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16 p-8">
    
       <MultiTooltip
          tooltips={[
            { content: "Emma - Loves hiking", position: "top-right" },
            { content: "Maya - Artist & designer", position: "right" },
            { content: "Alex - Bookworm", position: "bottom-right" },
            { content: "Zoe - Yoga instructor", position: "bottom-left" },
            { content: "Riley - Chef", position: "left" },
            { content: "Quinn - Musician", position: "top-left" },
          ]}
        >
        <Button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white">
          <Heart className="w-4 h-4" />
          Find Your Match
        </Button>
      </MultiTooltip>

      <MultiTooltip
        tooltips={[
          { content: "Pizza Palace - 15 min", position: "top" },
          { content: "Burger King - 8 min", position: "right" },
          { content: "Sushi Express - 25 min", position: "bottom" }
        ]}
      >
        <Button variant="outline" className="flex items-center gap-2">
          <Pizza className="w-4 h-4" />
          Order Food
        </Button>
      </MultiTooltip>

      <MultiTooltip
       tooltips={[
            { content: "VS Code - Primary editor", position: "top-left" },
            { content: "GitHub - Version control", position: "right" },
            { content: "Figma - Design tool", position: "left" },
            { content: "Notion - Documentation", position: "bottom-right" },
          ]}
      >
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
          <Code className="w-8 h-8 text-blue-500" />
        </div>
      </MultiTooltip>

      {/* Entertainment Hub */}
      <MultiTooltip
        tooltips={[
          { content: "Spotify - Chill vibes", position: "top" },
          { content: "Netflix - Latest series", position: "right" },
          { content: "Steam - Gaming time", position: "left" }
        ]}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
          <Music className="w-6 h-6 text-white" />
        </div>
      </MultiTooltip>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Multi Tooltip Examples" code={multiTooltipCode}>
      <div className="flex flex-col items-center justify-center gap-16 p-8">
        <MultiTooltip
          tooltips={[
            { content: "Emma - Loves hiking", position: "top-right" },
            { content: "Maya - Artist & designer", position: "right" },
            { content: "Alex - Bookworm", position: "bottom-right" },
            { content: "Zoe - Yoga instructor", position: "bottom-left" },
            { content: "Riley - Chef", position: "left" },
            { content: "Quinn - Musician", position: "top-left" },
          ]}
        >
          <Button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white">
            <Heart className="w-4 h-4" />
            Find Your Match
          </Button>
        </MultiTooltip>

        <MultiTooltip
          tooltips={[
            { content: "Pizza Palace - 15 min", position: "top" },
            { content: "Burger King - 8 min", position: "right" },
            { content: "Sushi Express - 25 min", position: "bottom" },
          ]}
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Pizza className="w-4 h-4" />
            Order Food
          </Button>
        </MultiTooltip>

        <MultiTooltip
          tooltips={[
            { content: "VS Code - Primary editor", position: "top-left" },
            { content: "GitHub - Version control", position: "right" },
            { content: "Figma - Design tool", position: "left" },
            { content: "Notion - Documentation", position: "bottom-right" },
          ]}
        >
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
            <Code className="w-8 h-8 text-blue-500" />
          </div>
        </MultiTooltip>

        <MultiTooltip
          tooltips={[
            { content: "Spotify - Chill vibes", position: "top" },
            { content: "Netflix - Latest series", position: "right" },
            { content: "Steam - Gaming time", position: "left" },
          ]}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <Music className="w-6 h-6 text-white" />
          </div>
        </MultiTooltip>
      </div>
    </SnippetPreview>
  );
};
