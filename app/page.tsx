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
        height: "100%",
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
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
          CYSCOM
        </h1>
        <h2 className="text-lg md:text-xl mt-1 md:mt-3">VIT Chennai</h2>
        <h3 className="text-md md:text-xl font-bold mt-1 md:mt-3">
          Recruitments 2024-25
        </h3>
        <p className=" mt-5 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Started with a few people having cyber safety in mind, the chapter now
          boasts a big gathering of members and associates alike. Join us on our
          mission to make cyberspace a safer place!
        </p>
        <p className=" mt-5 w-[90%] md:w-[45%] mx-auto text-md md:text-lg">
          Join CYSCOM to kickstart your cybersecurity journey.
        </p>
      </div>
      <div className="flex justify-center mt-4 mb-24">
        {!session ? (
          <Button
            className="bg-white text-black cursor-pointer mt-10 px-4 py-4 rounded-xl group flex justify-center items-center gap-1 font-semibold hover:bg-gray-200"
            onClick={() => signIn("google")}
          >
            Sign in with Google
            <FaGoogle className="ml-1" />
          </Button>
        ) : (
          <Button className="bg-white text-black cursor-pointer mt-10 px-4 py-4 rounded-xl group flex justify-center items-center gap-1 font-semibold hover:bg-gray-200">
            <Link href="/form">Apply Now!</Link>
          </Button>
        )}
      </div>
      <div className="departments w-full md:w-[85%] px-4 md:px-0 space-y-5 mx-auto">
        <h1 className="text-center text-3xl md:text-4xl text-white font-bold mb-10">
          Departments
        </h1>
        <div className="departments-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#3d44a3]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Development (Web-Dev and Open Source Projects)
            </h2>
            <p>
              Responsibilities encompass the management of the primary chapter
              website, subsidiary event websites, and any additional web
              platforms integral to projects.
              <br />
              <br />
              This role involves the creation of web development projects and
              applications for utilization within the chapter or by external
              parties.
            </p>
          </div>
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#f53100]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Technical (CTF and Projects)
            </h2>
            <p>
              Our skilled technical team enthusiastically engages in Capture The
              Flag (CTF) competitions and undertakes exciting security-oriented
              projects. This involves friendly challenges where our experts
              showcase their problem-solving abilities by solving puzzles and
              overcoming digital obstacles.
              <br />
              <br />
              Additionally, they're dedicated to crafting innovative projects
              that enhance the security of systems and data, making sure
              everything is well-guarded in our digital landscape.
            </p>
          </div>
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#090]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Design
            </h2>
            <p>
              Responsibilities encompass the management of the primary chapter
              website, subsidiary event websites, and any additional web
              platforms integral to projects.
              <br />
              <br />
              This role involves the creation of web development projects and
              applications for utilization within the chapter or by external
              parties.
            </p>
          </div>
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#97004c]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Event Management
            </h2>
            <p>
              The Event Management Department at Cyscom is the driving force
              behind our dynamic and engaging events. With meticulous
              coordination, the department orchestrates a diverse range of
              activities, catering to the interests of cybersecurity
              enthusiasts.
              <br />
              <br />
              The team adeptly manages finances, ensuring every penny is
              well-utilized for impactful experiences. Leveraging strategic
              partnerships, the department actively secures sponsors that share
              our commitment to fostering knowledge-sharing and networking
              opportunities.
            </p>
          </div>
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#1a7848]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Content
            </h2>
            <p>
              The Content Department at Cyscom shapes cybersecurity discourse by
              crafting insightful blogs, news updates, and engaging infographic
              posts. As writers, we delve into trends, developments, and best
              practices, fostering an informed community.
              <br />
              <br />
              Plays an important role in spreading awareness about
              Cybersecurity, Teaching Technical Concepts to the public, and
              finding creative ways to do the same.
            </p>
          </div>
          <div className="department px-4 py-3 text-white bg-blue-950 rounded-xl border-2 border-[#a2b825]">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-5">
              Social Media
            </h2>
            <p>
              The Social Media Department is responsible for maintaining a
              vibrant online presence by regularly posting updates on the latest
              trends and developments in the field of cybersecurity. This
              includes crafting engaging captions and using relevant hashtags to
              enhance visibility and engagement. The team ensures that our
              chapter's activities and achievements are communicated effectively
              to the outside world, acting as the bridge between our internal
              efforts and our external audience.
            </p>
          </div>
        </div>
      </div>

      <div className="departments w-full md:w-[85%] space-y-5">
        <h1 className="text-center text-4xl text-white font-bold mt-20 mb-10">
          Why CYSCOM?
        </h1>
        <div className="departments-container flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 items-center">
          <div className="text-center w-[80%] md:w-1/4 department px-4 py-3 text-white bg-blue-950 rounded-xl">
            <h2 className="text-base text-white">
              Get to be a part of the biggest cyber security student group in
              VIT Chennai!
            </h2>
          </div>
          <div className="text-center w-[80%] md:w-1/4 department px-3 py-3 text-white bg-blue-950 rounded-xl">
            <h2 className="text-base text-white">
              Work on real-time projects, learn effective collaboration and how
              to organize events!
            </h2>
          </div>
          <div className="text-center w-[80%] md:w-1/4 department px-4 py-3 text-white bg-blue-950 rounded-xl">
            <h2 className="text-base text-white">
              Learn new tech stacks through webinars, online sessions and much
              more!
            </h2>
          </div>
          <div className="text-center w-[80%] md:w-1/4 department px-4 py-3 text-white bg-blue-950 rounded-xl">
            <h2 className="text-base text-white">
              Dive into the evolving world of cyber-security and learn about the
              best security practices!
            </h2>
          </div>
        </div>
      </div>
      <div className="departments w-full lg:w-[85%] space-y-5">
        <h1 className="text-center text-4xl text-white font-bold mt-20 mb-10">
          How to apply?
        </h1>
        <div className="departments-container flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5">
          <div className="mx-auto w-1/2">
            <ul className="list-decimal text-lg space-y-2">
              <li className="pl-3">Login using your VIT email</li>
              <li className="pl-3">Click on Apply Now!</li>
              <li className="pl-3">
                Choose your preferred departments and add your previous works if
                any
              </li>
              <li className="pl-3">
                Fill the rest and submit the application form
              </li>
              <li className="pl-3">
                Based on your application, you will be shortlisted for a quick
                interview
              </li>
              <li className="pl-3">
                Shortlisted candidates and the final results can be checked on
                the same website
              </li>
              <li className="pl-3">
                Freshers are welcome to apply for any department. Prior
                experience is beneficial but not essential. What matters most is
                a strong desire to learn, grow, and collaborate with the team
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
