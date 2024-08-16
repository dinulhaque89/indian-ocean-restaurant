// components/Header.tsx
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-beige p-4 flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="The Indian Ocean" width={86} height={91} />
        {/* <span className="ml-2 text-xl font-semibold">The Indian Ocean</span> */}
      </Link>
      <button className="bg-gray-600 text-white px-10 py-2 rounded hover:bg-gray-700 transition-colors">
        Sign up / Login
      </button>
    </header>
  )
}

export default Header