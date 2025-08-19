import React, { useState } from 'react'
import { importAllMeatDishes } from "./api/foodMenuParse"
export default function FoodList({ foods, onAdd, onRemove }) {
  const [input, setInput] = useState('')
  const [showMeatDishes, setShowMeatDishes] = useState(false);

  const meatDishes = importAllMeatDishes();
  const meatDishNames = Object.keys(meatDishes);
  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  const handleAddMeatDish = (dishName) => {
    onAdd(dishName);
  }

  return (
    <div className="food-list">
      <div className="input-group">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入新的食物"
        />
        <button onClick={handleAdd}>添加</button>
      </div>
      <ul>
        {foods.map((food) => (
          <li key={food}>
            {food}{' '}
            <button className="remove-btn" onClick={() => onRemove(food)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      <div style={{marginTop:'20px'}}>
        <button onClick={()=>setShowMeatDishes(!showMeatDishes)}
          style={{
            backgroundColor:'#4CAF50',
            color:'white',
            border:'none',
            padding:'8px,16px',
            borderRadius:'4px',
            cursor:'pointer'
          }}>
            {showMeatDishes ? '隐藏' : '显示'}肉类菜肴列表
          </button>
          {showMeatDishes && (
            <div style={{
              maxHeight:'200px',
              overflowY:'auto',
              border:'1px solid #ddd',
              borderRadius:'4px',
              paddingTop:'10px'
            }}>
              {meatDishNames.map((dishName) => (
                <div key={dishName}
                style={{
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:'5px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <span>{dishName}</span>
                  <button onClick={()=>handleAddMeatDish(dishName)}
                    disabled={foods.includes(dishName)}
                    style={{
                      backgroundColor: foods.includes(dishName) ? '#ccc' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: foods.includes(dishName) ? 'not-allowed' : 'pointer'
                    }}>+</button>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
