import nextra from "nextra";

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
});

// Export the final Next.js config with Nextra included
export default withNextra({
  // ... Add regular Next.js options here
  typescript: {
    // ✅ This will allow production builds to complete even with TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Disable ESLint checks during build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
});
