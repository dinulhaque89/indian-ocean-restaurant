import { MenuCategory } from '../types/menuTypes';

export const menuCategories: MenuCategory[] = [
      {
        name: "Starters",
        items: [
          {
            name: "Lamb Two Ways",
            price: 12.50,
            description: "Best end of lamb rack, raw papaya, Kashmiri chilli",
            allergens: ["Milk", "Mustard"],
            category: "Starters",
            meatType: "Lamb",
            spiceLevel: "Medium"
          },
          {
            name: "Stuffed Paneer",
            price: 7.00,
            description: "Paneer, pickled figs, five indian spices",
            allergens: ["Milk", "Nuts"],
            category: "Starters",
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Pappdi Chaat",
            price: 7.00,
            description: "Spiced chickpeas, wheat crisp, sweetened yoghurt and tamarind chutney",
            allergens: ["Gluten"],
            category: "Starters",
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Tiger King Prawns",
            price: 11.50,
            description: "Griddled in marinade of garlic, ginger, herbes and spices",
            allergens: ["Crustaceans"],
            category: "Starters",
            meatType: "Prawn",
            spiceLevel: "Medium"
          },
          {
            name: "Tandoori King Prawns",
            price: 11.50,
            description: "Juicy marinated king prawns cooked in the tandoor",
            allergens: ["Crustaceans"],
            category: "Starters",
            meatType: "Prawn",
            spiceLevel: "Medium"
          },
          {
            name: "Chicken Tikka",
            price: 6.25,
            description: "Tender pieces of marinated meat grilled in the tandoor",
            category: "Starters",
            meatType: "Chicken",
            spiceLevel: "Medium"
          },
          {
            name: "Lamb Tikka",
            price: 8.00,
            description: "Tender pieces of marinated meat grilled in the tandoor",
            category: "Starters",
            meatType: "Lamb",
            spiceLevel: "Medium"
          },
          {
            name: "Onion Bhajee",
            price: 5.00,
            description: "Onion rings mixed with lentils in a spicy batter",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan"],
            spiceLevel: "Mild"
          },
          {
            name: "Papadum",
            price: 0.80,
            description: "A thin, crisp circular wafer",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan"],
            spiceLevel: "Mild"
          },
          {
            name: "Spicy Papadum",
            price: 0.80,
            description: "A spicy thin, crisp circular wafer",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan"],
            spiceLevel: "Hot"
          },
          {
            name: "Onion Salad",
            price: 0.80,
            description: "Thinly sliced onions, tomatoes and herbs",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Mango Chutney",
            price: 0.80,
            description: "A sweet and delicious chutney made with mangos",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Mint Sauce",
            price: 0.80,
            description: "Sweet and tangy yoghurt flavoured with mint",
            category: "Starters",
            allergens: ["Milk"],
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Mixed Pickle",
            price: 0.80,
            description: "Tart, tangy and refreshing lime pickle",
            category: "Starters",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Hot"
          }
        ]
      }, {
        name: "House Specialities",
        items: [
          {
            name: "Murgh Makhani",
            price: 10.00,
            description: "A dish of well marinated strips of chicken breast, served in a beautifully blended sauce of tomatoes, garlic cream and enugreek.",
            category: "House Specialities",
            meatType: "Chicken",
            spiceLevel: "Medium"
          },
          {
            name: "Lamb Rezala",
            price: 18.00,
            description: "Lamb cooked in yogurt and green chillies flavours of Bengal",
            allergens: ["Milk", "Mustard"],
            category: "House Specialities",
            meatType: "Lamb",
            spiceLevel: "Medium"
          },
          {
            name: "Tandoori Chilli Chicken Massalla",
            price: 12.00,
            description: "Spring chicken cooked with fresh green chillies special herbs and spices fairly hot.",
            allergens: ["Milk", "Mustard"],
            category: "House Specialities",
            meatType: "Chicken",
            spiceLevel: "Medium"
          }
        ]
      },
      {
        name: "Tandoori Dishes",
        items: [
          {
            name: "Peshwari Lamb Chops",
            price: 20.00,
            description: "Best end of lamb rack, raw papaya, kashmiri chilli. Sag Aloo",
            allergens: ["Milk", "Mustard"],
            category: "Tandoori Dishes",
            meatType: "Lamb",
            spiceLevel: "Medium"
          },
          {
            name: "Tandoori Salmon",
            price: 18.50,
            description: "Marinated in tikka sauce and grilled in the tandoor, served on a bed of grilled onion and peppers. Sag Aloo",
            allergens: ["Fish", "Milk", "Mustard"],
            category: "Tandoori Dishes",
            meatType: "Fish",
            spiceLevel: "Medium"
          },
          {
            name: "Chicken Tikka",
            price: 11.50,
            description: "Tender pieces of marinated chicken grilled in the tandoor",
            allergens: ["Milk"],
            category: "Tandoori Dishes",
            meatType: "Chicken",
            spiceLevel: "Medium"
          },
          {
            name: "Lamb Tikka",
            price: 13.00,
            description: "Tender pieces of marinated meat grilled in the tandoor",
            allergens: ["Milk"],
            category: "Tandoori Dishes",
            meatType: "Lamb",
            spiceLevel: "Medium"
          },
          {
            name: "Tandoor King Prawn",
            price: 18.50,
            description: "Juicy marinated king prawns cooked in the tandoor",
            allergens: ["Crustaceans"],
            category: "Tandoori Dishes",
            meatType: "Prawn",
            spiceLevel: "Medium"
          },
          {
            name: "Chicken Shashlik",
            price: 13.00,
            description: "Tender chicken, grilled with onion, tomato, red and green capsicum",
            category: "Tandoori Dishes",
            meatType: "Chicken",
            spiceLevel: "Medium"
          },
          {
            name: "Lamb Tikka Shashlik",
            price: 14.00,
            description: "Chicken grilled with onions, peppers and tomato",
            category: "Tandoori Dishes",
            meatType: "Lamb",
            spiceLevel: "Medium"
          }
        ]
      },
      {
        name: "Traditional Dishes",
        items: [
          {
            name: "Massalla",
            description: "Marinated with herbs and spices, barbecued then cooked in a special yoghurt, butter and cream sauce.",
            category: "Traditional Dishes",
            options: [
              {
                name: "Chicken Tikka",
                price: 11.00,
                allergens: ["Milk"],
                meatType: "Chicken",
                spiceLevel: "Medium"
              },
              {
                name: "Lamb Tikka",
                price: 11.50,
                allergens: ["Milk"],
                meatType: "Lamb",
                spiceLevel: "Medium"
              },
              {
                name: "King Prawn",
                price: 16.00,
                allergens: ["Crustaceans", "Milk"],
                meatType: "Prawn",
                spiceLevel: "Medium"
              },
              {
                name: "Veg",
                price: 11.00,
                allergens: ["Milk"],
                dietary: ["Vegetarian"],
                spiceLevel: "Medium"
              }
            ]
          },
          {
            name: "Korma",
            description: "Delicate flavours of yogurt and coconut cream combine to give a mildly spiced dish.",
            category: "Traditional Dishes",
            options: [
              {
                name: "Chicken",
                price: 11.00,
                allergens: ["Milk"],
                meatType: "Chicken",
                spiceLevel: "Mild"
              },
              {
                name: "Chicken Tikka",
                price: 12.00,
                allergens: ["Milk"],
                meatType: "Chicken",
                spiceLevel: "Mild"
              },
              {
                name: "Lamb",
                price: 12.00,
                allergens: ["Milk"],
                meatType: "Lamb",
                spiceLevel: "Mild"
              },
              {
                name: "Vegetable",
                price: 11.00,
                allergens: ["Milk"],
                dietary: ["Vegetarian"],
                spiceLevel: "Mild"
              },
              {
                name: "King Prawn",
                price: 14.50,
                allergens: ["Crustaceans", "Milk"],
                meatType: "Prawn",
                spiceLevel: "Mild"
              }
            ]
          },
          {
            name: "Curry",
            description: "A classic dish of traditional flavour.",
            category: "Traditional Dishes",
            options: [
              {
                name: "Chicken",
                price: 14.00,
                allergens: ["Mustard"],
                meatType: "Chicken",
                spiceLevel: "Medium"
              },
              {
                name: "Chicken Tikka",
                price: 14.00,
                meatType: "Chicken",
                spiceLevel: "Medium"
              },
              {
                name: "Lamb",
                price: 14.00,
                meatType: "Lamb",
                spiceLevel: "Medium"
              },
              {
                name: "Vegetable",
                price: 14.00,
                dietary: ["Vegetarian"],
                spiceLevel: "Medium"
              },
              {
                name: "King Prawn",
                price: 14.50,
                allergens: ["Crustaceans"],
                meatType: "Prawn",
                spiceLevel: "Medium"
              }
            ]
          }
        ],
      },
      {
        name: "Side Dishes",
        items: [
          {
            name: "Bhindi Bhaji",
            price: 8.00,
            description: "Spiced Okra",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Aloo Gobi",
            price: 6.50,
            description: "Potato and cauliflower in spice.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Vegetable Curry",
            price: 6.50,
            description: "Seasonal vegetables cooked in spices.",
            allergens: ["Mustard"],
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan"],
            spiceLevel: "Medium"
          },
          {
            name: "Brinjol Bhaji",
            price: 6.50,
            description: "Smoked Aubergine in spices.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Bombay Potato",
            price: 6.50,
            description: "Fresh potatoes cooked in a medium hot, thick sauce.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Mushroom Bhaji",
            price: 6.50,
            description: "Cooked with onions, green peppers and spices.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Saag Bhaji",
            price: 6.50,
            description: "A dish of spiced spinach.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Saag Aloo",
            price: 6.50,
            description: "A dish of spinach and potatoes.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Matar Paneer",
            price: 6.50,
            description: "Fresh green peas cooked with Indian cheese and spices.",
            category: "Side Dishes",
            allergens: ["Milk"],
            dietary: ["Vegetarian"],
            spiceLevel: "Medium"
          },
          {
            name: "Chana Massalla",
            price: 6.50,
            description: "Chickpeas cooked in a medium spiced sauce.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Dall Samba",
            price: 6.50,
            description: "Mixed vegetables cooked in a hot, sweet and sour lentil sauce.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Hot"
          },
          {
            name: "Cauliflower Bhaji",
            price: 6.50,
            description: "A medium hot dish of spiced cauliflower.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          },
          {
            name: "Tarka Dall",
            price: 6.50,
            description: "Lentils tempered with garlic, asafetida and tomato.",
            category: "Side Dishes",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Medium"
          }
        ]
      },
      {
        name: "Rice and Breads",
        items: [
          {
            name: "Steamed Rice",
            price: 3.00,
            description: "Long grain white rice steamed to perfection.",
            category: "Rice and Breads",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Pilau Rice",
            price: 3.25,
            description: "Fragrant basmati rice steamed with mixed spices.",
            allergens: ["Milk"],
            category: "Rice and Breads",
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Mushroom Rice",
            price: 3.50,
            description: "Rice infused with earthy mushroom flavour tossed through with caramelised mushrooms.",
            allergens: ["Milk"],
            category: "Rice and Breads",
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Egg Fried Rice",
            price: 3.50,
            description: "Rice infused with scrambled eggs.",
            category: "Rice and Breads",
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Plain Naan",
            price: 2.50,
            description: "A teardrop-shaped bread that is baked in a tandoor.",
            category: "Rice and Breads",
            allergens: ["Milk", "Gluten"],
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Garlic Naan",
            price: 3.00,
            description: "A garlic teardrop-shaped bread that is baked in a tandoor.",
            category: "Rice and Breads",
            allergens: ["Milk", "Gluten"],
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Peshwari Naan",
            price: 3.50,
            description: "A sweet coconut filling teardrop-shaped bread that is baked in a tandoor.",
            category: "Rice and Breads",
            allergens: ["Milk", "Gluten", "Nuts"],
            dietary: ["Vegetarian"],
            spiceLevel: "Mild"
          },
          {
            name: "Chips",
            price: 3.00,
            description: "British potatoes packed full of flavour with a crisp golden outer shell and fluffy middle.",
            category: "Rice and Breads",
            dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Plain Raita",
            price: 2.95,
            description: "Rich yogurt infused with spices and herbs.",
            allergens: ["Milk"],
            category: "Rice and Breads",
            dietary: ["Vegetarian", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Cucumber Raita",
            price: 2.95,
            description: "Rich yoghurt infused with cool cucumbers, spices and herbs",
            allergens: ["Milk"],
            category: "Rice and Breads",
            dietary: ["Vegetarian", "Gluten-Free"],
            spiceLevel: "Mild"
          },
          {
            name: "Onion Raita",
            price: 2.95,
            description: "Rich yoghurt infused with caramelised onions, spices and herbs.",
            allergens: ["Milk"],
            category: "Rice and Breads",
            dietary: ["Vegetarian", "Gluten-Free"],
            spiceLevel: "Mild"
          }
        ]
      }
    ];