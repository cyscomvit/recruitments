"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import bg from "../assets/bg.jpg";

const Interview = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  const [shortlist, setShortlist] = useState(false);
  const [dateAssigned, setDateAssigned] = useState("");
  const [userShortlisted, setUserShortlisted] = useState(false);

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
    fetch("/api/interview", {
      method: "POST",
    }).then(async (res) => {
      const data = await res.json();
      setShortlist(data.data.value);
      setDateAssigned(data.data.dateAssigned);
      setUserShortlisted(data.data.isShortlisted);
    });
  }, []);

  return (
    <div
      className="text-white w-full pb-14"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center items-center h-[30%] text-center w-[85%] md:w-[50%] m-auto">
        {!isFormSubmitted ? (
          <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-2xl md:text-4xl font-semibold tracking-tight transition-colors first:mt-0">
              You have not submitted the form yet.
            </h2>
          </div>
        ) : shortlist ? (
          userShortlisted ? (
            <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
              <h2 className="mt-10 scroll-m-20 pb-2 text-4xl md:text-6xl font-semibold tracking-tight transition-colors first:mt-0">
                Congratulations, {session?.user?.name}! 🎉
              </h2>
              <p className="mt-6 text-md md:text-xl">
                🗓️ You have been shortlisted for an online interview on{" "}
                {dateAssigned}
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
              <h2 className="mt-10 scroll-m-20 pb-2 text-4xl md:text-6xl font-semibold tracking-tight transition-colors first:mt-0">
                Sorry, {session?.user?.name}!
              </h2>
              <p className="mt-6 text-md md:text-xl md:w-[70%]">
                We regret to inform you that you have not been shortlisted for
                the next round. However, we encourage you to keep pursuing your
                goals and apply again in the future. 💪🏻
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center mt-12 md:mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-4xl md:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
              Thank you for filling the form!🤩
            </h2>
            <p className="mt-6 text-md md:text-xl">
              We will be releasing the results for the interview round shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
