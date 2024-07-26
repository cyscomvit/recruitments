"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Responses, columns } from "./columns";
import { DataTable } from "./data-table";

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
    <div className="m-10">
      <h1 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Welcome {session?.user?.name} (admin)
      </h1>

      <div className="flex flex-col space-y-8 mt-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Admin;
