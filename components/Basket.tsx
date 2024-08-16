import React from 'react';

const Basket: React.FC = () => {
  return (
    <div className="w-1/4 p-4">
      <h2 className="text-2xl font-bold mb-4">Basket</h2>
      <p className="text-gray-600">Your basket is empty.</p>
    </div>
  );
};

export default Basket;