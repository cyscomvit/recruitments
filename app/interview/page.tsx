"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col justify-center items-center h-[30%]">
      {!isFormSubmitted ? (
        <div className="flex flex-col justify-center items-center mt-24">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            You have not submitted the form yet
          </h2>
        </div>
      ) : shortlist ? (
        userShortlisted ? (
          <div className="flex flex-col justify-center items-center mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Congratulations {session?.user?.name} !
            </h2>
            <p className="mt-4">
              You have been shortlisted for an online interview on{" "}
              {dateAssigned}
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Sorry {session?.user?.name} !
            </h2>
            <p className="mt-4">
              We regret to inform you that you have not been shortlisted. Don't
              give up, try again next time.
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center mt-24">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Shortlist has not been published yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default Interview;
