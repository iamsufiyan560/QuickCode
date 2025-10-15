import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-docs";
import { Anchor, Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import clsx from "clsx";
import Image from "next/image";
import "./docs.css";
import { Metadata } from "next";
import { Armchair } from "lucide-react";

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
    url: "https://quickcode.space/docs",
    images: ["/og-image.png"],
  },
};

const banner = (
  <Banner
    className="bg-primary relative max-w-[1440px] mx-auto"
    storageKey="2.0-release"
  >
    ✨ QuickCode UI keeps growing! More components, more features, and more ways
    to make your projects shine. Stay tuned & maybe…{" "}
    <Anchor
      title="Hire Sufiyan Chaudhari"
      href="https://x.com/iamsufiyan560"
      target="_blank"
      className="hover:underline underline-offset-3 font-semibold"
    >
      hire me
    </Anchor>
    or{" "}
    <Anchor
      title="Sponsor QuickCode UI"
      href="https://github.com/sponsors/iamsufiyan560"
      target="_blank"
      className="hover:underline underline-offset-3 font-semibold"
    >
      sponsor me 😉
    </Anchor>
  </Banner>
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
    className="max-w-[1440px mx-auto]  transition-colors duration-300 bg-[#f8fafc]  dark:bg-[#0f172a]    "
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
    <>
      {/* <Head /> */}

      <Layout
        banner={banner}
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
        toc={{
          extraContent: (
            <div className="mt-2 text-sm flex flex-col items-start gap-3">
              <b>Sponsored by:</b>
              <div className="p-2 border-2 border-dashed border-gray-400 rounded flex justify-center w-full">
                <Armchair className="w-8 h-8 text-gray-400" />
              </div>
              <span className="italic text-base text-gray-500">
                This comfy seat is waiting for a brave sponsor… maybe you? 😏
              </span>
            </div>
          ),
        }}
      >
        <div
          className={clsx(
            "min-w-full bg-[#f8fafc]  dark:bg-[#0f172a]    transition-colors duration-300"
          )}
        >
          {children}
        </div>
      </Layout>
    </>
  );
}
