-- 创建数据库表结构

-- 食物表
CREATE TABLE IF NOT EXISTS food (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    taste VARCHAR(50),
    difficulty VARCHAR(50),
    create_time DATETIME,
    update_time DATETIME
);

-- 配料表
CREATE TABLE IF NOT EXISTS ingredient (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    food_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id) ON DELETE CASCADE
);

-- 制作步骤表
CREATE TABLE IF NOT EXISTS recipe_step (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    food_id BIGINT NOT NULL,
    step_order INT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id) ON DELETE CASCADE
);

-- 视频表
CREATE TABLE IF NOT EXISTS video (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    bvid VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    create_time DATETIME,
    update_time DATETIME
);

-- 转盘历史记录表
CREATE TABLE IF NOT EXISTS spin_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    food_id BIGINT NOT NULL,
    spin_time DATETIME NOT NULL,
    FOREIGN KEY (food_id) REFERENCES food(id)
);

-- 保存菜单表
CREATE TABLE IF NOT EXISTS saved_menu (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    menu_name VARCHAR(100) NOT NULL,
    food_ids VARCHAR(500) NOT NULL,
    create_time DATETIME NOT NULL
);

-- 用户表
CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50),
    avatar VARCHAR(255),
    create_time DATETIME,
    update_time DATETIME
);

-- 插入一些测试数据
INSERT INTO food (name, taste, difficulty, create_time, update_time)
VALUES
    ('番茄炒蛋', '酸甜', '简单', NOW(), NOW()),
    ('麻婆豆腐', '麻辣', '中等', NOW(), NOW()),
    ('宫保鸡丁', '香辣', '中等', NOW(), NOW()),
    ('青椒土豆丝', '清淡', '简单', NOW(), NOW()),
    ('红烧肉', '甜咸', '复杂', NOW(), NOW());

-- 插入配料数据
INSERT INTO ingredient (food_id, name)
VALUES
    (1, '番茄'),
    (1, '鸡蛋'),
    (1, '糖'),
    (1, '盐'),
    (2, '豆腐'),
    (2, '肉末'),
    (2, '豆瓣酱'),
    (2, '辣椒');

-- 插入制作步骤数据
INSERT INTO recipe_step (food_id, step_order, description)
VALUES
    (1, 1, '番茄切块，鸡蛋打散'),
    (1, 2, '锅中倒油，鸡蛋炒熟盛出'),
    (1, 3, '锅中再倒油，番茄炒软'),
    (1, 4, '加入鸡蛋，加糖和盐调味'),
    (2, 1, '豆腐切块，肉末准备好'),
    (2, 2, '锅中倒油，肉末炒散'),
    (2, 3, '加入豆瓣酱和辣椒炒香'),
    (2, 4, '加入豆腐，小火焖煮');

-- 插入视频数据
INSERT INTO video (title, bvid, category, create_time, update_time)
VALUES
    ('番茄炒蛋教程', 'BV1234567890', '家常菜', NOW(), NOW()),
    ('麻婆豆腐正宗做法', 'BV2345678901', '川菜', NOW(), NOW()),
    ('宫保鸡丁家常版', 'BV3456789012', '川菜', NOW(), NOW());