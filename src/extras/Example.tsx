import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Copy, Zap } from "lucide-react";
import { Edit3, Share2, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/ui/ActionSheet";

import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
} from "@/components/ui/MultiSelect";
import React from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import { AdvancedForm } from "@/components/ui/AdvancedForm";

export const DefaultTabsExample = () => {
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>(
    []
  );

  return (
    <Tabs defaultValue="MultiSelect">
      <TabsList>
        <TabsTrigger value="MultiSelect">Multi Select</TabsTrigger>
        <TabsTrigger value="DatePicker">DatePicker</TabsTrigger>
        <TabsTrigger value="ActionSheet">ActionSheet</TabsTrigger>
        <TabsTrigger value="AdvanceForm">AdvanceForm</TabsTrigger>
      </TabsList>

      <TabsContent value="MultiSelect">
        <div className="p-6 bg-secondary rounded-lg mx-auto flex justify-center w-full">
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Select Your Tech Stack
            </h3>
            <MultiSelect
              values={selectedFrameworks}
              onValuesChange={setSelectedFrameworks}
            >
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Choose frontend frameworks" />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectItem value="React">React</MultiSelectItem>
                <MultiSelectItem value="Vue.js">Vue.js</MultiSelectItem>
                <MultiSelectItem value="Angular">Angular</MultiSelectItem>
                <MultiSelectItem value="Svelte">Svelte</MultiSelectItem>
                <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
                <MultiSelectItem value="Nuxt.js">Nuxt.js</MultiSelectItem>
                <MultiSelectItem value="Remix">Remix</MultiSelectItem>
                <MultiSelectItem value="Astro">Astro</MultiSelectItem>
                <MultiSelectItem value="SolidJS">SolidJS</MultiSelectItem>
                <MultiSelectItem value="Qwik">Qwik</MultiSelectItem>
              </MultiSelectContent>
            </MultiSelect>
            <div className="text-sm text-muted-foreground text-center">
              Select multiple options, and see tags in action
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="DatePicker">
        <div className="p-6 bg-secondary rounded-lg mx-auto flex justify-center w-full">
          <ProjectCalendarDemo />
        </div>
      </TabsContent>

      <TabsContent value="ActionSheet">
        <div className="p-6 bg-secondary rounded-lg mx-auto grid grid-cols-2 gap-4 w-full">
          <QuickActionsDemo />
          <FileOptionsDemo />
          <EditToolsDemo />
          <ShareOptionsDemo />
        </div>
      </TabsContent>

      <TabsContent value="AdvanceForm">
        <div className="pb-4">
          <CompactRegistrationForm />
        </div>
      </TabsContent>
    </Tabs>
  );
};

const ProjectCalendarDemo = () => {
  const [projectDeadline, setProjectDeadline] = React.useState<Date | null>(
    null
  );

  const holidays = [
    new Date("2025-09-02"),
    new Date("2025-09-15"),
    new Date("2025-09-22"),
  ];

  const specialDays = [
    {
      date: new Date("2025-09-05"),
      className: "bg-chart-1/20 text-chart-1 hover:bg-chart-1/30",
      label: "Sprint Planning",
    },
    {
      date: new Date("2025-09-12"),
      className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
      label: "Product Demo",
    },
    {
      date: new Date("2025-09-19"),
      className: "bg-chart-3/20 text-chart-3 hover:bg-chart-3/30",
      label: "Code Review",
    },
    {
      date: new Date("2025-09-26"),
      className: "bg-chart-4/20 text-chart-4 hover:bg-chart-4/30",
      label: "Release Date",
    },
  ];

  return (
    <div className="w-full max-w-sm space-y-3">
      <h3 className="text-lg font-semibold text-center">Project Timeline</h3>
      <DatePicker
        value={projectDeadline}
        onChange={setProjectDeadline}
        minDate={new Date()}
        holidays={holidays}
        specialDays={specialDays}
        disableWeekends
        disableHolidays
        placeholder="Select project deadline"
      />
      <div className="text-xs text-muted-foreground space-y-1 px-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-destructive/20 rounded"></div>
          <span>Holidays (Labor Day, Mid-Autumn, Equinox)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-chart-1/20 rounded"></div>
          <span>Sprint Planning (Sep 5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-chart-2/20 rounded"></div>
          <span>Product Demo (Sep 12)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-chart-3/20 rounded"></div>
          <span>Code Review (Sep 19)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-chart-4/20 rounded"></div>
          <span>Release Date (Sep 26)</span>
        </div>
        <div className="text-muted-foreground/80">
          • Weekends disabled • Holidays disabled
        </div>
      </div>
    </div>
  );
};

const quickActions: ActionSheetAction[] = [
  {
    label: "Quick Edit",
    onClick: () => console.log("Quick Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Share Link",
    onClick: () => console.log("Share Link clicked"),
    icon: <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Delete Item",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const QuickActionsDemo = () => {
  return (
    <ActionSheet position="bottom">
      <ActionSheet.Trigger>Quick Actions</ActionSheet.Trigger>
      <ActionSheet.Header>
        <ActionSheet.Title>Quick Actions</ActionSheet.Title>
        <ActionSheet.Description>
          Choose an action for this item.
        </ActionSheet.Description>
      </ActionSheet.Header>
      <ActionSheet.Content>
        <ActionSheet.Actions actions={quickActions} />
      </ActionSheet.Content>
      <ActionSheet.Footer />
    </ActionSheet>
  );
};

const fileActions: ActionSheetAction[] = [
  {
    label: "Copy Link",
    onClick: () => console.log("Copy clicked"),
    icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Remove clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const FileOptionsDemo = () => {
  return (
    <ActionSheet position="top">
      <ActionSheet.Trigger>File Options</ActionSheet.Trigger>
      <ActionSheet.Header>
        <ActionSheet.Title>File Options</ActionSheet.Title>
        <ActionSheet.Description>Manage your file.</ActionSheet.Description>
      </ActionSheet.Header>
      <ActionSheet.Content>
        <ActionSheet.Actions actions={fileActions} />
      </ActionSheet.Content>
      <ActionSheet.Footer />
    </ActionSheet>
  );
};

const editActions: ActionSheetAction[] = [
  {
    label: "Edit Content",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  },
  {
    label: "Duplicate",
    onClick: () => console.log("Duplicate clicked"),
    icon: <Copy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  },
];

export const EditToolsDemo = () => {
  return (
    <ActionSheet position="left">
      <ActionSheet.Trigger>Edit Tools</ActionSheet.Trigger>
      <ActionSheet.Header>
        <ActionSheet.Title>Edit Tools</ActionSheet.Title>
        <ActionSheet.Description>Modify your content.</ActionSheet.Description>
      </ActionSheet.Header>
      <ActionSheet.Content>
        <ActionSheet.Actions actions={editActions} />
      </ActionSheet.Content>
      <ActionSheet.Footer />
    </ActionSheet>
  );
};

const shareActions: ActionSheetAction[] = [
  {
    label: "Share Publicly",
    onClick: () => console.log("Share Public clicked"),
    icon: <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  },
  {
    label: "Remove Access",
    onClick: () => console.log("Remove Access clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const ShareOptionsDemo = () => {
  return (
    <ActionSheet position="right">
      <ActionSheet.Trigger>Share Options</ActionSheet.Trigger>
      <ActionSheet.Header>
        <ActionSheet.Title>Share Options</ActionSheet.Title>
        <ActionSheet.Description>
          Control access to your content.
        </ActionSheet.Description>
      </ActionSheet.Header>
      <ActionSheet.Content>
        <ActionSheet.Actions actions={shareActions} />
      </ActionSheet.Content>
      <ActionSheet.Footer />
    </ActionSheet>
  );
};

export const CompactRegistrationForm = () => {
  const handleSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Registration completed:", data);
  };

  return (
    <AdvancedForm
      onSubmit={handleSubmit}
      autoSave={false}
      className="max-w-3xl mx-auto"
    >
      <AdvancedForm.Header
        title="Join QuickCode UI"
        description="Get started with our component library"
      />

      <AdvancedForm.StepperProgress />

      <AdvancedForm.Form onSubmit={handleSubmit}>
        <AdvancedForm.Step
          id="account"
          title="Account Setup"
          description="Create your account"
        >
          <AdvancedForm.Group className="space-y-4">
            <AdvancedForm.Field
              id="fullName"
              validation={{
                required: true,
                minLength: 2,
                minLengthError: "Name must be at least 2 characters",
              }}
            >
              <AdvancedForm.Label required>Full Name</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="John Doe" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="email" validation={{ required: true }}>
              <AdvancedForm.Label required>Email Address</AdvancedForm.Label>
              <AdvancedForm.Input type="email" placeholder="john@company.com" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field
              id="password"
              validation={{ required: true, minLength: 8 }}
            >
              <AdvancedForm.Label required>Password</AdvancedForm.Label>
              <AdvancedForm.PasswordInput placeholder="Choose a strong password" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </AdvancedForm.Group>
        </AdvancedForm.Step>

        <AdvancedForm.Step
          id="profile"
          title="Profile Info"
          description="Tell us about yourself"
        >
          <AdvancedForm.Group className="space-y-4">
            <AdvancedForm.Field id="role" validation={{ required: true }}>
              <AdvancedForm.Label required>Your Role</AdvancedForm.Label>
              <AdvancedForm.Select placeholder="Select your role">
                <AdvancedForm.Select.Item value="developer">
                  Developer
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="designer">
                  Designer
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="pm">
                  Product Manager
                </AdvancedForm.Select.Item>
                <AdvancedForm.Select.Item value="marketing">
                  Marketing
                </AdvancedForm.Select.Item>
              </AdvancedForm.Select>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="company" validation={{ required: true }}>
              <AdvancedForm.Label required>Company Name</AdvancedForm.Label>
              <AdvancedForm.Input type="text" placeholder="Acme Corporation" />
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field
              id="experience"
              validation={{ required: true }}
              defaultValue={0}
            >
              <AdvancedForm.Label required>
                Years of Experience
              </AdvancedForm.Label>
              <AdvancedForm.Slider min={0} max={20} step={1} />
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </AdvancedForm.Group>
        </AdvancedForm.Step>

        <AdvancedForm.Step
          id="preferences"
          title="Preferences"
          description="Customize your experience"
        >
          <AdvancedForm.Group className="space-y-4">
            <AdvancedForm.Field id="notifications" defaultValue={false}>
              <AdvancedForm.Label htmlFor="notifications">
                Enable Email Notifications
              </AdvancedForm.Label>
              <AdvancedForm.Switch id="notifications">
                Receive updates via email
              </AdvancedForm.Switch>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="newsletter" defaultValue={false}>
              <AdvancedForm.Label htmlFor="newsletter">
                Subscribe to Product Updates
              </AdvancedForm.Label>
              <AdvancedForm.Checkbox id="newsletter">
                Subscribe to Product Updates
              </AdvancedForm.Checkbox>
              <AdvancedForm.Error />
            </AdvancedForm.Field>

            <AdvancedForm.Field id="terms" validation={{ required: true }}>
              <AdvancedForm.Label required htmlFor="terms">
                Terms & Conditions
              </AdvancedForm.Label>
              <AdvancedForm.Checkbox id="terms">
                I agree to the Terms of Service
              </AdvancedForm.Checkbox>
              <AdvancedForm.Error />
            </AdvancedForm.Field>
          </AdvancedForm.Group>
        </AdvancedForm.Step>

        <AdvancedForm.Actions>
          <div className="flex gap-3">
            <AdvancedForm.BackButton />
            <AdvancedForm.ResetButton />
          </div>
          <div className="flex gap-3">
            <AdvancedForm.NextButton />
            <AdvancedForm.SubmitButton>
              Create Account
            </AdvancedForm.SubmitButton>
          </div>
        </AdvancedForm.Actions>
      </AdvancedForm.Form>
    </AdvancedForm>
  );
};
