"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Result = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  return <div>{session?.user?.email}</div>;
};

export default Result;
