// app/menu/[category]/page.tsx
import MenuNavigation from '@/components/MenuNavigation'
import MenuItems from '@/components/MenuItems'
import Basket from '@/components/Basket'
import { menuCategories } from '@/data/menuData'

export default function MenuCategoryPage({ params }: { params: { category: string } }) {
  const currentCategory = menuCategories.find(
    (cat) => cat.name.toLowerCase().replace(/ /g, '-') === params.category
  )

  return (
    <div className="flex">
      <MenuNavigation currentCategory={params.category} />
      <div className="w-2/4">
        {currentCategory && <MenuItems category={currentCategory} />}
      </div>
      <Basket />
    </div>
  )
}