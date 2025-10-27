export const BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/components/custom/";

export const CHART_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/components/custom/Chart/";

export const ANIMATED_BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/components/animated/";

export const HOOK_BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/Hooks/";

export const components = {
  AdvancedForm: {
    url: `${BASE_URL}AdvancedForm.tsx`,
    deps: {},
    requires: [
      "Button",
      "Input",
      "Checkbox",
      "RadioGroup",
      "Switch",
      "Select",
      "MultiSelect",
      "Textarea",
      "Label",
      "Stepper",
      "Tooltip",
      "ImageInput",
      "Slider",
      "RangeSlider",
      "FormSkeleton",
      "DatePicker",
      "MultiInput",
      "CheckboxGroup",
      "ImageInput",
      "DateRangePicker",
      "PasswordInput",
    ],
  },
  Accordion: {
    url: `${BASE_URL}Accordion.tsx`,
    deps: {},
  },
  ActionSheet: {
    url: `${BASE_URL}ActionSheet.tsx`,
    deps: {},
    requires: ["Button"],
  },
  Alert: {
    url: `${BASE_URL}Alert.tsx`,
    deps: {},
  },

  AlertDialog: {
    url: `${BASE_URL}AlertDialog.tsx`,
    deps: {},
    requires: ["Button"],
  },
  Avatar: {
    url: `${BASE_URL}Avatar.tsx`,
    deps: {},
    requires: ["Tooltip"],
  },
  AvatarGroup: {
    url: `${BASE_URL}AvatarGroup.tsx`,
    deps: {},
    requires: ["Avatar"],
  },
  Button: {
    url: `${BASE_URL}Button.tsx`,
    deps: {},
  },
  ButtonGroup: {
    url: `${BASE_URL}ButtonGroup.tsx`,
    deps: {},
  },
  Badge: {
    url: `${BASE_URL}Badge.tsx`,
    deps: {},
  },
  Checkbox: {
    url: `${BASE_URL}Checkbox.tsx`,
    deps: {},
    requires: ["Label"],
  },
  CheckboxGroup: {
    url: `${BASE_URL}CheckboxGroup.tsx`,
    deps: {},
    requires: ["Checkbox"],
  },
  Card: {
    url: `${BASE_URL}Card.tsx`,
    deps: {},
  },
  ContextMenu: {
    url: `${BASE_URL}ContextMenu.tsx`,
    deps: {},
  },
  DatePicker: {
    url: `${BASE_URL}DatePicker.tsx`,
    deps: {},
    requires: ["Tooltip", "Button", "Input", "Select"],
  },
  DateRangePicker: {
    url: `${BASE_URL}DateRangePicker.tsx`,
    deps: {},
    requires: ["Tooltip", "Button", "Select"],
  },
  Dialog: {
    url: `${BASE_URL}Dialog.tsx`,
    deps: {},
    requires: ["Button"],
  },
  Filter: {
    url: `${BASE_URL}Filter.tsx`,
    deps: {},
    requires: [
      "Input",
      "Checkbox",
      "CheckboxGroup",
      "RadioGroup",
      "Select",
      "MultiSelect",
      "MultiInput",
      "Slider",
      "RangeSlider",
      "Switch",
      "DatePicker",
      "DateRangePicker",
      "Textarea",
      "Badge",
      "Separator",
      "Label",
    ],
  },

  Form: {
    url: `${BASE_URL}Form.tsx`,
    deps: {},
    requires: ["Label"],
  },
  Input: {
    url: `${BASE_URL}Input.tsx`,
    deps: {},
  },

  ImageInput: {
    url: `${BASE_URL}ImageInput.tsx`,
    deps: {},
  },
  Label: {
    url: `${BASE_URL}Label.tsx`,
    deps: {},
  },
  RadioGroup: {
    url: `${BASE_URL}RadioGroup.tsx`,
    deps: {},
  },
  Select: {
    url: `${BASE_URL}Select.tsx`,
    deps: {},
  },
  Skeleton: {
    url: `${BASE_URL}Skeleton.tsx`,
    deps: {},
  },
  Stepper: {
    url: `${BASE_URL}Stepper.tsx`,
    deps: {},
  },
  MultiSelect: {
    url: `${BASE_URL}MultiSelect.tsx`,
    deps: {},
  },
  MultiInput: {
    url: `${BASE_URL}MultiInput.tsx`,
    deps: {},
    requires: ["Badge"],
  },

  PasswordInput: {
    url: `${BASE_URL}PasswordInput.tsx`,
    deps: {},
    requires: ["Button", "Input"],
  },
  Switch: {
    url: `${BASE_URL}Switch.tsx`,
    deps: {},
  },

  Sidebar: {
    url: `${BASE_URL}Sidebar.tsx`,
    deps: {},
    requires: ["Button"],
  },

  Slider: {
    url: `${BASE_URL}Slider.tsx`,
    deps: {},
  },
  Separator: {
    url: `${BASE_URL}Separator.tsx`,
    deps: {},
  },
  SearchBox: {
    url: `${BASE_URL}SearchBox.tsx`,
    deps: {},
    requires: ["Input"],
  },
  RangeSlider: {
    url: `${BASE_URL}RangeSlider.tsx`,
    deps: {},
  },
  Tabs: {
    url: `${BASE_URL}Tabs.tsx`,
    deps: {},
  },
  Textarea: {
    url: `${BASE_URL}Textarea.tsx`,
    deps: {},
  },
  Tooltip: {
    url: `${BASE_URL}Tooltip.tsx`,
    deps: {},
  },
  Table: {
    url: `${BASE_URL}Table.tsx`,
    deps: {},
    requires: ["Button", "Checkbox", "Input"],
  },
  Toast: {
    url: `${BASE_URL}Toast.tsx`,
    deps: {},
    hooks: ["useToast"],
  },
  MultiTooltip: {
    url: `${BASE_URL}MultiTooltip.tsx`,
    deps: {},
  },

  OtpInput: {
    url: `${BASE_URL}OtpInput.tsx`,
    deps: {},
  },

  Popover: {
    url: `${BASE_URL}Popover.tsx`,
    deps: {},
  },

  KanbanBoard: {
    url: `${BASE_URL}KanbanBoard.tsx`,
    deps: {},
  },

  //Charts
  AreaChart: {
    url: `${CHART_URL}AreaChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },

  BarChart: {
    url: `${CHART_URL}BarChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },

  LineChart: {
    url: `${CHART_URL}LineChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },

  PieChart: {
    url: `${CHART_URL}PieChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },

  RadarChart: {
    url: `${CHART_URL}RadarChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },

  ComposedChart: {
    url: `${CHART_URL}ComposedChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },
  FunnelChart: {
    url: `${CHART_URL}FunnelChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },
  ScatterChart: {
    url: `${CHART_URL}ScatterChart.tsx`,
    deps: { recharts: "^3.2.1" },
  },
  //Animated Components

  FloatingCode: {
    url: `${ANIMATED_BASE_URL}FloatingCode.tsx`,
    deps: {},
  },
  ParticleBackground: {
    url: `${ANIMATED_BASE_URL}ParticleBackground.tsx`,
    deps: {},
  },
  DraggableCards: {
    url: `${ANIMATED_BASE_URL}DraggableCards.tsx`,
    deps: {},
  },
  MorphButton: {
    url: `${ANIMATED_BASE_URL}MorphButton.tsx`,
    deps: {},
  },
  CardStack: {
    url: `${ANIMATED_BASE_URL}CardStack.tsx`,
    deps: {},
  },
  AnimatedList: {
    url: `${ANIMATED_BASE_URL}AnimatedList.tsx`,
    deps: {},
  },
  SocialCard: {
    url: `${ANIMATED_BASE_URL}SocialCard.tsx`,
    deps: {},
  },
  SwipeStack: {
    url: `${ANIMATED_BASE_URL}SwipeStack.tsx`,
    deps: {},
  },
};
