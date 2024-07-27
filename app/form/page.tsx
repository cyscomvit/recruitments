"use client";

import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "@/components/ui/use-toast";

export const formSchema = z
  .object({
    mobile: z.string().max(15).min(10),
    department1: z.string().max(15).min(5),
    reason1: z.string().max(300).min(20),
    previousWork1: z.string().optional(),
    department2: z.string().max(15).min(5),
    reason2: z.string().max(300).min(20),
    previousWork2: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.department1 !== data.department2;
    },
    {
      message: "Both departments cannot be same",
      path: ["department1", "department2"],
    }
  );

export default function FormPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [acceptApplication, setAcceptApplication] = useState(true);

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
    fetch("/api/recruitment", {
      method: "POST",
    }).then(async (response) => {
      const data = await response.json();
      if (data.error) {
        setAcceptApplication(false);
      }
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      department1: "",
      reason1: "",
      previousWork1: "",
      department2: "",
      reason2: "",
      previousWork2: "",
    },
  });

  const { handleSubmit } = form;

  const { toast } = useToast();

  const userData = {
    name: session?.user?.name,
    email: session?.user?.email,
    regno: session?.user?.regno,
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values = { ...values, ...userData };
    const response = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast({
        title: "Form submitted successfully!",
      });
    } else {
      toast({
        title: "Failed to submit form",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Hello {session?.user?.name} 👋🏻
      </h2>

      {!acceptApplication ? (
        <p className="mt-4">We are not accepting applications at this time.</p>
      ) : isFormSubmitted ? (
        <p className="mt-4">
          Thank you, we have already received your response
        </p>
      ) : (
        <div className="flex flex-col w-1/2 space-y-8 mt-6">
          <Form {...form} className="flex-row">
            <FormDescription className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Personal Details
            </FormDescription>
            <table className="table-auto border border-collapse border-gray-300 w-1/2">
              <tbody>
                <tr className="border border-gray-300">
                  <td className="px-4 py-2 border border-gray-300 w-1/4">
                    Name
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {session?.user?.name}
                  </td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="px-4 py-2 border border-gray-300 w-1/4">
                    Email
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {session?.user?.email}
                  </td>
                </tr>
                <tr className="border border-gray-300">
                  <td className="px-4 py-2 border border-gray-300 w-1/4">
                    Registration Number
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {session?.user?.regno}
                  </td>
                </tr>
              </tbody>
            </table>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-3/4">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Mobile Number"
                        className="w-120"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department1"
                render={({ field }: any) => (
                  <FormItem>
                    <FormDescription className="mt-12 scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
                      Department Preferences
                    </FormDescription>
                    <FormLabel>Department (1st Preference)</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[50%]">
                          <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="development">
                          Development (Web-Dev and Open Source Projects)
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical (CTF and Projects)
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="event">Event Management</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="social-media">
                          Social Media
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason1"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Why do you what to join?</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Reason for joining"
                        className="resize-none w-[80%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previousWork1"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>
                      Attach any previous works (Github links, Drive links, etc)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Previous Work"
                        className="resize-none w-[80%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department2"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Department (2nd Preference)</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[50%]">
                          <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="development">
                          Development (Web-Dev and Open Source Projects)
                        </SelectItem>
                        <SelectItem value="technical">
                          Technical (CTF and Projects)
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="event">Event Management</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="social-media">
                          Social Media
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason2"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Why do you what to join?</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Reason for joining"
                        className="resize-none w-[80%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previousWork2"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>
                      Attach any previous works (Github links, Drive links, etc)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Previous Work"
                        className="resize-none w-[80%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
