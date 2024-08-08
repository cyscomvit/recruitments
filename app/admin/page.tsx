"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Responses, columns } from "./columns";
import { DataTable } from "./data-table";

import { Card, CardContent } from "@/components/ui/card";

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
  const [count, setCount] = useState([0, 0, 0, 0]);

  useEffect(() => {
    fetch("/api/admin/count", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.users);
      });
  }, []);

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

        <Card className="w-[80%] md:w-[50%] lg:w-[40%] xl:w-[20%] mt-6">
          <CardContent>
            <p className="text-lg pt-6 pb-2 font-semibold">Users</p>
            <p className="text-sm pt-1">Total - {count[0]}</p>
            <p className="text-sm pt-1">Applied - {count[1]}</p>
            <p className="text-sm pt-1">Shortlisted - {count[2]}</p>
            <p className="text-sm pt-1">Selected - {count[3]}</p>
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-8 mt-6">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
