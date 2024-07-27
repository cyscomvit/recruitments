import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/");
  }

  const { user } = session;

  try {
    const formSubmitted = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        isFormSubmitted: true,
      },
    });

    if (formSubmitted?.isFormSubmitted) {
      return NextResponse.json(
        { error: "Form already submitted" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Form not submitted" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Error finding user" }, { status: 500 });
  }
};
