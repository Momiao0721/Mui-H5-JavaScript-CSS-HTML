# 时代楷模 App（SDKM）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 主题为「时代楷模」：楷模新闻、公益项目报名、参观详情、学习心得、数据分析、个人中心。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | — | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| 学习心得 | `exe/xd.html` | 心得 | `history/list` |
| 活动报名 | `exe/BaoMingXiangQing.html` | 活动报名 | `public/projects/list` |
| 参观详情 | `exe/CaiKanXiangQing.html` | 项目标题（动态）| `public/projects/{id}` |
| 我的信息 | `exe/WoDeXiangXi.html` | 我的信息 | `common/user/getInfo` |
| **数据分析** | `exe/sjfx.html` | 数据分析 | 三张图表接口 |
| 编辑（模板） | `exe/BaoMIngXiangQingHTML.html` | 编辑 | — |
| 设置（空壳） | `exe/SeiZhi.html` | — | — |

## 📊 数据分析（`exe/sjfx.html`）

| 图表 | 接口 | 官方返回字段 |
|---|---|---|
| **条形图**（评论数·按性别）| `/api/data/comment/list_2` | `data.name[]`（2022年1月至12月）、`data.woman[]`（女性评论数）、`data.man[]`（男性评论数）|
| **折线图**（阅读书籍数量趋势）| `/api/read/book/list_1` | `data.name[]`（2022年1月至12月）、`data.value[]`（每月阅读书籍数量）|
| **饼状图**（书籍类型占比）| `/api/read/book/list/type_1` | `data.name[]`（书籍类型）、`data.count[]`（对应数量）、`data.data[]`（对应占比）|

> 💡 饼图接口已同时返回 `count`（数量）和 `data`（占比），
> 前端可只用 `name` + `count` 组装 `[{name, value}]`，由 echarts 自动算百分比。

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| 登录 + token + JSON 提交 | `index.html` |
| 底部 Tab + subpages | `page.html` |
| 轮播图首尾复制循环 | `home.html` |
| 列表渲染 | `home.html` / `xd.html` / `BaoMingXiangQing.html` |
| 跨页传参（`extras` + `plus.storage` 兜底）| `BaoMingXiangQing.html` → `CaiKanXiangQing.html` |
| 详情页按 id 请求 | `CaiKanXiangQing.html` |
| 个人中心信息展示 | `WoDeXiangXi.html` |
| echarts 柱 / 折 / 饼 | `sjfx.html` |
| 手动组装图表数据 | `sjfx.html` 饼图 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（`js/echarts.js`）数据可视化
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage`
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── exe/                          业务页面（9 个）
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页
│   ├── xd.html                   学习心得
│   ├── BaoMingXiangQing.html     活动报名（公益项目列表）
│   ├── CaiKanXiangQing.html      参观详情（项目详情）
│   ├── WoDeXiangXi.html          我的信息
│   ├── sjfx.html                 数据分析（三图）
│   ├── BaoMIngXiangQingHTML.html 编辑模板
│   └── SeiZhi.html               设置（空壳）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
│   └── echarts.js                图表库
├── IMG/                          图片素材（15 个，约 7 MB）
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🖼 关于 `IMG/` 目录

- 部分文件**用图片 MD5 值命名**（如 `56eeee9b....jpg`），这是素材库的命名习惯。
- ⚠️ **版权说明**：图片素材**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
- 💡 其中有一个 **2 MB 的 GIF**，已在 `.gitignore` 中排除。

## 🔌 接口清单（含官方字段）

### 登录

| 方法 | 路径 | 参数 |
|---|---|---|
| POST | `/api/login` | `username`、`password` → 返回 `token` |

### 首页

| 方法 | 路径 | 主要字段 |
|---|---|---|
| GET | `/api/building/banner/list` | `id`、`title`、`imgUrl`、`sort` |
| GET | `/api/model/list` | `id`、`title`、`imgUrl`、`content`、`name`（楷模姓名）|

### 学习心得

| 方法 | 路径 | 主要字段 |
|---|---|---|
| GET | `/api/history/list` | `id`、`title`、`issueTime`、`content`、`status`、`wstudyNote`（`noteId` / `noteTitle` / `noteContent` / `studyHistoryId`）|

### 公益项目

| 方法 | 路径 | 主要字段 |
|---|---|---|
| GET | `/api/public/projects/list` | `id`、`categoryId`、`projectTitle`、`imgUrl`、`province`、`tag`、`introduce`、`receivingInstitution` |
| GET | `/api/public/projects/{id}` | 同上，在 `data` 对象里 |

> ⚠️ `public/projects/list` 的 **`categoryId` 通常必传**，以文档为准。

### 用户

| 方法 | 路径 | 主要字段 |
|---|---|---|
| GET | `/api/common/user/getInfo` | `userId`、`userName`、`nickName`、`sex`、`phonenumber`、`email`、`idCard`、`balance`、`avatar`、`score`、`educationBackground` |

### 数据分析

| 方法 | 路径 | 主要字段 |
|---|---|---|
| GET | `/api/data/comment/list_2` | `name`（月份）、`woman`、`man` |
| GET | `/api/read/book/list_1` | `name`（月份）、`value` |
| GET | `/api/read/book/list/type_1` | `name`（书籍类型）、`count`（数量）、`data`（占比）|

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

| 接口 | 字段 | 说明 |
|---|---|---|
| `model/list` | `title` | 楷模新闻标题（这个接口是正常 `title`）|
| `building/banner/list` | `title` | 轮播标题（也是正常 `title`）|
| `history/list` | `issueTime` | 心得时间（不是 `createTime`）|
| `history/list` | `wstudyNote` | 笔记对象，里面才是 `noteTitle` / `noteContent` |
| `public/projects/list` | `projectTitle` | 公益项目标题（不是 `title`）|
| `common/user/getInfo` | `avatar` | 头像（不是 `avater`）|
| `common/user/getInfo` | `nickName` | 昵称（大写 N）|
| `data/comment/list_2` | **`list_2`** | 时代楷模用 `list_2`，数字社区主题用 `list_1`，**别搞混** |

## 🚀 本地运行

用 **HBuilderX** 打开本文件夹，然后「运行 → 运行到手机或模拟器」。

**配置服务器地址**（编辑 `js/http.js`）：

```javascript
var http    = 'http://YOUR_SERVER_HOST:PORT';            // 调接口
var httpimg = 'http://YOUR_SERVER_HOST:PORT/prod-api';   // 显示图片
```

> ⚠️ 两个变量区别：
> - `http` —— 只用来**调接口**，末尾**不带** `/prod-api`、**也不带** `/`
> - `httpimg` —— 只用来**显示图片**，末尾**带** `/prod-api` 且**不要再加 `/`**
>
> 因为接口返回的图片字段（如 `/profile/p1.jpg`）本身以 `/` 开头，
> 两边都带斜杠会拼成 `//profile/p1.jpg`，图片就加载不出来。

**接口约定**：

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

需要认证的接口带：`headers: { 'Authorization': localStorage.getItem('token') }`


## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 版权归 [DCloud](https://www.dcloud.io/)；ECharts 版权归 Apache 基金会。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
