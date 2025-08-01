"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogAction,
} from "@/components/custom/Dialog";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { PasswordInput } from "@/components/custom/PasswordInput";
import { Label } from "@/components/custom/Label";
import { useToast } from "@/hooks/useToast";

export const SimpleDialogExample = () => {
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    toast.success({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  const code = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogAction,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Label } from "@/components/ui/Label";

export const SimpleDialogExample = () => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    toast.success({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <DialogFooter>
         <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
          <DialogAction onClick={handleLogin} loading={loading}>
            Login
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};`;

  return (
    <SnippetPreview title="Simple Dialog" code={code}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" placeholder="Enter your password" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogAction onClick={handleLogin} isLoading={loading}>
              Login
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SnippetPreview>
  );
};

export const ControlledDialogExample = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toast = useToast();

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setOpen(false);
    toast.success({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  const code = `import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogAction,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Label } from "@/components/ui/Label";

export const ControlledDialogExample = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

   const toast = useToast();


  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setOpen(false);
    toast.success({
      title: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email-controlled">Email</Label>
            <Input type="email" id="email-controlled" placeholder="Email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password-controlled">Password</Label>
            <PasswordInput
              id="password-controlled"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <DialogFooter>
         <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
          <DialogAction onClick={handleLogin} loading={loading}>
            Login
          </DialogAction>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};`;

  return (
    <SnippetPreview title="Controlled Dialog" code={code}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome Back</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email-controlled">Email</Label>
              <Input type="email" id="email-controlled" placeholder="Email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password-controlled">Password</Label>
              <PasswordInput
                id="password-controlled"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={loading} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogAction onClick={handleLogin} isLoading={loading}>
              Login
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SnippetPreview>
  );
};
