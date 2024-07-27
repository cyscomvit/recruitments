import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/");
  }

  const { user } = session;

  try {
    const resultPublished = await prisma.config.findFirst({
      where: {
        id: 1,
      },
      select: {
        value: true,
      },
    });

    let result = await prisma.user.findFirst({
      where: {
        regno: user.regno,
      },
      select: {
        isSelected: true,
        primaryDept: true,
      },
    });

    let data = { ...resultPublished, ...result };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
