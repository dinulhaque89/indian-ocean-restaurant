import Image from "next/image";
import MenuItems from '../components/MenuItems';
import Basket from '../components/Basket';
import MenuNavigation from '../components/MenuNavigation';
import { menuCategories } from '../data/menuData';
import { redirect } from 'next/navigation'




export default function Home() {
  redirect('/menu/starters')

  return (
    <main className="flex min-h-screen flex-col-3">
      <MenuNavigation />
      <div className="w-3/4">
        {menuCategories.map((category) => (
          <MenuItems key={category.name} category={category} />
        ))}
      </div>

      <Basket />
    </main>

  );
}
