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
  Instagram,
  Youtube,
  Twitch,
  Facebook,
  TwitterIcon,
  Linkedin,
  DiscIcon,
  InstagramIcon,
  ArrowUpRight,
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
import clsx from "clsx";
import HoverCards from "@/components/landing/HoverCards";
import AnimatedList from "@/components/landing/AnimatedList";
import DraggableCards from "@/components/landing/DraggableCards";

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

function SocialCard() {
  return (
    <div className="socialiconcard group relative flex h-[50px] w-[200px] items-center justify-center bg-[#e7e7e7] shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden hover:shadow-2xl">
      {/* Label */}
      <span className="absolute flex h-full w-full items-center justify-center font-mono text-[24px] font-bold text-white transition-opacity duration-200 group-hover:opacity-0 z-[2]">
        Social
      </span>

      {/* Social Links */}
      <Link
        href="https://github.com/iamsufiyan560"
        target="_blank"
        className="social-link relative flex h-full w-1/4 items-center justify-center text-white text-[24px] transition duration-300"
      >
        <Github className="h-[25px] w-[25px] text-gray-500" />
      </Link>
      <Link
        href="https://www.instagram.com/iamsufiyan_560/#"
        target="_blank"
        className="social-link relative flex h-full w-1/4 items-center justify-center text-white text-[24px] transition duration-300"
      >
        <InstagramIcon className="h-[25px] w-[25px] text-orange-500" />
      </Link>
      <Link
        target="_blank"
        href="https://www.linkedin.com/in/sufiyan-chaudhari-8a55502ab/"
        className="social-link relative flex h-full w-1/4 items-center justify-center text-white text-[24px] transition duration-300"
      >
        <Linkedin className="h-[25px] w-[25px] text-blue-500" />
      </Link>
      <Link
        target="_blank"
        href="https://x.com/iamsufiyan560"
        className="social-link relative flex h-full w-1/4 items-center justify-center text-white text-[24px] transition duration-300"
      >
        <TwitterIcon className="h-[25px] w-[25px]  text-black" />
      </Link>
    </div>
  );
}

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#000000]" />
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

// Quote Section Component
const QuoteSection = () => {
  return (
    <motion.section
      className="py-16 px-4 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-100px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Quote mark decoration */}
          <div className="absolute -top-4 -left-4 text-6xl text-[#aa5aff]/80 font-serif">
            "
          </div>

          <blockquote className="text-2xl md:text-3xl font-light text-[#fbf8f5] leading-relaxed mb-6 italic">
            Build something meaningful that Atleast two people can use make a
            real impact.
          </blockquote>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#aa5aff]"></div>
            <div className="flex gap-1">
              <cite className="text-[#65859b] font-medium not-italic selection:text-white">
                Hitesh Choudhary
              </cite>
              <Image
                className="selection:bg-transparent"
                src={"/chai.svg"}
                alt="img"
                width={28}
                height={28}
              />
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#aa5aff]"></div>
          </motion.div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#aa5aff]/5 to-[#00d2a6]/5 rounded-lg blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </motion.section>
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
            <span className="text-[#fbf8f5]">Code</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-16 mb-8"
        >
          <p className="text-xl md:text-2xl text-[#65859b]">
            Copy-paste ready{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-[#00d2a6] font-bold"
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
          <Link href="/docs">
            <Button
              size="lg"
              className="text-lg px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 transform hover:scale-105 cursor-pointer mb-8"
            >
              <Zap className="mr-2" />
              Get the damn code
            </Button>
          </Link>

          <p className="text-sm text-[#65859b]">
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
      <div className="max-w-4xl mx-auto ">
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
          <p className="text-xl text-[#65859b] max-w-2xl mx-auto leading-relaxed">
            {/* Because I'm tired of shitty component libraries that look like they
            were designed in 2015. Every dev deserves components that make users
            go <span className="text-[#aa5aff] font-bold">"holy shit"</span>
            instead of <span className="text-[#ff1c5c] font-bold">"meh"</span>
            . */}
            Because I’m sick of wasting time asking AI for half-baked code. This
            isn’t another damn library—it’s just straight-up copy-paste
            <span className="text-[#aa5aff] font-bold"> good shit</span> with
            best practices, so you don’t ship{" "}
            <span className="text-[#ff1c5c] font-bold">trash</span>.
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
              <Card className="h-full bg-[#000207]/50 border-[#00182a] hover:bg-[#000207]/70 transition-all duration-300 group cursor-pointer outline-1">
                <CardContent className="p-8 text-center">
                  <div className="text-[#aa5aff] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>

                  <p className="text-[#65859b]">{item.description}</p>
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
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 10",
    "Item 10",
    "Item 10",
    "Item 10",
    "Item 10",
  ];
  const components = [
    {
      name: "Hover Cards",
      preview: "Premium cards with hover effects",
      component: <HoverCards />,
    },
    {
      name: "Animated List",
      preview: "Smooth animated scrollable list",
      component: (
        <AnimatedList
          data={items}
          onPick={(val, idx) => console.log(val, idx)}
          gradients
          arrowKeys
          showScroll={true}
          wrapperClass="w-auto"
        />
      ),
    },
    {
      name: "Premium Draggable Cards",
      preview: "High-end dark-mode cards with smooth drag and glow effects",
      component: <DraggableCards />,
    },

    // {
    //   name: "Interactive Waveform",
    //   preview:
    //     "Animated waveform that reacts to hover and clicks, perfect for dark mode.",
    //   component: (
    //     <div className="flex items-end justify-between w-64 h-32 mx-auto space-x-1">
    //       {Array.from({ length: 20 }).map((_, idx) => (
    //         <motion.div
    //           key={idx}
    //           className="w-1 bg-purple-400 rounded"
    //           animate={{ height: [4, 24, 4] }}
    //           transition={{
    //             repeat: Infinity,
    //             duration: 1.5 + idx * 0.05,
    //             ease: "easeInOut",
    //           }}
    //         />
    //       ))}
    //     </div>
    //   ),
    // },
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
        {/* Section header */}
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
          <p className="text-xl text-[#65859b]">
            The good shit that makes developers wet themselves
          </p>
        </motion.div>

        {/* Grid of cards */}
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
              <Card className="h-full bg-[#000207]/50 border-[#00182a] hover:bg-[#000207]/70 transition-all duration-300 cursor-pointer ">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{component.name}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-[#65859b] mb-4">{component.preview}</p>

                  {/* Render actual component */}
                  <div className="bg-[#000713]/30 rounded-lg p-4 overflow-hidden">
                    {component.component}
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
          <h2 className="text-4xl md:text-6xl font-black mb-6 max-[375px]:text-3xl">
            Pricing
          </h2>
          <p className="text-xl text-[#65859b] max-[375px]:text-lg">
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
            <Card className="h-full bg-[#000207]/50 border-[#00182a] cursor-pointer">
              <CardContent className="p-8 text-center max-[375px]:p-4">
                <h3 className="text-2xl font-bold mb-4 max-[375px]:text-xl">
                  Free Tier
                </h3>
                <div className="text-5xl font-black mb-6 max-[375px]:text-4xl">
                  <span className="text-[#aa5aff]">$0</span>
                  <span className="text-lg text-[#65859b] max-[375px]:text-base">
                    /forever
                  </span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-[#aa5aff] mr-2" />
                    All components & UI blocks
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-[#aa5aff] mr-2" />
                    Copy-paste ready code
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-[#aa5aff] mr-2" />
                    Regular updates
                  </li>
                  <li className="flex items-center">
                    <Star className="w-5 h-5 text-[#aa5aff] mr-2" />
                    My eternal gratitude
                  </li>
                </ul>
                <Link href="/docs">
                  <Button className="w-full rounded-full bg-gradient-to-r from-primary to-accent cursor-pointer">
                    <Download className="w-4 h-4 mr-2" />
                    Get Started (It's Free!)
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-gradient-to-br from-primary/10 to-accent/10 border-[#aa5aff]/30 cursor-pointer">
              <CardContent className="p-8 text-center max-[375px]:p-4">
                <h3 className="text-2xl font-bold mb-4 max-[375px]:text-xl">
                  Support Tier
                </h3>
                <div className="text-5xl font-black mb-6 max-[375px]:text-4xl">
                  <span className="text-[#00d2a6]">$69</span>
                  <span className="text-lg text-[#65859b] max-[375px]:text-base">
                    /because why not
                  </span>
                </div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-[#ff1c5c] mr-2" />
                    Everything from Free tier
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-[#ff1c5c] mr-2" />
                    Make me cry tears of joy
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-[#ff1c5c] mr-2" />
                    Feel good about yourself
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-5 h-5 text-[#ff1c5c] mr-2" />
                    Currently unemployed, hire me bro
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
                      <p className="text-sm text-white">
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
            Social Proof (But Fake)
          </h2>
          <p className="text-xl text-[#65859b]">
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
              <Card className="h-full bg-[#000207]/50 border-[#00182a] hover:bg-[#000207]/70 transition-all duration-300 cursor-pointer">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#aa5aff] text-[#aa5aff]"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-[#65859b]">{testimonial.role}</p>
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
          <div className=" flex flex-col justify-center items-center md:block">
            <h3 className="text-3xl font-black mb-4 cursor-pointer">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                QuickCode
              </span>
            </h3>
            <p className="text-[#65859b] mb-6">
              Premium components for developers who give a damn about design.
            </p>
            <div className="flex justify-center md:block">
              <SocialCard />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:block">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs/Accordion"
                  className="text-[#65859b] hover:text-[#fbf8f5] transition-colors cursor-pointer"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#65859b] hover:text-[#fbf8f5] transition-colors cursor-pointer"
                >
                  UI Blocks{" "}
                  <span className="text-xs text-[#00d2a6] ml-1">
                    (Coming soon)
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#65859b] hover:text-[#fbf8f5] transition-colors cursor-pointer"
                >
                  Templates{" "}
                  <span className="text-xs text-[#00d2a6] ml-1">
                    (Coming soon)
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#"
                  className="text-[#65859b] hover:text-[#fbf8f5] transition-colors cursor-pointer"
                >
                  Blog{" "}
                  <span className="text-xs text-[#00d2a6] ml-1">
                    (Coming soon)
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <h4 className="font-bold mb-4">This shit is free.</h4>
            <p className="text-sm text-[#65859b] mb-4">
              But if you feel like bowing down, scan & pay whatever.
            </p>
            <div className="mx-auto flex items-center justify-center">
              <QrCodeSVg />
            </div>
          </div>
        </div>

        <div className="border-t border-[#00182a]/50 mt-12 pt-8 text-center">
          <p className="text-[#65859b]">
            © 2025 QuickCode. Made with{" "}
            <Heart className="w-4 h-4 inline text-[#ff1c5c]" /> and by
            <Link target="_blank" href="https://github.com/iamsufiyan560">
              {" "}
              <span className="text-[#aa5aff] hover:text-white underline-offset-3 hover:underline uppercase">
                Sufiyan
              </span>
            </Link>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Main Landing Page Component
export default function QuickCodeLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5); // change 5 to whatever threshold you want
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="
   
      max-w-[1600px] mx-auto justify-center items-center
    selection:bg-[#aa5aff] selection:text-[#aa5aff]-foreground
    min-h-screen text-[#fbf8f5] overflow-x-hidden"
    >
      <AnimatedBackground />

      {/* Navigation */}
      <nav
        // className="fixed  top-0 w-full  z-50 bg-[#000000]/80 border-b border-[#00182a] backdrop-blur-md"
        className={`fixed top-0 w-full z-50 bg-[#000000]/80 backdrop-blur-md ${
          scrolled ? "border-b " : "border-none"
        }`}
      >
        <div className="  px-4 sm:px-6 lg:px-8">
          <div className="flex mx-8 items-center justify-between h-16">
            <div className="flex  cursor-pointer">
              <Image
                src="/logo-dark.svg"
                alt="Logo White"
                width={150}
                height={80}
                className={clsx(
                  "object-contain  block",
                  "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                  "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                  "hover:[mask-position:100%]"
                )}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Link href="/docs">
                <Button
                  size="sm"
                  className="rounded-md bg-gradient-to-r from-primary to-accent cursor-pointer"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Docs
                </Button>
              </Link>
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
        <QuoteSection />
      </main>

      <Footer />
    </div>
  );
}
