"use client";
import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";

import { motion, AnimatePresence, useInView, Reorder } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Star,
  Download,
  Sparkles,
  Terminal,
  Rocket,
  Coffee,
  Heart,
  QrCode,
  Github,
  TwitterIcon,
  Linkedin,
  InstagramIcon,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/custom/Button";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import clsx from "clsx";
import { Dialog, DialogTrigger } from "@/components/custom/Dialog";
import { link } from "fs";

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
                <Github className="size-5 hover:text-black " />
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

const FloatingCode = ({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) => {
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
          <h1 className="text-6xl md:text-8xl font-black mb-6  ">
            <span className="bg-gradient-to-r from-primary via-accent to-destructive bg-clip-text text-transparent selection:text-black ">
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
          <p className="text-xl md:text-2xl text-[#65859b] selection:text-white">
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
              size="md"
              className="text-md  py-4 rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-300 transform hover:scale-105 px-5 mb-8"
            >
              <Zap className="mr-2" />
              Get the damn code
            </Button>
          </Link>

          <p className="text-sm text-[#65859b] selection:text-white">
            Free forever • No BS • Just pure fire
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
          <p className="text-xl text-[#65859b] max-w-2xl mx-auto leading-relaxed selection:text-white">
            Because I’m sick of wasting time asking AI for half-baked code. This
            isn’t another damn library—it’s just straight-up copy-paste
            <span className="text-[#aa5aff] font-bold "> good shit</span> with
            best practices, so you don’t ship{" "}
            <span className="text-[#ff1c5c] font-bold selection:!text-[#ff1c5c] ">
              trash
            </span>
            .
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Terminal className="w-8 h-8" />,
              title: "Copy-Paste Ready",
              description:
                "Practical, production-friendly code you can grab and use immediately in your project.",
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Premium Look",
              description:
                "Components styled to feel polished and premium right out of the box.",
            },
            {
              icon: <Coffee className="w-8 h-8" />,
              title: "Minimal Setup",
              description:
                "No complex configs—just install once and focus on building, not boilerplate.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-secondary/80 border-[#00182a] hover:bg-secondary/70 transition-all duration-300 group cursor-pointer outline-1">
                <CardContent className="p-8 text-center">
                  <div className="text-[#aa5aff] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>

                  <p className="text-[#65859b] selection:text-white">
                    {item.description}
                  </p>
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
      link: "/docs/components/hover-card",
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
      link: "/docs/components/hover-card",
    },
    {
      name: "Premium Draggable Cards",
      preview: "High-end dark-mode cards with smooth drag and glow effects",
      component: <DraggableCards />,
      link: "/docs/DraggableCards",
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
          <p className="text-xl text-[#65859b] selection:text-white">
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
                    <Link href={component.link}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                  <p className="text-[#65859b] mb-4 selection:text-white">
                    {component.preview}
                  </p>

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
        {/* Header */}
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
          <p className="text-xl selection:text-white text-[#65859b] max-[375px]:text-lg">
            Seriously though, it's fucking free
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
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

          {/* Fake Support Tier */}
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
                  <span className="text-lg text-[#65859b] max-[375px]:text-base selection:text-white">
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

                <Dialog
                  title="Nah bro, keep your money 💸"
                  description="Instead, just ⭐ my repo or follow me on X/Twitter. That's
                    more valuable than cash ❤️"
                  contentClassName=" text-center  bg-secondary"
                  titleClassName="text-xl font-bold mb-4"
                  descriptionClassName="text-sm text-[#65859b] mb-6"
                >
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-full bg-gradient-to-r from-destructive to-primary hover:from-destructive/80 hover:to-primary/80 cursor-pointer">
                      <QrCode className="w-4 h-4 mr-2" />
                      Holy shit, I'm feeling generous
                    </Button>
                  </DialogTrigger>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="https://github.com/iamsufiyan560/QuickCode"
                      target="_blank"
                    >
                      <Button className="w-full rounded-full bg-primary cursor-pointer">
                        <Star className="fill-yellow-500 text-yellow-500" />
                        Star on GitHub
                      </Button>
                    </Link>
                    <Link href="https://x.com/iamsufiyan560" target="_blank">
                      <Button className="w-full rounded-full bg-accent hover:bg-accent/80 cursor-pointer">
                        <TwitterIcon className="fill-white text-black" />
                        Follow on X/Twitter
                      </Button>
                    </Link>
                  </div>
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
          <p className="text-xl text-[#65859b] selection:text-white">
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
                    <p className="text-sm text-[#65859b] selection:text-white">
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
          <div className=" flex flex-col justify-center items-center md:block">
            <h3 className="text-3xl font-black mb-4 cursor-pointer">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ">
                QuickCode
              </span>
            </h3>
            <p className="text-[#65859b] mb-6 selection:text-white">
              Premium components for developers who give a damn about design.
            </p>
            <div className="flex justify-center md:block">
              <SocialCard />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:block">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 selection:text-white">
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
              Wanna help out? Just star the repo and spread the love 🫶
            </p>

            <div className="mx-auto flex flex-col items-center justify-center">
              <div className="text-5xl animate-bounce mt-2 mb-4">🦄</div>
              <Link
                href="https://github.com/iamsufiyan560/QuickCode"
                target="_blank"
              >
                <Button className="rounded-full bg-gradient-to-r from-primary to-accent cursor-pointer">
                  ⭐ Star on GitHub
                </Button>
              </Link>
              <p className="mt-3 text-xs text-[#65859b] selection:text-white">
                No hidden fees, just magic ✨
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#00182a]/50 mt-12 pt-8 text-center">
          <p className="text-[#65859b] selection:text-white">
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

// Animated List comp
interface ItemProps {
  children: ReactNode;
  delay?: number;
  idx: number;
  onHover?: MouseEventHandler<HTMLDivElement>;
  onPress?: MouseEventHandler<HTMLDivElement>;
}

const ListItem: React.FC<ItemProps> = ({
  children,
  delay = 0,
  idx,
  onHover,
  onPress,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      data-id={idx}
      onMouseEnter={onHover}
      onClick={onPress}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, delay }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

interface ListProps {
  data?: string[];
  onPick?: (val: string, idx: number) => void;
  gradients?: boolean;
  arrowKeys?: boolean;
  wrapperClass?: string;
  itemClass?: string;
  showScroll?: boolean;
  startIndex?: number;
}

const AnimatedList: React.FC<ListProps> = ({
  data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
  onPick,
  gradients = true,
  arrowKeys = true,
  wrapperClass = "",
  itemClass = "",
  showScroll = true,
  startIndex = -1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(startIndex);
  const [usingKeys, setUsingKeys] = useState(false);
  const [topFade, setTopFade] = useState(0);
  const [bottomFade, setBottomFade] = useState(1);

  // handle scroll → fade opacity
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setTopFade(Math.min(el.scrollTop / 50, 1));
    const remaining = el.scrollHeight - (el.scrollTop + el.clientHeight);
    setBottomFade(
      el.scrollHeight <= el.clientHeight ? 0 : Math.min(remaining / 50, 1)
    );
  };

  // keyboard nav
  useEffect(() => {
    if (!arrowKeys) return;
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setUsingKeys(true);
        setActive((prev) => Math.min(prev + 1, data.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setUsingKeys(true);
        setActive((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && active >= 0) {
        e.preventDefault();
        onPick?.(data[active], active);
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [data, active, arrowKeys, onPick]);

  // auto-scroll selected into view
  useEffect(() => {
    if (!usingKeys || active < 0 || !containerRef.current) return;
    const el = containerRef.current;
    const chosen = el.querySelector(
      `[data-id="${active}"]`
    ) as HTMLElement | null;
    if (chosen) {
      const margin = 40;
      if (chosen.offsetTop < el.scrollTop + margin) {
        el.scrollTo({ top: chosen.offsetTop - margin, behavior: "smooth" });
      } else if (
        chosen.offsetTop + chosen.offsetHeight >
        el.scrollTop + el.clientHeight - margin
      ) {
        el.scrollTo({
          top:
            chosen.offsetTop + chosen.offsetHeight - el.clientHeight + margin,
          behavior: "smooth",
        });
      }
    }
    setUsingKeys(false);
  }, [active, usingKeys]);

  return (
    <div className={`relative w-[480px] ${wrapperClass}`}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`max-h-[380px] overflow-y-auto p-4 ${
          showScroll
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
            : "scrollbar-hide"
        }`}
        style={{
          scrollbarWidth: showScroll ? "thin" : "none",
          scrollbarColor: "#222 #060010",
        }}
      >
        {data.map((txt, idx) => (
          <ListItem
            key={idx}
            idx={idx}
            delay={0.1}
            onHover={() => setActive(idx)}
            onPress={() => {
              setActive(idx);
              onPick?.(txt, idx);
            }}
          >
            <div
              className={`p-3 rounded-lg transition-colors ${
                active === idx ? "bg-neutral-800" : "bg-neutral-900"
              } ${itemClass}`}
            >
              <p className="text-white text-sm">{txt}</p>
            </div>
          </ListItem>
        ))}
      </div>

      {gradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: topFade }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: bottomFade }}
          />
        </>
      )}
    </div>
  );
};

// Draggable Cards component

interface Card {
  id: number;
  title: string;
  description: string;
}

const initialCards: Card[] = [
  {
    id: 1,
    title: "Fast API Calls",
    description: "Optimized for speed and efficiency",
  },
  {
    id: 2,
    title: "Beautiful UI",
    description: "Tailwind + Framer Motion magic",
  },
];

function DraggableCards() {
  const [cards, setCards] = useState(initialCards);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <Reorder.Group
        axis="y"
        values={cards}
        onReorder={setCards}
        className="space-y-4"
      >
        {cards.map((card) => {
          const isDragging = draggingId === card.id;

          return (
            <Reorder.Item
              key={card.id}
              value={card}
              onDragStart={() => setDraggingId(card.id)}
              onDragEnd={() => setDraggingId(null)}
              dragListener
              className="cursor-grab"
            >
              <motion.div
                animate={{
                  scale: isDragging ? 1.05 : 1,
                  boxShadow: isDragging
                    ? "0 15px 35px rgba(72, 209, 204, 0.6)"
                    : "0 8px 20px rgba(0,0,0,0.4)",
                  background: isDragging
                    ? "linear-gradient(135deg, rgba(72,209,204,0.15), rgba(72,209,204,0.05))"
                    : "#1B1F3B",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-xl p-6 text-gray-100 border border-[#272B4D] shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

// Hover Cards component
const cards = [
  {
    color: "bg-rose-500",
    title: "Curious Cat",
    subtitle: "Always exploring",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww",
  },
  {
    color: "bg-blue-500",
    title: "Chill Cat",
    subtitle: "Cool and calm",
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    color: "bg-green-500",
    title: "Playful Cat",
    subtitle: "Full of energy",
    img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

function HoverCards() {
  return (
    <div className="group flex flex-col gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            relative flex h-[100px] w-[250px] flex-col items-center justify-center
            rounded-lg text-white cursor-pointer transition-all duration-500
            ${card.color}
            group-hover:blur-sm group-hover:scale-90
            hover:!scale-110 hover:!blur-none
          `}
        >
          {/* Background image with opacity overlay */}
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="absolute inset-0 rounded-lg object-cover opacity-70"
          />
          <div className="absolute inset-0 rounded-lg bg-black/40" />

          {/* Text */}
          <div className="relative z-10 text-center">
            <p className="text-lg font-bold">{card.title}</p>
            <p className="text-sm">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
