// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FoodLottery from "./pages/foodLottery";
import FoodVideo from "./pages/FoodVideo"
export default function App() {
  return (
    <Router>
      <div style={{ display:"flex", height:"100vh"}}>
        {/* 左侧菜单 */}
        <div style={{ width: "5rem", background: "#f0f0f0", padding: "20px", display: "flex",
          flexDirection: "column", gap: "15px",
        }}>
          <h2 style={{color:'#ecf0f1'}}>菜单</h2>
          <Link to="/">美食转盘</Link>
          <Link to="/video">视频入口</Link>
        </div>
        {/* 右侧区域 */}
        <div style={{flex:1, overflowY:'auto'}}>
          <Routes>
            <Route path="/" element={<FoodLottery/>}/>
            <Route path="/video" element={<FoodVideo/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

