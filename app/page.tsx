"use client";
import bg from "./assets/bg.jpg";
import logo from "./assets/logo.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <div
      className="text-white w-full pb-14"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="pt-10 pb-3">
        <Lottie
          animationData={logo}
          className="md:block inset-0 h-[15rem] w-full md:w-auto"
        />
      </div>
      <div className="mx-auto w-[80%] text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          CYSCOM
        </h1>
        <h2 className="text-lg md:text-xl mt-1 md:mt-3">VIT, Chennai</h2>
        <p className=" mt-10 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Started with a few people having cyber safety in mind, the chapter now
          boasts a big gathering of members and associates alike. Join us on our
          mission to make cyberspace a safer place!
        </p>
        <p className=" mt-10 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Join CYSCOM to kickstart your cybersecurity journey.
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="https://www.github.com/cyscomvit" target="_blank">
          <div className="bg-white text-black cursor-pointer mt-10 px-4 py-2 rounded-xl group flex justify-center items-center gap-1 font-semibold">
            Checkout Projects{" "}
            <span className="group-hover:rotate-90 duration-200">
              <FaGithub />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
