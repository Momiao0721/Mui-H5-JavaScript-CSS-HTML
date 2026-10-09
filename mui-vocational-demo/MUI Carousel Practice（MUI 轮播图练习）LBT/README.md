# MUI 轮播图练习（LBT）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 专门练**轮播图**（LBT = 轮播图），含两种实现思路。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点两句就太感谢了 ^_^

---

## 📱 页面

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 入口页 |
| 主框架 | `exe/page.html` | 底部 Tab 切换 |
| 轮播图 · 方法一 | `exe/lbt1.html` | 首尾各保留一张（复制节点），中间用 `for` 循环生成 |
| 轮播图 · 方法二 | `exe/lbt2.html` | 保留 HTML 里的小圆点，其余同上 |

## 💡 两种轮播图写法

（`开发者笔记.md` 里有更详细的思考过程）

| 方法 | 思路 | 特点 |
|---|---|---|
| **方法一** | 手动放首尾两张（首 = 最后一张，尾 = 第一张），中间 `for` 循环渲染 | 直观，圆点数量自己控制 |
| **方法二** | 保留 HTML 里写死的小圆点，其余同方法一 | 代码少，但圆点可能检测不到 |
| 方法三（待补） | 用 MUI 自带的首尾复制机制 | 据说能省 15~20 行 JS |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html          登录页（入口）
├── manifest.json       HBuilderX App 配置
├── 开发者笔记.md        学习笔记（轮播图写法思考）
├── exe/
│   ├── page.html       主框架
│   ├── lbt1.html       轮播图 · 方法一
│   └── lbt2.html       轮播图 · 方法二
├── css/                MUI 样式
├── js/
│   ├── http.js         服务器地址配置（需自己填）
│   └── mui.js          MUI 框架
└── fonts/              MUI 图标字体
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
var API_BASE = 'http://12';        // 浏览器调试
var API_BASE = 'http://19';    // 模拟器 / 真机
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

- MUI 轮播图结构（`mui-slider` / `mui-slider-group` / `mui-slider-loop`）
- **首尾复制节点**实现无限循环
 圆点指示器（`mui-slider-indicator` + `mui-indicator`）跟随图片张数
- [x] `mui('.mui-slider').slider({ interval: 3000 })` 自动播放
- [x] Ajax 拉取轮播数据并循环渲染
- [x] 图片地址拼接（`API_BASE + imgUrl`）

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

学习用途，代码可自由参考。
