import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET() {
    console.log("prisma");
    
  const property = await prisma.property.findMany({
    select: { city: true },
  });
  return NextResponse.json(property, { status: 200 });
}
// import { mockProperties } from "@/mockData";

// export async function POST(request) {
//   const a = Promise.all(
//     mockProperties.map((data) => {
//       return prisma.property.create({ data });
//     })
//   );

//   return NextResponse.json(a, { status: 200 });
// }
// // export async function POST(request) {
// //   const { searchParams } = new URL(request.url);
// //   const productId = searchParams.get("productId");
// //   const userId = searchParams.get("userId");
// //   const addedToCart = await prisma.Property.create({
// //     data: { userId, productId },
// //   });
// //   return NextResponse.json(addedToCart, { status: 200 });
// // }
// export async function PUT(request) {
//   const { searchParams } = new URL(request.url);
//   const productId = searchParams.get("productId");
//   const userId = searchParams.get("userId");
//   const quantity = +searchParams.get("quantity");
//   const updatedCart = await prisma.Property.updateMany({
//     where: { userId, productId },
//     data: { quantity },
//   });
//   return NextResponse.json(updatedCart, { status: 200 });
// }

// export async function DELETE(request) {
//   const { searchParams } = new URL(request.url);
//   const productId = searchParams.get("productId");
//   const userId = searchParams.get("userId");
//   console.log(productId, userId);
//   if (!userId) return;
//   const deletedCart = await prisma.Property.deleteMany({
//     where: productId ? { userId, productId } : { userId },
//   });
//   return NextResponse.json(deletedCart, { status: 200 });
// }
