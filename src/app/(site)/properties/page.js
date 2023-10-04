import TabNav from "@/components/home/TabNav";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/prisma";
import { camelize, getCities } from "@/utils";

export default async function Home({ searchParams }) {
  const where = {};
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
    <div>
      <div class="w-full h-96 bg-[url('/propertylist_features.jpg')] bg-cover bg-center">
        <div class="w-full h-full flex justify-center items-center backdrop-brightness-75">
          <span class="text-white text-2xl md:text-3xl lg:text-4xl w-1/2 text-center">
            All Properties
          </span>
        </div>
      </div>
      <TabNav cities={cities} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[min(1100px,85vw)] mx-auto gap-10 mt-12">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
