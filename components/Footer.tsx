// components/Footer.tsx
import React from 'react';

const allergens = [
  'Celery', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk', 'Molluscs',
  'Mustard', 'Nuts', 'Peanuts', 'Sesame seeds', 'Soya', 'Sulphur dioxide'
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 mt-8">
      <h3 className="text-md text-center font-semibold mb-2">Food Allergies & Intolerances</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {allergens.map((allergen) => (
          <span key={allergen} className="bg-white text-center px-2 py-1 rounded text-sm">
            {allergen}
          </span>
        ))}
      </div>
      <p className="text-sm text-center text-white bg-gray-600">
        If you have an allergy or special dietary requirement, please speak to a member of staff or add a message when you place an order.
      </p>
    </footer>
  );
};

export default Footer;