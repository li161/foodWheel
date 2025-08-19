// src/component/FoodDetail.jsx
import React from 'react';

const FoodDetail = ({ food, onClose }) => {
  // Handle case where food might be null or undefined
  if (!food) return null;

  const { name, ingredients, recipe, taste } = food;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
        
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          color: '#333'
        }}>
          {name}
        </h2>
        
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            color: '#4CAF50',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '5px',
          }}>
            配料
          </h3>
          <ul style={{ 
            listStyleType: 'circle',
            paddingLeft: '20px'
          }}>
            {ingredients.map((ingredient, index) => (
              <li key={index} style={{ 
                marginBottom: '8px',
                fontSize: '16px'
              }}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ marginBottom: '25px' }}>
          <h3 style={{ 
            color: '#4CAF50',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '5px',
            marginBottom: '10px'
          }}>
            制作过程
          </h3>
          <ol style={{ 
            paddingLeft: '10px'
          }}>
            {recipe.map((step, index) => (
              <li key={index} style={{ 
                marginBottom: '10px',
                fontSize: '16px'
              }}>
                {step}
              </li>
            ))}
          </ol>
        </div>
        
        <div>
          <h3 style={{ 
            color: '#4CAF50',
            borderBottom: '2px solid #4CAF50',
            paddingBottom: '5px',
            marginBottom: '10px'
          }}>
            口感
          </h3>
          <p style={{ 
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            {taste}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;