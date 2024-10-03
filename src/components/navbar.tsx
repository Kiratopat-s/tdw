"use client";

import * as React from "react";
import Link from "next/link";
import { LogIn, LogOut, Menu } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { signOut, useSession, signIn } from "next-auth/react";

export default function Navbar() {
  const [state, setState] = React.useState(false);
  const { setTheme } = useTheme();

  const ThemeChangeHandler = () => {
    const oldTheme = localStorage.getItem("theme");
    setTheme(() => (oldTheme === "dark" ? "light" : "dark"));
  };

  const menus = [
    { title: "Home", path: "/your-path" },
    { title: "Blog", path: "/your-path" },
    { title: "About Us", path: "/your-path" },
    { title: "Contact Us", path: "/your-path" },
  ];

  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 dark:bg-neutral-950 light:bg-white w-full border-b md:border-0 z-50">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-base-500 drop-shadow decoration-white">
              TDW
            </h1>
          </Link>
          <div className="md:hidden gap-2 flex">
            {status !== "loading" && (
              <>
                {!session?.user ? (
                  <Button
                    onClick={() => signIn()}
                    variant={"outline"}
                    className=" bg-purple-600"
                  >
                    <LogIn size={16} />
                  </Button>
                ) : (
                  <Button onClick={() => signOut()} variant={"destructive"}>
                    <LogOut size={16} />
                  </Button>
                )}
              </>
            )}
            <Button variant="outline" size="icon" onClick={ThemeChangeHandler}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 ease-in-out dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 ease-in-out dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
