import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";

import * as z from "zod";

const schema = z
  .object({
    name: z.string().max(50).min(3),
    email: z.string().email(),
    regno: z.string().min(9).max(10),
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
    },
  );

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/");
  }

  const { user } = session;

  try {
    const data = schema.parse(await request.json());

    if (
      user.email !== data.email &&
      user.regno !== data.regno &&
      user.name !== data.name
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const acceptApplication = await prisma.config.findFirst({
      where: {
        id: 3,
      },
      select: {
        value: true,
      },
    });

    if (acceptApplication?.value === false) {
      return NextResponse.json(
        { error: "We are not accepting applications at this time." },
        { status: 200 },
      );
    }

    const response = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: data.name,
        email: data.email,
        regno: data.regno,
        mobile: data.mobile,
        department1: data.department1,
        reason1: data.reason1,
        previousWork1: data.previousWork1,
        department2: data.department2,
        reason2: data.reason2,
        previousWork2: data.previousWork2,
        isFormSubmitted: true,
        dateApplied: new Date().toISOString(),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
