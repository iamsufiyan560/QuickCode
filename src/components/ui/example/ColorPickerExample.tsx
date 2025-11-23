"use client";
import { useState } from "react";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultExampleCode = `"use client"
import { useState } from 'react';
import { ColorPicker } from '@/components/ui/ColorPicker';

export default function DefaultExample() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <ColorPicker value={color} onValueChange={setColor}>
      <ColorPicker.Trigger>
        Pick a color
      </ColorPicker.Trigger>
      
      <ColorPicker.Content>
        <div className="space-y-4">
          <ColorPicker.Area />
          
          <div className="space-y-2">
            <ColorPicker.HueSlider />
            <ColorPicker.AlphaSlider />
          </div>

          <ColorPicker.Swatches />

          <div className="flex gap-2">
            <ColorPicker.EyeDropper />
            <ColorPicker.Input />
            <ColorPicker.FormatToggle />
          </div>
        </div>
      </ColorPicker.Content>
    </ColorPicker>
  );
}`;

export function DefaultExample() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <SnippetPreview code={defaultExampleCode}>
      <div className="flex flex-col items-center gap-6">
        <ColorPicker value={color} onValueChange={setColor}>
          <ColorPicker.Trigger>Pick a color</ColorPicker.Trigger>

          <ColorPicker.Content>
            <div className="space-y-4">
              <ColorPicker.Area />

              <div className="space-y-2">
                <ColorPicker.HueSlider />
                <ColorPicker.AlphaSlider />
              </div>

              <ColorPicker.Swatches />

              <div className="flex gap-2">
                <ColorPicker.EyeDropper />
                <ColorPicker.Input />
                <ColorPicker.FormatToggle />
              </div>
            </div>
          </ColorPicker.Content>
        </ColorPicker>

        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
          <div className="mb-2 text-sm font-medium text-foreground">
            Selected Color
          </div>
          <div
            className="h-24 rounded-md border border-border"
            style={{ backgroundColor: color }}
          />
          <div className="mt-2 font-mono text-sm text-muted-foreground">
            {color}
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
}

const customPresetsCode = `"use client"
import { useState } from 'react';
import { ColorPicker } from '@/components/ui/ColorPicker';

export default function CustomPresetsExample() {
  const [brandColor, setBrandColor] = useState('#0ea5e9');

  const brandPresets = [
    '#0ea5e9',
    '#0284c7',
    '#0369a1',
    '#075985',
    '#0c4a6e',
    '#ef4444',
    '#dc2626',
    '#b91c1c',
  ];

  return (
    <div className="space-y-4">
      <ColorPicker 
        value={brandColor} 
        onValueChange={setBrandColor}
        presets={brandPresets}
      >
        <ColorPicker.Trigger>
          Select brand color
        </ColorPicker.Trigger>
        
        <ColorPicker.Content>
          <div className="space-y-4">
            <ColorPicker.Area />
            <ColorPicker.HueSlider />
            <ColorPicker.Swatches />
            <div className="flex gap-2">
              <ColorPicker.Input className="flex-1" />
              <ColorPicker.FormatToggle />
            </div>
          </div>
        </ColorPicker.Content>
      </ColorPicker>

      <div className="rounded-md bg-card p-4 text-sm text-muted-foreground">
        Selected: <span className="font-mono text-foreground">{brandColor}</span>
      </div>
    </div>
  );
}`;

export function CustomPresetsExample() {
  const [brandColor, setBrandColor] = useState("#0ea5e9");

  const brandPresets = [
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
    "#ef4444",
    "#dc2626",
    "#b91c1c",
  ];

  return (
    <SnippetPreview code={customPresetsCode}>
      <div className="space-y-4">
        <ColorPicker
          value={brandColor}
          onValueChange={setBrandColor}
          presets={brandPresets}
        >
          <ColorPicker.Trigger>Select brand color</ColorPicker.Trigger>

          <ColorPicker.Content>
            <div className="space-y-4">
              <ColorPicker.Area />
              <ColorPicker.HueSlider />
              <ColorPicker.Swatches />
              <div className="flex gap-2">
                <ColorPicker.Input className="flex-1" />
                <ColorPicker.FormatToggle />
              </div>
            </div>
          </ColorPicker.Content>
        </ColorPicker>

        <div className="rounded-md bg-card p-4 text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-mono text-foreground">{brandColor}</span>
        </div>
      </div>
    </SnippetPreview>
  );
}

const formIntegrationCode = `"use client"
import { useState } from 'react';
import { ColorPicker } from '@/components/ui/ColorPicker';

export default function FormIntegrationExample() {
  const [formData, setFormData] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    accentColor: '#ec4899',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Theme submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Custom Theme Builder</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Configure your application theme colors
        </p>
      </div>

      <div className="space-y-4">
      <div className="space-y-2 space-x-4">

          <label className="text-sm font-medium text-foreground">Primary Color</label>
          <ColorPicker
            value={formData.primaryColor}
            onValueChange={(color) => setFormData({ ...formData, primaryColor: color })}
            showAlpha={false}
          >
            <ColorPicker.Trigger className="w-full justify-between">
              <span>Primary</span>
              <span className="font-mono text-xs">{formData.primaryColor}</span>
            </ColorPicker.Trigger>
            <ColorPicker.Content>
              <div className="space-y-3">
                <ColorPicker.Area />
                <ColorPicker.HueSlider />
                <ColorPicker.Swatches />
                <ColorPicker.Input />
              </div>
            </ColorPicker.Content>
          </ColorPicker>
        </div>

      <div className="space-y-2 space-x-4">

          <label className="text-sm font-medium text-foreground">Secondary Color</label>
          <ColorPicker
            value={formData.secondaryColor}
            onValueChange={(color) => setFormData({ ...formData, secondaryColor: color })}
            showAlpha={false}
          >
            <ColorPicker.Trigger className="w-full justify-between">
              <span>Secondary</span>
              <span className="font-mono text-xs">{formData.secondaryColor}</span>
            </ColorPicker.Trigger>
            <ColorPicker.Content>
              <div className="space-y-3">
                <ColorPicker.Area />
                <ColorPicker.HueSlider />
                <ColorPicker.Swatches />
                <ColorPicker.Input />
              </div>
            </ColorPicker.Content>
          </ColorPicker>
        </div>

      <div className="space-y-2 space-x-4">

          <label className="text-sm font-medium text-foreground">Accent Color</label>
          <ColorPicker
            value={formData.accentColor}
            onValueChange={(color) => setFormData({ ...formData, accentColor: color })}
            showAlpha={false}
          >
            <ColorPicker.Trigger className="w-full justify-between">
              <span>Accent</span>
              <span className="font-mono text-xs">{formData.accentColor}</span>
            </ColorPicker.Trigger>
            <ColorPicker.Content>
              <div className="space-y-3">
                <ColorPicker.Area />
                <ColorPicker.HueSlider />
                <ColorPicker.Swatches />
                <ColorPicker.Input />
              </div>
            </ColorPicker.Content>
          </ColorPicker>
        </div>
      </div>

      <div className="flex gap-3 rounded-md bg-muted p-4">
        <div
          className="h-16 flex-1 rounded"
          style={{ backgroundColor: formData.primaryColor }}
          title="Primary"
        />
        <div
          className="h-16 flex-1 rounded"
          style={{ backgroundColor: formData.secondaryColor }}
          title="Secondary"
        />
        <div
          className="h-16 flex-1 rounded"
          style={{ backgroundColor: formData.accentColor }}
          title="Accent"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        Apply Theme
      </button>
    </form>
  );
}`;

export function FormIntegrationExample() {
  const [formData, setFormData] = useState({
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    accentColor: "#ec4899",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Theme submitted:\nPrimary: ${formData.primaryColor}\nSecondary: ${formData.secondaryColor}\nAccent: ${formData.accentColor}`
    );
  };

  return (
    <SnippetPreview code={formIntegrationCode}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border border-border bg-card p-6"
      >
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Custom Theme Builder
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Configure your application theme colors
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 space-x-4">
            <label className="text-sm font-medium text-foreground ">
              Primary Color
            </label>
            <ColorPicker
              value={formData.primaryColor}
              onValueChange={(color) =>
                setFormData({ ...formData, primaryColor: color })
              }
              showAlpha={false}
            >
              <ColorPicker.Trigger className="w-full justify-between">
                <span>Primary</span>
                <span className="font-mono text-xs">
                  {formData.primaryColor}
                </span>
              </ColorPicker.Trigger>
              <ColorPicker.Content>
                <div className="space-y-3">
                  <ColorPicker.Area />
                  <ColorPicker.HueSlider />
                  <ColorPicker.Swatches />
                  <ColorPicker.Input />
                </div>
              </ColorPicker.Content>
            </ColorPicker>
          </div>

          <div className="space-y-2 space-x-4">
            <label className="text-sm font-medium text-foreground">
              Secondary Color
            </label>
            <ColorPicker
              value={formData.secondaryColor}
              onValueChange={(color) =>
                setFormData({ ...formData, secondaryColor: color })
              }
              showAlpha={false}
            >
              <ColorPicker.Trigger className="w-full justify-between">
                <span>Secondary</span>
                <span className="font-mono text-xs">
                  {formData.secondaryColor}
                </span>
              </ColorPicker.Trigger>
              <ColorPicker.Content>
                <div className="space-y-3">
                  <ColorPicker.Area />
                  <ColorPicker.HueSlider />
                  <ColorPicker.Swatches />
                  <ColorPicker.Input />
                </div>
              </ColorPicker.Content>
            </ColorPicker>
          </div>

          <div className="space-y-2 space-x-4">
            <label className="text-sm font-medium text-foreground">
              Accent Color
            </label>
            <ColorPicker
              value={formData.accentColor}
              onValueChange={(color) =>
                setFormData({ ...formData, accentColor: color })
              }
              showAlpha={false}
            >
              <ColorPicker.Trigger className="w-full justify-between">
                <span>Accent</span>
                <span className="font-mono text-xs">
                  {formData.accentColor}
                </span>
              </ColorPicker.Trigger>
              <ColorPicker.Content>
                <div className="space-y-3">
                  <ColorPicker.Area />
                  <ColorPicker.HueSlider />
                  <ColorPicker.Swatches />
                  <ColorPicker.Input />
                </div>
              </ColorPicker.Content>
            </ColorPicker>
          </div>
        </div>

        <div className="flex gap-3 rounded-md bg-muted p-4">
          <div
            className="h-16 flex-1 rounded"
            style={{ backgroundColor: formData.primaryColor }}
            title="Primary"
          />
          <div
            className="h-16 flex-1 rounded"
            style={{ backgroundColor: formData.secondaryColor }}
            title="Secondary"
          />
          <div
            className="h-16 flex-1 rounded"
            style={{ backgroundColor: formData.accentColor }}
            title="Accent"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          Apply Theme
        </button>
      </form>
    </SnippetPreview>
  );
}
