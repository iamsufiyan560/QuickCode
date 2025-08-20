"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/custom/RadioGroup";
import { Label } from "@/components/custom/Label";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultRadioGroupExample = () => {
  const defaultRadioGroupCode = `
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

export const DefaultRadioGroupExample = () => {
  return (
    <RadioGroup defaultValue="medium">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="small" id="r1" />
        <Label htmlFor="r1">Small</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="medium" id="r2" />
        <Label htmlFor="r2">Medium</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="large" id="r3" />
        <Label htmlFor="r3">Large</Label>
      </div>
    </RadioGroup>
  );
};
`;

  return (
    <SnippetPreview title="Default Radio Group" code={defaultRadioGroupCode}>
      <RadioGroup defaultValue="medium">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="small" id="r1" />
          <Label htmlFor="r1">Small</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="medium" id="r2" />
          <Label htmlFor="r2">Medium</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="large" id="r3" />
          <Label htmlFor="r3">Large</Label>
        </div>
      </RadioGroup>
    </SnippetPreview>
  );
};

export const PaymentMethodExample = () => {
  const paymentMethodCode = `
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

export const PaymentMethodExample = () => {
  return (
    <RadioGroup defaultValue="card">
      <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
        <RadioGroupItem value="card" id="payment-card" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-card" className="font-medium">
            Credit Card
          </Label>
          <p className="text-sm text-muted-foreground">
            Pay with your credit or debit card
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
        <RadioGroupItem value="paypal" id="payment-paypal" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-paypal" className="font-medium">
            PayPal
          </Label>
          <p className="text-sm text-muted-foreground">
            Secure payment through PayPal
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
        <RadioGroupItem value="bank" id="payment-bank" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-bank" className="font-medium">
            Bank Transfer
          </Label>
          <p className="text-sm text-muted-foreground">
            Direct bank account transfer
          </p>
        </div>
      </div>
    </RadioGroup>
  );
};
`;

  return (
    <SnippetPreview title="Payment Method Selection" code={paymentMethodCode}>
      <RadioGroup defaultValue="card">
        <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
          <RadioGroupItem value="card" id="payment-card" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-card" className="font-medium">
              Credit Card
            </Label>
            <p className="text-sm text-muted-foreground">
              Pay with your credit or debit card
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
          <RadioGroupItem value="paypal" id="payment-paypal" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-paypal" className="font-medium">
              PayPal
            </Label>
            <p className="text-sm text-muted-foreground">
              Secure payment through PayPal
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
          <RadioGroupItem value="bank" id="payment-bank" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-bank" className="font-medium">
              Bank Transfer
            </Label>
            <p className="text-sm text-muted-foreground">
              Direct bank account transfer
            </p>
          </div>
        </div>
      </RadioGroup>
    </SnippetPreview>
  );
};

export const ControlledRadioGroupExample = () => {
  const [selectedPlan, setSelectedPlan] = React.useState("pro");

  const controlledRadioGroupCode = `
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

export const ControlledRadioGroupExample = () => {
  const [selectedPlan, setSelectedPlan] = React.useState("pro");

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="basic" id="plan-basic" />
          <Label htmlFor="plan-basic">Basic Plan - $9/month</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="pro" id="plan-pro" />
          <Label htmlFor="plan-pro">Pro Plan - $29/month</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="enterprise" id="plan-enterprise" />
          <Label htmlFor="plan-enterprise">Enterprise Plan - $99/month</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">
        Selected plan: {selectedPlan}
      </p>
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Controlled Radio Group"
      code={controlledRadioGroupCode}
    >
      <div className="space-y-4">
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="basic" id="plan-basic" />
            <Label htmlFor="plan-basic">Basic Plan - $9/month</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="pro" id="plan-pro" />
            <Label htmlFor="plan-pro">Pro Plan - $29/month</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="enterprise" id="plan-enterprise" />
            <Label htmlFor="plan-enterprise">Enterprise Plan - $99/month</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          Selected plan: {selectedPlan}
        </p>
      </div>
    </SnippetPreview>
  );
};

export const DisabledRadioGroupExample = () => {
  const disabledRadioGroupCode = `
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";

export const DisabledRadioGroupExample = () => {
  return (
    <RadioGroup defaultValue="option2" disabled>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option1" id="disabled-1" />
        <Label htmlFor="disabled-1">Option 1 (Disabled)</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option2" id="disabled-2" />
        <Label htmlFor="disabled-2">Option 2 (Disabled)</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="option3" id="disabled-3" disabled />
        <Label htmlFor="disabled-3">Option 3 (Individual Disabled)</Label>
      </div>
    </RadioGroup>
  );
};
`;

  return (
    <SnippetPreview title="Disabled Radio Group" code={disabledRadioGroupCode}>
      <RadioGroup defaultValue="option2" disabled>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option1" id="disabled-1" />
          <Label htmlFor="disabled-1">Option 1 (Disabled)</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option2" id="disabled-2" />
          <Label htmlFor="disabled-2">Option 2 (Disabled)</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="option3" id="disabled-3" disabled />
          <Label htmlFor="disabled-3">Option 3 (Individual Disabled)</Label>
        </div>
      </RadioGroup>
    </SnippetPreview>
  );
};
