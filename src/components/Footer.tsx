"use client";
import { config } from "@/config";
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

export const Footer: FunctionComponent = () => {
  return (
    <section className="mt-8 md:mt-16 mb-12">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
        © PO-FENG {new Date().getFullYear()}. Some parts based on Wisp CMS (MIT)
        </div>
      </div>
    </section>
  );
};
