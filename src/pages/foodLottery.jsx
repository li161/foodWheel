// src/pages/foodLottery.jsx
import React, { useRef, useState, useEffect } from "react";
import Wheel from "../component/Wheel";
import FoodList from "../component/FoodList";
import FoodDetail from "../component/FoodDetail";
import { getFoodDetails } from "../component/api/foodList.js";

export default function FoodLottery() {
  const wheelRef = useRef();
  const [foods, setFoods] = useState([
    "汉堡包🍔",
    "披萨🍕",
    "培根🍣",
    "甜甜圈🍩",
    "面条🍜",
  ]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [wheelTheme, setWheelTheme] = useState('default');
  const [spinSpeed, setSpinSpeed] = useState(4000); // 默认4秒
  const [savedMenus, setSavedMenus] = useState([]);
  const [menuName, setMenuName] = useState('');
  const [showSaveMenuDialog, setShowSaveMenuDialog] = useState(false);

  // 预定义的随机食物库
  const randomFoods = [
    "炸鸡🍗", "寿司🍣", "火锅🍲", "烤肉🥩", "意面🍝",
    "包子🥟", "饺子🥠", "油条🥢", "煎饼🥞", "烧麦🥠",
    "冰淇淋🍦", "蛋糕🍰", "奶茶🥤", "咖啡☕", "果汁🍹"
  ];

  // 从本地存储加载保存的菜单
  useEffect(() => {
    const saved = localStorage.getItem('foodWheelMenus');
    if (saved) {
      try {
        setSavedMenus(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved menus:', e);
      }
    }
    
    // 加载历史记录
    const history = localStorage.getItem('spinHistory');
    if (history) {
      try {
        setSpinHistory(JSON.parse(history));
      } catch (e) {
        console.error('Failed to load spin history:', e);
      }
    }
  }, []);

  const handleAdd = (newFood) => {
    if (!foods.includes(newFood)) {
      setFoods([...foods, newFood]);
    }
  };

  const handleRemove = (foodToRemove) => {
    setFoods(foods.filter((food) => food !== foodToRemove));
  };

  const handleSpin = async () => {
    if (foods.length === 0) {
      alert('请先添加食物！');
      return;
    }
    
    const result = await wheelRef.current.spin();
    const foodDetails = getFoodDetails(result);
    setSelectedFood(foodDetails);
    
    // 添加到历史记录
    const newHistoryItem = {
      food: foodDetails.name,
      time: new Date().toLocaleString()
    };
    const updatedHistory = [newHistoryItem, ...spinHistory].slice(0, 20); // 保留最近20条
    setSpinHistory(updatedHistory);
    
    // 保存历史记录到本地存储
    localStorage.setItem('spinHistory', JSON.stringify(updatedHistory));
  };

  // 随机添加食物
  const handleRandomAdd = () => {
    if (foods.length >= 20) { // 限制最大食物数量
      alert('食物数量已达到上限（20个）');
      return;
    }
    
    const availableFoods = randomFoods.filter(food => !foods.includes(food));
    if (availableFoods.length === 0) {
      alert('已经添加了所有预定义的食物！');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableFoods.length);
    handleAdd(availableFoods[randomIndex]);
  };

  // 清空食物列表
  const handleClearAll = () => {
    if (window.confirm('确定要清空所有食物吗？')) {
      setFoods([]);
    }
  };

  // 保存当前菜单
  const handleSaveMenu = () => {
    if (!menuName.trim()) {
      alert('请输入菜单名称');
      return;
    }
    
    const newMenu = {
      name: menuName.trim(),
      foods: [...foods],
      date: new Date().toLocaleString()
    };
    
    const updatedMenus = [...savedMenus, newMenu];
    setSavedMenus(updatedMenus);
    localStorage.setItem('foodWheelMenus', JSON.stringify(updatedMenus));
    
    setMenuName('');
    setShowSaveMenuDialog(false);
    alert('菜单保存成功！');
  };

  // 加载保存的菜单
  const handleLoadMenu = (menu) => {
    setFoods(menu.foods);
  };

  // 删除保存的菜单
  const handleDeleteMenu = (index) => {
    if (window.confirm('确定要删除这个菜单吗？')) {
      const updatedMenus = savedMenus.filter((_, i) => i !== index);
      setSavedMenus(updatedMenus);
      localStorage.setItem('foodWheelMenus', JSON.stringify(updatedMenus));
    }
  };

  // 预设菜单选项
  const presetMenus = {
    '经典快餐': ['汉堡包🍔', '披萨🍕', '炸鸡🍗', '热狗🌭', '薯条🍟'],
    '亚洲美食': ['面条🍜', '寿司🍣', '饺子🥟', '包子🥠', '炒饭🍚'],
    '甜点饮品': ['甜甜圈🍩', '冰淇淋🍦', '蛋糕🍰', '奶茶🥤', '咖啡☕'],
  };

  const loadPresetMenu = (menuName) => {
    setFoods(presetMenus[menuName]);
  };

  // 主题样式映射
  const themeStyles = {
    default: { primary: '#4CAF50' },
    vibrant: { primary: '#FF5722' },
    cool: { primary: '#2196F3' },
    elegant: { primary: '#9C27B0' }
  };

  const currentTheme = themeStyles[wheelTheme] || themeStyles.default;

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
          marginBottom: "30px",
          color: "#333",
          fontSize: "clamp(20px, 4vw, 36px)",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          animation: "pulse 3s infinite"
        }}
      >
        午餐大转盘
      </h1>

      {/* 控制面板 */}
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={handleRandomAdd}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'
        }>
          随机添加食物
        </button>
        
        <button
          onClick={handleClearAll}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'
        }>
          清空所有
        </button>
        
        <button
          onClick={() => setShowSaveMenuDialog(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'
        }>
          保存菜单
        </button>
        
        <button
          onClick={() => setShowHistory(!showHistory)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'
        }>
          {showHistory ? '隐藏' : '显示'}历史记录
        </button>
      </div>

      {/* 历史记录面板 */}
      {showHistory && spinHistory.length > 0 && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            maxHeight: "150px",
            overflowY: "auto",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>历史记录</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {spinHistory.map((item, index) => (
              <li 
                key={index} 
                style={{
                  padding: "5px 0", 
                  borderBottom: index < spinHistory.length - 1 ? "1px solid #ddd" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px"
                }}
              >
                <span>{item.food}</span>
                <span style={{ color: "#666", fontSize: "12px" }}>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* 左侧 - 转盘 */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "600px",
          }}
        >
          <Wheel 
            ref={wheelRef} 
            prizes={foods} 
            theme={wheelTheme} 
            spinSpeed={spinSpeed} 
          />
          
          {/* 转盘控制区 */}
          <div style={{ marginTop: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "15px" }}>
            <button
              onClick={handleSpin}
              disabled={wheelRef.current?.isSpinning || foods.length === 0}
              style={{
                padding: "12px 30px",
                fontSize: "18px",
                backgroundColor: currentTheme.primary,
                color: "white",
                border: "none",
                borderRadius: "30px",
                cursor: wheelRef.current?.isSpinning || foods.length === 0 ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                alignSelf: "center",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
              onMouseEnter={(e) => {
                if (!wheelRef.current?.isSpinning && foods.length > 0) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!wheelRef.current?.isSpinning && foods.length > 0) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }
              }}
            >
              {wheelRef.current?.isSpinning ? '转动中...' : '开始转动'}
            </button>
            
            {/* 主题选择器 */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
              {Object.keys(themeStyles).map(theme => (
                <button
                  key={theme}
                  onClick={() => setWheelTheme(theme)}
                  style={{
                    padding: "8px 12px",
                    border: wheelTheme === theme 
                      ? `2px solid ${themeStyles[theme].primary}` 
                      : "1px solid #ddd",
                    backgroundColor: wheelTheme === theme ? themeStyles[theme].primary : "white",
                    color: wheelTheme === theme ? "white" : "#333",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "12px",
                    transition: "all 0.3s ease"
                  }}
                >
                  {theme === 'default' ? '默认' : 
                   theme === 'vibrant' ? '活力' : 
                   theme === 'cool' ? '清凉' : '优雅'}
                </button>
              ))}
            </div>
            
            {/* 速度控制 */}
            <div style={{ textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px", color: "#666" }}>
                转动速度: {spinSpeed / 1000}秒
              </label>
              <input
                type="range"
                min="2000"
                max="6000"
                step="500"
                value={spinSpeed}
                onChange={(e) => setSpinSpeed(Number(e.target.value))}
                disabled={wheelRef.current?.isSpinning}
                style={{
                  width: "100%",
                  maxWidth: "200px",
                  cursor: wheelRef.current?.isSpinning ? "not-allowed" : "pointer"
                }}
              />
            </div>
          </div>
        </div>

        {/* 右侧 - 食物管理 */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "500px",
            alignSelf: "flex-start",
          }}
        >
          {/* 食物列表 */}
          <h2
            style={{
              marginBottom: "20px",
              color: currentTheme.primary,
              borderBottom: `2px solid ${currentTheme.primary}`,
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
              marginBottom: "20px",
              animation: "fadeIn 0.5s ease"
            }}
          >
            <FoodList foods={foods} onAdd={handleAdd} onRemove={handleRemove} />
          </div>
          
          {/* 预设菜单 */}
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              marginBottom: "20px"
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: currentTheme.primary }}>预设菜单</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {Object.keys(presetMenus).map(menuName => (
                <button
                  key={menuName}
                  onClick={() => loadPresetMenu(menuName)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "white",
                    border: `1px solid ${currentTheme.primary}`,
                    color: currentTheme.primary,
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = currentTheme.primary;
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = currentTheme.primary;
                  }}
                >
                  {menuName}
                </button>
              ))}
            </div>
          </div>
          
          {/* 保存的菜单 */}
          {savedMenus.length > 0 && (
            <div
              style={{
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", color: currentTheme.primary }}>我的菜单</h3>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {savedMenus.map((menu, index) => (
                  <div 
                    key={index} 
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px",
                      marginBottom: "8px",
                      backgroundColor: "white",
                      borderRadius: "4px",
                      border: `1px solid #ddd`
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>{menu.name}</div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{menu.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => handleLoadMenu(menu)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: currentTheme.primary,
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        加载
                      </button>
                      <button
                        onClick={() => handleDeleteMenu(index)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          fontSize: "12px"
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 食物详情弹窗 */}
      {selectedFood && (
        <FoodDetail food={selectedFood} onClose={() => setSelectedFood(null)} theme={currentTheme} />
      )}

      {/* 保存菜单对话框 */}
      {showSaveMenuDialog && (
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
          onClick={() => setShowSaveMenuDialog(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '400px',
              width: '90%',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 20px 0', color: currentTheme.primary }}>保存当前菜单</h3>
            <input
              type="text"
              placeholder="请输入菜单名称"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSaveMenuDialog(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ddd',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                取消
              </button>
              <button
                onClick={handleSaveMenu}
                style={{
                  padding: '8px 16px',
                  backgroundColor: currentTheme.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 全局样式 */}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* 滚动条样式 */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
