# [QuickCode](https://quickcode.space)

A modern, high-quality library of copy-pasteable React components and UI blocks designed for developers who prioritize premium design and simplicity. Built with Next.js, TypeScript, Tailwind CSS, Nextra for documentation, Framer Motion for animations, and Recharts for charts.

## Features

- **Premium Components**: Professionally designed, ready-to-use React components and UI blocks
- **Copy-Paste Ready**: No complex setup—just copy, paste, and ship
- **Smooth Animations**: Powered by Framer Motion for fluid, engaging transitions
- **Type-Safe**: Built with TypeScript for robust, error-free development
- **Responsive Design**: Fully responsive components that look great on any device
- **Dark Mode Support**: Seamless integration with Tailwind CSS for light and dark themes
- **Interactive Charts**: Data visualization made easy with Recharts
- **Comprehensive Docs**: Beautiful documentation powered by Nextra

## Installation

[QuickCode](https://quickcode.space) works similarly to shadcn/ui—components are not installed as a package. Instead, you add individual components to your project using our CLI or by manually copying from the documentation.

Install the [package](https://www.npmjs.com/package/quickcode-ui) via npm:

```bash
npx quickcode-ui init
```

To add a specific component (e.g., Accordion), use:

```bash
npx quickcode add accordion
```

Or manually copy the component from our [documentation](https://quickcode.space) and paste it into your `components/ui` directory.

Then import and use the component:

```tsx
import { Accordion } from "@/components/ui/accordion";
```

## Usage

Import and use [QuickCode](https://quickcode.space) components in your project. Example with the Accordion component:

```tsx
import { Accordion } from "@/components/ui/accordion";

export default function MyComponent() {
  return (
    <Accordion
      items={[
        { title: "Section 1", content: "This is the content for section 1." },
        { title: "Section 2", content: "This is the content for section 2." },
      ]}
      variant="filled"
      size="lg"
    />
  );
}
```

## Available Components

- **Accordion**: A flexible, animated accordion for collapsible content sections
- **Navbar**: A sticky, modern navigation bar with smooth animations
- **Hero**: Eye-catching hero sections designed for high conversion
- **Card**: Premium cards with hover effects and customizable layouts
- **Button**: Customizable buttons with variants (outline, secondary, ghost, destructive, link) and sizes
- More components and UI blocks available in the `components/ui` directory

Check the documentation (powered by Nextra) for detailed usage and props for each component.

## Development Setup

To contribute or run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/iamsufiyan560/quickcode.git
   cd quickcode
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

## Project Structure

```
quickcode/
├── components/
│   ├── ui/
│   │   ├── Accordion.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   └── ...
│   ├── helpers/
│   │   ├── SnippetPreview.tsx
│   │   └── ...
├── pages/
│   ├── index.tsx
│   └── ...
├── docs/
│   ├── accordion/
│   │   └── page.mdx
│   ├── button/
│   │   └── page.mdx
│   └── ...
├── public/
└── styles/
    └── globals.css
```

## Dependencies

- **Next.js**: Framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript for robust development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions
- **Recharts**: Charting library for data visualization
- **Nextra**: Documentation framework for a seamless docs experience
- **Lucide React**: Icon library for versatile iconography

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📜 License

This project is licensed under the Apache 2.0 License © 2025 SUFIYAN CHAUDHARI.  
You may use it in your own projects, but you **cannot remove copyright or license notices, and you cannot republish it as your own library**.

[Read the full license](./LICENSE).

## Support

[QuickCode](https://quickcode.space) is completely **free**. If you’d like to support the project, you can:

- **Sponsor me** via [GitHub Sponsors](https://github.com/sponsors/iamsufiyan560)
- Or **message me on X** ([Twitter/X](https://x.com/iamsufiyan560))

## Author

- **GitHub**: [iamsufiyan560](https://github.com/iamsufiyan560)
- **X/Twitter**: [@iamsufiyan560](https://x.com/iamsufiyan560)
- **Portfolio**: [SUFIYAN](https://sufiyan-dev.vercel.app)
- **Docs**: [Quickcode.com](https://quickcode.space/docs)

---

Made with ❤️ and ☕ by Sufiyan.
