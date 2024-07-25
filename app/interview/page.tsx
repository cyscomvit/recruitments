"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Interview = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  return <div>Interview</div>;
};

export default Interview;
