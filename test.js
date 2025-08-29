// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const rl = require("readline").createInterface({ input: process.stdin });
// var iter = rl[Symbol.asyncIterator]();
// const readline = async () => (await iter.next()).value;

// const fs = require('fs');
import fs from 'fs';



// 读取标准输入
const data = fs.readFileSync(0, 'utf8').trim().split('\n');

// 第一行：行列
const [n, m] = data[0].split(' ').map(Number);

// 之后 n 行：矩阵
const matrix = data.slice(1, n + 1).map(line => line.split(' ').map(Number));

console.log(matrix);
