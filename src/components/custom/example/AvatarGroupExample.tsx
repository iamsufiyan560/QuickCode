"use client";

import React from "react";
import { AvatarGroup } from "@/components/custom/AvatarGroup";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultAvatarGroupExample = () => {
  const defaultAvatarGroupCode = `import { AvatarGroup } from "@/components/ui/AvatarGroup";

export const DefaultAvatarGroupExample = () => {
    const teamMembers = [
    {
      src: "https://i.postimg.cc/zGhZBK2z/image-2.png",
      alt: "Sarah Chen",
      fallback: "SC",
      tooltipContent: "Sarah Chen",
    },
    {
      src: "https://i.postimg.cc/gjcmLjXk/image.png",

      alt: "Mike Chen",
      fallback: "MC",
      tooltipContent: "Mike Chen",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Emma Wilson",
      fallback: "EW",
      tooltipContent: "Emma Wilson",
    },
    {
      src: "https://i.postimg.cc/13s292Fm/supawork-image-20250204-T202555899-Z-png.png",
      alt: "David Brown",
      fallback: "DB",
      tooltipContent: "David Brown",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Alice Johnson",
      fallback: "AJ",
      tooltipContent: "Alice Johnson",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Bob Smith",
      fallback: "BS",
      tooltipContent: "Bob Smith",
    },
  ];

  return (
    <div className="space-y-6">
     <AvatarGroup showTooltip avatars={teamMembers} max={4} />
      <AvatarGroup avatars={teamMembers} max={3} size="lg" />
    </div>
  );
};`;

  const teamMembers = [
    {
      src: "https://i.postimg.cc/zGhZBK2z/image-2.png",
      alt: "Sarah Chen",
      fallback: "SC",
      tooltipContent: "Sarah Chen",
    },
    {
      src: "https://i.postimg.cc/gjcmLjXk/image.png",

      alt: "Mike Chen",
      fallback: "MC",
      tooltipContent: "Mike Chen",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Emma Wilson",
      fallback: "EW",
      tooltipContent: "Emma Wilson",
    },
    {
      src: "https://i.postimg.cc/13s292Fm/supawork-image-20250204-T202555899-Z-png.png",
      alt: "David Brown",
      fallback: "DB",
      tooltipContent: "David Brown",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Alice Johnson",
      fallback: "AJ",
      tooltipContent: "Alice Johnson",
    },
    {
      src: "https://i.postimg.cc/sXXTBRfp/image-3.png",
      alt: "Bob Smith",
      fallback: "BS",
      tooltipContent: "Bob Smith",
    },
  ];

  return (
    <SnippetPreview title="Default Avatar Group" code={defaultAvatarGroupCode}>
      <div className="space-y-6">
        <AvatarGroup showTooltip avatars={teamMembers} max={4} />
        <AvatarGroup avatars={teamMembers} max={3} size="lg" />
      </div>
    </SnippetPreview>
  );
};
