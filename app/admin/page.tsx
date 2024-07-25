"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Form = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return <div>{session?.user?.email}</div>;
};

export default Form;
