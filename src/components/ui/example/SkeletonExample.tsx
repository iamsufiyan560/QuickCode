"use client";

import React from "react";
import {
  Skeleton,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
} from "@/components/ui/Skeleton";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultSkeletonExample = () => {
  const defaultSkeletonCode = `
import { Skeleton } from "@/components/ui/Skeleton";

export const DefaultSkeletonExample = () => {
  return (
    <div className="space-y-4 w-full" >
      <Skeleton className="w-full h-12 " />
      <Skeleton className="w-3/4 h-8 " />
      <Skeleton className="w-1/2 h-6 " />
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Default Skeleton" code={defaultSkeletonCode}>
      <div className="space-y-4  w-full">
        <Skeleton className="w-full h-12 " />
        <Skeleton className="w-3/4 h-8 " />
        <Skeleton className="w-1/2 h-6 " />
      </div>
    </SnippetPreview>
  );
};

export const TextLinesExample = () => {
  const textLinesCode = `
import { Skeleton } from "@/components/ui/Skeleton";

export const TextLinesExample = () => {
  return (
    <div className="space-y-6 w-full">
      <div>
        <Skeleton variant="text" lines={3} className="mb-4" />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Text Lines Skeleton" code={textLinesCode}>
      <div className="space-y-6 w-full">
        <div>
          <Skeleton variant="text" lines={3} className="mb-4" />
          <Skeleton variant="text" lines={2} />
        </div>
      </div>
    </SnippetPreview>
  );
};

export const UserProfileExample = () => {
  const userProfileCode = `
import { Skeleton, SkeletonAvatar } from "@/components/ui/Skeleton";

export const UserProfileExample = () => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-background border border-border rounded-lg">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-32 h-5" />
        <Skeleton variant="text" className="w-48 h-4" />
        <Skeleton variant="text" lines={2} className="mt-3" />
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="User Profile Loading" code={userProfileCode}>
      <div className="flex items-start space-x-4 p-4 bg-background border border-border rounded-lg">
        <SkeletonAvatar size="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-32 h-5" />
          <Skeleton variant="text" className="w-48 h-4" />
          <Skeleton variant="text" lines={2} className="mt-3" />
        </div>
      </div>
    </SnippetPreview>
  );
};

export const SkeletonCardExample = () => {
  const skeletonCardCode = `
import { SkeletonCard } from "@/components/ui/Skeleton";

export const SkeletonCardExample = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SkeletonCard className="border border-border rounded-lg" />
      <SkeletonCard className="border border-border rounded-lg" />
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Skeleton Card" code={skeletonCardCode}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <SkeletonCard className="border border-border rounded-lg" />
        <SkeletonCard className="border border-border rounded-lg" />
      </div>
    </SnippetPreview>
  );
};

export const VariantsExample = () => {
  const variantsCode = `
import { Skeleton, SkeletonAvatar, SkeletonButton } from "@/components/ui/Skeleton";

export const VariantsExample = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="sm" />
        <SkeletonAvatar size="md" />
        <SkeletonAvatar size="lg" />
      </div>
      
      <div className="flex items-center space-x-4">
        <SkeletonButton size="sm" />
        <SkeletonButton size="md" />
        <SkeletonButton size="lg" />
      </div>
      
      <div className="space-y-3">
        <Skeleton variant="rectangular" className="w-full h-8" />
        <Skeleton variant="rounded" className="w-full h-8" />
        <Skeleton variant="circular" className="w-8 h-8" />
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Skeleton Variants" code={variantsCode}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
        </div>

        <div className="flex items-center space-x-4">
          <SkeletonButton size="sm" />
          <SkeletonButton size="md" />
          <SkeletonButton size="lg" />
        </div>

        <div className="space-y-3">
          <Skeleton variant="rectangular" className="w-full h-8" />
          <Skeleton variant="rounded" className="w-full h-8" />
          <Skeleton variant="circular" className="w-8 h-8" />
        </div>
      </div>
    </SnippetPreview>
  );
};
