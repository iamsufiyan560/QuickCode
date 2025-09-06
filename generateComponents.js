// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const componentList = [
//   { name: "Accordion" },
//   { name: "ActionSheet" },
//   { name: "Alert" },
//   { name: "Analytics" },
//   { name: "Avatar" },
//   { name: "AvatarGroup" },
//   { name: "Badge" },
//   { name: "Banner" },
//   { name: "Breadcrumb" },
//   { name: "Button" },
//   { name: "ButtonGroup" },
//   { name: "Calendar" },
//   { name: "Card" },
//   { name: "Carousel" },
//   { name: "Chatbot" },
//   {
//     name: "Chart",
//     children: [
//       "PieChart",
//       "BarChart",
//       "LineChart",
//       "AreaChart",
//       "DonutChart",
//       "RadarChart",
//       "ScatterChart",
//       "CandlestickChart",
//       "Heatmap",
//       "GaugeChart",
//     ],
//   },
//   { name: "Checkbox" },
//   { name: "CheckboxGroup" },
//   { name: "Chip" },
//   { name: "CodeEditor" },
//   { name: "ColorPicker" },
//   { name: "ComboBox" },
//   { name: "CommandPalette" },
//   { name: "ContextMenu" },
//   { name: "CookieBanner" },
//   { name: "CopyButton" },
//   { name: "CreditCardInput" },
//   { name: "Dashboard" },
//   {
//     name: "DataDisplay",
//     children: ["DataGrid", "DataTable", "DataList", "DataCard"],
//   },
//   { name: "DatePicker" },
//   { name: "DateRangePicker" },
//   { name: "Dialog" },
//   { name: "Divider" },
//   { name: "Drawer" },
//   { name: "Dropdown" },
//   { name: "EmptyState" },
//   { name: "ErrorBoundary" },
//   { name: "ErrorPage" },
//   { name: "Fab" },
//   { name: "FeatureGrid" },
//   { name: "Feedback" },
//   { name: "FileUpload" },
//   { name: "Filter" },
//   { name: "Footer" },
//   {
//     name: "Form",
//     children: [
//       "LoginForm",
//       "RegisterForm",
//       "ContactForm",
//       "PaymentForm",
//       "FeedbackForm",
//       "SearchForm",
//       "SubscriptionForm",
//       "ProfileForm",
//       "InvoiceForm",
//       "SupportForm",
//     ],
//   },
//   { name: "Gallery" },
//   { name: "Grid" },
//   { name: "Header" },
//   { name: "HeroSection" },
//   { name: "HoverCard" },
//   { name: "IconButton" },
//   { name: "Image" },
//   { name: "InfiniteScroll" },
//   { name: "Input" },
//   { name: "Invoice" },
//   { name: "JsonViewer" },
//   { name: "KanbanBoard" },
//   { name: "KeyboardShortcut" },
//   { name: "Label" },
//   { name: "LazyLoad" },
//   { name: "Link" },
//   { name: "List" },
//   { name: "Loader" },
//   { name: "LoadingSpinner" },
//   { name: "MasonryGrid" },
//   { name: "MediaPlayer" },
//   { name: "Menu" },
//   { name: "Modal" },
//   { name: "Navigation" },
//   { name: "NewsletterSignup" },
//   { name: "Notification" },
//   { name: "NotificationCenter" },
//   { name: "NumberInput" },
//   { name: "OffCanvas" },
//   { name: "OnboardingTour" },
//   { name: "OtpInput" },
//   { name: "Pagination" },
//   { name: "PasswordInput" },
//   { name: "PaymentMethod" },
//   { name: "Popconfirm" },
//   { name: "Popover" },
//   { name: "PricingTable" },
//   { name: "Progress" },
//   { name: "ProgressBar" },
//   { name: "QrCode" },
//   { name: "QuickActions" },
//   { name: "RadioButton" },
//   { name: "RadioGroup" },
//   { name: "RangeSlider" },
//   { name: "Rating" },
//   { name: "SearchBox" },
//   {
//     name: "Section",
//     children: [
//       "HeroSection",
//       "AboutSection",
//       "ServicesSection",
//       "TestimonialSection",
//       "FaqSection",
//       "ContactSection",
//       "FeatureSection",
//       "PricingSection",
//       "TeamSection",
//       "StatsSection",
//     ],
//   },
//   { name: "Select" },
//   { name: "Separator" },
//   { name: "Sheet" },
//   { name: "Sidebar" },
//   { name: "Skeleton" },
//   { name: "Slider" },
//   { name: "Snackbar" },
//   { name: "Spinner" },
//   { name: "Stack" },
//   { name: "Statistic" },
//   { name: "StatusIndicator" },
//   { name: "Stepper" },
//   { name: "Switch" },
//   { name: "Table" },
//   { name: "Tabs" },
//   { name: "Tag" },
//   { name: "TagInput" },
//   { name: "TeamCard" },
//   { name: "TestimonialCard" },
//   { name: "TextArea" },
//   { name: "Timeline" },
//   { name: "TimePicker" },
//   { name: "Toast" },
//   { name: "Toggle" },
//   { name: "Toolbar" },
//   { name: "Tooltip" },
//   { name: "TreeView" },
//   { name: "UploadZone" },
//   { name: "UserProfile" },
//   { name: "VideoPlayer" },
//   { name: "VirtualList" },
//   { name: "Wizard" },
//   { name: "Wysiwyg" },
// ];

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ----------------------
// // Sample full component list
// // ----------------------

// // ----------------------
// // Base paths
// // ----------------------
// const componentsBase = path.join(__dirname, "components", "custom");
// const docsBase = path.join(__dirname, "app", "docs");

// // ----------------------
// // Helper: ensure folder exists
// // ----------------------
// function ensureDir(dir) {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// }

// // ----------------------
// // Helper: create .tsx component file
// // ----------------------
// function createComponentFile(componentPath, componentName) {
//   // relative import for Preview
//   const previewImportPath = path
//     .relative(
//       componentPath,
//       path.join(__dirname, "components", "ui", "Preview")
//     )
//     .replace(/\\/g, "/");

//   const content = `"use client";

// import { motion } from "framer-motion";
// import { Preview } from "${previewImportPath}";

// // Under Construction UI as a string
// const underConstructionCode = \`function ${componentName}() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-200 space-y-4"
//     >
//       <div className="text-4xl">🚧</div>
//       <div className="text-xl font-semibold">Component Under Construction</div>
//       <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
//         This component is not ready yet. Check back later!
//       </div>
//     </motion.div>
//   );
// }\`;

// export function ${componentName}Preview() {
//   return (
//     <Preview
//       code={underConstructionCode}
//       scope={{ motion }}
//       title="${componentName}"
//       language="jsx"
//     />
//   );
// }
// `;

//   fs.writeFileSync(
//     path.join(componentPath, `${componentName}.tsx`),
//     content,
//     "utf-8"
//   );
// }

// // ----------------------
// // Helper: create MDX file with correct import
// // ----------------------
// function createMDXFile(docsPath, componentName, importPath) {
//   let mdxContent;
//   if (importPath) {
//     mdxContent = `import { ${componentName} } from "${importPath}";

// # ${componentName} Example

// <${componentName} />
// `;
//   } else {
//     // Parent folder with children only
//     mdxContent = `# ${componentName} Components

// This folder contains child components for ${componentName}.
// `;
//   }

//   ensureDir(docsPath);
//   fs.writeFileSync(path.join(docsPath, "page.mdx"), mdxContent, "utf-8");
// }

// // ----------------------
// // Recursive processing of components
// // ----------------------
// function processComponents(
//   components,
//   parentCompPath = componentsBase,
//   parentDocsPath = docsBase
// ) {
//   for (const comp of components) {
//     if (comp.children && comp.children.length > 0) {
//       // Parent folder
//       const compFolder = path.join(parentCompPath, comp.name);
//       ensureDir(compFolder);

//       const docsFolder = path.join(parentDocsPath, comp.name);
//       createMDXFile(docsFolder, comp.name, null); // no import for parent

//       // Process children
//       const children = comp.children.map((child) => ({ name: child }));
//       processComponents(children, compFolder, docsFolder);
//     } else {
//       // Leaf component
//       const compPath = parentCompPath;
//       ensureDir(compPath);
//       createComponentFile(compPath, comp.name);

//       const docsFolder = path.join(parentDocsPath, comp.name);

//       // Calculate relative import path from MDX to component
//       const relativeImport = path
//         .relative(docsFolder, path.join(compPath, comp.name))
//         .replace(/\\/g, "/");
//       const importPath = relativeImport.startsWith(".")
//         ? relativeImport
//         : "./" + relativeImport;

//       createMDXFile(docsFolder, comp.name, importPath);
//     }
//   }
// }

// // ----------------------
// // Run script
// // ----------------------
// processComponents(componentList);

// console.log("✅ Components and MDX files generated successfully!");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to custom components folder
const componentsFolder = path.join(__dirname, "src", "components", "custom");

if (!fs.existsSync(componentsFolder)) {
  console.log(`Folder not found: ${componentsFolder}. Creating it now...`);
  fs.mkdirSync(componentsFolder, { recursive: true });
}

// Helper: recursively get all .tsx files
function getAllTSXFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllTSXFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

// Overwrite each .tsx file with Preview wrapper
function overwriteComponents() {
  const tsxFiles = getAllTSXFiles(componentsFolder);

  tsxFiles.forEach((file) => {
    const componentName = path.basename(file, ".tsx");

    // Construct the original component code as a string
    const componentCode = `
function ${componentName}() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-200 space-y-4"
    >
      <div className="text-4xl">🚧</div>
      <div className="text-xl font-semibold">Component Under Construction</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        This component is not ready yet. Check back later!
      </div>
    </motion.div>
  );
}`;

    // Relative import for Preview
    const previewImportPath = path
      .relative(
        path.dirname(file),
        path.join(__dirname, "src", "components", "ui", "Preview")
      )
      .replace(/\\/g, "/");
    const importPath = previewImportPath.startsWith(".")
      ? previewImportPath
      : "./" + previewImportPath;

    // New content with Preview wrapper
    const content = `"use client";

import { motion } from "framer-motion";
import { Preview } from "${importPath}";

export function ${componentName}() {
  return <Preview code={\`${componentCode}\`} scope={{ motion }} title="${componentName}" language="jsx" />;
}
`;

    fs.writeFileSync(file, content, "utf-8");
    console.log(`✅ Overwritten with Preview: ${file}`);
  });
}

// Run
overwriteComponents();

console.log("✅ All custom components updated successfully with Preview!");
