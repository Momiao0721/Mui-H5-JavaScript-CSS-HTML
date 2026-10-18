# MUI 移动端练习项目 · GongNengLianXi002

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益活动列表 → 详情 → 报名（加人）**这套完整业务流程。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 首页 | `building/banner/list`、`model/list` |
| 功能1 · 活动列表 | `exe/LianxXI01.html` | 功能1 | `activity/list` |
| 功能1 · 活动详情 | `exe/GongNEngONeXiangQIng.html` | 功能一详情 | `activity/{id}`、`activity/apply/` |

## 🎯 这个练习的核心：报名流程

```
活动列表页（LianxXI01）
   │  ① 点击某条活动 → 取 id → extras 传给详情页
   ▼
活动详情页（GongNEngONeXiangQIng）
   │  ② 按 id 请求详情 → 显示图片、标题、时间、简介、报名人数
   │  ③ 点「报名」→ 弹出确认框
   │  ④ 确认 → POST /api/activity/apply/
   │  ⑤ 成功后 → 重新请求详情，只更新「人数」那一段
   ▼
报名人数 +1 ✅
```

### 涉及到的两个关键点

| 点 | 说明 |
|---|---|
| **跨页传参** | `mui.openWindow` 的 `extras` + `currentWebview()` 读取 |
| **报名后刷新人数** | 报名成功后**重新请求详情接口**，用返回的 `applyNum` 更新页面 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── .gitignore
├── README.md
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab）
│   ├── home.html                 首页（轮播 + 新闻列表）
│   ├── LianxXI01.html            功能1 · 活动列表
│   └── GongNEngONeXiangQIng.html 功能1 · 活动详情（含报名）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
├── IMG/                          图片素材（约 8 MB，见下方说明）
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🖼 关于 `IMG/` 目录

共 15 个文件、约 **8 MB**，是从**备赛素材库**复制的练习用图片。

- 部分文件**用图片的 MD5 值命名**（例如 `56eeee9b7cf007f3df2b4ac6027371df.jpg`），
  这是素材库的命名习惯，同一张图不会重名。
- ⚠️ **版权说明**：图片素材**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
- 💡 其中有一个 **2 MB 的 GIF**，若想让仓库小一点可以压缩或在 `.gitignore` 里排除。

## 🔌 用到的接口

| 功能 | 方法 | 路径 | 说明 |
|---|---|---|---|
| 登录 | POST | `/api/login` | 传 username / password，返回 token |
| 首页轮播 | GET | `/api/building/banner/list` | 返回 `rows` 数组 |
| 首页新闻 | GET | `/api/model/list` | 新闻列表 |
| 活动列表 | GET | `/api/activity/list` | 返回 `rows` 数组 |
| 活动详情 | GET | `/api/activity/{id}` | 返回 `data` 对象，含 `applyNum`（报名人数）|
| **活动报名** | POST | `/api/activity/apply/` | Body：`{ activityId: id }` |

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
> - `httpimg` —— 只用来**显示图片**，末尾**带** `/prod-api`，且**末尾不要加 `/`**
>
> 因为接口返回的图片字段（如 `/profile/p1.jpg`）本身就以 `/` 开头，
> 两边都带斜杠会拼成 `//profile/p1.jpg`，图片会加载失败。

### 3. 接口约定

返回结构一般为：

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

`code` 为 200 表示成功。需要认证的接口在请求头带：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## 📝 练习到的知识点

- [x] 登录（账号密码 + 判空 + 存 token）
- [x] 列表渲染（循环拼 HTML → `innerHTML`）
- [x] **跨页传参**（`extras` + `currentWebview()`）
- [x] 详情页按 id 请求数据
- [x] **报名流程**：确认框 → POST → 刷新人数
- [x] 图片地址拼接（`httpimg + imgUrl`）

## ⚠️ 已知问题（记录，未修改）

- [ ] `exe/page.html` 声明了 `LianxXI013.html` 和 `LianxXI02.html`，但**这两个文件不存在**
      → 点「功能2」「功能3」两个 Tab 会报错。需要建这两个页面，或把 Tab 改成 2 个。
- [ ] 报名接口路径写的是 `/api/activity/apply/`（**末尾带斜杠**），
      建议对照考场文档确认到底带不带斜杠。

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
