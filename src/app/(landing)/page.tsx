/**
 * Copyright (c) 2025 SUFIYAN CHAUDHARI
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

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
import { CardStack } from "@/components/animated/CardStack";
import { cards } from "@/components/custom/example/CardStackExample";
import { ParticleBackground } from "@/components/animated/ParticleBackground";
import { FloatingCode } from "@/components/animated/FloatingCode";
import { DraggableCards } from "@/components/animated/DraggableCards";
import { AnimatedList } from "@/components/animated/AnimatedList";

export default function QuickCodeLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
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
      <ParticleBackground className=" bg-[#000000]" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 bg-[#000000]/80 backdrop-blur-md ${
          scrolled ? "border-b " : "border-none"
        }`}
      >
        <div className="   sm:px-6 lg:px-8">
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

            <div className="flex  items-center space-x-4">
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
      className="min-h-screen flex items-center justify-center relative px-4 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingCode
        code="<QuickCode />"
        className="top-20 left-10 text-white "
      />
      <FloatingCode
        code="export default Hero"
        className="top-40 right-20 text-white"
      />
      <FloatingCode
        code="className='fire'"
        className="bottom-40 left-20 text-white"
      />

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
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",

    "Item 15",
  ];
  const components = [
    {
      name: "Card Stack",
      preview: "Interactive stack of cards with hover effects",
      component: <CardStack cards={cards} />,
      link: "/docs/CardStack",
    },
    {
      name: "Animated List",
      preview: "Smooth animated scrollable list",
      component: (
        <AnimatedList
          className="min-w-72"
          data={items}
          onPick={(val, idx) => console.log(val, idx)}
          gradients
          arrowKeys
          showScroll={true}
          wrapperClass="w-auto"
          itemClass="bg-primary/30 hover:bg-primary/60 "
        />
      ),
      link: "/docs/components/hover-card",
    },
    {
      name: "Premium Draggable Cards",
      preview: "High-end dark-mode cards with smooth drag and glow effects",
      component: (
        <DraggableCards
          className="max-w-5xl mx-auto py-16 px-4"
          titleClassName="text-teal-400"
          dragScale={1.05}
          dragBoxShadow="0 15px 35px rgba(72, 209, 204, 0.6)"
          normalBoxShadow="0 8px 20px rgba(0,0,0,0.4)"
          dragBackground="linear-gradient(135deg, rgba(72,209,204,0.15), rgba(72,209,204,0.05))"
          normalBackground="#1B1F3B"
          cardClassName="rounded-xl p-6 text-gray-100 border border-[#272B4D] shadow-lg"
          descriptionClassName="text-gray-30"
        />
      ),
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-[#000207]/50 border-[#00182a] hover:bg-[#000207]/70 transition-all duration-300 cursor-pointer  flex items-center justify-center ">
                <CardContent className="p-6 ">
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
