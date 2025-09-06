# QuickCode

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

QuickCode works like shadcn/ui - components are not installed as a package. Instead, you add individual components to your project using our CLI.

To add a specific component (e.g., Accordion), use:

```bash
npx quickcode add accordion
```

Or manually copy the component from our documentation and paste it into your `components/custom` directory.

Then import and use the component:

```tsx
import { Accordion } from "@/components/custom/accordion";
```

## Usage

### Basic Setup

Ensure you have the following dependencies installed in your Next.js project:

```bash
npm install framer-motion recharts
```

Configure Tailwind CSS in your project by following the [Tailwind CSS Next.js guide](https://tailwindcss.com/docs/guides/nextjs).

Import and use QuickCode components in your project. Example with the Accordion component:

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
- More components and UI blocks available in the `components/custom` directory

Check the documentation (powered by Nextra) for detailed usage and props for each component.

## Development Setup

To contribute or run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/quickcode.git
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

4. **Build the documentation with Nextra:**
   ```bash
   npm run docs
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
│   │   └── ...
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ...
├── pages/
│   ├── index.tsx
│   └── ...
├── docs/
│   ├── accordion.md
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

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure your code follows the existing style and includes TypeScript types.

## License

MIT License. See [LICENSE](LICENSE) for more details.

## Support

QuickCode is free forever, but if you find it valuable, consider supporting the project via the QR code on the landing page. Your support keeps the project alive and helps me buy more coffee!

---

Made with ❤️ and ☕ by Sufiyan.
