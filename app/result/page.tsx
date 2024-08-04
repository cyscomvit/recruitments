"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import bg from "../assets/bg.jpg";

const Result = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  const [result, setResult] = useState(false);
  const [primaryDept, setPrimaryDept] = useState("");
  const [userSelected, setUserSelected] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/submitted", {
      method: "POST",
    }).then(async (response) => {
      const data = await response.json();
      if (data.error) {
        setIsFormSubmitted(true);
      }
    });
  }, []);

  useEffect(() => {
    fetch("/api/result", {
      method: "POST",
    }).then(async (res) => {
      const data = await res.json();
      setResult(data.data.value);
      setPrimaryDept(data.data.primaryDept);
      setUserSelected(data.data.isSelected);
    });
  }, []);

  const { width, height } = useWindowSize();

  return (
    <div
      className="text-white w-full pb-14"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "86vh",
      }}
    >
      <div className="flex flex-col justify-center items-center h-[30%] text-center w-[85%] md:w-[50%] m-auto">
        {!isFormSubmitted ? (
          <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-2xl md:text-4xl font-semibold tracking-tight transition-colors first:mt-0">
              You have not submitted the form yet
            </h2>
          </div>
        ) : result ? (
          userSelected ? (
            <div className="flex flex-col justify-center items-center mt-24">
              <h2 className="mt-10 scroll-m-20 pb-2 text-4xl md:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
                Congratulations, {session?.user?.name}! 🎉
              </h2>
              <p className="mt-6 text-md md:text-xl">
                You have been selected for {primaryDept} department <br />
                We are happy to have on board! 🥳
              </p>
              <Confetti recycle={false} width={width} height={height - 60} />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
              <h2 className="mt-10 scroll-m-20 pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
                Sorry, {session?.user?.name}
              </h2>
              <p className="mt-6 text-md md:text-xl md:w-[70%]">
                We regret to inform you that you have not been selected.
                However, we encourage you to keep pursuing your goals and apply
                again in the future 💪🏻
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-4xl md:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
              Thank you for filling the form!🤩
            </h2>
            <p className="mt-6 text-md md:text-xl">
              We will be releasing the final results shortly
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
