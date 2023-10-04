import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function PUT(request) {
  const newUser = await request.json();
  const updatedUser = await prisma.user.updateMany({
    where: { id: newUser.id },
    data: { admin: newUser.admin },
  });
  return NextResponse.json(updatedUser, { status: 200 });
}
