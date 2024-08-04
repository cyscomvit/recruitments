"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Responses, columns } from "./columns";
import { DataTable } from "./data-table";

import bg from "../assets/bg.jpg";

const Admin = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  const [data, setData] = useState<Responses[]>([]);

  useEffect(() => {
    fetch("/api/admin/responses", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.responses);
      });
  }, []);

  return (
    <div className="text-black w-full pb-14">
      <div className="p-5 md:p-10">
        <span className="text-xs md:text-sm px-3 py-1 bg-gray-800 text-white font-mono rounded-xl">
          Admin
        </span>
        <h1 className="mt-2 scroll-m-20 pb-2 text-4xl font-semibold transition-colors">
          Welcome, {session?.user?.name}!
        </h1>

        <div className="flex flex-col space-y-8 mt-6">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
