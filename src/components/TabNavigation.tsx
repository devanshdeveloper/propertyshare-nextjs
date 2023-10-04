import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ReactNode, isValidElement, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { updateSearchParam } from "../utils.js";

export default function TabNavigation({
  tabs,
  setCurrentTabIndex,
  currentTabIndex,
}) {
  return (
    <div className="text-gray-600 bg-white flex gap-5 md:gap-1 rounded flex-col md:flex-row items-center shadow-xl w-fit mx-auto relative bottom-5 z-20 text-xs md:text-sm">
      {isValidElement(tabs)
        ? tabs
        : tabs.map((tab: ReactNode, i: number) => {
            return tab;
          })}
    </div>
  );
}

export const Tab = ({ isActive, children }) => {
  return (
    <div
      className={`${
        isActive ? "block" : "hidden"
      } bg-dark-900 text-white w-full sm:w-3/4 md:w-1/2 p-10 rounded  shadow-xl`}
    >
      {children}
    </div>
  );
};

export function TabLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const searchParams = useSearchParams().toString();
  const pathName = usePathname();
  const asPath = searchParams ? pathName + "?" + searchParams : pathName;

  return (
    <Link
      href={pathName + href}
      scroll={false}
      className={`flex px-8 py-5 gap-3 items-center ${
        pathName + href === asPath
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500 hover:text-blue-600"
      } transition-all duration-200`}
    >
      {children}
    </Link>
  );
}

export function TabDropdown({
  text,
  searchParam,
  tabs,
  children,
}: {
  text: string;
  searchParam: string;
  tabs: string[];
  children?: ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const value = searchParams.get(searchParam) || tabs[0];

  return (
    <div className="relative px-8">
      <div>
        <div>{text}</div>
        <div
          className="flex items-center gap-3 text-blue-500 hover:cursor-pointer transition-all duration-200"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          {value} <AiOutlineDown className="text-sm" />
        </div>
      </div>
      <div
        className={`absolute top-16 left-0 bg-white flex flex-wrap flex-col rounded-lg shadow-lg py-3 ${
          isDropdownOpen ? "opacity-100" : "hidden opacity-0"
        }`}
      >
        {tabs.map((tab, i) => (
          <Link
            scroll={false}
            onClick={() => setIsDropdownOpen(false)}
            key={i}
            href={`${pathName}?${updateSearchParam(
              searchParams,
              searchParam,
              tab
            )}`}
            className={`px-6 py-3 hover:text-blue-500 ${
              value === tab ? "text-blue-500" : ""
            }`}
          >
            {tab}
          </Link>
        ))}
      </div>
    </div>
  );
}
