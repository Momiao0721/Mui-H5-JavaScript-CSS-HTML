# 时代楷模 App · 练习七（LianXiSDKMSan）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 覆盖：**引导页** + 登录 + 首页 + 公益（列表 / 详情 / 报名）+ 心得 + 数据分析三图。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 🚨 先看这个：心得页抓的是「公益」接口

`exe/xd.html`（心得）和 `exe/XingDeXiangqing.html`（心得详情）**调错了接口**：

| 页面 | 现在调的接口 | 应该调的接口 |
|---|---|---|
| `exe/xd.html`（心得列表）| ❌ `activity/list`（公益）| ✅ `history/list` |
| `exe/XingDeXiangqing.html`（心得详情）| ❌ `activity/{id}` + `activity/apply` | ✅ 心得详情 / `history/note` |

**证据**：`xd.html` 里读的字段是

```
activityName / applyNum / briefIntroduction / id / imgUrl / startEndTime
```

**全是公益活动字段**，一个心得字段都没有。

`XingDeXiangqing.html` 里插值也是：

```
data.data.activityDetail / activityName / applyNum / initiator / startEndTime / imgUrl
```

**也是公益详情字段**，而且还在调 `activity/apply`（报名接口）。

> ⚠️ **后果**：点「心得」Tab 看到的是**公益活动列表**；点进去看到的是**公益详情**，还能点「报名」。
> 心得功能实际上没做。

### 正确的接口和字段

```
GET /api/history/list            ← 心得列表
  rows[i]
   ├─ id / title / content / issueTime
   └─ wstudyNote                 ← 笔记对象（可能为 null）
       ├─ noteId
       ├─ noteTitle
       ├─ noteContent
       └─ studyHistoryId
```

> 💡 顺带一提：`exe/li_3.html` 里**用的是对的**（`history/list` + `wstudyNote` + `noteContent`），
> 可以把那段代码搬到 `xd.html` 用。

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| **引导页** | `index.html` | — | `guide/list` |
| 登录页 | `BaoMingYe.html` | 登录页 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| **公益列表** | `exe/gy.html` | 公益 | `activity/list` |
| **公益详情** | `exe/BaoMingXiangQing.html` | 公益详情 | `activity/{id}`、`activity/apply` |
| ❌ 心得 | `exe/xd.html` | 心得 | **`activity/list`（错）** |
| ❌ 心得详情 | `exe/XingDeXiangqing.html` | 心得详情 | **`activity/{id}` + `activity/apply`（错）** |
| **数据分析** | `exe/sjfx.html` | 数据分析 | 三张图表接口 |

### 练习 / 备用页面

| 文件 | 说明 |
|---|---|
| `exe/li_1.html` | 公益列表的另一个版本（→ `LianXiSan.html`）|
| `exe/LianXiSan.html` | 详情页（`activity/{id}` + 报名）|
| `exe/li_2.html` | 数据分析三图（副本）|
| `exe/li_3.html` | ✅ **`history/list` 练习页（接口用对了）** |
| `exe/GongYiHTML.html` | 公益详情的另一个版本（`activity/{id}`）|
| `exe/new_file.html` | 空白模板（375 B，可删）|

> ✅ 4 个 Tab 的子页面文件**都存在**，不会点出白页 —— 只是「心得」内容不对。

---

## 🎯 功能实现

### 引导页（`index.html`）✅

| 功能 | 实现 |
|---|---|
| 引导图轮播 | ✅ `guide/list`，`mui-slider` 自动播放（`interval: 3000`）|
| **5 秒倒计时** | ✅ `setTimeout(WuMiao, 1000)` |
| **倒计时结束自动跳登录页** | ✅ `if (c < 0) { mui.openWindow('BaoMingYe.html') }` |
| 跳过按钮 | ✅ `TiaoGuo` 手动提前跳转 |

```javascript
var c = 5

function WuMiao(){
    document.getElementById('time').innerHTML = c;
    c = c - 1;

    if (c < 0) {                                     // 到 0 → 自动跳
        mui.openWindow({ url: 'BaoMingYe.html', id: 'BaoMingYe' });
        return;
    }
    setTimeout(WuMiao, 1000);                        // ★ 必须带延时
}
WuMiao();
```

> 💡 **两个坑都避开了**：延时参数写了、到点自动跳了。

### 登录页（`BaoMingYe.html`）

- 账号 / 密码输入 + 「登录」按钮
- `POST /api/login` → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 公益 / 心得 / 数据分析**

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点 + 圆点 |
| 新闻列表 | ✅ `model/list`，字段 `title` / `content` / `imgUrl` |
| 列表分页 | ✅ `kmlbWuTiao = 5`，点「更新」`+= 5` |
| 宫格入口 | ⚠️ 3 个，`name` 是占位 `li_1`~`li_3`，跳 `li_1.html` / `li_2.html` / `li_3.html` |

### 公益（`exe/gy.html` → `exe/BaoMingXiangQing.html`）

```
gy.html（公益列表，activity/list）
   └─ 点某条 → BaoMingXiangQing.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ 6 个字段：`activityName` / `applyNum` / `briefIntroduction` / `id` / `imgUrl` / `startEndTime` |
| 列表显示报名人数 | ✅ `applyNum` |
| 详情 | ✅ `activity/{id}`，插值含 `activityName` / `initiator` / `startEndTime` / `activityDetail` / `imgUrl` / `applyNum` |
| 报名 | ✅ `POST /activity/apply` |
| **防重复报名** | ✅ `${BaoMimg ? 'mui-disabled' : ''}` |
| 跨页传参 | ✅ |

> 💡 公益这块做得挺完整（字段全 + 防重复报名）。

### 数据分析（`exe/sjfx.html`）✅

| 图表 | 接口 | 说明 |
|---|---|---|
| **条形图** | `/api/data/comment/list_2` | `name`（月份）/ `woman` / `man` 双系列 |
| **折线图** | `/api/read/book/list_1` | `name`（月份）/ `value` |
| **饼状图** | `/api/read/book/list/type_1` | `name` / `count` → 组装 `{name, value}` |

## 🎯 练到的知识点

| 技能 | 位置 | 状态 |
|---|---|:---:|
| **引导页倒计时 + 自动跳转** | `index.html` | ✅ |
| 登录 + token | `BaoMingYe.html` | ✅ |
| 底部 4 Tab + subpages | `page.html` | ✅ |
| 轮播图首尾复制循环 | `home.html` | ✅ |
| 列表分页「+5 条」 | `home.html` | ✅ |
| 跨页传参 | `gy.html` → `BaoMingXiangQing.html` | ✅ |
| **活动报名 POST + 防重复** | `BaoMingXiangQing.html` | ✅ |
| echarts 柱 / 折 / 饼 | `sjfx.html`、`li_2.html` | ✅ |
| **心得列表（`history/list`）** | `li_3.html` | ✅ 但没接到 Tab |
| 心得嵌套读取（`wstudyNote`） | `li_3.html` | ⚠️ 部分 |
| **心得增删改** | — | ❌ 未做 |
| 心得页接对接口 | `xd.html` | ❌ 用了 `activity/list` |

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
├── BaoMingYe.html                登录页
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页
│   ├── gy.html                   公益列表
│   ├── BaoMingXiangQing.html     公益详情 + 报名
│   ├── sjfx.html                 数据分析（三图）
│   ├── xd.html                   心得（❌ 接口用错）
│   ├── XingDeXiangqing.html      心得详情（❌ 接口用错）
│   ├── li_1.html                 公益列表（另一版）
│   ├── LianXiSan.html            详情页（另一版）
│   ├── li_2.html                 数据分析（副本）
│   ├── li_3.html                 心得练习（✅ 接口对的）
│   ├── GongYiHTML.html           公益详情（另一版）
│   └── new_file.html             空白模板
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
│   └── echarts.js                图表库
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🔌 接口清单

| 功能 | 方法 | 路径 | 本项目状态 |
|---|---|---|:---:|
| 引导图列表 | GET | `/api/guide/list?type=1` | ✅ |
| 登录 | POST | `/api/login` | ✅ |
| 首页轮播 | GET | `/api/building/banner/list` | ✅ |
| 热点新闻列表 | GET | `/api/model/list` | ✅ |
| 公益活动列表 | GET | `/api/activity/list` | ✅ |
| 公益活动详情 | GET | `/api/activity/{id}` | ✅ |
| **活动报名** | POST | `/api/activity/apply` | ✅ |
| **学习历史列表** | GET | `/api/history/list` | ❌ 心得页没用 |
| 新增笔记 | POST | `/api/history/note` | ❌ 未做 |
| 编辑笔记 | PUT | `/api/history/note` | ❌ 未做 |
| 删除笔记 | DELETE | `/api/history/note?noteId=&studyHistoryId=` | ❌ 未做 |
| 图表·条形 | GET | `/api/data/comment/list_2` | ✅ |
| 图表·折线 | GET | `/api/read/book/list_1` | ✅ |
| 图表·饼图 | GET | `/api/read/book/list/type_1` | ✅ |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

### `history/list` 是**两层**结构

```
rows[i]
 ├─ id              ← 历史 id（也是 studyHistoryId）
 ├─ title / content / issueTime
 └─ wstudyNote      ← 笔记对象（可能为 null）
     ├─ noteId      ← ★ 编辑/删除要用这个
     ├─ noteTitle
     ├─ noteContent
     └─ studyHistoryId
```

> ⚠️ **`noteId` 要从 `wstudyNote` 里取，不是 `rows[i].id`。**

### 其他字段

| 接口 | 字段 |
|---|---|
| `building/banner/list` | `id` / `title` / `imgUrl` / `sort` |
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` |
| `activity/list` | `activityName` / `applyNum` / `briefIntroduction` / `id` / `imgUrl` / `startEndTime` |
| `activity/{id}` | 上面全部 + `initiator`（发起人）/ `overTime`（截止）/ `activityDetail`（正文）|
| `data/comment/list_2` | `name` / `woman` / `man` |
| `read/book/list_1` | `name` / `value` |
| `read/book/list/type_1` | `name` / `count` / `data` |

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

### 🔴 P0：心得页换回正确接口

- [ ] `exe/xd.html`：`activity/list` → **`history/list`**
- [ ] `exe/xd.html`：渲染字段换成 `title` / `content` / `issueTime` / `wstudyNote`
- [ ] `exe/XingDeXiangqing.html`：`activity/{id}` + `activity/apply` → 改成心得详情逻辑
- [ ] 参考 `exe/li_3.html` 里已经用对的写法

### 🟡 P1：心得增删改

| 动作 | 方法 | 参数 |
|---|---|---|
| 增加 | POST `/api/history/note` | `noteTitle`、`noteContent`、`studyHistoryId`、`noteId` |
| 编辑 | PUT `/api/history/note` | `noteId`、`noteTitle`、`noteContent` |
| 删除 | DELETE `/api/history/note?noteId=&studyHistoryId=` | Query |

### 🟢 P2：整理

- [ ] 首页宫格 `name` 改成真实功能名（现在带 `.html`）
- [ ] `home.html` 标题「标题」改成「时代楷模」
- [ ] 删除重复文件：`li_1.html` / `li_2.html` / `LianXiSan.html` / `GongYiHTML.html` / `new_file.html`
      （功能已覆盖，留着容易混淆）
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议；
  ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
