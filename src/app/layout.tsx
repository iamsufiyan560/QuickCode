import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/extras/theme-provider";
import { Head } from "nextra/components";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://quickcode.space"),

  title: {
    default: "QuickCode UI",
    template: "%s | QuickCode UI",
  },
  description:
    "QuickCode UI offers reusable, easy-to-use components for fast, consistent interface design.",
  keywords:
    "Next.js components, Tailwind CSS, Framer Motion, Lucide icons, animated UI, React UI library, QuickCode UI",
  authors: [{ name: "Sufiyan Chaudhari" }],
  alternates: { canonical: "https://quickcode.space" },
  applicationName: "QuickCode",
  category: "Technology",

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
    images: [
      {
        url: "https://quickcode.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quickcode - Find the best UI Components",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quickcode - Find the best UI Components",
    description: "Discover the best UI Components in Minutes.",
    images: ["https://quickcode.space/og-image.png"],
    creator: "@iamsufiyan560",
    site: "@iamsufiyan560",
  },

  other: {
    "twitter:image": "https://quickcode.space/og-image.png",
    "twitter:card": "summary_large_image",
    "twitter:url": "https://quickcode.space",
    "twitter:domain": "quickcode.space",
    "twitter:title": "Quickcode - Find the best UI Components",
    "twitter:description": "Discover the best UI Components in Minutes.",
    "twitter:creator": "@iamsufiyan560",
    "twitter:site": "@iamsufiyan560",

    "og:url": "https://quickcode.space",
    "og:type": "website",
    "og:title": "QuickCode UI - Animated Next.js Components",
    "og:description":
      "QuickCode UI offers reusable, easy-to-use components for fast, consistent interface design.",
    "og:image": "https://quickcode.space/og-image.png",
    "og:site_name": "QuickCode UI",
    "og:locale": "en_US",

    // Schema.org structured data
    "application-name": "QuickCode",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",

    // Additional SEO meta tags
    author: "Sufiyan Chaudhari",
    publisher: "QuickCode UI",
    copyright: "QuickCode UI",
    language: "English",
    "revisit-after": "1 day",
    distribution: "global",
    rating: "general",
    robots:
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",

    // Geo targeting
    "geo.region": "IN",
    "geo.country": "India",

    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "QuickCode",

    // Alternative titles for different contexts
    "og:title:alt":
      "Reusable Next.js Components | Tailwind + Motion | QuickCode",
    "twitter:title:alt": "Animated UI Components for Next.js | QuickCode UI",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

      <Head />

      <body className={`${inter.className}  antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

{
  /* <body className={`${inter.className}  antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex-auto min-w-0  flex flex-col  md:px-0">
            {children}
          </main>
        </ThemeProvider>
      </body> */
}
