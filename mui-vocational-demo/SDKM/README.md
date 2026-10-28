# 时代楷模 App · 限时练习（SDKM）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 50 分钟限时练习作品：登录 + 首页 + 心得 + 公益 + 数据分析。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | — | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | — | `building/banner/list`、`model/list` |
| **心得** | `exe/xd.html` | 心得 | `history/list`、`history/note`（PUT 编辑）|
| **公益** | `exe/gy.html` | 公益 | `activity/list` |
| **公益详情** | `exe/XiangQingGongYi.html` | 详情 | `activity/{id}`、`activity/apply`（报名）|
| 数据分析 | `exe/sjfx.html` | 数据分析 | 三张图表接口 |

## 🎯 功能实现

### 登录页（`index.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → `localStorage.setItem('token', ...)` → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 心得 / 公益 / 数据分析**，4 个子页面**全部存在** ✅

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，
> 不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点实现无限循环 + 圆点指示器 |
| 快捷功能宫格 | ⚠️ 6 个入口，名称是占位 `li_1`~`li_6`，`mui-col-xs-4`（每行 3 个）|
| 新闻列表 | ✅ `model/list`，默认 5 条，点「更新新闻」+5 |
| 新闻字段 | `title`（标题）/ `name` / `content`（内容）/ `imgUrl` |

### 心得（`exe/xd.html`）

| 区块 | 实现 |
|---|---|
| 列表 | ✅ `history/list`，渲染 `userId` / `content` |
| 编辑 | ✅ 点「编辑」→ `mui.prompt` 输入 → `PUT /history/note`（带 `JSON.stringify`）→ 成功后重新加载 |
| 删除 | ⚠️ 有「删除」按钮，未绑事件 |

### 公益（`exe/gy.html` → `exe/XiangQingGongYi.html`）

| 区块 | 实现 |
|---|---|
| 公益列表 | ✅ `activity/list`，字段 `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` |
| 点击进详情 | ✅ `plus.storage` 存 id + `mui.openWindow` |
| 公益详情 | ✅ `activity/{id}`，显示 `applyNum`（报名人数）|
| 报名 | ✅ `POST /activity/apply` |

### 数据分析（`exe/sjfx.html`）

| 图表 | 接口 | 说明 |
|---|---|---|
| **条形图** | `/api/data/comment/list_2` | `name`（月份）/ `woman`（女性评论数）/ `man`（男性评论数）双系列 |
| **折线图** | `/api/read/book/list_1` | `name`（月份）/ `value`（每月阅读数量）|
| **饼状图** | `/api/read/book/list/type_1` | `name`（书籍类型）/ `count`（数量）→ 组装 `{name, value}` |

饼图 label：`formatter: '{b}{d}%'`

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| 登录 + token | `index.html` |
| 底部 4 Tab + subpages | `page.html` |
| 轮播图首尾复制循环 | `home.html` |
| 宫格快捷入口 | `home.html` |
| 列表分页「+5 条」 | `home.html` |
| **列表 → 详情跨页传参** | `gy.html` → `XiangQingGongYi.html` |
| **PUT 修改数据 + 重新加载** | `xd.html` |
| **活动报名 POST** | `XiangQingGongYi.html` |
| echarts 柱 / 折 / 饼 | `sjfx.html` |
| 手动组装图表数据 | `sjfx.html` 饼图 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（`js/echarts.js`）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage` / `mui.prompt`
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── exe/                          业务页面（7 个）
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 宫格 + 新闻列表）
│   ├── xd.html                   心得（列表 + 编辑）
│   ├── gy.html                   公益列表
│   ├── XiangQingGongYi.html      公益详情 + 报名
│   └── sjfx.html                 数据分析（三图）
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

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 学习历史列表 | GET | `/api/history/list` |
| 编辑笔记 | PUT | `/api/history/note` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意（**这题最容易踩的地方**）

### `history/list` 的返回是**两层**的

```
rows[i]
 ├─ id              ← 历史 id
 ├─ title           ← 历史标题
 ├─ content         ← 历史内容
 ├─ userId
 ├─ issueTime
 └─ wstudyNote      ← 笔记对象（可能为 null）
     ├─ noteId      ← 笔记 id
     ├─ noteTitle   ← 笔记标题
     ├─ noteContent ← 笔记内容
     └─ studyHistoryId ← 学习历史 id
```

> 「编辑笔记」要传的是 **`wstudyNote.noteId`**，不是外面的 `rows[i].id`。

### 其他

| 接口 | 字段 | 说明 |
|---|---|---|
| `building/banner/list` | `id` / `title` / `imgUrl` / `sort` | 轮播 |
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` | 新闻（`name` 是楷模姓名）|
| `activity/list` | `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` | 公益活动 |
| `data/comment/list_2` | `name` / `woman` / `man` | 月份 / 女性 / 男性评论数 |
| `read/book/list_1` | `name` / `value` | 月份 / 每月阅读数量 |
| `read/book/list/type_1` | `name` / `count` / `data` | 书籍类型 / 数量 / 占比 |

> ⚠️ 时代楷模的评论数接口是 **`list_2`**，数字社区主题是 `list_1`，**别搞混**。

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

## 📝 待优化

### 🔴 影响功能

- [ ] **心得「编辑后列表不变」** —— 三个原因叠在一起：
  1. 列表显示的是 `rows[i].userId` / `rows[i].content`（**历史字段**），
     而编辑改的是 `wstudyNote.noteTitle`（**笔记字段**）→ 界面看不出变化
  2. `noteId` 传的是 `rows[i].id`（历史 id），应为 **`rows[i].wstudyNote.noteId`**
  3. `noteTitle: 1` 写死，没用 `mui.prompt` 回调里的 `e.value`
- [ ] **`mui.prompt` 在 3.7.3 的 5+ 模式下有 bug**（可能直接 return 不回调），
      建议改用 `plus.nativeUI.prompt`
- [ ] 登录页缺 **`JSON.stringify`** —— `Content-Type: application/json` 时大概率报 500
- [ ] 心得「删除」按钮**没绑事件**

### 🟡 内容

- [ ] `home.html` 宫格 6 个名称还是占位 `li_1`~`li_6`，应改成实际功能名
- [ ] 宫格点击跳转的 `li_1.html`~`li_6.html` 都还没建
- [ ] `XiangQingGongYi.html` 只显示了 `applyNum`，建议补标题 / 图片 / 简介等字段
- [ ] 饼图 formatter 是 `'{b}{d}%'`，建议改成 **`'{b}: {d}%'`**（加个冒号）
- [ ] 登录按钮文字还是「按钮」，应为「登录」
- [ ] 各页面 `<title>` 为空
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 版权归 [DCloud](https://www.dcloud.io/)；ECharts 版权归 Apache 基金会。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
