import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { mockProperties } from "@/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const property = await prisma.property.findMany({
    where: { slug },
  });
  return NextResponse.json(property, { status: 200 });
}

export async function POST(request) {
  const a = Promise.all(
    mockProperties.map((data) => {
      return prisma.property.create({ data });
    })
  );
  return NextResponse.json(a, { status: 200 });
}

export async function PUT(request) {
  const newProperty = await request.json();
  const updatedProperty = await prisma.Property.updateMany({
    where: { id: newProperty.id },
    data: newProperty,
  });
  return NextResponse.json(updatedProperty, { status: 200 });
}

export async function DELETE(request) {
  const property = await request.json();
  const deletedProperty = await prisma.Property.deleteMany({
    where: { id: property.id },
  });
  return NextResponse.json(deletedProperty, { status: 200 });
}
