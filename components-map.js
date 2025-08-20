import { Select } from "nextra/components";

export const BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/components/custom/";

export const ANIMATED_BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/components/animated/";

export const HOOK_BASE_URL =
  "https://github.com/iamsufiyan560/QuickCode/blob/main/src/Hooks/";

export const components = {
  Accordion: {
    url: `${BASE_URL}Accordion.tsx`,
    deps: {},
  },
  ActionSheet: {
    url: `${BASE_URL}ActionSheet.tsx`,
    deps: {},
    requires: ["Button"],
  },
  Button: {
    url: `${BASE_URL}Button.tsx`,
    deps: {},
  },
  Checkbox: {
    url: `${BASE_URL}Checkbox.tsx`,
    deps: {},
    requires: ["Label"],
  },
  Card: {
    url: `${BASE_URL}Card.tsx`,
    deps: {},
  },
  Dialog: {
    url: `${BASE_URL}Dialog.tsx`,
    deps: {},
    requires: ["Button"],
  },

  Input: {
    url: `${BASE_URL}Input.tsx`,
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
  Switch: {
    url: `${BASE_URL}Switch.tsx`,
    deps: {},
  },
  Textarea: {
    url: `${BASE_URL}Textarea.tsx`,
    deps: {},
  },
  Slider: {
    url: `${BASE_URL}Slider.tsx`,
    deps: {},
  },
  RangeSlider: {
    url: `${BASE_URL}RangeSlider.tsx`,
    deps: {},
  },
  Tabs: {
    url: `${BASE_URL}Tabs.tsx`,
    deps: {},
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
};

// "Chart/AreaChart": {
//   url: `${BASE_URL}Chart/AreaChart.tsx`,
//   deps: { recharts: "^2.13.0" },
// },
// "Chart/BarChart": {
//   url: `${BASE_URL}Chart/BarChart.tsx`,
//   deps: { recharts: "^2.13.0" },
// },
