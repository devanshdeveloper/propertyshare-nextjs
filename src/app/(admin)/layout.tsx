import Sidebar from "@/components/Sidebar";
import "../globals.css";
import { Poppins } from "next/font/google";
import ContextProviders from "@/contextProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Ecommerce Site",
  description: "Ecommerce Site using Next.js + Sanity.io",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-indigo-50`}>
        {!session || !session.user.admin ? (
          <div className="h-screen w-screen bg-gray-100 flex flex-col items-center justify-center gap-16">
            <div>
              {!session
                ? "You are not logged in"
                : "You are not admin. Please contact the owner."}
            </div>
            <Link href="/" className="btn btn-default">
              Back to home page
            </Link>
          </div>
        ) : (
          <ContextProviders>
            <Sidebar />
            <div className="w-[calc(100vw-288px)] absolute top-0 left-72">
              {children}
            </div>
          </ContextProviders>
        )}
      </body>
    </html>
  );
}
