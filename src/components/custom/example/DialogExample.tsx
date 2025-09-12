"use client";

import React from "react";
import { Dialog, DialogTrigger } from "@/components/custom/Dialog";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Pizza, Cat, Zap, Coffee, AlertCircle } from "lucide-react";
import { Button } from "../Button";

// Basic State-Controlled Dialog
export const BasicControlledDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const basicCode = `
import { Dialog } from "@/components/custom/Dialog";
import { Button } from "@/components/ui/Button";

export const BasicControlledDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Basic Dialog"
        description="A simple dialog with state management"
      >
        <div className="text-center">
          <p className="text-foreground mb-4">
            This is a basic dialog controlled by React state.
          </p>
          <Button 
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Close Dialog
          </Button>
        </div>
      </Dialog>
    </>
  );
};`;

  return (
    <SnippetPreview title="Basic State-Controlled Dialog" code={basicCode}>
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Basic Dialog"
          description="A simple dialog with state management"
        >
          <div className="text-center">
            <p className="text-foreground mb-4">
              This is a basic dialog controlled by React state.
            </p>
            <Button onClick={() => setIsOpen(false)} variant="secondary">
              Close Dialog
            </Button>
          </div>
        </Dialog>
      </>
    </SnippetPreview>
  );
};

// DialogTrigger Pattern (Compound Component)
export const CompoundDialogExample = () => {
  const [selectedPizza, setSelectedPizza] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const compoundCode = `
import { Dialog, DialogTrigger } from "@/components/custom/Dialog";
import { Button } from "@/components/ui/Button";
import { Pizza } from "lucide-react";

export const CompoundDialogExample = () => {
  const [selectedPizza, setSelectedPizza] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const pizzas = [
    "Margherita Classic",
    "Pepperoni Supreme", 
    "Veggie Deluxe",
    "Meat Lovers"
  ];

  const handleOrder = () => {
    setIsOpen(false);
    setSelectedPizza("");
  };

  return (
    <Dialog 
      title="Pizza Menu"
      description="Select your favorite pizza"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Pizza className="w-4 h-4 mr-2" />
          Browse Menu
        </Button>
      </DialogTrigger>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">Choose your pizza:</p>
        <div className="space-y-2">
          {pizzas.map((pizza) => (
            <button
              key={pizza}
              onClick={() => setSelectedPizza(pizza)}
              className={\`w-full p-3 text-left rounded-lg border transition-colors \${
                selectedPizza === pizza 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'
              }\`}
            >
              {pizza}
            </button>
          ))}
        </div>
        {selectedPizza && (
          <p className="text-center text-primary font-medium mb-4">
            Selected: {selectedPizza}
          </p>
        )}
        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => setIsOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleOrder}
            disabled={!selectedPizza}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Order Pizza
          </Button>
        </div>
      </div>
    </Dialog>
  );
};`;

  const pizzas = [
    "Margherita Classic",
    "Pepperoni Supreme",
    "Veggie Deluxe",
    "Meat Lovers",
  ];

  const handleOrder = () => {
    setIsOpen(false);
    setSelectedPizza("");
  };

  return (
    <SnippetPreview
      title="Compound Component Pattern (DialogTrigger)"
      code={compoundCode}
    >
      <Dialog
        title="Pizza Menu"
        description="Select your favorite pizza"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Pizza className="w-4 h-4 mr-2" />
            Browse Menu
          </Button>
        </DialogTrigger>

        <div className="space-y-4">
          <p className="text-muted-foreground">Choose your pizza:</p>
          <div className="space-y-2">
            {pizzas.map((pizza) => (
              <button
                key={pizza}
                onClick={() => setSelectedPizza(pizza)}
                className={`w-full p-3 text-left rounded-lg border transition-colors ${
                  selectedPizza === pizza
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {pizza}
              </button>
            ))}
          </div>
          {selectedPizza && (
            <p className="text-center text-primary font-medium mb-4">
              Selected: {selectedPizza}
            </p>
          )}
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleOrder}
              disabled={!selectedPizza}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Order Pizza
            </Button>
          </div>
        </div>
      </Dialog>
    </SnippetPreview>
  );
};

// Default Open Dialog
export const DefaultOpenDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const defaultOpenCode = `
import { Dialog } from "@/components/custom/Dialog";
import { Button } from "@/components/ui/Button";
import { Coffee } from "lucide-react";

export const DefaultOpenDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Coffee className="w-4 h-4 mr-2" />
        Reopen Dialog
      </Button>
      <Dialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Welcome!"
        description="This dialog opens automatically when component mounts"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">☕</div>
          <p className="text-foreground">
            This dialog appeared automatically because isOpen started as true.
          </p>
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Got it!
          </Button>
        </div>
      </Dialog>
    </>
  );
};`;

  return (
    <SnippetPreview title="Default Open Dialog" code={defaultOpenCode}>
      <>
        <Button onClick={() => setIsOpen(true)}>
          <Coffee className="w-4 h-4 mr-2" />
          Reopen Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Welcome!"
          description="This dialog opens automatically when component mounts"
        >
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">☕</div>
            <p className="text-foreground">
              This dialog appeared automatically because isOpen started as true.
            </p>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Got it!
            </Button>
          </div>
        </Dialog>
      </>
    </SnippetPreview>
  );
};

// Prevent Overlay Click Dialog
export const PreventOverlayClickDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const preventOverlayCode = `
import { Dialog } from "@/components/custom/Dialog";
import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";

export const PreventOverlayClickDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="destructive"
      >
        <AlertCircle className="w-4 h-4 mr-2" />
        Important Action
      </Button>
      <Dialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Confirm Action"
        description="This requires explicit confirmation"
        closeOnOverlayClick={false}
        closeOnEscapeKey={false}
      >
        <div className="text-center space-y-4">
          <div className="text-4xl text-destructive">⚠️</div>
          <p className="text-foreground">
            This dialog cannot be closed by clicking outside or pressing escape. 
            You must use the buttons below.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="destructive">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};`;

  return (
    <SnippetPreview
      title="Prevent Overlay Click Dialog"
      code={preventOverlayCode}
    >
      <>
        <Button onClick={() => setIsOpen(true)} variant="destructive">
          <AlertCircle className="w-4 h-4 mr-2" />
          Important Action
        </Button>
        <Dialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Confirm Action"
          description="This requires explicit confirmation"
          closeOnOverlayClick={false}
          closeOnEscapeKey={false}
        >
          <div className="text-center space-y-4">
            <div className="text-4xl text-destructive">⚠️</div>
            <p className="text-foreground">
              This dialog cannot be closed by clicking outside or pressing
              escape. You must use the buttons below.
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="destructive">
                Confirm
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    </SnippetPreview>
  );
};

// Custom Styled Dialog
export const CustomStyledDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const customStyledCode = `
import { Dialog } from "@/components/custom/Dialog";
import { Button } from "@/components/ui/Button";
import { Zap } from "lucide-react";

export const CustomStyledDialogExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500"
      >
        <Zap className="w-4 h-4 mr-2" />
        Premium Dialog
      </Button>
      <Dialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="Premium Features"
        description="Advanced styling and customization options"
        contentClassName="max-w-lg bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-950 dark:via-slate-900 dark:to-cyan-950 border-indigo-200 dark:border-indigo-800"
        overlayClassName="bg-indigo-900/40 backdrop-blur-md"
        titleClassName="text-indigo-900 dark:text-indigo-100 text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
        descriptionClassName="text-indigo-700 dark:text-indigo-300"
        showCloseButton={false}
      >
        <div className="space-y-6">
          <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-indigo-200 dark:border-indigo-700 backdrop-blur-sm">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center">
              <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
              Custom Styling
            </h4>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">
              This dialog showcases advanced styling with gradients, backdrop blur, and custom color schemes.
            </p>
          </div>
          <div className="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
            <span className="text-cyan-800 dark:text-cyan-300 font-medium">
              Professional Design System
            </span>
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-lg"></div>
          </div>
          <Button 
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg"
          >
            Understood
          </Button>
        </div>
      </Dialog>
    </>
  );
};`;

  return (
    <SnippetPreview title="Custom Styled Dialog" code={customStyledCode}>
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500"
        >
          <Zap className="w-4 h-4 mr-2" />
          Premium Dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          title="Premium Features"
          description="Advanced styling and customization options"
          contentClassName="max-w-lg bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-950 dark:via-slate-900 dark:to-cyan-950 border-indigo-200 dark:border-indigo-800"
          overlayClassName="bg-indigo-900/40 backdrop-blur-md"
          titleClassName="text-indigo-900 dark:text-indigo-100 text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent"
          descriptionClassName="text-indigo-700 dark:text-indigo-300"
          showCloseButton={false}
        >
          <div className="space-y-6">
            <div className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-indigo-200 dark:border-indigo-700 backdrop-blur-sm">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                Custom Styling
              </h4>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm">
                This dialog showcases advanced styling with gradients, backdrop
                blur, and custom color schemes.
              </p>
            </div>
            <div className="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
              <span className="text-cyan-800 dark:text-cyan-300 font-medium">
                Professional Design System
              </span>
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-lg"></div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg"
            >
              Understood
            </Button>
          </div>
        </Dialog>
      </>
    </SnippetPreview>
  );
};
