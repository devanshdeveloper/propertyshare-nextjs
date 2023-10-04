import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function page({}) {
  const properties = await prisma.property.findMany({
    where: { approved: false },
  });

  return (
    <div className="space-y-10 mt-10">
      <div className="text-2xl md:text-4xl px-20">Properties</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[min(1100px,85vw)] mx-auto gap-10">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            cta={
              <Link
                href={`/admin/property/${property.slug}/edit`}
                className="flex justify-center w-full py-3 bg-green-500 text-white"
              >
                Edit
              </Link>
            }
          />
        ))}
      </div>
    </div>
  );
}
