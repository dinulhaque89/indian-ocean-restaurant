import { MenuCategory } from '../types/menuTypes';

export const menuCategories: MenuCategory[] = [
    {
        name: "Starters",
        items: [
          {
            name: "Lamb Two Ways",
            price: 12.50,
            description: "Best end of lamb rack, raw papaya, Kashmiri chilli",
            allergens: ["Milk", "Mustard"]
          },
          {
            name: "Stuffed Paneer",
            price: 7.00,
            description: "Paneer, pickled figs, five indian spices",
            allergens: ["Milk", "Nuts"]
          },
          {
            name: "Pappdi Chaat",
            price: 7.00,
            description: "Spiced chickpeas, wheat crisp, sweetened yoghurt and tamarind chutney",
            allergens: ["Gluten"]
          },
          {
            name: "Tiger King Prawns",
            price: 11.50,
            description: "Griddled in marinade of garlic, ginger, herbes and spices",
            allergens: ["Crustaceans"]
          },
          {
            name: "Tandoori King Prawns",
            price: 11.50,
            description: "Juicy marinated king prawns cooked in the tandoor",
            allergens: ["Crustaceans"]
          },
          {
            name: "Chicken Tikka",
            price: 6.25,
            description: "Tender pieces of marinated meat grilled in the tandoor"
          },
          {
            name: "Lamb Tikka",
            price: 8.00,
            description: "Tender pieces of marinated meat grilled in the tandoor"
          },
          {
            name: "Onion Bhajee",
            price: 5.00,
            description: "Onion rings mixed with lentils in a spicy batter"
          },
          {
            name: "Papadum",
            price: 0.80,
            description: "A thin, crisp circular wafer"
          },
          {
            name: "Spicy Papadum",
            price: 0.80,
            description: "A spicy thin, crisp circular wafer"
          },
          {
            name: "Onion Salad",
            price: 0.80,
            description: "Thinly sliced onions, tomatoes and herbs"
          },
          {
            name: "Mango Chutney",
            price: 0.80,
            description: "A sweet and delicious chutney made with mangos"
          },
          {
            name: "Mint Sauce",
            price: 0.80,
            description: "Sweet and tangy yoghurt flavoured with mint"
          },
          {
            name: "Mixed Pickle",
            price: 0.80,
            description: "Tart, tangy and refreshing lime pickle"
          }
        ]
      },
      {
        name: "House Specialities",
        items: [
          {
            name: "Murgh Makhani",
            price: 10.00,
            description: "A dish of well marinated strips of chicken breast, served in a beautifully blended sauce of tomatoes, garlic cream and enugreek."
          },
          {
            name: "Lamb Rezala",
            price: 18.00,
            description: "Lamb cooked in yogurt and green chillies flavours of Bengal",
            allergens: ["Milk", "Mustard"]
          },
          {
            name: "Tandoori Chilli Chicken Massalla",
            price: 12.00,
            description: "Spring chicken cooked with fresh green chillies special herbs and spices fairly hot.",
            allergens: ["Milk", "Mustard"]
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
            allergens: ["Milk", "Mustard"]
          },
          {
            name: "Tandoori Salmon",
            price: 18.50,
            description: "Marinated in tikka sauce and grilled in the tandoor, served on a bed of grilled onion and peppers. Sag Aloo",
            allergens: ["Fish", "Milk", "Mustard"]
          },
          {
            name: "Chicken Tikka",
            price: 11.50,
            description: "Tender pieces of marinated chicken grilled in the tandoor",
            allergens: ["Milk"]
          },
          {
            name: "Lamb Tikka",
            price: 13.00,
            description: "Tender pieces of marinated meat grilled in the tandoor"
          },
          {
            name: "Tandoor King Prawn",
            price: 18.50,
            description: "Juicy marinated king prawns cooked in the tandoor"
          },
          {
            name: "Chicken Shashlik",
            price: 13.00,
            description: "Tender chicken, grilled with onion, tomato, red and green capsicum"
          },
          {
            name: "Lamb Tikka Shashlik",
            price: 14.00,
            description: "Chicken grilled with onions, peppers and tomato"
          }
        ]
      },
      {
        name: "Traditional Dishes",
        items: [
          {
            name: "Massalla",
            description: "Marinated with herbs and spices, barbecued then cooked in a special yoghurt, butter and cream sauce.",
            options: [
              { name: "Chicken Tikka", price: 11.00, allergens: ["Milk"] },
              { name: "Lamb Tikka", price: 11.50, allergens: ["Milk"] },
              { name: "King Prawn", price: 16.00, allergens: ["Crustaceans", "Milk"] },
              { name: "Vegetable", price: 11.00, allergens: ["Milk"] }
            ]
          },
          {
            name: "Korma",
            description: "Delicate flavours of yogurt and coconut cream combine to give a mildly spiced dish.",
            options: [
              { name: "Chicken", price: 11.00, allergens: ["Milk"] },
              { name: "Chicken Tikka", price: 12.00, allergens: ["Milk"] },
              { name: "Lamb", price: 12.00, allergens: ["Milk"] },
              { name: "Vegetable", price: 11.00, allergens: ["Milk"] },
              { name: "King Prawn", price: 14.50, allergens: ["Crustaceans", "Milk"] }
            ]
          },
          {
            name: "Curry",
            description: "A classic dish of traditional flavour.",
            options: [
              { name: "Chicken", price: 14.00, allergens: ["Mustard"] },
              { name: "Chicken Tikka", price: 14.00 },
              { name: "Lamb", price: 14.00 },
              { name: "Vegetable", price: 14.00 },
              { name: "King Prawn", price: 14.50, allergens: ["Crustaceans"] }
            ]
          },
          // ... (other traditional dishes like Madras, Bhuna, Dansak, Sagwala, Rogan, Jalfrezi, Karahi, Balti)
        ]
      },
      {
        name: "Side Dishes",
        items: [
          {
            name: "Bhindi Bhaji",
            price: 8.00,
            description: "Spiced Okra"
          },
          {
            name: "Aloo Gobi",
            price: 6.50,
            description: "Potato and cauliflower in spice."
          },
          {
            name: "Vegetable Curry",
            price: 6.50,
            description: "Seasonal vegetables cooked in spices.",
            allergens: ["Mustard"]
          },
          {
            name: "Brinjol Bhaji",
            price: 6.50,
            description: "Smoked Aubergine in spices."
          },
          {
            name: "Bombay Potato",
            price: 6.50,
            description: "Fresh potatoes cooked in a medium hot, thick sauce."
          },
          {
            name: "Mushroom Bhaji",
            price: 6.50,
            description: "Cooked with onions, green peppers and spices."
          },
          {
            name: "Saag Bhaji",
            price: 6.50,
            description: "A dish of spiced spinach."
          },
          {
            name: "Saag Aloo",
            price: 6.50,
            description: "A dish of spinach and potatoes."
          },
          {
            name: "Matar Paneer",
            price: 6.50,
            description: "Fresh green peas cooked with Indian cheese and spices."
          },
          {
            name: "Chana Massalla",
            price: 6.50,
            description: "Chickpeas cooked in a medium spiced sauce."
          },
          {
            name: "Dall Samba",
            price: 6.50,
            description: "Mixed vegetables cooked in a hot, sweet and sour lentil sauce."
          },
          {
            name: "Cauliflower Bhaji",
            price: 6.50,
            description: "A medium hot dish of spiced cauliflower."
          },
          {
            name: "Tarka Dall",
            price: 6.50,
            description: "Lentils tempered with garlic, asafetida and tomato."
          }
        ]
      },
      {
        name: "Rice and Breads",
        items: [
          {
            name: "Steamed Rice",
            price: 3.00,
            description: "Long grain white rice steamed to perfection."
          },
          {
            name: "Pilau Rice",
            price: 3.25,
            description: "Fragrant basmati rice steamed with mixed spices.",
            allergens: ["Milk"]
          },
          {
            name: "Mushroom Rice",
            price: 3.50,
            description: "Rice infused with earthy mushroom flavour tossed through with caramelised mushrooms.",
            allergens: ["Milk"]
          },
          {
            name: "Egg Fried Rice",
            price: 3.50,
            description: "Rice infused with scrambled eggs."
          },
          {
            name: "Plain Naan",
            price: 2.50,
            description: "A teardrop-shaped bread that is baked in a tandoor."
          },
          {
            name: "Garlic Naan",
            price: 3.00,
            description: "A garlic teardrop-shaped bread that is baked in a tandoor."
          },
          {
            name: "Peshwari Naan",
            price: 3.50,
            description: "A sweet coconut filling teardrop-shaped bread that is baked in a tandoor."
          },
          {
            name: "Chips",
            price: 3.00,
            description: "British potatoes packed full of flavour with a crisp golden outer shell and fluffy middle."
          },
          {
            name: "Plain Raita",
            price: 2.95,
            description: "Rich yogurt infused with spices and herbs.",
            allergens: ["Milk"]
          },
          {
            name: "Cucumber Raita",
            price: 2.95,
            description: "Rich yoghurt infused with cool cucumbers, spices and herbs",
            allergens: ["Milk"]
          },
          {
            name: "Onion Raita",
            price: 2.95,
            description: "Rich yoghurt infused with caramelised onions, spices and herbs.",
            allergens: ["Milk"]
          }
        ]
      }
    ];