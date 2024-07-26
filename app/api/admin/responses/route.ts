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
    const responses = await prisma.user.findMany({
      select: {
        name: true,
        regno: true,
        email: true,
        mobile: true,
        dateAssigned: true,
        dateApplied: true,
        isSelected: true,
        isShortlisted: true,
        department1: true,
        department2: true,
      },
    });

    responses.forEach((response) => {
      response.dateAssigned = response.dateAssigned
        ? new Date(response.dateAssigned).toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : null;

      response.dateApplied = response.dateApplied
        ? new Date(response.dateApplied).toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : null;

      response.isSelected = response.isSelected ? "Yes" : "No";
      response.isShortlisted = response.isShortlisted ? "Yes" : "No";

      response.department1 =
        response.department1.charAt(0).toUpperCase() +
        response.department1.slice(1);
      response.department2 =
        response.department2.charAt(0).toUpperCase() +
        response.department2.slice(1);

      if (response.dateAssigned === null) {
        response.dateAssigned = "Not Assigned";
      }
    });

    return NextResponse.json({ responses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error finding responses" },
      { status: 500 }
    );
  }
};
