# MUI 移动端练习项目 · 数据分析（首页 + 数据分析）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 项目小巧，重点练**首页（轮播 + 新闻列表）**和**数据分析（echarts 三张图）**。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 说明 |
|---|---|---|---|
| 登录页 | `index.html` | — | 入口页 |
| 主框架 | `exe/page.html` | — | 底部 Tab 切换 |
| 首页 | `exe/home.html` | 首页 | 轮播图（`building/banner/list`）+ 新闻列表（`model/list`）|
| **数据分析** | `exe/sz.html` | 数据分析 | **echarts 三张图（全都有）** |
| 模板 | `exe/new_file.html` | — | 530 B 模板 |

## 📊 数据分析页三张图（`exe/sz.html`）⭐

| 图表 | 接口 | 状态 |
|---|---|---|
| 条形图（新闻评论数·按性别） | `/api/data/comment/list_2` | ✅ |
| 折线图（阅读书籍数量趋势） | `/api/read/book/list_1` | ✅ |
| **饼状图（书籍类型占比）** | `/api/read/book/list/type_1` | ✅ |

> 💡 **这个项目是同类练习里图表最全的**（很多版本只做了前两张）。
> 三个接口的返回结构：
> - `data/comment/list_2` → `data.name[]` / `data.woman[]` / `data.man[]`
> - `read/book/list_1` → `data.name[]` / `data.value[]`
> - `read/book/list/type_1` → `data.name[]` / `data.count[]` / `data.data[]`

## 🎯 这个练习练到了什么

| 技能 | 体现在哪 |
|---|---|
| **轮播图无限循环** | `home.html` —— 首尾各复制一张（首 = 最后一张，尾 = 第一张），中间 `for` 循环 |
| **圆点指示器** | 循环图片时同步生成 `<div class="mui-indicator">` |
| **列表渲染** | `home.html` —— 循环拼 HTML → 一次性写入 `innerHTML` |
| **echarts 图表** | `sz.html` —— 柱状 / 折线 / 饼状 三件套 |
| **Ajax + token** | 所有请求走 `mui.ajax`，请求头带 `Authorization` |
| **图片地址拼接** | 接口返回相对路径，用 `httpimg` 拼服务器地址 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（数据可视化，`js/echarts.js`）
- **Ajax**：`mui.ajax` 调 RESTful 接口
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html            登录页（入口）
├── manifest.json         HBuilderX App 配置
├── exe/
│   ├── page.html         主框架
│   ├── home.html         首页（轮播 + 新闻列表）
│   ├── sz.html           数据分析（echarts 三图）
│   └── new_file.html     页面模板
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js           服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js   MUI 框架
│   └── echarts.js        图表库（约 700 KB）
└── fonts/
    └── mui.ttf           MUI 图标字体
```

## 🔌 用到的接口

| 功能 | 方法 | 路径 |
|---|---|---|
| 首页轮播 | GET | `/api/building/banner/list` |
| 首页新闻 | GET | `/api/model/list` |
| 图表·条形（评论数） | GET | `/api/data/comment/list_2` |
| 图表·折线（阅读量趋势） | GET | `/api/read/book/list_1` |
| 图表·饼图（书籍类型占比） | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## 🚀 本地运行

### 1. 打开项目

用 **HBuilderX** 打开本文件夹（不要打开里面的单个文件），
然后「运行 → 运行到手机或模拟器」。

### 2. 配置服务器地址

本项目**不包含任何真实服务器地址**（已脱敏）。运行前编辑 `js/http.js`：

```javascript
var http    = 'http://YOUR_SERVER_HOST:PORT';            // 调接口
var httpimg = 'http://YOUR_SERVER_HOST:PORT/prod-api';   // 显示图片
```

替换成你自己的接口地址，例如：

```javascript
// 浏览器调试
var http    = 'http://127.0.0.1:9000';
var httpimg = 'http://127.0.0.1:9000/prod-api';

// 模拟器 / 真机（用本机局域网 IP）
var http    = 'http://192.168.1.100:9000';
var httpimg = 'http://192.168.1.100:9000/prod-api';
```

> ⚠️ **两个变量的区别很重要**：
> - `http` —— 只用来**调接口**，末尾**不带** `/prod-api`
> - `httpimg` —— 只用来**显示图片**，末尾**带** `/prod-api`
>
> ⚠️ **`httpimg` 末尾不要加 `/`**！
> 因为接口返回的图片字段（如 `/profile/p1.jpg`）**本身就以 `/` 开头**，
> 两边都带斜杠会拼成 `//profile/p1.jpg`，图片就会加载失败。

### 3. 接口约定

返回结构一般为：

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

`code` 为 200 表示成功。需要认证的接口在请求头带：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## 📝 待办

- [ ] `exe/new_file.html` —— 模板页面，待填内容
- [ ] 登录页 / 主框架可再完善
- [ ] 打包练习：产出 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有；
  ECharts 版权归 Apache 基金会所有，均仅作学习使用。
- `js/echarts.js` 约 700 KB，属第三方库；若想让仓库更小，可改用 CDN 引入。

## 📄 License

学习用途，代码可自由参考。第三方库遵循其自身开源协议。
