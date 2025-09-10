# [QuickCode](https://quickcode-ui.vercel.app)

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

[QuickCode](https://quickcode-ui.vercel.app) works similarly to shadcn/ui—components are not installed as a package. Instead, you add individual components to your project using our CLI or by manually copying from the documentation.

Install the [package](https://www.npmjs.com/package/quickcode-ui) via npm:

```bash
npm install quickcode-ui
```

To add a specific component (e.g., Accordion), use:

```bash
npx quickcode add accordion
```

Or manually copy the component from our [documentation](https://quickcode-ui.vercel.app) and paste it into your `components/custom` directory.

Then import and use the component:

```tsx
import { Accordion } from "@/components/custom/accordion";
```

## Usage

Import and use [QuickCode](https://quickcode-ui.vercel.app) components in your project. Example with the Accordion component:

```tsx
import { Accordion } from "@/components/custom/accordion";

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
- More components and UI blocks available in the `components/custom` directory

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
│   ├── custom/
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

Contributions are welcome! To contribute:

1. Fork the repository.

2. Create a new branch (`git checkout -b feature/your-feature`).

3. Go to `components/custom/` and locate the component file. If the component is not yet built, write the component code in this directory.

4. In `components/custom/examples/`, create a file with the component name suffixed with `Example` (e.g., `ButtonExample.tsx`). Write example usage of the component and wrap it in the `SnippetPreview` component, as shown below:

   ```tsx
   "use client";

   import React from "react";
   import { Button } from "@/components/custom/Button";
   import { SnippetPreview } from "@/components/helpers/SnippetPreview";

   export const DefaultButtonExample = () => {
     const defaultButtonCode = `
      import { Button } from "@/components/custom/Button";
   
      export const DefaultButtonExample = () => {
        return <Button>Default Button</Button>;
      };
      `;

     return (
       <SnippetPreview title="Default Button" code={defaultButtonCode}>
         <Button>Default Button</Button>
       </SnippetPreview>
     );
   };
   ```

5. In `docs/<component-name>/page.mdx`, write detailed steps on how to use the component and provide example usage instructions (without including code directly in the MDX file).

6. Make your changes and commit (`git commit -m 'Add your feature'`).

7. Push to the branch (`git push origin feature/your-feature`).

8. Open a pull request.

Please ensure your code follows the existing style, includes TypeScript types, and adheres to the project’s structure.

## License

MIT License. See LICENSE for more details.

## Support

[QuickCode](https://quickcode-ui.vercel.app) is free forever, but if you find it valuable, consider supporting the project via the QR code on the [landing page](https://quickcode-ui.vercel.app). Your support keeps the project alive and helps me buy more coffee!

## Author

- **GitHub**: [iamsufiyan560](https://github.com/iamsufiyan560)
- **X/Twitter**: [@iamsufiyan560](https://x.com/iamsufiyan560)
- **Portfolio**: [SUFIYAN](https://sufiyan-dev.vercel.app)
- **Docs**: [Quickcode.com](<(https://quickcode-ui.vercel.app/docs)>)

---

Made with ❤️ and ☕ by Sufiyan.
