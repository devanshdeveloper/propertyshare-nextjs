"use client";

import { useState } from "react";
import TabNavigation, { TabDropdown, TabLink } from "../TabNavigation";
import { BsBuilding, BsBuildingUp } from "react-icons/bs";

function TabNav({ cities }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <TabNavigation
      tabs={
        <>
          <div className="flex">
            <TabLink key={0} href="">
              <BsBuilding /> All Properties
            </TabLink>
            <TabLink key={1} href="?type=resale">
              <BsBuildingUp /> Resale Properties
            </TabLink>
          </div>
          <div className="flex pb-3 md:pb-0">
            <TabDropdown key={2} text="City" tabs={cities} searchParam="city" />
            <TabDropdown
              key={3}
              text="Type"
              tabs={[
                "All",
                "Residential",
                "Commercial",
                "Lots",
                "Rental",
                "Land",
              ]}
              searchParam="type"
            />
            <TabDropdown
              key={4}
              text="Sort By"
              tabs={["None", "Yield", "Price PSF", "Return Target"]}
              searchParam="sortBy"
            />
          </div>
        </>
      }
      {...{ currentTabIndex, setCurrentTabIndex }}
    />
  );
}
export default TabNav;
