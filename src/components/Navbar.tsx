"use client";

import useEventListener from "@/hooks/useEventListener";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";

const DropdownItem = ({ children, href, ...props }) => {
  return (
    <Link
      href={href}
      {...props}
      className="hover:bg-gray-200 text-gray-900 cursor-pointer whitespace-nowrap rounded-lg bg-transparent px-6 py-3 text-sm transition-all"
    >
      {children}
    </Link>
  );
};
const DropdownButton = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="hover:bg-gray-200 text-gray-900 cursor-pointer rounded-lg bg-transparent px-6 py-3 text-left text-sm transition-all"
    >
      {children}
    </button>
  );
};

function Navbar() {
  // state
  const [pageScrolled, setPageScrolled] = useState(0);
  const [isNavbarOpened, setIsNavbarOpened] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  // hooks
  const { data: auth, status } = useSession();
  useEventListener("scroll", () => {
    setPageScrolled(window.scrollY);
  });

  return (
    <header
      className={`fixed w-full h-20 ${
        pageScrolled > 75 ? "bg-[#0e1622d6]" : "bg-transparent"
      } text-white flex items-center justify-around md:justify-evenly z-50 transition-all duration-1000 border-b-[0.75px] border-gray-400`}
    >
      <Link href="/" className="text-xl">
        PShare
      </Link>
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsNavbarOpened(true)}
      >
        <RxHamburgerMenu />
      </button>
      <div
        className={`absolute md:static top-0 ${
          isNavbarOpened ? "left-0" : "left-full"
        } w-screen h-screen md:w-1/2 md:h-auto flex flex-col md:flex-row md:items-center md:justify-around  text-xl md:text-base bg-gray-200 md:bg-transparent md:text-white text-gray-700 p-20 md:p-0 gap-10 md:gap-0 transition-all duration-200`}
      >
        <button
          className="absolute top-16 right-16 text-2xl md:hidden"
          onClick={() => setIsNavbarOpened(false)}
        >
          <AiOutlineClose />
        </button>
        <nav>
          <ul className="flex flex-col md:flex-row gap-10 md:gap-5 md:items-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/properties">Properties</NavLink>
            <NavLink href="/favorites">Favorites</NavLink>
          </ul>
        </nav>
        <ul>
          {auth ? (
            <div>
              <div className="flex items-center gap-2">
                <Image
                  src={auth.user.image}
                  className="h-8 w-8 rounded-full"
                  alt="profilePicture"
                  height={40}
                  width={40}
                />
                <span className="ml-2 hidden text-white lg:inline">
                  {auth.user.name.split(" ")[0]}
                </span>
                <div className="relative">
                  <AiOutlineDown
                    className={`text-md md:text-gray-100 mx-2 transition-all duration-300 ${
                      isDropDownOpen ? "-scale-y-100" : ""
                    }`}
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                  />
                  <div
                    className={`bg-gray-100 absolute top-10 -right-16 md:right-0 z-50 flex w-[228px] flex-col rounded-lg transition-all ${
                      isDropDownOpen
                        ? "opacity-1 pointer-events-auto top-[calc(100%-10px)]"
                        : "pointer-events-none top-[calc(100%-50px)] opacity-0"
                    }`}
                  >
                    {[
                      ["/profile", "Profile"],
                      ["/requested", "Requested"],
                    ].map(([href, text]) => (
                      <DropdownItem
                        key={href}
                        onClick={() => setIsDropDownOpen(false)}
                        href={href}
                      >
                        {text}
                      </DropdownItem>
                    ))}
                    <DropdownButton onClick={() => signOut()}>
                      Sign Out
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </ul>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  const pathName = usePathname();

  return (
    <li className="">
      <Link
        className={`transition-all duration-200 hover:text-gray-200  md:hover:text-gray-100${
          pathName === href ? "text-gray-400" : "hover:text-gray-400"
        }`}
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
