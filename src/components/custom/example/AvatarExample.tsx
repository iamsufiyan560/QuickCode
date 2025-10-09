"use client";

import React from "react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/custom/Avatar";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultAvatarExample = () => {
  const defaultAvatarCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

export const DefaultAvatarExample = () => {
  return (
    <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://i.postimg.cc/zGhZBK2z/image-2.png"
            alt="User avatar"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://i.postimg.cc/sXXTBRfp/image-3.png"
            alt="User avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
  );
};`;

  return (
    <SnippetPreview title="Default Avatar" code={defaultAvatarCode}>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://i.postimg.cc/zGhZBK2z/image-2.png"
            alt="User avatar"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://i.postimg.cc/sXXTBRfp/image-3.png"
            alt="User avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </SnippetPreview>
  );
};
