import prisma from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const {
    name,
    email,
    regno,
    mobile,
    department1,
    reason1,
    department2,
    reason2,
  } = body;

  // const result = prisma.user.create({
  //   data: {
  //     name,
  //     email,
  //     regno,
  //     mobile,
  //     department1,
  //     reason1,
  //     department2,
  //     reason2,
  //   } as any,
  // });

  return NextResponse.json({ message: "Form submitted successfully!" });
};
