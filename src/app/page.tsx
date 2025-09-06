"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Zap,
  Star,
  Download,
  Copy,
  Sparkles,
  Terminal,
  Rocket,
  Coffee,
  Heart,
  QrCode,
  X,
  ChevronRight,
  Github,
  Twitter,
  Mail,
  Moon,
  Sun,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

// Copy to clipboard hook
const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return { copied, copyToClipboard };
};
// Real QR Code SVG Component

const QrCodeSVg = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Image
        src="/qr.svg" // put your QR file in /public/qr.svg
        alt="QuickCode UPI QR"
        width={220} // adjust size
        height={220}
        priority
      />
    </div>
  );
};

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full blur-[2px]"
          style={{
            backgroundColor: ["#06b6d4", "#a855f7", "#ec4899"][
              Math.floor(Math.random() * 3)
            ],
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, Math.random() * 1000],
            y: [0, Math.random() * 1000],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};

// Floating Code Snippet
const FloatingCode = ({ code, className = "" }) => {
  return (
    <motion.div
      className={`absolute font-mono text-xs text-white ${className}`}
      animate={{
        y: [-20, 20],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {code}
    </motion.div>
  );
};

// Hero Section
const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Components", "UI Blocks", "Code Samples", "Fire Shit"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingCode code="<QuickCode />" className="top-20 left-10" />
      <FloatingCode code="export default Hero" className="top-40 right-20" />
      <FloatingCode code="className='fire'" className="bottom-40 left-20" />

      <div className="text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-destructive bg-clip-text text-transparent ">
              Quick
            </span>
            <span className="text-foreground">Code</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-16 mb-8"
        >
          <p className="text-xl md:text-2xl text-muted-foreground">
            Copy-paste ready{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-accent font-bold"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
            <br />
            that don't suck ass.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            className="text-lg px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <Zap className="mr-2" />
            Get the damn code
          </Button>

          <p className="text-sm text-muted-foreground">
            Free forever • No bullshit signup • Just pure fire
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Why Section
const WhySection = () => {
  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Why this exists?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {/* Because I'm tired of shitty component libraries that look like they
            were designed in 2015. Every dev deserves components that make users
            go <span className="text-primary font-bold">"holy shit"</span>
            instead of <span className="text-destructive font-bold">"meh"</span>
            . */}
            Because I’m sick of wasting time asking AI for half-baked code. This
            isn’t another damn library—it’s just straight-up copy-paste
            <span className="text-primary font-bold">good shit</span> with best
            practices, so you don’t ship{" "}
            <span className="text-destructive font-bold">trash</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Terminal className="w-8 h-8" />,
              title: "Real Code",
              description:
                "Not some abstracted BS. Raw, beautiful, copy-pasteable code that actually works.",
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Premium Look",
              description:
                "Every component designed to make your app look like a million-dollar product.",
            },
            {
              icon: <Coffee className="w-8 h-8" />,
              title: "Zero Hassle",
              description:
                "No npm installs, no configs, no documentation hell. Just copy, paste, and ship.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Featured Components
const FeaturedComponents = () => {
  const { copied, copyToClipboard } = useCopyToClipboard();

  const components = [
    {
      name: "Navbar Pro",
      preview: "Modern sticky navbar with smooth animations",
      code: `<nav className="fixed top-0 w-full z-50 bg-background/80">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      // Your navigation magic here
    </div>
  </div>
</nav>`,
    },
    {
      name: "Hero Madness",
      preview: "Eye-catching hero sections that convert",
      code: `<section className="min-h-screen flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-8xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      Your Brand
    </h1>
  </div>
</section>`,
    },
    {
      name: "Card Flex",
      preview: "Premium cards with hover effects",
      code: `<Card className="group hover:scale-105 transition-all duration-300">
  <CardContent className="p-8">
    <div className="group-hover:text-primary transition-colors">
      // Card content that pops
    </div>
  </CardContent>
</Card>`,
    },
  ];

  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Featured Components
          </h2>
          <p className="text-xl text-muted-foreground">
            The good shit that makes developers wet themselves
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{component.name}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                      onClick={() => copyToClipboard(component.code)}
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {component.preview}
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap text-xs">
                      {component.code}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Pricing Section
const PricingSection = () => {
  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Seriously though, it's fucking free
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-card/50 border-border/50 cursor-pointer">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Free Tier</h3>
                <div className="text-5xl font-black mb-6">
                  <span className="text-primary">$0</span>
                  <span className="text-lg text-muted-foreground">
                    /forever
                  </span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-2" />
                    All components & UI blocks
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-2" />
                    Copy-paste ready code
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-2" />
                    Regular updates
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-2" />
                    My eternal gratitude
                  </li>
                </ul>
                <Button className="w-full rounded-full bg-gradient-to-r from-primary to-accent cursor-pointer">
                  <Download className="w-4 h-4 mr-2" />
                  Get Started (It's Free!)
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 cursor-pointer">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Support Tier</h3>
                <div className="text-5xl font-black mb-6">
                  <span className="text-accent">$69</span>
                  <span className="text-lg text-muted-foreground">
                    /because why not
                  </span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-destructive mr-2" />
                    Everything from Free tier
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-destructive mr-2" />
                    Make me cry tears of joy
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-destructive mr-2" />
                    Feel good about yourself
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-destructive mr-2" />
                    Currently unemployed, hire me mf
                  </li>
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-full bg-gradient-to-r from-destructive to-primary hover:from-destructive/80 hover:to-primary/80 cursor-pointer">
                      <QrCode className="w-4 h-4 mr-2" />
                      Holy shit, I'm feeling generous
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogTitle className="sr-only">
                      Support QR Code
                    </DialogTitle>
                    <div className="text-center py-8">
                      <div className="mx-auto mb-4 flex items-center justify-center">
                        <QrCodeSVg />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scan to make me do a happy dance
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Social Proof Section
const SocialProof = () => {
  const testimonials = [
    {
      text: "This is actually fire. Used it for my startup and VCs thought we had a massive design team.",
      author: "Sarah Chen",
      role: "Founder @ TechFlow",
    },
    {
      text: "No cap, saved me 50+ hours of component building. Now I can focus on actual features.",
      author: "Marcus Johnson",
      role: "Senior Dev @ Google",
    },
    {
      text: "My designer quit after seeing what I built with QuickCode. Now I'm the design team.",
      author: "Alex Kumar",
      role: "Solo Developer",
    },
  ];

  return (
    <motion.section
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Social Proof (But Real)
          </h2>
          <p className="text-xl text-muted-foreground">
            What people actually say when they use this
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:bg-card/70 transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Footer
const Footer = () => {
  return (
    <motion.footer
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-3xl font-black mb-4 cursor-pointer">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QuickCode
              </span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Premium components for developers who give a damn about design.
            </p>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-lg cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-lg cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="rounded-lg cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/components"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/ui-blocks"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  UI Blocks
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold mb-4">This shit is free.</h4>
            <p className="text-sm text-muted-foreground mb-4">
              But if you feel like bowing down, scan & pay whatever.
            </p>
            <div className="mx-auto flex items-center justify-center">
              <QrCodeSVg />
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 QuickCode. Made with{" "}
            <Heart className="w-4 h-4 inline text-destructive" /> and way too
            much caffeine.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Main Landing Page Component
export default function QuickCodeLanding() {
  return (
    <div
      className="
    selection:bg-primary selection:text-primary-foreground
    min-h-screen text-foreground overflow-x-hidden"
    >
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 border-b border-border/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer">
              <h1 className="text-2xl font-black">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ">
                  QuickCode
                </span>
              </h1>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* <Link
                  href="/components"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Components
                </Link>
                <Link
                  href="/ui-blocks"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Blocks
                </Link> */}
                <Link
                  href="/docs"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Docs
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-primary to-accent cursor-pointer"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Get Code
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <WhySection />
        <FeaturedComponents />
        <PricingSection />
        <SocialProof />
      </main>

      <Footer />
    </div>
  );
}
