"use client";

import React, { useState } from "react";
import { UserPlus, Mail, Phone, Building } from "lucide-react";

import { Popover } from "@/components/custom/Popover";
import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { Label } from "@/components/custom/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const code = `import { Popover } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { UserPlus, Mail, Phone, Building } from "lucide-react";

export default function UserActionsPopover() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, phone });
  };

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Popover>
        <Popover.Trigger asChild>
          <Button className="inline-flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Contact
          </Button>
        </Popover.Trigger>
        <Popover.Content className="w-80">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Add New Contact</h4>
              <p className="text-sm text-muted-foreground">
                Enter contact details to add them to your network.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

            
            </div>

            <div className="flex gap-2 pt-2">
              <Popover.Close asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </Popover.Close>
              <Button type="submit" className="flex-1">
                Add Contact
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover>
    </div>
  );
}`;

export function UserActionsPopover() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, phone });
  };

  return (
    <SnippetPreview title="Default Example" code={code}>
      <div className="flex items-center justify-center min-h-[300px]">
        <Popover>
          <Popover.Trigger asChild>
            <Button className="inline-flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Add Contact
            </Button>
          </Popover.Trigger>
          <Popover.Content className="w-80">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Add New Contact</h4>
                <p className="text-sm text-muted-foreground">
                  Enter contact details to add them to your network.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Popover.Close asChild>
                  <Button variant="outline" type="button" className="flex-1">
                    Cancel
                  </Button>
                </Popover.Close>
                <Button type="submit" className="flex-1">
                  Add Contact
                </Button>
              </div>
            </form>
          </Popover.Content>
        </Popover>
      </div>
    </SnippetPreview>
  );
}
