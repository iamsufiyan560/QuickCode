import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/extras/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://quickcode.space"),
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
    url: "https://quickcode.space",
    images: ["/og-image.png"],
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
      <Script
        id="schema-graph"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "QuickCode UI",
                url: "https://quickcode.space",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://quickcode.space/?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@type": "WebPage",
                name: "QuickCode UI - Animated Next.js Components",
                description:
                  "QuickCode UI offers reusable, easy-to-use components for fast, consistent interface design.",
                url: "https://quickcode.space",
              },
              {
                "@type": "Person",
                name: "Sufiyan Chaudhari",
                url: "https://quickcode.space",
                sameAs: [
                  "https://github.com/iamsufiyan560",
                  "https://www.linkedin.com/in/sufiyan-chaudhari-8a55502ab/",
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "QuickCode UI",
                operatingSystem: "Web",
                applicationCategory: "DeveloperApplication",
                url: "https://quickcode.space",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                sameAs: ["https://github.com/iamsufiyan560/QuickCode"],
              },
            ],
          }),
        }}
      />

      <body className={`${inter.className}  antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex-auto min-w-0  flex flex-col  md:px-0">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
