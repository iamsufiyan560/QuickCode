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

const DATA_DISPLAY: MetaRecord = {
  DataGrid: "",
  DataTable: "",
  DataList: "",
  DataCard: "",
};

const FORM: MetaRecord = {
  LoginForm: "",
  RegisterForm: "",
  ContactForm: "",
  PaymentForm: "",
  FeedbackForm: "",
  SearchForm: "",
  SubscriptionForm: "",
  ProfileForm: "",
  InvoiceForm: "",
  SupportForm: "",
};

const SECTION: MetaRecord = {
  HeroSection: "",
  AboutSection: "",
  ServicesSection: "",
  TestimonialSection: "",
  FaqSection: "",
  ContactSection: "",
  FeatureSection: "",
  PricingSection: "",
  TeamSection: "",
  StatsSection: "",
};

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
      AdvancedForm: "",
      Accordion: "",
      ActionSheet: "",
      AlertDialog: "",

      Avatar: "",
      AvatarGroup: "",
      Button: "",
      ButtonGroup: "",

      Badge: "",

      Checkbox: "",
      CheckboxGroup: "",

      Card: "",
      ContextMenu: "",

      DatePicker: "",
      DateRangePicker: "",

      Dialog: "",
      Filter: "",

      Input: "",
      ImageInput: "",
      KanbanBoard: "",
      Label: "",

      MultiSelect: "",
      MultiInput: "",
      MultiTooltip: "",
      PasswordInput: "",
      RadioGroup: "",
      RangeSlider: "",
      Select: "",
      Skeleton: "",
      Stepper: "",
      Switch: "",
      Sidebar: "",

      Slider: "",
      Separator: "",
      SearchBox: "",

      Tabs: "",
      TextArea: "",
      Tooltip: "",
      Toast: "",
      Table: {
        theme: {
          // sidebar: false,
          toc: false,

          layout: "full",
        },
      },

      _3: {
        type: "separator",
        title: "Charts",
      },
      AreaChart: "",
      BarChart: "",
      LineChart: "",
      PieChart: "",
      RadarChart: "",
      ComposedChart: "",
      FunnelChart: "",
      ScatterChart: "",

      __4: {
        type: "separator",
        title: "Animations & Motion",
      },

      FloatingCode: "",
      ParticleBackground: "",
      DraggableCards: "",
      MorphButton: "",
      CardStack: "",
      AnimatedList: "",
      SocialCard: "",

      // __4: {
      //   type: "separator",
      //   title: "Coming Soon",
      // },

      CandlestickChart: { type: "page", display: "hidden" },
      DonutChart: { type: "page", display: "hidden" },
      GaugeChart: { type: "page", display: "hidden" },
      Heatmap: { type: "page", display: "hidden" },

      Alert: { type: "page", display: "hidden" },
      Analytics: { type: "page", display: "hidden" },

      Banner: { type: "page", display: "hidden" },
      Breadcrumb: { type: "page", display: "hidden" },

      Calendar: { type: "page", display: "hidden" },
      Carousel: { type: "page", display: "hidden" },
      Chatbot: { type: "page", display: "hidden" },

      Chip: { type: "page", display: "hidden" },
      CodeEditor: { type: "page", display: "hidden" },
      ColorPicker: { type: "page", display: "hidden" },
      ComboBox: { type: "page", display: "hidden" },
      CommandPalette: { type: "page", display: "hidden" },
      CookieBanner: { type: "page", display: "hidden" },
      CopyButton: { type: "page", display: "hidden" },
      CreditCardInput: { type: "page", display: "hidden" },
      Dashboard: { type: "page", display: "hidden" },
      DataDisplay: {
        type: "page",
        display: "hidden",
        items: DATA_DISPLAY,
      },
      Divider: { type: "page", display: "hidden" },
      Drawer: { type: "page", display: "hidden" },
      Dropdown: { type: "page", display: "hidden" },
      EmptyState: { type: "page", display: "hidden" },
      ErrorBoundary: { type: "page", display: "hidden" },
      ErrorPage: { type: "page", display: "hidden" },
      Fab: { type: "page", display: "hidden" },
      FeatureGrid: { type: "page", display: "hidden" },
      Feedback: { type: "page", display: "hidden" },
      FileUpload: { type: "page", display: "hidden" },
      Footer: { type: "page", display: "hidden" },
      Form: {
        type: "page",
        display: "hidden",
        items: FORM,
      },
      Gallery: { type: "page", display: "hidden" },
      Grid: { type: "page", display: "hidden" },
      Header: { type: "page", display: "hidden" },
      HeroSection: { type: "page", display: "hidden" },
      HoverCard: { type: "page", display: "hidden" },
      IconButton: { type: "page", display: "hidden" },
      Image: { type: "page", display: "hidden" },
      InfiniteScroll: { type: "page", display: "hidden" },
      Invoice: { type: "page", display: "hidden" },
      JsonViewer: { type: "page", display: "hidden" },
      KeyboardShortcut: { type: "page", display: "hidden" },
      LazyLoad: { type: "page", display: "hidden" },
      Link: { type: "page", display: "hidden" },
      List: { type: "page", display: "hidden" },
      Loader: { type: "page", display: "hidden" },
      LoadingSpinner: { type: "page", display: "hidden" },
      MasonryGrid: { type: "page", display: "hidden" },
      MediaPlayer: { type: "page", display: "hidden" },
      Menu: { type: "page", display: "hidden" },
      Modal: { type: "page", display: "hidden" },
      Navigation: { type: "page", display: "hidden" },
      NewsletterSignup: { type: "page", display: "hidden" },
      Notification: { type: "page", display: "hidden" },
      NotificationCenter: { type: "page", display: "hidden" },
      NumberInput: { type: "page", display: "hidden" },
      OffCanvas: { type: "page", display: "hidden" },
      OnboardingTour: { type: "page", display: "hidden" },
      OtpInput: { type: "page", display: "hidden" },
      Pagination: { type: "page", display: "hidden" },
      PaymentMethod: { type: "page", display: "hidden" },
      Popconfirm: { type: "page", display: "hidden" },
      Popover: { type: "page", display: "hidden" },
      PricingTable: { type: "page", display: "hidden" },
      Progress: { type: "page", display: "hidden" },
      ProgressBar: { type: "page", display: "hidden" },
      QrCode: { type: "page", display: "hidden" },
      QuickActions: { type: "page", display: "hidden" },
      Rating: { type: "page", display: "hidden" },
      Section: {
        type: "page",
        display: "hidden",
        items: SECTION,
      },
      Sheet: { type: "page", display: "hidden" },
      Snackbar: { type: "page", display: "hidden" },
      Spinner: { type: "page", display: "hidden" },
      Stack: { type: "page", display: "hidden" },
      Statistic: { type: "page", display: "hidden" },
      StatusIndicator: { type: "page", display: "hidden" },
      Tag: { type: "page", display: "hidden" },
      TagInput: { type: "page", display: "hidden" },
      TeamCard: { type: "page", display: "hidden" },
      TestimonialCard: { type: "page", display: "hidden" },
      Timeline: { type: "page", display: "hidden" },
      TimePicker: { type: "page", display: "hidden" },
      Toggle: { type: "page", display: "hidden" },
      Toolbar: { type: "page", display: "hidden" },
      TreeView: { type: "page", display: "hidden" },
      UploadZone: { type: "page", display: "hidden" },
      UserProfile: { type: "page", display: "hidden" },
      VideoPlayer: { type: "page", display: "hidden" },
      VirtualList: { type: "page", display: "hidden" },
      Wizard: { type: "page", display: "hidden" },
      Wysiwyg: { type: "page", display: "hidden" },
    },
  },
} as MetaRecord;
