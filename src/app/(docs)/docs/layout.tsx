import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-docs";
import { Anchor, Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import clsx from "clsx";
import Image from "next/image";
import "./docs.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "QuickCode UI",
    template: "%s | QuickCode UI",
  },
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

const banner = (
  <Banner storageKey="release-banner">🚀 My Project 1.0.0 is live!</Banner>
);

const navbar = (
  <Navbar
    logo={
      <div className=" relative w-[150px] h-[80px]">
        <Image
          src="/logo-light.svg"
          alt="Logo"
          fill
          className={clsx(
            "object-contain dark:hidden",
            "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
            "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
            "hover:[mask-position:100%]"
          )}
        />
        <Image
          src="/logo-dark.svg"
          alt="Logo White"
          fill
          className={clsx(
            "object-contain hidden dark:block",
            "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
            "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
            "hover:[mask-position:100%]"
          )}
        />
      </div>
    }
    logoLink="/"
    projectLink="https://github.com/iamsufiyan560/QuickCode"
    className="max-w-[1440px] text-gray-900 dark:text-gray-100 transition-colors duration-300"
  >
    {/* 👇 Right side items */}
    {/* <ThemeSwitch className="!text-gray-400 hover:!text-gray-100" /> */}
  </Navbar>
);

const footer = (
  <Footer>MIT {new Date().getFullYear()} © My Cool Project.</Footer>
);

const search = <Search placeholder="Search docs…" />;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />

      <body>
        <Layout
          // banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/iamsufiyan560/QuickCode"
          // footer={footer}
          search={search}
          editLink={null}
          feedback={{ content: null }}
          darkMode={true}
          sidebar={{
            toggleButton: true,
            defaultMenuCollapseLevel: 1,
          }}
          // toc={{
          //   extraContent: (
          //     <>
          //       <b className="mt-2 text-xs">Sponsored by:</b>
          //       <Anchor href="https://xyflow.com?utm_source=nextra.site&utm_campaign=nextra&utm_content=sidebarLink">
          //         <Image
          //           width="50"
          //           height="50"
          //           src={"/next.svg"}
          //           alt="Wire your ideas with xyflow!"
          //           className="nextra-border rounded-sm border"
          //         />
          //       </Anchor>
          //     </>
          //   ),
          // }}
        >
          <main
            className={clsx(
              "min-w-full bg-[#FAFAFA] text-gray-900 dark:bg-[#111111]   dark:text-gray-100 transition-colors duration-300"
            )}
          >
            {children}
          </main>
        </Layout>
      </body>
    </html>
  );
}
