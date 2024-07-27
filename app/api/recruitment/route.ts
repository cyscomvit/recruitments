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
        { status: 200 }
      );
    }

    return NextResponse.json({ data: acceptApplication });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
