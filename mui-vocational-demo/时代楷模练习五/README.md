# 时代楷模 App · 练习五（LianXiWu）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 覆盖：**引导页** + 登录 + 首页 + 公益（列表 / 详情 / 报名）+ 心得 + 数据分析（三图）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| **引导页** | `index.html` | — | `guide/list` |
| 登录页 | `DengLu.html` | — | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 主框架（副本）| `exe.html` | — | 与 `exe/page.html` 重复，可删 |
| 首页 | `exe/home.html` | 时代楷模 | `building/banner/list`、`model/list` |
| **公益列表** | `exe/gy.html` | 公益 | `activity/list` |
| **公益详情** | `exe/GongYiXiangQing.html` | 详情页 | `activity/{id}`、`activity/apply` |
| 心得 | `exe/xd.html` | 心得 | `history/list`、`DELETE /history/note` |
| **数据分析** | `exe/sjfx.html` | 数据分析 | 三张图表接口 |
| 空白页 | `exe/li_1.html` / `exe/li_3.html` | — | 空壳 |
| 操作表练习 | `exe/li_2.html` | — | action sheet 练习，与业务无关 |

## 🎯 功能实现

### 引导页（`index.html`）⭐

| 功能 | 实现 |
|---|---|
| 引导图 | ✅ `guide/list?type=1`，`mui-slider` 轮播 + 圆点指示器 |
| **5 秒倒计时** | ✅ `setTimeout(WuMiao, 1000)` 每秒走一步 |
| **倒计时结束自动跳登录页** | ✅ `if (c < 0) { mui.openWindow('DengLu.html') }` |
| 跳过按钮 | ✅ 手动提前跳转 |

```javascript
var c = 5

function WuMiao(){
    document.getElementById('time').innerHTML = c;
    c = c - 1;

    if (c < 0) {                                    // 到 0 → 自动跳
        mui.openWindow({ url: 'DengLu.html', id: 'DengLu' });
        return;
    }
    setTimeout(WuMiao, 1000);                       // 1 秒一步（必须带延时）
}
WuMiao();
```

> ⚠️ **`setTimeout(fn)` 不写第二个参数 = 延时 0 毫秒**，
> 5 次循环会在同一毫秒跑完，人眼只看到最后一帧 → **看起来数字完全不变**。
> 必须写 `setTimeout(WuMiao, 1000)`。

### 登录页（`DengLu.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 心得 / 公益 / 数据分析**，子页面全部存在 ✅

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点实现无限循环 + 圆点 |
| 新闻列表 | ✅ `model/list`，默认 5 条，点「更新」+5 |
| 新闻字段 | `title`（标题）/ `name` / `content` / `imgUrl` |
| 宫格入口 | ✅ 3 个（`mui-col-xs-4`，每行 3 个）|

### 公益（`exe/gy.html` → `exe/GongYiXiangQing.html`）

```
gy.html（公益列表，activity/list）
   └─ 点某条 → GongYiXiangQing.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ 6 个字段全：`activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` / `id` |
| 列表显示报名人数 | ✅ `applyNum` |
| **详情** | ✅ **7 个字段**：`activityName` / `startEndTime` / **`initiator`（发起人）** / **`overTime`（截止时间）** / `activityDetail` / `imgUrl` / `applyNum` |
| 报名 | ✅ `POST /activity/apply` |
| **防重复报名** | ✅ 已报名按钮置灰：`${BaoMing ? 'mui-disabled' : ''}` |
| 报名后刷新详情 | ✅ 重新请求 `activity/{id}` |

> 💡 详情页写法很干净：先 `var XiangQing = data.data`，再用 `${XiangQing.activityName}`。

### 心得（`exe/xd.html`）

| 功能 | 状态 |
|---|---|
| 列表 | ✅ `history/list`，字段 `title` / `issueTime` / `content` |
| 笔记嵌套判断 | ✅ `wstudyNote` 有则显示笔记，无则显示「没有内容」 |
| **删除** | ✅ `DELETE /history/note` + `mui.confirm` + `SanSSSSSCu()` 刷新 |
| **编辑（PUT）** | ⚠️ **未做** |
| **增加（POST）** | ⚠️ **未做** |

### 数据分析（`exe/sjfx.html`）

| 图表 | 接口 | 说明 |
|---|---|---|
| **条形图** | `/api/data/comment/list_2` | `name`（月份）/ `woman` / `man` 双系列，legend「女性/男性评论数统计」|
| **折线图** | `/api/read/book/list_1` | `name`（月份）/ `value` |
| **饼状图** | `/api/read/book/list/type_1` | `name` / `count` → 组装 `{name, value}` |

饼图 label：`formatter: '{b}:{d}%'` ✅（名称 + 比例）

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| **引导页倒计时 + 自动跳转** | `index.html` |
| 登录 + token | `DengLu.html` |
| 底部 4 Tab + subpages | `page.html` |
| 轮播图首尾复制循环 | `index.html` / `home.html` |
| 列表分页「+5 条」 | `home.html` |
| 跨页传参（`plus.storage`）| `gy.html` → `GongYiXiangQing.html` |
| **活动报名 POST + 防重复** | `GongYiXiangQing.html` |
| **两层嵌套数据（`wstudyNote`）** | `xd.html` |
| **删除 + confirm + 刷新** | `xd.html` |
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
├── exe.html                      主框架副本（与 exe/page.html 重复）
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页
│   ├── gy.html                   公益列表
│   ├── GongYiXiangQing.html      公益详情 + 报名
│   ├── xd.html                   心得
│   ├── sjfx.html                 数据分析（三图）
│   ├── li_1.html / li_3.html     空壳
│   └── li_2.html                 action sheet 练习
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
| **删除笔记** | DELETE | `/api/history/note` |
| **新增笔记**（待补）| POST | `/api/history/note` |
| **编辑笔记**（待补）| PUT | `/api/history/note` |
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
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` | 新闻 |
| `activity/list` | `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` | 公益活动 |
| `activity/{id}` | 上面全部 + `initiator`（发起人）+ `overTime`（截止）+ `activityDetail` | 活动详情 |
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

## 📝 待补 / 可优化

### 🔴 心得增删改（最主要缺口）

| 动作 | 方法 | 路径 | 参数 |
|---|---|---|---|
| 增加笔记 | POST | `/api/history/note` | `noteTitle`、`noteContent`、`studyHistoryId`、`noteId` |
| 编辑笔记 | PUT | `/api/history/note` | `noteId`、`noteTitle`、`noteContent` |

> 现有代码已有：列表刷新函数 `SanSSSSSCu()`、`noteId`/`noteTitle` 取值、`mui.confirm`。
> 补两个按钮 + 两个 ajax 即可。

### 🟡 从详情页返回列表不刷新

**现象**：详情页报名成功 → 返回列表 → 报名人数还是旧的，要点「更新」才变。

**原因**：返回时列表页只是「重新显示」，不会重新请求数据。

**修法 A（推荐）**：详情页 `beforeback` 通知列表页

```javascript
// GongYiXiangQing.html
mui.init({
    beforeback: function () {
        var opener = plus.webview.currentWebview().opener();
        if (opener) { mui.fire(opener, 'refresh'); }
        return true;                       // ★ 必须 true
    }
})

// gy.html
window.addEventListener('refresh', function () { gongYi(); })
```

**修法 B（更短）**：列表页监听 `show`

```javascript
plus.webview.currentWebview().addEventListener('show', function () {
    gongYi();
})
```

### 🟢 其他

- [ ] `exe/page.html` 和 `exe.html` **内容重复**（两个 4 Tab 主框架），建议删一个
- [ ] `exe/li_1.html` / `exe/li_3.html` 是空壳（627 B）
- [ ] `exe/li_2.html` 是 action sheet 练习页，与业务无关，可移走
- [ ] 删除笔记用 `data:{}` 传参（文档要求 Query：`?noteId=&studyHistoryId=`），
      实测能成功，但考场建议改成 URL 拼接更稳
- [ ] 登录页可加 `JSON.stringify`（`Content-Type: application/json` 时）
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议；
  ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
