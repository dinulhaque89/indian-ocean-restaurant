import React from 'react';
import ClientMenuPage from '../../../components/ClientMenuPage';
import { menuCategories } from '../../../data/menuData';

export default function MenuCategoryPage({ params }: { params: { category: string } }) {
  const currentCategory = menuCategories.find(
    (cat) => cat.name.toLowerCase().replace(/ /g, '-') === params.category
  );

  return (
    <div className="container mx-auto px-4">
      <ClientMenuPage currentCategory={currentCategory} />
    </div>
  );
}
