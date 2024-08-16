// components/MenuNavigation.tsx
import Link from 'next/link'

const categories = [
  "Starters",
  "House Specialities",
  "Tandoori Dishes",
  "Traditional Dishes",
  "Side Dishes",
  "Rice and Breads"
]

const MenuNavigation: React.FC<{ currentCategory: string }> = ({ currentCategory }) => {
  return (
    <nav className="w-1/4 p-4">
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <Link href={`/menu/${category.toLowerCase().replace(/ /g, '-')}`}>
              <span className={`hover:text-blue-600 transition-colors ${currentCategory === category.toLowerCase().replace(/ /g, '-') ? 'text-blue-600 font-bold' : ''}`}>
                {category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuNavigation