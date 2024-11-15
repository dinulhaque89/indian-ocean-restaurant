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
    <nav className="flex lg:flex-col gap-2">
      {categories.map((category) => {
        const href = `/menu/${category.toLowerCase().replace(/ /g, '-')}`;
        const isActive = pathname === href;
  
        return (
          <Link key={category} href={href} className="lg:block">
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "lg:w-full lg:justify-start whitespace-nowrap",
                "lg:text-[24px] text-sm font-normal",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              {category}
            </Button>
          </Link>
        );
      })}
    </nav>
  );};

export default MenuNavigation;