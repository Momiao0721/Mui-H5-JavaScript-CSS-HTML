# 时代楷模 App · 完整练习版（SDKM）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 覆盖：登录、首页、心得（增 / 改）、公益（列表 / 详情 / 报名）、数据分析（三图）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能（11 个页面）

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | — | `building/banner/list`、`model/list` |
| **心得列表** | `exe/li_1.html` | 标题 | `history/list` |
| **编辑笔记** | `exe/BaiJiYei.html` | 编辑页 | `PUT /history/note` |
| **增加笔记** | `exe/ZhenJia.html` | 增加页 | `POST /history/note` |
| 心得（Tab 页）| `exe/xd.html` | 心得 | `activity/list`（见待优化）|
| **公益列表** | `exe/gy.html` + `js/GongYiJVASKMT.js` | 公益 | `activity/list` |
| **公益详情** | `exe/GongYiXiangQingHTML.html` | 详情 | `activity/{id}`、`activity/apply` |
| 报名按钮页 | `exe/BaoMingButtom.html` | 标题 | `activity/{id}`、`activity/apply` |
| 数据分析 | `exe/sjfx.html` | 数据分析 | 三张图表接口 |

## 🎯 功能实现

### 登录页（`index.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → `localStorage.setItem('token', ...)` → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 公益 / 心得 / 数据分析**，4 个子页面**全部存在** ✅

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点实现无限循环 + 圆点指示器 |
| 快捷功能宫格 | ⚠️ 6 个入口，名称是占位 `li_1`~`li_6` |
| 新闻列表 | ✅ `model/list`，默认 5 条，点「更新」+5 |
| 宫格跳转 | ⚠️ 跳 `li_1.html`~`li_6.html`，目前**只做了 `li_1.html`** |

### 心得（增 / 改）

```
li_1.html（心得列表，history/list）
   ├─ 点「增加」 → ZhenJia.html（POST /history/note）
   └─ 点某条 →  BaiJiYei.html（PUT /history/note）
```

| 页面 | 实现 |
|---|---|
| `li_1.html` 列表 | ✅ `history/list`，字段 `id` / `title` / `content` / **`wstudyNote`**（笔记对象）|
| `ZhenJia.html` 增加 | ✅ 输入标题 / 内容 → `POST /history/note`，参数 `noteTitle` / `noteContent` |
| `BaiJiYei.html` 编辑 | ✅ 输入标题 / 内容 → `PUT /history/note`，参数 `noteId` / `noteTitle` / `noteContent`，带 `JSON.stringify` |

> 💡 **`wstudyNote` 是这题的关键** —— `history/list` 返回的笔记信息套在这一层里，
> 编辑时要传 `wstudyNote.noteId`，不是外面的 `rows[i].id`。

### 公益（列表 → 详情 → 报名）

```
gy.html（公益列表，activity/list）
   └─ 点某条 → GongYiXiangQingHTML.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| `gy.html` | ✅ 列表渲染逻辑抽到 `js/GongYiJVASKMT.js`（公共 JS，便于复用）|
| 列表字段 | `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` |
| `GongYiXiangQingHTML.html` | ✅ `activity/{id}`，显示 `applyNum`（报名人数）+ 报名按钮 |
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
| **两层嵌套数据解析（`wstudyNote`）** | `li_1.html` |
| **POST 新增数据** | `ZhenJia.html` |
| **PUT 修改数据** | `BaiJiYei.html` |
| **列表 → 详情跨页传参** | `gy.html` → `GongYiXiangQingHTML.html` |
| **活动报名 POST** | `GongYiXiangQingHTML.html` |
| **公共 JS 抽离复用** | `js/GongYiJVASKMT.js` |
| echarts 柱 / 折 / 饼 | `sjfx.html` |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（`js/echarts.js`）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage`
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                        登录页（入口）
├── manifest.json                     HBuilderX App 配置
├── exe/                              业务页面（10 个）
│   ├── page.html                     主框架（底部 4 Tab + subpages）
│   ├── home.html                     首页（轮播 + 宫格 + 新闻）
│   ├── xd.html                       心得 Tab 页
│   ├── li_1.html                     心得列表（hHistory/list）
│   ├── ZhenJia.html                  增加笔记
│   ├── BaiJiYei.html                 编辑笔记
│   ├── gy.html                       公益列表
│   ├── GongYiXiangQingHTML.html      公益详情 + 报名
│   ├── BaoMingButtom.html            报名按钮页
│   └── sjfx.html                     数据分析（三图）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                       服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js           MUI 框架
│   ├── echarts.js                    图表库
│   └── GongYiJVASKMT.js              公益列表公共逻辑
└── fonts/
    └── mui.ttf                       MUI 图标字体
```

> 📌 本项目**没有本地图片目录**，所有图片都用接口返回的相对路径 + `httpimg` 拼接显示。

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 学习历史列表 | GET | `/api/history/list` |
| **新增笔记** | POST | `/api/history/note` |
| **编辑笔记** | PUT | `/api/history/note` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

### `history/list` 的返回是**两层**的

```
rows[i]
 ├─ id              ← 历史 id
 ├─ title           ← 历史标题
 ├─ content         ← 历史内容
 ├─ userId
 ├─ issueTime
 └─ wstudyNote      ← 笔记对象（可能为 null）
     ├─ noteId      ← 笔记 id  ★ 编辑要传这个
     ├─ noteTitle   ← 笔记标题
     ├─ noteContent ← 笔记内容
     └─ studyHistoryId ← 学习历史 id
```

### 其他字段

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

- [ ] **登录页缺 `JSON.stringify`** —— `Content-Type: application/json` 时大概率报 500
- [ ] **`ZhenJia.html`（增加笔记）也缺 `JSON.stringify`** —— 和登录同一个坑
- [ ] **`gy.html` 只引入了 `GongYiJVASKMT.js` 却没调用渲染函数**（或者调用时机不对），
      页面现在是空的，需要确认 JS 是否真的执行了
- [ ] `exe/xd.html`（心得 Tab）用的是 **`activity/list`**（公益活动接口），
      心得应该用 `history/list`；现在这个 Tab 显示的内容和 `li_1.html` 不一致

### 🟡 内容

- [ ] `home.html` 宫格 6 个名称还是占位 `li_1`~`li_6`，应改成实际功能名
- [ ] 宫格跳转只做了 `li_1.html`，`li_2`~`li_6` 还没建
- [ ] `GongYiXiangQingHTML.html` 只显示了 `applyNum`，
      建议补 `activityName` / `imgUrl` / `briefIntroduction` / `startEndTime`
- [ ] `BaoMingButtom.html` 是独立报名按钮页，确认是否还需要（详情页已自带报名）
- [ ] 饼图 formatter 是 `'{b}{d}%'`，建议改成 **`'{b}: {d}%'`**
- [ ] 各页面 `<title>` 为空
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/)；ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
