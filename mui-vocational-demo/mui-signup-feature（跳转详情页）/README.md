# MUI 报名加人功能练习（JiaJianGongNeng）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益项目报名 + 报名人数（加人）**这套业务逻辑。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 入口页 |
| 主框架 | `exe/page.html` | 底部 Tab 切换 |
| 功能 · 项目列表 | `exe/GengNeng1.html` | 公益项目列表，拉取数据后循环渲染 |
| 功能 · 项目详情 | `exe/GongNeng1XingQing.html` | 接收列表页传来的 id，显示详情 + 报名按钮 |

## 🎯 这个练习要做什么

核心是**「报名」这个动作**：

```
项目列表页
   │  点某一条 → 把 id 传到详情页
   ▼
项目详情页
   │  显示：项目标题、图片、简介、发起方、报名人数
   │  点「报名」
   ▼
mui.confirm 确认框
   │  点「确认」
   ▼
POST 报名接口 → 报名人数 +1 → 列表页刷新
```

> 📌 `开发者笔记.md` 里记着：**「报名加人的功能」还没实现** —— 这正是下一步要练的。

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── 开发者笔记.md                  学习笔记
├── exe/
│   ├── page.html                 主框架
│   ├── GengNeng1.html            功能 · 项目列表
│   └── GongNeng1XingQing.html    功能 · 项目详情
├── css/                          MUI 样式
├── js/
│   ├── http.js                   服务器地址配置（需自己填）
│   └── mui.js                    MUI 框架
└── fonts/                        MUI 图标字体
```

## 🚀 本地运行

### 1. 打开项目

用 **HBuilderX** 打开本文件夹（不要打开里面的单个文件），
然后「运行 → 运行到手机或模拟器」。

### 2. 配置服务器地址

本项目**不包含任何真实服务器地址**（已脱敏）。运行前编辑 `js/http.js`：

```javascript
var API_BASE = 'http://YOUR_SERVER_HOST:PORT';
```

替换成你自己的接口地址：

```javascript
var API_BASE = 'http://127.0.0.1:8080';        // 浏览器调试
var API_BASE = 'http://192.168.1.100:8080';    // 模拟器 / 真机
```

> ⚠️ `API_BASE` 同时用于**调接口**和**显示图片**。若后端图片路径还有额外前缀，
> 按实际约定调整拼接方式。

## 📝 练习到的知识点

- 列表渲染（循环拼 HTML → `innerHTML`）
- **跨页传参**（`mui.openWindow` 的 `extras` + `currentWebview()` 读取）
- 详情页按 id 请求数据
- 图片地址拼接（`API_BASE + imgUrl`）
- Ajax 请求与 token 认证
- **报名加人**（待实现 ← 下一步）

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

学习用途，代码可自由参考。
