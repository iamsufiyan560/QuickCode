"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultCheckboxExample = () => {
  const [checked, setChecked] = useState(false);

  const defaultCheckboxCode = `
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";

export const DefaultCheckboxExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms and conditions"
      id="terms"
    />
  );
};
`;

  return (
    <SnippetPreview title="Default Checkbox" code={defaultCheckboxCode}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Accept terms and conditions"
        id="terms"
      />
    </SnippetPreview>
  );
};

export const SizeVariantsExample = () => {
  const [smallChecked, setSmallChecked] = useState(true);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [largeChecked, setLargeChecked] = useState(true);

  const sizeVariantsCode = `
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";

export const SizeVariantsExample = () => {
  const [smallChecked, setSmallChecked] = useState(true);
  const [mediumChecked, setMediumChecked] = useState(false);
  const [largeChecked, setLargeChecked] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
          id="small"
        size="sm"
        checked={smallChecked}
        onChange={setSmallChecked}
        label="Small checkbox"
      />
      <Checkbox
         id="medium"
        size="md"
        checked={mediumChecked}
        onChange={setMediumChecked}
        label="Medium checkbox"
      />
      <Checkbox
         id="large"
        size="lg"
        checked={largeChecked}
        onChange={setLargeChecked}
        label="Large checkbox"
      />
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Size Variants" code={sizeVariantsCode}>
      <div className="flex flex-col gap-4">
        <Checkbox
          id="small"
          size="sm"
          checked={smallChecked}
          onChange={setSmallChecked}
          label="Small checkbox"
        />
        <Checkbox
          id="medium"
          size="md"
          checked={mediumChecked}
          onChange={setMediumChecked}
          label="Medium checkbox"
        />
        <Checkbox
          id="large"
          size="lg"
          checked={largeChecked}
          onChange={setLargeChecked}
          label="Large checkbox"
        />
      </div>
    </SnippetPreview>
  );
};

export const DisabledStatesExample = () => {
  const [uncheckedState, setUncheckedState] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(true);

  const disabledStatesCode = `
import { Checkbox } from "@/components/ui/Checkbox";

export const DisabledStatesExample = () => {
  const [uncheckedState, setUncheckedState] = React.useState(false);
  const [checkedState, setCheckedState] = React.useState(true);

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
      id="disabled-unchecked"
        checked={uncheckedState}
        onChange={setUncheckedState}
        disabled
        label="Disabled unchecked"
      />
      <Checkbox
         id="disabled-checked"
        checked={checkedState}
        onChange={setCheckedState}
        disabled
        label="Disabled checked"
      />
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Disabled States" code={disabledStatesCode}>
      <div className="flex flex-col gap-4">
        <Checkbox
          id="disabled-unchecked"
          checked={uncheckedState}
          onChange={setUncheckedState}
          disabled
          label="Disabled unchecked"
        />
        <Checkbox
          id="disabled-checked"
          checked={checkedState}
          onChange={setCheckedState}
          disabled
          label="Disabled checked"
        />
      </div>
    </SnippetPreview>
  );
};

export const FormIntegrationExample = () => {
  const [formData, setFormData] = useState({
    newsletter: true,
    marketing: false,
    updates: false,
  });

  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: checked }));
  };

  const formIntegrationCode = `
import { Checkbox } from "@/components/ui/Checkbox";
import { useState } from "react";

export const FormIntegrationExample = () => {
  const [formData, setFormData] = useState({
    newsletter: true,
    marketing: false,
    updates: false,
  });

  const handleCheckboxChange = (key: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="space-y-4 p-4 border border-border rounded-lg">
      <h3 className="font-medium text-foreground mb-3">Email Preferences</h3>
      <Checkbox
        checked={formData.newsletter}
        onChange={handleCheckboxChange('newsletter')}
        label="Weekly newsletter"
        id="newsletter"
      />
      <Checkbox
        checked={formData.marketing}
        onChange={handleCheckboxChange('marketing')}
        label="Marketing emails"
        id="marketing"
      />
      <Checkbox
        checked={formData.updates}
        onChange={handleCheckboxChange('updates')}
        label="Product updates"
        id="updates"
      />
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Form Integration" code={formIntegrationCode}>
      <div className="space-y-4  p-4 border border-border rounded-lg">
        <h3 className="font-medium text-foreground mb-3">Email Preferences</h3>
        <div className="flex flex-col gap-2">
          <Checkbox
            checked={formData.newsletter}
            onChange={handleCheckboxChange("newsletter")}
            label="Weekly newsletter"
            id="newsletter"
          />
          <Checkbox
            checked={formData.marketing}
            onChange={handleCheckboxChange("marketing")}
            label="Marketing emails"
            id="marketing"
          />
          <Checkbox
            checked={formData.updates}
            onChange={handleCheckboxChange("updates")}
            label="Product updates"
            id="updates"
          />
        </div>
      </div>
    </SnippetPreview>
  );
};
