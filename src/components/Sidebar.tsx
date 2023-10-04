"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`fixed top-0 ${
        isSidebarOpen ? "left-0" : "left-full md:left-0"
      } w-screen md:w-72 bg-white min-h-screen p-7 flex flex-col justify-between`}
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="text-xl">Property Share</div>
          <button className="md:hidden">
            <AiOutlineClose
              onClick={() => setIsSidebarOpen(false)}
              className="text-xl"
            />
          </button>
        </div>
        <ul className="space-y-5">
          {[
            ["/admin/profile", "Profile"],
            ["/admin/property", "Properties"],
            ["/admin/requests", "Requests"],
            ["/admin/users", "Users"],
          ].map(([href, text]) => (
            <li key={href}>
              <Link
                className="block bg-slate-100 px-4 py-2 rounded-lg text-gray-800 hover:text-black"
                href={href}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link
          href="/"
          className="w-full bg-slate-100 px-4 py-2 rounded-lg text-gray-800 hover:text-black"
          onClick={() => signOut()}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
