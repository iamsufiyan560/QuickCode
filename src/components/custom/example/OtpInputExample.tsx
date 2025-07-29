"use client";

import React from "react";
import { OtpInput } from "@/components/custom/OtpInput";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const basicCode = `import { OtpInput } from "@/components/ui/OtpInput";

export default function BasicOtpExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput maxLength={6}>
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
        </OtpInput.Group>
        <OtpInput.Separator />
        <OtpInput.Group>
          <OtpInput.Slot index={3} />
          <OtpInput.Slot index={4} />
          <OtpInput.Slot index={5} />
        </OtpInput.Group>
      </OtpInput>
      <p className="text-sm text-muted-foreground">
        Enter the 6-digit code sent to your device
      </p>
    </div>
  );
}`;

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic OTP Input">
      <div className="flex flex-col items-center gap-4">
        <OtpInput maxLength={6}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
          </OtpInput.Group>
          <OtpInput.Separator />
          <OtpInput.Group>
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your device
        </p>
      </div>
    </SnippetPreview>
  );
}

const patternCode = `import { OtpInput } from "@/components/ui/OtpInput";

export default function PatternOtpExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput maxLength={4}>
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
          <OtpInput.Slot index={3} />
        </OtpInput.Group>
      </OtpInput>
      <p className="text-sm text-muted-foreground">
        Enter your 4-digit PIN
      </p>
    </div>
  );
}`;

export function PatternExample() {
  return (
    <SnippetPreview code={patternCode} title="4-Digit PIN">
      <div className="flex flex-col items-center gap-4">
        <OtpInput maxLength={4}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
          </OtpInput.Group>
        </OtpInput>
        <p className="text-sm text-muted-foreground">Enter your 4-digit PIN</p>
      </div>
    </SnippetPreview>
  );
}

const controlledCode = `"use client";

import { useState } from "react";
import { OtpInput } from "@/components/ui/OtpInput";

export default function ControlledOtpExample() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.length === 6) {
      console.log("Submitted:", value);
      alert(\`Code submitted: \${value}\`);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput 
        maxLength={6} 
        value={value} 
        onChange={setValue}
      >
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
        </OtpInput.Group>
        <OtpInput.Separator />
        <OtpInput.Group>
          <OtpInput.Slot index={3} />
          <OtpInput.Slot index={4} />
          <OtpInput.Slot index={5} />
        </OtpInput.Group>
      </OtpInput>
      
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Current value: <span className="font-mono">{value || "(empty)"}</span>
        </p>
        <button
          onClick={handleSubmit}
          disabled={value.length !== 6}
          className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verify Code
        </button>
      </div>
    </div>
  );
}`;

export function ControlledExample() {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
    if (value.length === 6) {
      alert(`Code submitted: ${value}`);
    }
  };

  return (
    <SnippetPreview code={controlledCode} title="Controlled with State">
      <div className="flex flex-col items-center gap-4">
        <OtpInput maxLength={6} value={value} onChange={setValue}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
          </OtpInput.Group>
          <OtpInput.Separator />
          <OtpInput.Group>
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Current value:{" "}
            <span className="font-mono">{value || "(empty)"}</span>
          </p>
          <button
            onClick={handleSubmit}
            disabled={value.length !== 6}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Verify Code
          </button>
        </div>
      </div>
    </SnippetPreview>
  );
}

const alphanumericCode = `import { OtpInput } from "@/components/ui/OtpInput";

export default function AlphanumericExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <OtpInput maxLength={6} pattern={/^[A-Z0-9]$/i}>
        <OtpInput.Group>
          <OtpInput.Slot index={0} />
          <OtpInput.Slot index={1} />
          <OtpInput.Slot index={2} />
          <OtpInput.Slot index={3} />
          <OtpInput.Slot index={4} />
          <OtpInput.Slot index={5} />
        </OtpInput.Group>
      </OtpInput>
      <p className="text-sm text-muted-foreground">
        Enter alphanumeric code (A-Z, 0-9)
      </p>
    </div>
  );
}`;

export function AlphanumericExample() {
  return (
    <SnippetPreview code={alphanumericCode} title="Alphanumeric Pattern">
      <div className="flex flex-col items-center gap-4">
        <OtpInput maxLength={6} pattern={/^[A-Z0-9]$/i}>
          <OtpInput.Group>
            <OtpInput.Slot index={0} />
            <OtpInput.Slot index={1} />
            <OtpInput.Slot index={2} />
            <OtpInput.Slot index={3} />
            <OtpInput.Slot index={4} />
            <OtpInput.Slot index={5} />
          </OtpInput.Group>
        </OtpInput>
        <p className="text-sm text-muted-foreground">
          Enter alphanumeric code (A-Z, 0-9)
        </p>
      </div>
    </SnippetPreview>
  );
}
