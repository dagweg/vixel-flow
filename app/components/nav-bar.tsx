"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import { IoMdClose } from "react-icons/io";

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "./mode-toggle"
import { FaBars } from "react-icons/fa";
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export default function NavBar() {

    const [navBar, setNavBar] = useState<{
        isOpen: boolean
    }>({
        isOpen: false
    })

    function toggleNavBar() {
        setNavBar(prev => ({
            ...navBar,
            isOpen: !navBar.isOpen
        }))
    }

    return (
        <NavigationMenu className="p-2 py-4 flex justify-between min-w-full sticky top-0 backdrop-blur-xl ">
            <NavigationMenuList className={cn(
                navBar.isOpen && "flex flex-col fixed inset-0 gap-4 bg-white dark:bg-gray-900 items-start justify-start pl-10 pt-20 text-lg scale-x-100 md:static md:flex-row md:p-2  md:bg-transparent",
                !navBar.isOpen && "flex flex-col fixed inset-0 gap-4  items-start justify-start text-lg scale-x-0 md:scale-x-100 md:static md:flex-row md:p-2  md:bg-transparent"
            )}
            >
                <Link href={'/'} className="w-[50px]">
                    <Image src={'/Logo/logo.png'} alt="" objectFit="cover" width={10} height={10} unoptimized className="w-fit hover:scale-105 duration-150 hidden md:flex" ></Image>
                </Link>
                <NavigationMenuLink
                    href="/dashboard"
                    className="hover:opacity-80 duration-150 cursor-pointer hover:translate-x-1">
                    Dashboard
                </NavigationMenuLink>
                <NavigationMenuLink
                    href="/workspace"
                    className="hover:opacity-80 duration-150 cursor-pointer hover:translate-x-1">
                    Workspace
                </NavigationMenuLink>
                <NavigationMenuLink
                    href="/contact"
                    className="hover:opacity-80 duration-150 cursor-pointer hover:translate-x-1">
                    Contact
                </NavigationMenuLink>
            </NavigationMenuList>
            <div className={cn(
                "flex gap-2  w-full sticky inset-0 max-h-fit justify-between items-center px-3  py-1 md:static md:flex md:justify-end",
                navBar.isOpen && "bg-white dark:bg-gray-900"
            )}>
                <div className="flex items-center gap-4">
                    <div className="hover:bg-opacity-50 cursor-pointer p-2 md:hidden" onClick={toggleNavBar}>
                        {
                            navBar.isOpen ?
                                <IoMdClose />
                                :
                                <FaBars />
                        }
                    </div>
                    <Image src={'/Logo/logo.png'} alt="" objectFit="cover" width={10} height={10} unoptimized className="w-[40px] h-[20px] aspect-square hover:scale-105 duration-150 md:hidden"></Image>
                </div>
                <ModeToggle />
            </div>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
