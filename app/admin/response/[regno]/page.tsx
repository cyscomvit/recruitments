"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const Response = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  const regno = usePathname().split("/").pop();

  const [data, setData] = useState([]);
  const [dateAssigned, setDateAssigned] = useState("");

  useEffect(() => {
    fetch(`/api/admin/response?regno=${regno}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);

  const { toast } = useToast();

  return (
    <>
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">Name</td>
            <td className="py-2 px-4 border-b">{data.name}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Register Number</td>
            <td className="py-2 px-4 border-b">{data.regno}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Email</td>
            <td className="py-2 px-4 border-b">{data.email}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Mobile</td>
            <td className="py-2 px-4 border-b">{data.mobile}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Department 1</td>
            <td className="py-2 px-4 border-b">{data.department1}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">
              Reason for joining Department 1
            </td>
            <td className="py-2 px-4 border-b">{data.reason1}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Previous Work 1</td>
            <td className="py-2 px-4 border-b">{data.previousWork1}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Department 2</td>
            <td className="py-2 px-4 border-b">{data.department2}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">
              Reason for joining Department 2
            </td>
            <td className="py-2 px-4 border-b">{data.reason2}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Previous Work 2</td>
            <td className="py-2 px-4 border-b">{data.previousWork2}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Shortlisted</td>
            <td className="py-2 px-4 border-b">
              {data.isShortlisted ? "Yes" : "No"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Selected</td>
            <td className="py-2 px-4 border-b">
              {data.isSelected ? "Yes" : "No"}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Applied Date</td>
            <td className="py-2 px-4 border-b">{data.dateApplied}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Assigned Date</td>
            <td className="py-2 px-4 border-b">{data.dateAssigned}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Primary Department</td>
            <td className="py-2 px-4 border-b">{data.primaryDept}</td>
          </tr>
        </tbody>
      </table>
      <div className="m-10 flex flex-rows space-x-8">
        <div className="space-y-4">
          <Label>Assign Date</Label>
          <Input
            type="datetime-local"
            id="dateAssigned"
            onChange={(e) => setDateAssigned(e.target.value)}
            className="w-[240px]"
          />
          <Button
            onClick={() => {
              fetch(`/api/admin/response/update?regno=${regno}`, {
                method: "POST",
                body: JSON.stringify({
                  dateAssigned: new Date(dateAssigned).toISOString(),
                }),
              })
                .then(() => {
                  toast({
                    title: "Assigned date updated",
                  });
                })
                .catch(() => {
                  toast({
                    title: "Error updating assigned date",
                  });
                });
            }}
          >
            Update Assigned Date
          </Button>
        </div>
        <div className="flex-rows space-y-4">
          <Select
            onValueChange={(value) => {
              fetch(`/api/admin/response/update?regno=${regno}`, {
                method: "POST",
                body: JSON.stringify({ isShortlisted: value === "true" }),
              })
                .then(() => {
                  toast({
                    title: "Shortlist status updated",
                  });
                })
                .catch(() => {
                  toast({
                    title: "Error updating shortlist status",
                  });
                });
            }}
          >
            <Label>Shortlisted</Label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={data.isShortlisted ? "Yes" : "No"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-rows space-y-4">
          <Select
            onValueChange={(value) => {
              fetch(`/api/admin/response/update?regno=${regno}`, {
                method: "POST",
                body: JSON.stringify({ isSelected: value === "true" }),
              })
                .then(() => {
                  toast({
                    title: "Selection status updated",
                  });
                })
                .catch(() => {
                  toast({
                    title: "Error updating selection status",
                  });
                });
            }}
          >
            <Label>Selected</Label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={data.isSelected ? "Yes" : "No"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-rows space-y-4">
          <Select
            onValueChange={(value) => {
              fetch(`/api/admin/response/update?regno=${regno}`, {
                method: "POST",
                body: JSON.stringify({ primaryDept: value }),
              })
                .then(() => {
                  toast({
                    title: "Primary department updated",
                  });
                })
                .catch(() => {
                  toast({
                    title: "Error updating primary department",
                  });
                });
            }}
          >
            <Label>Primary Department</Label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={data.primaryDept || "Select"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={data.department1}>
                  {data.department1}
                </SelectItem>
                <SelectItem value={data.department2}>
                  {data.department2}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default Response;
