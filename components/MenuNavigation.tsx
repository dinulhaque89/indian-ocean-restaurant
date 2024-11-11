"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const categories = [
  "Starters",
  "House Specialities",
  "Tandoori Dishes",
  "Traditional Dishes",
  "Side Dishes",
  "Rice and Breads"
];

const MenuNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 pt-14">
      {categories.map((category) => {
        const href = `/menu/${category.toLowerCase().replace(/ /g, '-')}`;
        const isActive = pathname === href;

        return (
          <Link key={category} href={href} className="block">
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start  text-[24px] font-normal leading-[40.32px] text-left",
                isActive && "bg-accent font-bold text-[#343532]"
              )}
            >
              {category}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default MenuNavigation;