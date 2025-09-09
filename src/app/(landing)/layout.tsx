import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  title: "QuickCode UI",
  description:
    "QuickCode UI offers reusable, easy-to-use components for fast, consistent interface design.",
  keywords:
    "Next.js components, Tailwind CSS, Framer Motion, Lucide icons, animated UI, React UI library, QuickCode UI",
  authors: [{ name: "Sufiyan Chaudhari" }],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    title: "QuickCode UI - Animated Next.js Components",
    description:
      "QuickCode UI offers reusable, easy-to-use components for fast, consistent interface design.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}  antialiased `}>{children}</body>
    </html>
  );
}
