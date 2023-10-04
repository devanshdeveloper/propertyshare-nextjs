import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import FavoritesButton from "./FavoritesButton";
import Link from "next/link";

async function PropertyBox({
  id,
  name,
  slug,
  images,
  location,
  city,
  area,
  pricePSF,
  returnTarget,
  ...property
}) {
  return (
    <div className="bg-white shadow-lg relative">
      <div className="p-5">
        <div>{name}</div>
        <div className="flex items-center text-sm gap-1 text-gray-500">
          <HiLocationMarker className="text-xs text-blue-500" /> {location},
          {city}
        </div>
      </div>
      <Image
        src={images ?? "/preston-uk-united-kingdom.jpg"}
        alt="property"
        height={400}
        width={300}
        className="w-full aspect-video"
      />
      <div className="space-y-5 my-5 mx-10">
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm">Area</div>
          <div>{area}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm">Price psf</div>
          <div>₹{pricePSF}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm">Yield</div>
          <div>{property.yield}%</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm">Return Target</div>
          <div>{returnTarget}%</div>
        </div>
        <Link
          href={`/admin/property/${slug}/edit`}
          className="block text-center w-full px-6 py-3 bg-green-500 text-white"
        >
          View Opportunity
        </Link>
      </div>
    </div>
  );
}

export default PropertyBox;
