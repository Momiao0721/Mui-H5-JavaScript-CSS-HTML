# MUI 报名加人功能练习（mui-signup-feature）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益项目报名 + 报名人数变化（加人）**这套业务逻辑。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 入口页 |
| 主框架 | `exe/page.html` | 底部 4 个 Tab 切换 |
| 功能1 · 项目列表 | `exe/GengNeng1.html` | 公益项目列表 + 「报名」按钮 |
| 功能1 · 项目详情 | `exe/GongNeng1XingQing.html` | 详情 + 报名（确认框 → 提交 → 人数刷新）|
| 功能2 · 公益活动 | `exe/GengNeng2.html` | 公益活动列表（按钮事件待补）|

## 🎯 这个练习解决的核心问题

**「报名之后，报名人数为什么不更新？」**

```
项目列表页 (GengNeng1)
   │  ① 点「报名」→ 取 data-id → extras 传给详情页
   ▼
项目详情页 (GongNeng1XingQing)
   │  ② 按 id 请求详情，显示报名人数
   │  ③ 点「报名」→ mui.confirm 确认框
   │  ④ 确认 → POST 报名接口
   │  ⑤ 成功后：禁用按钮（防重复）+ 重新请求详情刷新人数
   ▼
返回列表页
   │  ⑥ 列表页监听 show 事件 → 重新请求列表
   ▼
人数已更新 ✅
```

### 两个关键技巧

| 技巧 | 位置 | 作用 |
|---|---|---|
| **`show` 事件重新拉数据** | `GengNeng1.html` | 从详情页返回时列表自动刷新，不用手动改 DOM |
| **报名后禁用按钮** | `GongNeng1XingQing.html` | `setAttribute('disabled') + mui-disabled`，防重复报名 |
| **重新请求详情刷人数** | `refreshRenShu()` | 不本地加数字，重新拉接口，数据最准 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                      登录页（入口）
├── manifest.json                   HBuilderX App 配置
├── 开发者笔记.md                    学习笔记
├── exe/
│   ├── page.html                   主框架（底部 4 Tab）
│   ├── GengNeng1.html              功能1 · 项目列表
│   ├── GengNeng2.html              功能2 · 公益活动列表
│   └── GongNeng1XingQing.html      功能1 · 项目详情
├── css/                            MUI 样式
├── js/
│   ├── http.js                     服务器地址配置（需自己填）
│   └── mui.js                      MUI 框架
└── fonts/                          MUI 图标字体
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

### 3. 接口约定

返回结构一般为 `{ code, msg, rows, total }`，`code` 为 200 表示成功。

需要认证的接口：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## 📝 练习到的知识点

-  列表渲染（循环拼 HTML → `innerHTML`）
-  **跨页传参**（`mui.openWindow` 的 `extras` + `currentWebview().extras`）
-  参数判空保护（拿不到 id 就提示，不往下跑）
-  **报名流程**：确认框 → POST → 成功后刷新
-  **防重复报名**（按钮置灰禁用）
-  **页面返回自动刷新**（`show` 事件 + 重新请求接口）
-  事件委托给动态生成的按钮绑事件
-  功能2 的报名按钮事件（待补）

## ⚠️ 已知待办

- [ ] `exe/page.html` 声明了 `GengNeng3.html` / `GengNeng4.html`，但这两个文件还没建
- [ ] `GongNeng1XingQing.html` 读参数用的是 `.extra`，应为 `.extras`（复数）
- [ ] 确认「公益项目报名」在真实服务器上对应哪个接口（文档里 `public/projects` 没有报名接口）

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

学习用途，代码可自由参考。
