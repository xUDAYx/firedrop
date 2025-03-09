"use client"
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data: any) => {
        // Handle newsletter submission
        console.log(data);
        reset();
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, elementId: string) => {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const links = {
        services: [
            { name: 'AI/ML Projects', href: '#features', scroll: true },
            { name: 'Data Science', href: '#how-it-works', scroll: true },
            { name: 'Cybersecurity', href: '#how-it-works', scroll: true },
            { name: 'Web Development', href: '#how-it-works', scroll: true },
        ],
        support: [
            { name: 'How It Works', href: '#how-it-works', scroll: true },
            { name: 'Project Quote', href: '/get-quote', scroll: false },
            { name: 'Sample Projects', href: '/samples', scroll: false }, 
            { name: '24/7 Support', href: '/contact', scroll: false },
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Contact', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms', href: '/terms' },
        ],
    };

    return (
        <footer className="relative bg-background">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="w-full h-px bg-border mb-12" />
                
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="mb-8 md:mb-0">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Firedrop Logo"
                                width={32}
                                height={32}
                                className="h-8 w-8"
                            />
                            <h2 className="text-lg font-bold">Firedrop</h2>
                        </Link>

                        <h1 className="dark:text-gray-300 mt-4">
                            Professional{" "}
                            <span className="dark:text-blue-500">
                                <Link href="#">Academic Projects</Link>
                            </span>
                        </h1>
                        <div className="mt-2">
                            <Link href="/get-quote">
                                <Button variant='secondary' className="hover:text-blue-500">
                                    Get Project Quote
                                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm dark:text-gray-400 mt-5">
                            © {new Date().getFullYear()} Firedrop. All rights reserved.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">Services</h3>
                            <ul className="space-y-2">
                                {links.services.map((item) => (
                                    <li key={item.name}>
                                        <Link 
                                            href={item.href}
                                            onClick={item.scroll ? (e) => scrollToSection(e, item.href.substring(1)) : undefined}
                                            className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                {links.support.map((item) => (
                                    <li key={item.name}>
                                        <Link 
                                            href={item.href}
                                            className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                {links.company.map((item) => (
                                    <li key={item.name}>
                                        <Link 
                                            href={item.href}
                                            className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full relative overflow-hidden h-[25vh]">
                    <div className="absolute right-0 w-[71%] -translate-x-[40%] -mt-8">
                        <h1 className="text-right text-[12rem] md:text-[16rem] font-bold select-none tracking-wide
                            text-foreground/25 whitespace-nowrap"
                        >
                            Firedrop
                        </h1>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent h-full"></div>
                </div>
            </div>
        </footer>
    );
}
