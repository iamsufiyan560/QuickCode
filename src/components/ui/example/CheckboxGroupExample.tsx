"use client";

import React from "react";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultCheckboxGroupExample = () => {
  const [notifications, setNotifications] = React.useState(["email"]);

  const code = `import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export const DefaultCheckboxGroupExample = () => {
  const [notifications, setNotifications] = React.useState(["email"]);

  return (
    <CheckboxGroup
      value={notifications}
      onValueChange={setNotifications}
      label="Notifications"
    >
      <CheckboxGroup.Item value="email" label="Email notifications" />
      <CheckboxGroup.Item value="sms" label="SMS notifications" />
      <CheckboxGroup.Item value="push" label="Push notifications" />
    </CheckboxGroup>
  );
};`;

  return (
    <SnippetPreview title="Basic Usage" code={code}>
      <CheckboxGroup
        value={notifications}
        onValueChange={setNotifications}
        label="Notifications"
      >
        <CheckboxGroup.Item value="email" label="Email notifications" />
        <CheckboxGroup.Item value="sms" label="SMS notifications" />
        <CheckboxGroup.Item value="push" label="Push notifications" />
      </CheckboxGroup>
    </SnippetPreview>
  );
};

export const CheckboxGroupWithDescriptionExample = () => {
  const [permissions, setPermissions] = React.useState(["read"]);

  const code = `import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export const CheckboxGroupWithDescriptionExample = () => {
  const [permissions, setPermissions] = React.useState(["read"]);

  return (
    <CheckboxGroup
      value={permissions}
      onValueChange={setPermissions}
      label="User Permissions"
      description="Select the permissions you want to grant to this user"
    >
      <CheckboxGroup.Item value="read" label="Read access" />
      <CheckboxGroup.Item value="write" label="Write access" />
      <CheckboxGroup.Item value="delete" label="Delete access" />
      <CheckboxGroup.Item value="admin" label="Admin privileges" />
    </CheckboxGroup>
  );
};`;

  return (
    <SnippetPreview title="With Description" code={code}>
      <CheckboxGroup
        value={permissions}
        onValueChange={setPermissions}
        label="User Permissions"
        description="Select the permissions you want to grant to this user"
      >
        <CheckboxGroup.Item value="read" label="Read access" />
        <CheckboxGroup.Item value="write" label="Write access" />
        <CheckboxGroup.Item value="delete" label="Delete access" />
        <CheckboxGroup.Item value="admin" label="Admin privileges" />
      </CheckboxGroup>
    </SnippetPreview>
  );
};
