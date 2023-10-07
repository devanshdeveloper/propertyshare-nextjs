import PropertyBox from "@/components/PropertyBox";
import TabNav from "@/components/home/TabNav";
import { prisma } from "@/prisma";
import { camelize, getCities } from "@/utils";

type WhereProps = {
  city?: string;
  type?: string;
};

export default async function page({ searchParams }) {
  const where: WhereProps = {};
  const orderBy = [];
  const city = searchParams.city;
  const type = searchParams.type;
  const sortBy = searchParams.sortBy;
  if (city && city !== "All Cities") where.city = city;
  if (type && type !== "All") where.type = type;
  if (sortBy && sortBy !== "None") orderBy[0] = { [camelize(sortBy)]: "desc" };

  const properties = await prisma.property.findMany({ where, orderBy });
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
