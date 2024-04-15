"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [navBar, setNavBar] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

  function toggleNavBar() {
    setNavBar((prev) => ({
      ...navBar,
      isOpen: !navBar.isOpen,
    }));
  }

  useEffect(() => {
    if (document.documentElement.scrollWidth >= 768 || !navBar.isOpen) {
      document.body.style.overflow = "auto";
    } else if (navBar.isOpen) {
      document.body.style.overflow = "hidden";
    }
  });

  const pathname = usePathname();

  return (
    <NavigationMenu className="p-2 py-4 flex justify-between min-w-full sticky top-0 backdrop-blur-xl ">
      <NavigationMenuList
        className={cn(
          navBar.isOpen &&
            "flex flex-col fixed  gap-4 bg-white backdrop-blur-xl dark:bg-gray-900 items-start justify-start pl-10 pt-20 text-lg scale-x-100 md:static md:flex-row md:p-2  md:bg-transparent",
          !navBar.isOpen &&
            " hidden md:flex sticky top-0 gap-4 items-center justify-start text-lg scale-x-0 md:scale-x-100 md:static md:flex-row md:p-2  md:bg-transparent"
        )}
      >
        <Link href={"/"} className="w-[50px]">
          <Image
            src={"/Logo/logo.svg"}
            alt=""
            objectFit="cover"
            width={10}
            height={10}
            unoptimized
            className="w-fit hover:scale-105 duration-150 hidden md:flex"
          ></Image>
        </Link>
        <NavigationMenuLink
          href="/workspace"
          className={cn(
            "hover:opacity-80 duration-150 cursor-pointer rounded-lg hover:underline  px-4",
            pathname.includes("workspace") && "font-bold"
          )}
        >
          Workspace
        </NavigationMenuLink>
      </NavigationMenuList>
      <div
        className={cn(
          "flex gap-2  w-full sticky max-h-fit justify-between items-center px-3  py-1 md:static md:flex md:justify-end",
          navBar.isOpen &&
            "bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className="hover:bg-opacity-50 cursor-pointer p-2 md:hidden"
            onClick={toggleNavBar}
          >
            {navBar.isOpen ? <IoMdClose /> : <FaBars />}
          </div>
        </div>
        <ModeToggle />
      </div>
    </NavigationMenu>
  );
}
