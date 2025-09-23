"use client";
import React from "react";
import { ToastProvider } from "@/components/custom/Toast";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Heart, Zap } from "lucide-react";
import { Button } from "../Button";
import { useToast } from "@/hooks/useToast";

const defaultExampleCode = `import { Button } from '@/components/ui/Button';
import { ToastProvider, useToast } from '@/components/ui/Toast';

function ToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() =>
          toast.success({
            title: "Order confirmed!",
            description: "Your order has been placed successfully.",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Payment failed",
            description: "Please check your payment method.",
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          toast.warning({
            title: "Low inventory",
            description: "Only 2 items left in stock.",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.info({
            title: "New feature available",
            description: "Check out our updated dashboard.",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}`;

function ToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-2 flex-wrap ">
      <Button
        onClick={() =>
          toast.success({
            title: "Order confirmed!",
            description: "Your order has been placed successfully.",
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Payment failed",
            description: "Please check your payment method.",
          })
        }
      >
        Error
      </Button>
      <Button
        onClick={() =>
          toast.warning({
            title: "Low inventory",
            description: "Only 2 items left in stock.",
          })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast.info({
            title: "New feature available",
            description: "Check out our updated dashboard.",
          })
        }
      >
        Info
      </Button>
    </div>
  );
}

export function DefaultExample() {
  return (
    <ToastProvider>
      <SnippetPreview title="Default one" code={defaultExampleCode}>
        <ToastDemo />
      </SnippetPreview>
    </ToastProvider>
  );
}

const positionExampleCode = `import { Button } from '@/components/ui/Button';
import { ToastProvider, useToast } from '@/components/ui/Toast';


function PositionDemo() {
  const toast = useToast();

  return (
    <div className=" flex flex-wrap md:grid grid-cols-3 gap-2 max-w-md">
      <Button
        size="sm"
        onClick={() =>
          toast.success({ title: "Top Left", position: "top-left" })
        }
      >
        Top Left
      </Button>

      <Button
        size="sm"
        onClick={() =>
          toast.success({ title: "Top Center", position: "top-center" })
        }
      >
        Top Center
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.success({ title: "Top Right", position: "top-right" })
        }
      >
        Top Right
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Left", position: "bottom-left" })
        }
      >
        Bottom Left
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Center", position: "bottom-center" })
        }
      >
        Bottom Center
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Right", position: "bottom-right" })
        }
      >
        Bottom Right
      </Button>
    </div>
  );
}

function App() {
  return (
    <ToastProvider position="bottom-right">
      <PositionDemo />
    </ToastProvider>
  );
}`;

function PositionDemo() {
  const toast = useToast();

  return (
    <div className=" flex flex-wrap md:grid grid-cols-3 gap-2 max-w-md">
      <Button
        size="sm"
        onClick={() =>
          toast.success({
            title: "Top Left",
            position: "top-left",
          })
        }
      >
        Top Left
      </Button>

      <Button
        size="sm"
        onClick={() =>
          toast.success({ title: "Top Center", position: "top-center" })
        }
      >
        Top Center
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.success({ title: "Top Right", position: "top-right" })
        }
      >
        Top Right
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Left", position: "bottom-left" })
        }
      >
        Bottom Left
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Center", position: "bottom-center" })
        }
      >
        Bottom Center
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast.info({ title: "Bottom Right", position: "bottom-right" })
        }
      >
        Bottom Right
      </Button>
    </div>
  );
}

export function PositionExample() {
  return (
    <ToastProvider position="bottom-right">
      <SnippetPreview title="All Position" code={positionExampleCode}>
        <PositionDemo />
      </SnippetPreview>
    </ToastProvider>
  );
}

const customConfigExampleCode = `import { Button } from '@/components/ui/Button';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { Heart, Zap } from 'lucide-react';

const customConfig = {
  success: {
    icon: Heart,
    className: 'bg-green-500 border-green-600 text-white',
  },
  error: {
    icon: Zap,
    className: 'bg-red-500 border-red-600 text-white',
  },
};

function CustomToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() =>
          toast.success({
            title: "Custom Success!",
            description: "This uses a custom heart icon and dark styling.",
          })
        }
      >
        Custom Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Custom Error!",
            description: "This uses a custom zap icon and dark styling.",
          })
        }
      >
        Custom Error
      </Button>
      <Button
        onClick={() =>
          toast.info({
            title: "Override at call",
            description: "This overrides the config with a custom icon.",
            icon: Zap,
            className: "bg-purple-500 border-purple-600 text-white",
          })
        }
      >
        Override Config
      </Button>
    </div>
  );
}

function App() {
  return (
    <ToastProvider config={customConfig} position="top-center">
      <CustomToastDemo />
    </ToastProvider>
  );
}`;

function CustomToastDemo() {
  const toast = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        onClick={() =>
          toast.success({
            title: "Custom Success!",
            description: "This uses a custom heart icon and dark styling.",
          })
        }
      >
        Custom Success
      </Button>
      <Button
        onClick={() =>
          toast.error({
            title: "Custom Error!",
            description: "This uses a custom zap icon and dark styling.",
          })
        }
      >
        Custom Error
      </Button>
      <Button
        onClick={() =>
          toast.info({
            title: "Override at call",
            description: "This overrides the config with a custom icon.",
            icon: Zap,
            className: "bg-purple-500 border-purple-600 text-white",
          })
        }
      >
        Override Config
      </Button>
    </div>
  );
}

const customConfig = {
  success: {
    icon: Heart,
    className: "bg-green-500 border-green-600 text-white",
  },
  error: {
    icon: Zap,
    className: "bg-red-500 border-red-600 text-white",
  },
};

export function CustomConfigExample() {
  return (
    <ToastProvider config={customConfig} position="top-center">
      <SnippetPreview title="Custom Config" code={customConfigExampleCode}>
        <CustomToastDemo />
      </SnippetPreview>
    </ToastProvider>
  );
}
