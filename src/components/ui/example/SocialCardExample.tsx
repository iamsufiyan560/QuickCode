"use client";

import React from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { ActionLink, SocialCard } from "@/components/animated/SocialCard";

export const DefaultSocialCardExample = () => {
  const defaultHoverCardCode = `
import { ActionLink , HoverCard } from "@/components/ui/HoverCard";

export const DefaultHoverCardExample = () => {
  const actionLinks = [
    { icon: "github", url: "https://github.com/username", color: "#6b7280" },
    { icon: "linkedin", url: "https://linkedin.com/in/username", color: "#0077b5" },
    { icon: "twitter", url: "https://twitter.com/username", color: "#1da1f2" },
    { icon: "globe", url: "https://website.com", color: "#10b981" },
  ];

  return (
    <HoverCard 
      actionLinks={actionLinks}
      label="Connect"
    />
  );
};
`;

  // add type ActionLink

  const actionLinks: [ActionLink, ActionLink, ...ActionLink[]] = [
    {
      icon: "github",
      url: "https://github.com/iamsufiyan560",
      color: "#6b7280",
    },
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/in/sufiyan-chaudhari-8a55502ab/",
      color: "#0077b5",
    },
    {
      icon: "twitter",
      url: "https://twitter.com/iamsufiyan560",
      color: "#1da1f2",
    },
    { icon: "globe", url: "https://sufiyan-dev.vercel.app", color: "#10b981" },
  ];

  return (
    <SnippetPreview title="Default Hover Card" code={defaultHoverCardCode}>
      <SocialCard actionLinks={actionLinks} label="Connect" />
    </SnippetPreview>
  );
};
