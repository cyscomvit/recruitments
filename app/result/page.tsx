"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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

  return (
    <div className="flex flex-col justify-center items-center h-[30%]">
      {!isFormSubmitted ? (
        <div className="flex flex-col justify-center items-center mt-24">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            You have not submitted the form yet
          </h2>
        </div>
      ) : result ? (
        userSelected ? (
          <div className="flex flex-col justify-center items-center mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Congratulations {session?.user?.name} !
            </h2>
            <p className="mt-4">
              You have been selected for {primaryDept} department{" "}
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-24">
            <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Sorry {session?.user?.name} !
            </h2>
            <p className="mt-4">
              We regret to inform you that you have not been selected. Don't
              give up, try again next time.
            </p>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center mt-24">
          <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Result has not been published yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default Result;
