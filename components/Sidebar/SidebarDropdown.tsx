import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownItem {
  label: string;
  route: string;
}

interface SidebarDropdownProps {
  item: DropdownItem[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ item }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((childItem, index) => (
        <li key={index}>
          <Link
            href={childItem.route}
            className={`group relative flex flex-row-reverse items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === childItem.route ? "text-white" : ""
              }`}
          >
            {childItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;
