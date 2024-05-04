import React, { useState, useEffect } from "react";
import _ from "lodash";
interface Item {
  type: string;
  name: string;
}

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const [timerItems, setTimerItems] = useState<Item[]>([]);

  console.log("timerItems", timerItems);
   console.log("items", items);
  

  const handleClick = (item: Item) => {
    // Remove the item from the original list
    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem !== item)
    );

    // Add the item to the corresponding list based on its type
    if (item.type === "Fruit") {
      setFruits((currentFruits) => [...currentFruits, item]);
    } else if (item.type === "Vegetable") {
      setVegetables((currentVeggies) => [...currentVeggies, item]);
    }

    setTimerItems((current) => [...current, item]);
  };

  const handleLeftClick = (item: Item) => {
    setItems((currentItems) => [...currentItems, item]);
    if (item.type === "Fruit") {
      setFruits((currentFruits) =>
        currentFruits.filter((fruit) => fruit !== item)
      );
    } else if (item.type === "Vegetable") {
      setVegetables((currentVeggies) =>
        currentVeggies.filter((veg) => veg !== item)
      );
    }
  };

  useEffect(() => {
    timerItems.forEach((item) => {
      const timer = setTimeout(() => {
        setFruits((fruits) => fruits.filter((fruit) => fruit !== item));
        setVegetables((vegetables) => vegetables.filter((veg) => veg !== item));
        setItems((currentItems) => [...currentItems, item]);
        setTimerItems((current) => current.filter((ti) => ti !== item));
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [timerItems, fruits, vegetables]);

  return (
    <div className="grid grid-cols-3 h-screen m-5">
      <div className="col-span-1 bg-white mx-6">
        {_.map(items, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="col-span-1 bg-white border-2 mx-1">
        <h1 className="text-xl font-bold bg-gray-200 text-center py-2">
          Fruit
        </h1>
        {_.map(fruits, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleLeftClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="col-span-1 bg-white border-2 ml-1">
        <h1 className="text-xl font-bold bg-gray-200 text-center py-2">
          Vegetable
        </h1>
        {_.map(vegetables, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleLeftClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
