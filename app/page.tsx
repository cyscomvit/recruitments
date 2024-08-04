"use client";
import { Button } from "@/components/ui/button";
import bg from "./assets/bg.jpg";
import logo from "./assets/cyscom-logo.png";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div
      className="text-white w-full pb-14 items-center flex flex-col"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "86vh",
      }}
    >
      <div className="pt-10 pb-3 mb-4 mt-4">
        <Image
          src={logo}
          alt="CYSCOM"
          width={150}
          height={150}
          className="md:block inset-0 h-[15rem] w-full md:w-auto"
        />
      </div>
      <div className="mx-auto w-[80%] text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          CYSCOM
        </h1>
        <h2 className="text-lg md:text-xl mt-1 md:mt-3">VIT Chennai</h2>
        <p className=" mt-10 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Started with a few people having cyber safety in mind, the chapter now
          boasts a big gathering of members and associates alike. Join us on our
          mission to make cyberspace a safer place!
        </p>
        <p className=" mt-10 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Join CYSCOM to kickstart your cybersecurity journey
        </p>
      </div>
      <div className="flex justify-center mt-4">
        {!session ? (
          <Button onClick={() => signIn("google")}>
            <div className="bg-white text-black cursor-pointer mt-10 px-4 py-4 rounded-xl group flex justify-center items-center gap-1 font-semibold hover:bg-gray-200">
              Sign in with Google
              <FaGoogle className="ml-1" />
            </div>
          </Button>
        ) : (
          <Button>
            <Link href="/form">
              <div className="bg-white text-black cursor-pointer mt-10 px-4 py-4 rounded-xl group flex justify-center items-center gap-1 font-semibold hover:bg-gray-200">
                Apply Now !
              </div>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
