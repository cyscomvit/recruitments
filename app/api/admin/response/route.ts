import prisma from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

import * as z from "zod";

const schema = z.object({
  regno: z.string().min(9).max(10),
});

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

    const { regno: regnoValue } = schema.parse({ regno });

    const data = await prisma.user.findFirst({
      where: {
        regno: regnoValue,
      },
    });

    data.dateApplied = data.dateApplied
      ? new Date(data.dateApplied).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;

    if (data.dateAssigned !== null) {
      data.dateAssigned = new Date(data.dateAssigned).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    delete data?.id;

    data.department1 =
      data.department1.charAt(0).toUpperCase() + data.department1.slice(1);
    data.department2 =
      data.department2.charAt(0).toUpperCase() + data.department2.slice(1);

    if (data.dateAssigned === null) {
      data.dateAssigned = "Not Assigned";
    }

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
};
