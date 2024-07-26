import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.redirect("/");
  }

  const { user } = session;

  if (user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const regno = searchParams.get("regno");

    const data = await request.json();

    const response = await prisma.user.update({
      where: {
        regno,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json({ data: response });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
