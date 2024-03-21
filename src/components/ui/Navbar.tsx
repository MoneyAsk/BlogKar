"use client";
import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/floating-navbar";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "@/_trpc/client";
import Image from "next/image";
import Link from "next/link";

export function NavbarD() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  //@ts-ignore
  const user = trpc.getUser.useQuery(session?.user?.id);
  // console.log(user.data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    // fixed top-10
    <div
      className={cn("  inset-x-0 max-w-2xl mx-auto z-50 mt-[10px]", className)}
    >
      <Menu setActive={setActive}>
        <div
          className=""
          onClick={() => {
            router.push("/blog");
          }}
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item="Blog"
          ></MenuItem>
        </div>
        <div
          className=""
          onClick={() => {
            router.push("/about");
          }}
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item="About"
          ></MenuItem>
        </div>
        <div
          className=""
          onClick={() => {
            router.push("/addPost");
          }}
        >
          <MenuItem
            setActive={setActive}
            active={active}
            item="AddPost"
          ></MenuItem>
        </div>

        <div className="">
         {session?.user?(
        <div
          className=" w-32 flex relative "
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="basis-3/4 text-black text-xl font-mono font-bold cursor-pointer">
            {user.data?.username||user.data?.name }
          </div>
          <div className="basis-1/4 py-0.5">
            <Image
              src={user.data?.Profile?.image || "/noavatar.png"}
              alt="profile"
              width="25"
              height="25"
              className="mx-auto rounded-full"
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-32 flex flex-col space-y-4 text-sm bg-white backdrop-blur-sm rounded-sm overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
              <Link
                href="/me"
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:text-black hover:bg-gray-100"
              >
                Profile
              </Link>

              {session?.user ? (
                <button className="w-full px-4 py-2 text-left hover:bg-gray-100" onClick={()=>{signOut();}} >
                  Log Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:text-black hover:bg-gray-100"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
        ):(
          <Link href="/login" className="text-black text-xl font-mono font-bold cursor-pointer">
            Login
          </Link>
        )}
        </div>
      </Menu>
    </div>
  );
}
