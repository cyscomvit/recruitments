"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../static/cyscom-logo.png";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa6";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="bg-blue-950 text-white">
        <nav>
          <div className="flex justify-between items-center w-full px-5 md:px-10 py-4">
            <div>
              <Link href="/">
                <Image src={Logo} width="50" height="50" alt="logo" />
              </Link>
            </div>
            <div className="flex gap-10 items-center">
              <Link href="/">Home</Link>
              {session && (
                <>
                  <Link href="/form">Form</Link>
                  <Link href="/interview">Interview</Link>
                  <Link href="/result">Result</Link>
                </>
              )}
              {session?.user.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}
              {session ? (
                <Button
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  className="bg-white text-black hover:bg-gray-200"
                  onClick={() => signIn("google")}
                >
                  Sign in with Google
                  <FaGoogle className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
