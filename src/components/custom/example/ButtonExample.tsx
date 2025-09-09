"use client";

import { Showcase } from "@/components/ui/Showcase";
import { Button } from "../Button";

import React from "react";
import { Loader2 } from "lucide-react";

// Default Button Example
export const DefaultButtonExample = () => (
  <Showcase
    title="Default Button"
    imports={["import { Button } from '@/components/custom/Button'"]}
    scope={{ React, Loader2, Button }}
  >
    <Button>Default Button</Button>
  </Showcase>
);

// Variant Examples
export const VariantExamples = () => (
  <div className="flex flex-col gap-2">
    <Showcase
      title="Outline Variant"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button variant="outline">Outline</Button>
    </Showcase>
    <Showcase
      title="Secondary Variant"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button variant="secondary">Secondary</Button>
    </Showcase>
    <Showcase
      title="Ghost Variant"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button variant="ghost">Ghost</Button>
    </Showcase>
    <Showcase
      title="Destructive Variant"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button variant="destructive">Destructive</Button>
    </Showcase>
    <Showcase
      title="Link Variant"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button variant="link">Link</Button>
    </Showcase>
  </div>
);

// Size and Loading Examples
export const SizeLoadingExamples = () => (
  <div className="space-y-4">
    <div className="flex flex-col gap-2">
      <Showcase
        title="Small Size"
        imports={["import { Button } from '@/components/custom/Button'"]}
        scope={{ React, Loader2, Button }}
      >
        <Button size="sm">Small</Button>
      </Showcase>
      <Showcase
        title="Large Size"
        imports={["import { Button } from '@/components/custom/Button'"]}
        scope={{ React, Loader2, Button }}
      >
        <Button size="lg">Large</Button>
      </Showcase>
    </div>
    <Showcase
      title="Loading State"
      imports={["import { Button } from '@/components/custom/Button'"]}
      scope={{ React, Loader2, Button }}
    >
      <Button isLoading>Loading...</Button>
    </Showcase>
  </div>
);
