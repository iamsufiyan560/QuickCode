import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-docs";
import { Anchor, Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import clsx from "clsx";
import Image from "next/image";

export const metadata = {
  title: "My Cool Docs Site",
};

const banner = (
  <Banner storageKey="release-banner">🚀 My Project 1.0.0 is live!</Banner>
);

const navbar = (
  // <Navbar
  //   logo={
  //     <Image
  //       width={150}
  //       height={80}
  //       src="/logo.svg"
  //       alt="Logo"
  //       className={clsx(
  //         "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
  //         "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
  //         "hover:[mask-position:100%]"
  //       )}
  //     />
  //   }
  //   logoLink="/"
  //   projectLink="https://github.com/iamsufiyan560/QuickCode"
  //   className="max-w-[1440px]  text-gray-900  dark:text-gray-100 transition-colors duration-300"
  // >
  //   {/* 👇 This renders on the right side */}
  //   {/* <ThemeSwitch className="!text-gray-400 hover:!text-gray-100" /> */}
  // </Navbar>
  <Navbar
    logo={
      <div className="relative w-[150px] h-[80px]">
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
    <>
      <Head />

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
    </>
  );
}
