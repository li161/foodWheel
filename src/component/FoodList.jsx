import React, { useState } from 'react'

export default function FoodList({ foods, onAdd, onRemove }) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
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
    </div>
  )
}
