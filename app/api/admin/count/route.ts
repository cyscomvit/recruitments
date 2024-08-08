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
    const totalCount = await prisma.user.count({
      where: {
        role: "user",
      },
    });

    const appliedCount = await prisma.user.count({
      where: {
        isFormSubmitted: true,
        role: "user",
      },
    });

    const shortlistedCount = await prisma.user.count({
      where: {
        isShortlisted: true,
        role: "user",
      },
    });

    const selectedCount = await prisma.user.count({
      where: {
        isSelected: true,
        role: "user",
      },
    });

    return NextResponse.json({
      users: [totalCount, appliedCount, shortlistedCount, selectedCount],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
