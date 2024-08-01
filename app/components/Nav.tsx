"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "../static/cyscom-logo.png";

import { Button } from "@/components/ui/button";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header className="bg-gray-300 text-black">
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
                <Button onClick={() => signOut()}>Sign out</Button>
              ) : (
                <Button onClick={() => signIn("google")}>
                  Sign in with Google
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
