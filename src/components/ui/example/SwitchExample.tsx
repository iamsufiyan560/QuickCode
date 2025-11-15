"use client";

import React from "react";
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import {
  Heart,
  HeartOff,
  BriefcaseBusiness,
  BellOff,
  Laugh,
  Frown,
} from "lucide-react";

export const DefaultSwitchExample = () => {
  const defaultSwitchCode = `
import { Switch } from "@/components/ui/Switch";
import { Label } from "@/components/ui/Label";
import { Heart, HeartOff, BriefcaseBusiness, BellOff, Laugh, Frown } from "lucide-react";

export const DefaultSwitchExample = () => {
  const [isGfModeOn, setIsGfModeOn] = React.useState(false);
  const [jobNotifications, setJobNotifications] = React.useState(true);
  const [funnyMode, setFunnyMode] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Switch 
          id="gf-mode" 
          checked={isGfModeOn}
          onCheckedChange={setIsGfModeOn}
        />
        <Label htmlFor="gf-mode" className="flex items-center gap-2">
          {isGfModeOn ? <Heart className="w-4 h-4 text-red-500" /> : <HeartOff className="w-4 h-4 text-muted-foreground" />}
          Girlfriend Mode
        </Label>
      </div>

      <div className="flex items-center space-x-4">
        <Switch 
          id="job-notifications" 
          checked={jobNotifications}
          onCheckedChange={setJobNotifications}
        />
        <Label htmlFor="job-notifications" className="flex items-center gap-2">
          {jobNotifications ? <BriefcaseBusiness className="w-4 h-4 text-blue-500" /> : <BellOff className="w-4 h-4 text-muted-foreground" />}
          Job Notifications
        </Label>
      </div>

      <div className="flex items-center space-x-4">
        <Switch 
          id="funny-mode" 
          checked={funnyMode}
          onCheckedChange={setFunnyMode}
        />
        <Label htmlFor="funny-mode" className="flex items-center gap-2">
          {funnyMode ? <Laugh className="w-4 h-4 text-yellow-500" /> : <Frown className="w-4 h-4 text-muted-foreground" />}
          Funny Mode
        </Label>
      </div>
    </div>
  );
};
`;

  const [isGfModeOn, setIsGfModeOn] = React.useState(false);
  const [jobNotifications, setJobNotifications] = React.useState(true);
  const [funnyMode, setFunnyMode] = React.useState(false);

  return (
    <SnippetPreview title="Switch Examples" code={defaultSwitchCode}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch
            id="gf-mode"
            checked={isGfModeOn}
            onCheckedChange={setIsGfModeOn}
          />
          <Label htmlFor="gf-mode" className="flex items-center gap-2">
            {isGfModeOn ? (
              <Heart className="w-4 h-4 text-red-500" />
            ) : (
              <HeartOff className="w-4 h-4 text-muted-foreground" />
            )}
            Girlfriend Mode
          </Label>
        </div>

        <div className="flex items-center space-x-4">
          <Switch
            id="job-notifications"
            checked={jobNotifications}
            onCheckedChange={setJobNotifications}
          />
          <Label
            htmlFor="job-notifications"
            className="flex items-center gap-2"
          >
            {jobNotifications ? (
              <BriefcaseBusiness className="w-4 h-4 text-blue-500" />
            ) : (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            )}
            Job Notifications
          </Label>
        </div>

        <div className="flex items-center space-x-4">
          <Switch
            id="funny-mode"
            checked={funnyMode}
            onCheckedChange={setFunnyMode}
          />
          <Label htmlFor="funny-mode" className="flex items-center gap-2">
            {funnyMode ? (
              <Laugh className="w-4 h-4 text-yellow-500" />
            ) : (
              <Frown className="w-4 h-4 text-muted-foreground" />
            )}
            Funny Mode
          </Label>
        </div>
      </div>
    </SnippetPreview>
  );
};
