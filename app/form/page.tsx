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

import bg from "../assets/bg.jpg";

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
    <div
      className="text-white w-full pb-14"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center w-full p-6 md:p-12 mb-20">
        <h2 className="mt-10 scroll-m-20 pb-2 text-3xl md:text-5xl font-semibold transition-colors first:mt-0">
          Hello, {session?.user?.name}! 👋🏻
        </h2>

        {!acceptApplication ? (
          <p className="mt-4">
            We are not accepting applications at this time.
          </p>
        ) : isFormSubmitted ? (
          <p className="mt-4">
            Thank you, we have already received your response
          </p>
        ) : (
          <div className="flex flex-col space-y-4 mt-6">
            <Form {...form} className="flex-row w-full">
              <FormDescription className="scroll-m-20 text-2xl font-semibold text-gray-300">
                Personal Details
              </FormDescription>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 text-black">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          value={session?.user?.name}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          value={session?.user?.email}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="regno"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          {...field}
                          value={session?.user?.regno}
                          className="w-[300px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* We should not use table as it not being displayed properly on mobile. */}
              {/* <table className="table-auto border border-collapse border-gray-300 w-1/2">
                            <tbody>
                                <tr className="border border-gray-300">
                                    <td className="px-4 py-2 border border-gray-300 w-1/3">
                                        Name
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {session?.user?.name}
                                    </td>
                                </tr>
                                <tr className="border border-gray-300">
                                    <td className="px-4 py-2 border border-gray-300 w-1/3">
                                        Email
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300 w-fit">
                                        {session?.user?.email}
                                    </td>
                                </tr>
                                <tr className="border border-gray-300">
                                    <td className="px-4 py-2 border border-gray-300 w-1/3">
                                        Register Number
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {session?.user?.regno}
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-[100%]"
              >
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="12345XXXXX"
                          className="w-[300px]"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormDescription className="mt-12 scroll-m-20 text-2xl font-semibold mb-4 text-gray-300">
                    Department Preferences
                  </FormDescription>
                </div>
                <div className="w-full flex flex-col space-y-10 md:space-y-0 md:flex-row md:space-x-4">
                  <div className="w-full md:w-1/2 space-y-5 md:space-y-2">
                    <FormField
                      control={form.control}
                      name="department1"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Department (1st Preference)</FormLabel>
                          <Select onValueChange={field.onChange} required>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="development">
                                Development (Web Development and Open Source)
                              </SelectItem>
                              <SelectItem value="technical">
                                Technical (CTF and Projects)
                              </SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="event">
                                Event Management
                              </SelectItem>
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
                              placeholder="I want to join because..."
                              className="resize-none w-full"
                              required
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
                            Previous Work(s) (Portfolio, GitHub profile, Google
                            Drive link, etc.)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Previous Work"
                              className="resize-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-5 md:space-y-2">
                    <FormField
                      control={form.control}
                      name="department2"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Department (2nd Preference)</FormLabel>
                          <Select onValueChange={field.onChange} required>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="development">
                                Development (Web Development and Open Source)
                              </SelectItem>
                              <SelectItem value="technical">
                                Technical (CTF and Projects)
                              </SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="event">
                                Event Management
                              </SelectItem>
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
                              placeholder="I want to join because..."
                              className="resize-none w-full"
                              required
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
                            Previous Work(s) (Portfolio, GitHub profile, Google
                            Drive link, etc.)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Previous Work"
                              className="resize-none w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    className="mt-5 px-6 bg-white text-black hover:text-black hover:bg-gray-300"
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
