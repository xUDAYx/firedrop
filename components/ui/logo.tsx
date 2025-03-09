"use client"

import Image from "next/image"
import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        <Image
          src="/logo.png"
          alt="Codebase Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
        Codebase
      </span>
    </Link>
  )
} 