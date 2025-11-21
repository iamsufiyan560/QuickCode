// // export default {
// //   index: {
// //     title: "Home",
// //     display: "hidden",
// //   },
// // };

// // export default {
// //   index: {
// //     title: "Getting Started",
// //     theme: {
// //       toc: true,
// //     },
// //   },
// // };

import type { MetaRecord } from "nextra";

export default {
  index: {
    type: "page",
    display: "hidden",
  },
  docs: {
    type: "page",
    title: "Documentation",

    items: {
      __1: {
        type: "separator",
        title: "Get Started",
      },
      index: "",
      Installation: "",

      __2: {
        type: "separator",
        title: "Components",
      },

      Accordion: "",
      ActionSheet: "",
      AdvancedForm: "",
      Alert: "",

      AlertDialog: "",
      Avatar: "",
      AvatarGroup: "",
      Breadcrumb: "",
      Badge: "",
      Button: "",

      ButtonGroup: "",
      Card: "",
      Cell: "",

      Checkbox: "",
      CheckboxGroup: "",
      ComboBox: "",
      Command: "",
      ContextMenu: "",
      DatePicker: "",
      DateRangePicker: "",
      Dialog: "",
      ExpandableCard: "",
      Filter: "",
      Form: "",
      FlexGrid: "",
      ImageInput: "",
      Indicator: "",
      Input: "",
      KanbanBoard: "",
      Label: "",
      MultiComboBox: "",
      MultiInput: "",
      MultiSelect: "",
      MultiTooltip: "",
      OtpInput: "",
      Pagination: "",
      PasswordInput: "",
      Progress: "",
      Popover: "",
      RadioGroup: "",
      RangeSlider: "",
      ScrollView: "",
      SearchBox: "",
      Select: "",
      Separator: "",
      Skeleton: "",
      Slider: "",
      Sidebar: "",
      Spinner: "",
      Stepper: "",
      Switch: "",
      Tabs: "",
      Table: {
        theme: {
          // sidebar: false,
          toc: false,
          layout: "full",
        },
      },
      TextArea: "",
      Timeline: "",
      Toast: "",
      Tooltip: "",
      _3: {
        type: "separator",
        title: "Charts",
      },
      AreaChart: "",
      BarChart: "",
      CandlestickChart: "",

      ComposedChart: "",
      FunnelChart: "",
      GaugeChart: "",
      Heatmap: "",

      RadialBarChart: "",
      LineChart: "",
      PieChart: "",
      RadarChart: "",
      ScatterChart: "",
      __4: {
        type: "separator",
        title: "Animations & Motion",
      },

      AnimatedList: "",
      AnimatedProgress: "",
      CardStack: "",
      DraggableCards: "",
      FloatingCode: "",
      HoverImageLink: "",
      MorphButton: "",
      ParticleBackground: "",
      SocialCard: "",
      SwipeStack: "",
      TypingText: "",

      DonutChart: { type: "page", display: "hidden" },
    },
  },
} as MetaRecord;
