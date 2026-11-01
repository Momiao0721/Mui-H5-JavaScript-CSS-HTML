# 时代楷模练习变种（GongNengLianXiTow）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 时代楷模主题的一个变种练法：**引导页** + 首页 + 公益（列表/详情/报名）+ 心得 + 数据分析。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| **引导页** | `index.html` | — | `guide/list` |
| 登录页 | `DengLu.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| **公益列表** | `exe/gy.html` | 公益 | `activity/list` |
| **公益详情** | `exe/BaoMingYei.html` | 公益详情 | `activity/{id}`、`activity/apply` |
| 心得 | `exe/xd.html` | 心得 | `history/list` |
| **数据分析** | `exe/sjfx.html` | 数据分析 | 三张图表接口 |
| 模板 | `new_file.html` | — | 空白模板 |

## 🎯 功能实现

### 引导页（`index.html`）⭐

本项目最有特色的部分。

| 功能 | 实现 |
|---|---|
| 引导图 | ✅ `guide/list?type=1`，用 `mui-slider` 轮播展示，首尾复制节点 + 圆点指示器 |
| **5 秒倒计时** | ✅ 文字 `5 → 4 → 3 → 2 → 1 → 0` |
| **自动跳转登录页** | ✅ 倒计时结束自动 `mui.openWindow('DengLu.html')` |
| 跳过按钮 | ✅ 手动提前跳转 |

**关键代码**（倒计时的两个坑都避开了）：

```javascript
var c = 5

function WuMiao(){
    document.getElementById('time').innerHTML = c;
    c = c - 1;

    if (c < 0) {                                          // 到 0 → 自动跳
        mui.openWindow({ url: 'DengLu.html', id: 'DengLu' });
        return;
    }

    setTimeout(WuMiao, 1000);                             // 1 秒一步（必须带延时）
}
WuMiao();
```

> ⚠️ **`setTimeout(fn)` 不写第二个参数 = 延时 0 毫秒**，
> 5 次循环会在同一毫秒内跑完，浏览器只画最后一帧 → **看起来数字完全不变**。
> 必须写 `setTimeout(WuMiao, 1000)`。

### 登录页（`DengLu.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 公益 / 心得 / 数据分析**，4 个子页面全部存在 ✅

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点 + 圆点 |
| 新闻列表 | ✅ `model/list`，默认 5 条，点「更新」+5 |
| 宫格入口 | ✅ 3 个（`li_1`~`li_3`）|

### 公益（`exe/gy.html` → `exe/BaoMingYei.html`）

```
gy.html（公益列表，activity/list）
   └─ 点某条 → BaoMingYei.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ `activity/list`，字段 `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` |
| 列表显示报名人数 | ✅ `applyNum` |
| 详情 | ✅ `activity/{id}`，字段 **最全**：`activityName` / **`initiator`（发起人）** / `startEndTime` / `applyNum` / `activityDetail` / `imgUrl` |
| 报名 | ✅ `POST /activity/apply` |
| 跨页传参 | ✅ `plus.storage.setItem('BaoMingID', ...)` |

### 心得（`exe/xd.html`）

| 功能 | 状态 |
|---|---|
| 列表 | ✅ `history/list`，字段 `issueTime` / `title` / `content` |
| **笔记嵌套判断** | ✅ 有 `wstudyNote` 时显示笔记标题内容，无笔记时显示「空」 |
| 按钮渲染 | ✅ 有笔记 → 编辑/删除；无笔记 → 增加 |
| **增删改功能** | ⚠️ **按钮已渲染，但事件和接口还没接完**（见「待补」）|

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
| **引导页倒计时 + 自动跳转** | `index.html` |
| 登录 + token | `DengLu.html` |
| 底部 4 Tab + subpages | `page.html` |
| 轮播图首尾复制循环 | `index.html` / `home.html` |
| 列表分页「+5 条」 | `home.html` |
| **列表 → 详情跨页传参** | `gy.html` → `BaoMingYei.html` |
| **活动报名 POST** | `BaoMingYei.html` |
| **两层嵌套数据（`wstudyNote`）** | `xd.html` |
| echarts 柱 / 折 / 饼 | `sjfx.html` |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（`js/echarts.js`）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage` / `mui.openWindow`
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    引导页（入口，5 秒倒计时）
├── DengLu.html                   登录页
├── manifest.json                 HBuilderX App 配置
├── new_file.html                 空白模板
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 新闻 + 宫格）
│   ├── gy.html                   公益列表
│   ├── BaoMingYei.html           公益详情 + 报名
│   ├── xd.html                   心得
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
| 引导图列表 | GET | `/api/guide/list?type=1` |
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 学习历史列表 | GET | `/api/history/list` |
| **新增笔记** | POST | `/api/history/note` |
| **编辑笔记** | PUT | `/api/history/note` |
| **删除笔记** | DELETE | `/api/history/note?noteId=&studyHistoryId=` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

### `history/list` 的返回是**两层**的

```
rows[i]
 ├─ id              ← 历史 id（也是 studyHistoryId）
 ├─ title           ← 历史标题
 ├─ content         ← 历史内容
 ├─ issueTime       ← 时间
 ├─ userId
 └─ wstudyNote      ← 笔记对象（可能为 null）
     ├─ noteId      ← 笔记 id  ★ 编辑/删除要用这个
     ├─ noteTitle
     ├─ noteContent
     └─ studyHistoryId
```

### 其他字段

| 接口 | 字段 | 说明 |
|---|---|---|
| `guide/list` | `id` / `imgUrl` | 引导图 |
| `building/banner/list` | `id` / `title` / `imgUrl` / `sort` | 轮播 |
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` | 新闻（`name` 是楷模姓名）|
| `activity/list` | `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` | 公益活动 |
| `activity/{id}` | 上面全部 + **`initiator`**（发起人）+ `activityDetail` | 活动详情 |
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

## 📝 待补

### 🔴 心得增删改（最主要的缺口）

`xd.html` 现在**只有列表**，三个按钮已渲染但**没接功能**：

| 问题 | 说明 |
|---|---|
| 属性值写错 | `SanCu-LsID="${data.rows.id}"` → `rows` 是数组，应为 `${row.id}` |
| 少了模板插值 | `SanCU-SanCUID="row.wstudyNote.noteId"` → 少了 `${}`，是字面量字符串 |
| 编辑按钮没带参数 | 需要带上 `noteId` / `noteTitle` / `noteContent` / `studyHistoryId` |
| **取属性用错方法** | 代码里用 `getElementById('SanCu-LsID')`，但这些是**属性名不是 id**，应改用 `this.getAttribute('SanCu-LsID')` |
| 循环里取第一个 | 循环绑定事件时用了 `getElementById`，每次拿到同一个；应用 `this` |
| **没有任何增删改请求** | `history/note` 的 POST / PUT / DELETE **一次都没调** |

**要补的接口**

| 动作 | 方法 | 路径 | 参数 |
|---|---|---|---|
| 增加笔记 | POST | `/api/history/note` | `noteTitle`、`noteContent`、`studyHistoryId`、`noteId` |
| 编辑笔记 | PUT | `/api/history/note` | `noteId`、`noteTitle`、`noteContent` |
| 删除笔记 | DELETE | `/api/history/note?noteId=&studyHistoryId=` | Query 参数 |

### 🟡 其他

- [ ] `home.html` 宫格 3 个名称可改成实际功能名
- [ ] 宫格跳转的 `li_1.html` / `li_2.html` / `li_3.html` 还没建
- [ ] 饼图 formatter 是 `'{b}{d}%'`，建议改成 **`'{b}: {d}%'`**（加个冒号）
- [ ] 登录按钮文字、各页 `<title>` 可完善
- [ ] `new_file.html`（375 B）空模板，可删
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议；
  ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
