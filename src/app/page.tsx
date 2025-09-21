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

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Star,
  Heart,
  Code2,
  Zap,
  Layers,
  Palette,
  Sparkles,
  Play,
  CircleArrowUp,
} from "lucide-react";
import { Button } from "@/components/custom/Button";
import { cn } from "@/lib/utils";
import Particles from "@/extras/particles";
import QuickCodePromoPage from "@/extras/VsCode";
import { ThemeToggle } from "@/extras/ThemeToggle";

function FullscreenDemo({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background overflow-auto"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="h-full  flex items-center justify-center relative">
        <QuickCodePromoPage onClose={onClose} />
      </div>
    </motion.div>
  );
}

export default function QuickCodeLanding() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className=" selection:bg-transparent  min-h-screen w-full md:max-w-6xl md:mx-auto shadow-2xl  relative ">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={400}
      />

      <motion.nav
        className="fixed md:max-w-6xl md:mx-auto top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="md:max-w-6xl md:mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo-light.svg"
                alt="Logo"
                width={150}
                height={80}
                className={cn(
                  "object-contain dark:hidden",
                  "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                  "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                  "hover:[mask-position:100%]"
                )}
              />
              <Image
                src="/logo-dark.svg"
                alt="Logo White"
                width={150}
                height={80}
                className={cn(
                  "object-contain hidden dark:block",
                  "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                  "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                  "hover:[mask-position:100%]"
                )}
              />
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="https://github.com/iamsufiyan560/QuickCode"
                target="_blank"
              >
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <Github className="w-4 h-4 mr" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="sm" className="cursor-pointer">
                  <Code2 className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="w-full   md:max-w-6xl md:mx-auto shadow-2xl min-h-screen">
        <motion.section
          className="relative pt-32 pb-20 px-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl lg:text-8xl font-black mb-8 text-foreground">
                Build
                <span className="relative inline-block mx-4">
                  <span className="text-primary">Faster</span>
                  <motion.div
                    className="absolute -inset-2 bg-primary/10 rounded-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
                Ship
                <span className=" text-accent dark:text-white font-black">
                  {" "}
                  Better
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl md:mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Professional React components that developers actually want to
              use. No learning curve, no vendor lock-in, just production-ready
              code.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/docs">
                <Button
                  size="lg"
                  className="relative h-13 cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px]  rounded-[16px] bg-gradient-to-t from-primary to-primary/30   active:scale-95 hover:bg-transparent"
                >
                  <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-[14px] bg-gradient-to-t from-[var(--primary)] to-[var(--ring)]">
                    <Code2 className="w-5 h-5 mr-2" />
                    Start Building
                  </span>
                </Button>
              </Link>

              <Link
                href="https://github.com/sponsors/iamsufiyan560"
                target="_blank"
              >
                <Button
                  size="lg"
                  className="relative h-13 cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px]  rounded-[16px] bg-gradient-to-t from-primary to-primary/30   active:scale-95 hover:bg-transparent"
                >
                  <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary rounded-[14px] group ">
                    <Heart className="w-5 h-5 mr-2 text-destructive group-hover:fill-destructive transition-all duration-200" />
                    Support Project
                  </span>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Button
                size="lg"
                onClick={() => {
                  setShowDemo(true);
                  try {
                    document.documentElement.requestFullscreen();
                  } catch (err) {
                    console.log("Fullscreen not supported");
                  }
                }}
                className=" cursor-pointer inline-flex items-center justify-center text-2xl text-primary uppercase py-2.5 px-5 rounded-lg border-2 border-primary bg-muted shadow-[3px_3px_0px_0px_var(--primary)]  my-8 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all group h-14  hover:bg-transparent "
              >
                <Play className="w-5 h-5 mr-2 group-hover:fill-primary/70 transition-all duration-200" />
                Start Demo
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-20 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Built for Modern Development
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl md:mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Everything you need to create exceptional user interfaces
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                title: "Zero Config",
                description:
                  "Drop in components that work immediately. No complex setup, no configuration hell.",
              },
              {
                icon: <Layers className="w-8 h-8 text-primary" />,
                title: "Composable",
                description:
                  "Build complex interfaces by combining simple, well-designed building blocks.",
              },
              {
                icon: <Palette className="w-8 h-8 text-primary" />,
                title: "Fully Customizable",
                description:
                  "Your brand, your colors, your design. Components adapt to your design system.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group p-8 bg-card border border-border rounded-xl cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="py-20 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  number: "50+",
                  label: "Components",
                  icon: <Code2 className="w-6 h-6" />,
                },
                {
                  number: "100%",
                  label: "TypeScript",
                  icon: <Sparkles className="w-6 h-6" />,
                },
                {
                  number: "Modern",
                  label: "Architecture",
                  icon: <Sparkles className="w-6 h-6" />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-black text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-lg">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="py-20 sm:px-8 px-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="text-center bg-card border border-border rounded-2xl sm:p-12 px-4 py-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to build something amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl md:mx-auto">
              Join developers who are already shipping better products with
              QuickCode UI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs">
                <Button size="lg" className="text-lg px-8 py-4 cursor-pointer">
                  Explore Components
                  <CircleArrowUp className=" w-5 h-5 ml-2 rotate-45" />
                </Button>
              </Link>

              <Link
                href="https://github.com/iamsufiyan560/QuickCode"
                target="_blank"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:bg-none text-lg px-8 py-4 cursor-pointer group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2"
                >
                  <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-70" />
                  <Github className="w-5 h-5 mr-2" />
                  Star on GitHub
                  <Star className="w-5 h-5 ml-2 group-hover:fill-[#fbbf24] transition-all duration-300" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.section>

        <motion.footer
          className="py-16 px-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid lg:grid-cols-3 gap-12">
            <div>
              <div className="mb-6">
                <Image
                  src="/logo-light.svg"
                  alt="QuickCode UI"
                  width={150}
                  height={80}
                  className={cn(
                    "object-contain dark:hidden",
                    "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                    "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                    "hover:[mask-position:100%] cursor-pointer"
                  )}
                />
                <Image
                  src="/logo-dark.svg"
                  alt="QuickCode UI"
                  width={150}
                  height={80}
                  className={cn(
                    "object-contain hidden dark:block",
                    "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                    "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                    "hover:[mask-position:100%] cursor-pointer"
                  )}
                />
              </div>
              <p className="text-muted-foreground mb-6">
                Building the future of React component libraries, one component
                at a time.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/docs"
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/iamsufiyan560/QuickCode"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    GitHub Repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/sponsors/iamsufiyan560"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Sponsor Project
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/iamsufiyan560"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://x.com/iamsufiyan560"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/sufiyan-chaudhari-8a55502ab/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/iamsufiyan560/"
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>

              <div className="mt-6">
                <Link
                  href="https://github.com/sponsors/iamsufiyan560"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer group"
                  >
                    <Heart className="w-4 h-4 mr-2 text-destructive group-hover:fill-destructive transition-all duration-200" />
                    Support the Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} QuickCode UI. Built with passion by{" "}
              <Link
                href="https://github.com/iamsufiyan560"
                target="_blank"
                className="text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Sufiyan Chaudhari
              </Link>
            </p>
          </div>
        </motion.footer>
      </div>

      <AnimatePresence>
        {showDemo && (
          <FullscreenDemo
            isOpen={showDemo}
            onClose={() => {
              setShowDemo(false);
              if (document.fullscreenElement) {
                document.exitFullscreen();
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
