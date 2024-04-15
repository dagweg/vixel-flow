import Image from "next/image";
import NavBar from "./components/nav-bar";
import { ArrowBigDownDash, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import RedirectButton from "./components/redirect-button";

export default function Home() {
  return (
    <>
      <div>
        <section className="flex h-screen items-center justify-center flex-col">
          <h1 className="text-2xl font-bold md:text-5xl relative z-10">
            Weclome to
          </h1>
          <div className="flex gap-6 flex-col items-center justify-center relative ">
            <Image
              src={"/Logo/logo.svg"}
              width={300}
              height={300}
              className="relative z-10"
              alt=""
            ></Image>
            <div className="absolute blur-[200px]  inset-0 opacity-20 dark:opacity-60   rounded-full  bg-gradient-to-r from-purple-600 to-pink-600 animate-spin "></div>
            {/* <span className="absolute block text-6xl md:text-5xl translate-y-[-52px] translate-x-[280px] w-full">
              ixel Flow
            </span> */}
            <span className="text-6xl md:text-5xl text-center w-full">
              Vixel Flow
            </span>
            <RedirectButton to="/workspace">Get Started</RedirectButton>
          </div>
        </section>
        <section className="flex h-screen items-center justify-center flex-col gap-4 relative">
          <h1 className="relative z-10 md:text-3xl font-bold flex items-center gap-3">
            <Sparkles />
            Instant Effects
          </h1>
          <span className=" text-4xl md:text-8xl z-[10] flex items-center gap-3">
            Instant Downloads
            <ArrowBigDownDash
              size={100}
              className=" bg-indigo-100 dark:bg-indigo-900 rounded-lg hidden md:visible"
            />
          </span>
          <p className="font-light text-2xl z-10">All from one place</p>
          <div className="md:w-[500px] bottom-0 absolute  inset-0 flex flex-col justify-center py-10 z-[0]">
            <div className="bg-purple-300 dark:bg-purple-600 h-[50px] md:h-[500px] rounded-r-2xl shadow-2xl shadow-blue-900 w-full z-0"></div>
          </div>
        </section>
      </div>
    </>
  );
}
