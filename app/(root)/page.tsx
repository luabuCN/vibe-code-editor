import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const words = [
  {
    text: "Vibing",
  },
  {
    text: "Code",
  },
  {
    text: "新体验",
    className: "text-red-500 dark:text-red-400",
  },
];

export default function Home() {
  return (
    <div className="z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div className="flex flex-col justify-center items-center my-5">
        <Image src={"/hero.svg"} alt="hero" width={500} height={500} />
        <TypewriterEffectSmooth words={words} cursorClassName={"bg-red-500"} />
      </div>
      <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
        VibeCode 编辑器是一款强大且智能的代码编辑器，凭借先进的功能和无缝集成，提升您的编程体验。它旨在帮助您高效地编写、调试和优化代码。
      </p>
      <Link href={"/dashboard"}>
        <Button variant="default" className="mb-4" size={"lg"}>
          开始体验
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
