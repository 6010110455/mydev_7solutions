import React, { useState } from "react";
import _ from "lodash";
interface Item {
  type: string;
  name: string;
  id: number; // Add an ID to uniquely identify each item
}

const initialItems: Item[] = [
  { type: "Fruit", name: "Apple", id: 1 },
  { type: "Vegetable", name: "Broccoli", id: 2 },
  { type: "Vegetable", name: "Mushroom", id: 3 },
  { type: "Fruit", name: "Banana", id: 4 },
  { type: "Vegetable", name: "Tomato", id: 5 },
  { type: "Fruit", name: "Orange", id: 6 },
  { type: "Fruit", name: "Mango", id: 7 },
  { type: "Fruit", name: "Pineapple", id: 8 },
  { type: "Vegetable", name: "Cucumber", id: 9 },
  { type: "Fruit", name: "Watermelon", id: 10 },
  { type: "Vegetable", name: "Carrot", id: 11 },
];

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [fruits, setFruits] = useState<Item[]>([]);
  const [vegetables, setVegetables] = useState<Item[]>([]);
  const [timerIDs, setTimerIDs] = useState<{ [key: number]: NodeJS.Timeout }>(
    {}
  ); // NodeJS.Timeout is type for timeout of value

  // console.log("timerIDs", timerIDs);
  // console.log("items", items);

  const handleClickToClassified = (item: Item) => {
    // Remove the item from the original list
    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== item.id)
    );

    // Add the item to the corresponding list based on its type
    if (item.type === "Fruit") {
      setFruits((currentFruits) => [...currentFruits, item]);
    } else if (item.type === "Vegetable") {
      setVegetables((currentVeggies) => [...currentVeggies, item]);
    }

    const timerId = setTimeout(() => {
      // remove fruit from fruit list
      setFruits((currentFruits) =>
        currentFruits.filter((fruit) => fruit.id !== item.id)
      );
      // remove fruit from Vegetable list
      setVegetables((currentVeggies) =>
        currentVeggies.filter((veg) => veg.id !== item.id)
      );
      // add item to item list
      setItems((currentItems) => [...currentItems, item]);

      const newTimerIDs = { ...timerIDs };
      delete newTimerIDs[item.id];
      setTimerIDs(newTimerIDs);
    }, 5000);
    // set timer for each item
    setTimerIDs({ ...timerIDs, [item.id]: timerId });
  };

  const handleButtonToLeftBox = (item: Item) => {
     // clear timer IDs when click button 
    clearTimeout(timerIDs[item.id]);
    const newTimerIDs = { ...timerIDs };
    delete newTimerIDs[item.id];
    setTimerIDs(newTimerIDs);

    // remove fruit from fruit list
    setFruits((currentFruits) =>
      currentFruits.filter((fruit) => fruit.id !== item.id)
    );
    // remove fruit from Vegetable list
    setVegetables((currentVeggies) =>
      currentVeggies.filter((veg) => veg.id !== item.id)
    );
    // add item to item list
    setItems((currentItems) => [...currentItems, item]);
  };

  return (
    <div className="grid grid-cols-3 h-screen m-5">
    {/* Box of original item list */}
      <div className="col-span-1 bg-white mx-6">
        {_.map(items, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleClickToClassified(item)}
          >
            {item?.name}
          </button>
        ))}
      </div>
      {/* Box of Fruit list */}
      <div className="col-span-1 bg-white border-2 mx-1">
        <h1 className="text-xl font-bold bg-gray-200 text-center py-2">
          Fruit
        </h1>
        {_.map(fruits, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleButtonToLeftBox(item)}
          >
            {item?.name}
          </button>
        ))}
      </div>
            {/* Box of Vegetable list */}

      <div className="col-span-1 bg-white border-2 ml-1">
        <h1 className="text-xl font-bold bg-gray-200 text-center py-2">
          Vegetable
        </h1>
        {_.map(vegetables, (item, index) => (
          <button
            key={index}
            className="w-full p-2 my-1 bg-white rounded-sm shadow-md font-bold border-2 hover:bg-gray-100"
            onClick={() => handleButtonToLeftBox(item)}
          >
            {item?.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
