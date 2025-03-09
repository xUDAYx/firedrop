"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggle";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-[60px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Firedrop Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold">
              Firedrop
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            <a 
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer"
            >
              Services
            </a>
            <a 
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer"
            >
              How it Works
            </a>
            <a 
              href="#wall-of-love"
              className="text-sm font-medium text-muted-foreground hover:text-blue-500 transition-colors cursor-pointer"
            >
              Reviews
            </a>
          </div>

          {/* Right side: Theme Toggle and CTA Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/get-quote">
              <Button 
                variant="default" 
                size="sm"
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full"
              >
                Get Project Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
