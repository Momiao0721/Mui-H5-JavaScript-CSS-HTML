# 时代楷模 · 报名练习（OLainxII）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 练习范围：**引导页** + 登录 + 首页 + 公益报名（列表 → 详情 → 报名）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## ⚠️ 先看这个：主框架有 2 个 Tab 的页面还没建

`exe/page.html` 声明了 4 个 Tab，但其中 **2 个子页面文件不存在**：

| Tab | 对应文件 | 状态 |
|---|---|:---:|
| 首页 | `exe/home.html` | ✅ 存在 |
| 报名 | `exe/BaoMing.html` | ✅ 存在 |
| **增删改** | `exe/zsg.html` | ❌ **缺失** |
| **数据分析** | `exe/sjfx.html` | ❌ **缺失** |

**后果**：点「增删改」或「数据分析」Tab 会**报错 / 白页**（`plus.webview.getWebviewById()` 拿到 null）。

> 📌 本项目**没有引入 ECharts**（`js/` 里只有 `http.js` / `mui.js` / `mui.min.js`），
> 所以数据分析确实还没开始做。

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| **引导页** | `index.html` | — | `guide/list` |
| 登录页 | `DengLu.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| **报名列表** | `exe/BaoMing.html` | 报名 | `activity/list` |
| **报名详情** | `exe/BaoMIngXiangQing.html` | 详情页 | `activity/{id}`、`activity/apply` |

## 🎯 功能实现

### 引导页（`index.html`）✅

| 功能 | 实现 |
|---|---|
| 引导图轮播 | ✅ `guide/list`，`mui-slider` 自动播放（`interval: 3000`）|
| **5 秒倒计时** | ✅ `setTimeout(Time, 1000)`，从 5 数到 1 |
| **倒计时结束自动跳登录页** | ✅ `if (c < 1) { mui.openWindow('DengLu.html') }` |
| 跳过按钮 | ✅ `DenglUyei` 手动提前跳转 |

```javascript
var c = 5;

function Time() {
    document.getElementById('Time').innerHTML = c;
    c = c - 1;

    if (c < 1) {                                     // 数到 1 → 自动跳
        mui.openWindow({ url: 'DengLu.html', id: 'DengLu' });
        return;
    }
    setTimeout(Time, 1000);                          // ★ 必须带 1000 毫秒延时
}
Time();
```

> 💡 **这两个点都做对了**：延时参数写了、到点自动跳了。
> 对比常见的两个错误：
> - `setTimeout(Time)` 不写延时 → 一瞬间跑完，**数字看起来不变**
> - 只 `return` 不跳转 → **永远停在最后一秒**

### 登录页（`DengLu.html`）

- 账号 / 密码输入 + 「登录」按钮
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 报名 / 增删改 / 数据分析**

> ⚠️ 后两个的子页面还没建（见本文开头）
>
> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点 + 圆点指示器 |
| 新闻列表 | ✅ `model/list`，字段 `title` / `content` / `imgUrl` |
| 列表分页 | ✅ `kmlbWuTiaO = 5`，点「更新」`+= 5` |
| 宫格入口 | ⚠️ 3 个，但 `name` 写成了 `li_1.html` / `li_2.html` / `li_3.html`（**带扩展名，显示出来就是 "li_1.html"**） |

> 💡 宫格名称建议改成**真实功能名**（如「英雄事迹 / 身边英雄 / 公益活动」），
> `name` 只写文字，不要带 `.html`。

### 报名（`exe/BaoMing.html` → `exe/BaoMIngXiangQing.html`）

```
BaoMing.html（报名列表，activity/list）
   └─ 点某条 → BaoMIngXiangQing.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ `activity/list`，5 个字段：`activityName` / `briefIntroduction` / `id` / `startEndTime` / `imgUrl` |
| **报名人数** | ⚠️ **列表没用 `applyNum`** —— 只有详情页用了 |
| 报名按钮 | ✅ 有 |
| **防重复报名** | ✅ 已报名按钮置灰 `${JiYii ? 'mui-disabled' : ''}` |
| 跨页传参 | ✅ `plus.storage` |
| **详情字段** | ⚠️ 只用了 **`applyNum`** 一个字（`data.data.applyNum`）—— 标题、发起人、简介、起止时间都没显示 |

> 💡 详情页建议补齐：`activityName`（标题）/ `initiator`（发起人）/
> `startEndTime`（起止时间）/ `overTime`（截止）/ `activityDetail`（简介）/ `imgUrl`（图）

## 🎯 练到的知识点

| 技能 | 位置 | 状态 |
|---|---|:---:|
| **引导页倒计时 + 自动跳转** | `index.html` | ✅ |
| 登录 + token | `DengLu.html` | ✅ |
| 底部 4 Tab + subpages | `page.html` | ⚠️ 2 个子页缺失 |
| 轮播图首尾复制循环 | `home.html` | ✅ |
| 列表分页「+5 条」 | `home.html` | ✅ |
| **列表 → 详情跨页传参** | `BaoMing.html` → `BaoMIngXiangQing.html` | ✅ |
| **活动报名 POST + 防重复** | `BaoMIngXiangQing.html` | ✅ |
| echarts 三图 | — | ❌ 未做 |
| 心得增删改 | — | ❌ 未做 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage` / `mui.openWindow`
- 打包：HBuilderX

> 📌 本项目**未引入 ECharts**。

## 📂 目录结构

```
.
├── index.html                    引导页（入口，5 秒倒计时）
├── DengLu.html                   登录页
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 新闻 + 宫格）
│   ├── BaoMing.html              报名列表
│   ├── BaoMIngXiangQing.html     报名详情 + 报名
│   ├── zsg.html                  ❌ 待建（「增删改」Tab）
│   └── sjfx.html                 ❌ 待建（「数据分析」Tab）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   └── mui.js / mui.min.js       MUI 框架
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 引导图列表 | GET | `/api/guide/list?type=1` |
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 学习历史列表（待做）| GET | `/api/history/list` |
| 笔记增删改（待做）| POST / PUT / DELETE | `/api/history/note` |
| 图表三接口（待做）| GET | `data/comment/list_2`、`read/book/list_1`、`read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

### `activity/list`（公益列表）

| 字段 | 含义 |
|---|---|
| `activityName` | 活动名称 |
| `briefIntroduction` | 简介 |
| `imgUrl` | 图片 |
| `startEndTime` | 起止时间 |
| `applyNum` | **报名人数**（本项目列表页还没用）|
| `id` | 活动 id |

### `activity/{id}`（公益详情）

除了上面全部字段，还多：

| 字段 | 含义 |
|---|---|
| `initiator` | **发起人** |
| `overTime` | **报名截止时间** |
| `activityDetail` | **活动详情正文** |

### `history/list`（心得，未做但先记着）

```
rows[i]
 ├─ id / title / content / issueTime
 └─ wstudyNote            ← 笔记对象（可能为 null）
     ├─ noteId            ← ★ 编辑/删除要用这个
     ├─ noteTitle
     ├─ noteContent
     └─ studyHistoryId
```

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

## 📝 待补

### 🔴 主框架缺 2 个页面（会导致点 Tab 报错）

- [ ] 建 `exe/zsg.html`（「增删改」Tab）
- [ ] 建 `exe/sjfx.html`（「数据分析」Tab）→ 需要先引入 `js/echarts.js`

> 💡 临时办法：先把 `page.html` 里这两个 subpage 注释掉，
> 只留「首页 / 报名」两个 Tab，避免点到就崩。

### 🟡 报名模块补齐

- [ ] 列表页显示**报名人数**（`applyNum`）
- [ ] 详情页补齐字段：`activityName` / `initiator` / `startEndTime` / `overTime` / `activityDetail` / `imgUrl`

### 🟢 其他

- [ ] 首页宫格 `name` 去掉 `.html`，改成真实功能名
- [ ] `exe/home.html` 的 `<h1 class="mui-title">标题</h1>` 改成「时代楷模」
- [ ] 各页 `<title>` 完善
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议。

## 📄 License

学习用途，代码可自由参考。
