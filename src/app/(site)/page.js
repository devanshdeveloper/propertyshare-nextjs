import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      {/* <div class="w-full h-96 bg-[url('/office-buildings.jpg')] bg-cover bg-center">
        <div class="w-full h-full flex flex-col gap-5 justify-center items-center backdrop-brightness-50">
          <span class="text-white text-2xl md:text-3xl lg:text-4xl w-1/2 text-center">
            Property Share
          </span>
          <span class="text-gray-200 text-lg md:text-xl lg:text-2xl w-1/2 text-center">
            Your One Stop Solution for Investment
          </span>
        </div>
      </div> */}
      <div className="bg-slate-900 w-full h-screen flex flex-col-reverse md:flex-row justify-center gap-10 items-center">
        <div className="w-1/2 text-center md:text-left md:ml-20 text-gray-100 text-base md:text-xl lg:text-2xl">
          <div className="text-xl md:text-2xl lg:text-5xl">
            Invest in pre-leased commercial properties
          </div>
          <div className="my-5">Earn monthly rents and benefit from capital appreciation</div>
          <Link
            href="/properties"
            className="px-6 py-3 text-base bg-green-600 text-white"
          >
            View Opportunities
          </Link>
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <Image
            src="/office-buildings.jpg"
            alt="office-buildings"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
