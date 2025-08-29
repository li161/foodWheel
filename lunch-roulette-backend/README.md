# Lunch Roulette Backend

这是午餐选择应用的后端服务，使用Spring Boot开发，提供食物管理、视频管理、转盘历史记录等功能的API接口。

## 技术栈

- Spring Boot 3.2.2
- MySQL 8.0
- MyBatis-Plus
- Spring Security
- JWT

## 项目结构

```
src/main/java/com/example/lunchroulette/
├── config/           # 配置类
├── controller/       # 控制器
├── dto/              # 数据传输对象
├── mapper/           # MyBatis映射接口
├── model/            # 实体类
├── service/          # 服务接口
│   └── impl/         # 服务实现
└── LunchRouletteApplication.java # 应用入口
```

## 数据库配置

1. 确保已安装MySQL数据库
2. 创建数据库：`CREATE DATABASE lunch_roulette;`
3. 修改`application.yml`中的数据库连接信息：
   - url: jdbc:mysql://localhost:3306/lunch_roulette
   - username: root
   - password: root

## 初始化数据库

项目启动时会自动运行`resources/init.sql`脚本，创建表结构并插入测试数据。

## 运行项目

### 使用Maven

```bash
cd lunch-roulette-backend
mvn clean install
mvn spring-boot:run
```

### 使用IDE

直接运行`LunchRouletteApplication.java`的main方法。

## API接口

### 食物管理
- GET /api/foods - 获取所有食物列表
- GET /api/foods/{id} - 获取单个食物详情（包含配料和制作步骤）
- POST /api/foods - 创建新食物
- PUT /api/foods/{id} - 更新食物信息
- DELETE /api/foods/{id} - 删除食物

### 视频管理
- GET /api/videos - 获取视频列表（支持查询、分类筛选和分页）
- GET /api/videos/count - 获取视频总数
- GET /api/videos/{id} - 获取单个视频详情
- POST /api/videos - 创建新视频
- PUT /api/videos/{id} - 更新视频信息
- DELETE /api/videos/{id} - 删除视频

### 转盘历史
- GET /api/spin-history/user/{userId} - 获取用户的转盘历史记录
- POST /api/spin-history - 记录新的转盘历史
- DELETE /api/spin-history/{id} - 删除转盘历史记录

### 保存菜单
- GET /api/saved-menus/user/{userId} - 获取用户保存的菜单列表
- GET /api/saved-menus/{id} - 获取单个保存的菜单详情
- POST /api/saved-menus - 保存新菜单
- DELETE /api/saved-menus/{id} - 删除保存的菜单

### 用户管理
- POST /api/users/register - 用户注册
- POST /api/users/login - 用户登录
- GET /api/users/{id} - 获取用户信息
- PUT /api/users/{id} - 更新用户信息
- DELETE /api/users/{id} - 删除用户

## CORS配置

后端已配置CORS，允许来自`http://localhost:5173`（前端开发服务器）的请求访问。