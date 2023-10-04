"use server";

import { prisma } from "@/prisma";

export async function addToFavorites(userId: string, propertyId: string) {
  const res = await prisma.propertiesFavByUser.create({
    data: { userId, propertyId },
  });
}
