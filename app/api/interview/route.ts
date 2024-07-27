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
    const shortlistPublished = await prisma.config.findFirst({
      where: {
        id: 2,
      },
      select: {
        value: true,
      },
    });

    const shortlist = await prisma.user.findFirst({
      where: {
        regno: user.regno,
      },
      select: {
        isShortlisted: true,
        dateAssigned: true,
      },
    });

    shortlist.dateAssigned = shortlist.dateAssigned
      ? new Date(shortlist.dateAssigned).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;

    let data = { ...shortlistPublished, ...shortlist };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
