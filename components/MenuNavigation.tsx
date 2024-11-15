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
    <nav className={cn(
      "lg:space-y-1 lg:pt-14",
      "flex lg:flex-col gap-2 bg-[#F5F5F5] p-2 -mx-4 overflow-x-auto scrollbar-hide",
      "lg:bg-transparent lg:p-0 lg:mx-0"
    )}>
      {categories.map((category) => {
        const href = `/menu/${category.toLowerCase().replace(/ /g, '-')}`;
        const isActive = pathname === href;
  
        return (
          <Link key={category} href={href} className="block shrink-0">
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "lg:w-full lg:justify-start lg:text-[24px] lg:font-normal lg:leading-[40.32px] lg:text-left",
                "text-sm px-4 py-2 rounded-full whitespace-nowrap",
                isActive ? 
                  "bg-primary text-primary-foreground font-medium" : 
                  "text-muted-foreground hover:bg-accent",
                "lg:rounded-sm lg:px-3 lg:py-1.5",
                isActive && "lg:bg-accent lg:font-bold lg:text-[#343532]"
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