// src/pages/FoodWheel.jsx
import React, { useRef, useState } from "react";
import Wheel from "../component/Wheel";
import FoodList from "../component/FoodList";
import FoodDetail from "../component/FoodDetail";
import { getFoodDetails } from "../component/api/foodList.js";

export default function FoodWheel() {
  const wheelRef = useRef();
  const [foods, setFoods] = useState([
    "汉堡包🍔",
    "披萨🍕",
    "培根🍣",
    "甜甜圈🍩",
    "面条🍜",
  ]);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleAdd = (newFood) => {
    setFoods([...foods, newFood]);
  };

  const handleRemove = (foodToRemove) => {
    setFoods(foods.filter((food) => food !== foodToRemove));
  };

  const handleSpin = async () => {
    const result = await wheelRef.current.spin();
    setSelectedFood(getFoodDetails(result));
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2vw",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "#333",
          fontSize: "clamp(20px, 4vw, 32px)", // 自适应标题
        }}
      >
        午餐大转盘
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Left Column - Wheel */}
        <div
          style={{
            flex: "1 1 300px", // 宽度自适应，最小300px
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "600px",
          }}
        >
          <Wheel ref={wheelRef} prizes={foods} />
          <button
            onClick={handleSpin}
            disabled={wheelRef.current?.isSpinning}
            style={{
              marginTop: "20px",
              padding: "clamp(8px, 2vw, 14px) clamp(16px, 4vw, 28px)",
              fontSize: "clamp(14px, 2vw, 18px)",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              width: "fit-content",
            }}
          >
            启动
          </button>
        </div>

        {/* Right Column - Food List */}
        <div
          style={{
            flex: "1 1 300px", // 自适应宽度
            maxWidth: "500px",
            alignSelf: "flex-start",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#333",
              borderBottom: "2px solid #4CAF50",
              paddingBottom: "10px",
              fontSize: "clamp(16px, 2.5vw, 22px)",
            }}
          >
            食物列表
          </h2>
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "clamp(12px, 2vw, 20px)",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <FoodList foods={foods} onAdd={handleAdd} onRemove={handleRemove} />
          </div>
        </div>
      </div>

      {selectedFood && (
        <FoodDetail food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}
    </div>
  );
}
