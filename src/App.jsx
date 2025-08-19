// src/App.jsx
import React, { useRef, useState } from "react";
import Wheel from "./component/Wheel";
import FoodList from "./component/FoodList"



export default function LotteryWheel() {
  const wheelRef = useRef();
  const [foods, setFoods] = useState(['汉堡包🍔', '披萨🍕', '培根🍣', '甜甜圈🍩', '面条🍜']);

  const handleAdd = (newFood) => {
    setFoods([...foods, newFood]);
  };

  const handleRemove = (foodToRemove) => {
    setFoods(foods.filter(food=>food!==foodToRemove));
  }

  const handleSpin = async () => {
    try {
      const result = await wheelRef.current.spin();
      alert(`结果：${result}`);
    } catch (error) {
        console.log("Spin already in progress");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Wheel ref={wheelRef} prizes={foods} />
      <br />
      <button
        onClick={handleSpin}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "18px" }}
      >
        开始抽奖
      </button>
      <FoodList foods={foods} onAdd={handleAdd} onRemove={handleRemove}></FoodList>
    </div>
  );
}