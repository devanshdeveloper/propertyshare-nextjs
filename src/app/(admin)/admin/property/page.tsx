import PropertyBox from "@/components/PropertyBox";
import TabNav from "@/components/home/TabNav";
import { prisma } from "@/prisma";
import { getCities } from "@/utils";

export default async function page({ searchParams }) {
  const where = { approved: true };
  const city = searchParams.city;
  if (city && city !== "All Cities") where.city = city;

  const properties = await prisma.property.findMany({ where });

  const cities = getCities(
    await prisma.property.findMany({ select: { city: true } })
  );

  return (
    <div className="space-y-10 mt-10">
      <div className="text-2xl md:text-4xl px-20">Properties</div>
      <TabNav cities={cities} />
      <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 p-10 gap-10">
        {properties.map((property) => (
          <PropertyBox key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
