# MUI 移动端练习项目 · 报名专项

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益活动列表 → 详情 → 报名（加人）**这套完整业务流程，做了 4 套不同写法的练习。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

### 入口与框架

| 页面 | 文件 | 标题 | 说明 |
|---|---|---|---|
| 登录页 | `index.html` | 登录 | 账号密码输入、判空、存 token、跳主框架 |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab（首页 / 功能1 / 功能2 / 功能3）|

### 首页

| 页面 | 文件 | 说明 |
|---|---|---|
| 首页 | `exe/home.html` | 轮播图 + 新闻列表，点「报名」进 `li_1.html` |

### 四套「列表 → 详情 → 报名」练习

| # | 列表页 | 详情页 | 说明 |
|---|---|---|---|
| 1 | `exe/LianxXI01.html` | `exe/GongNEngONeXiangQIng.html` | 功能1（Tab 第 2 个）|
| 2 | `exe/LianxXI02.html` | `exe/GongEnngErXIangQing.html` | 功能2（Tab 第 3 个）|
| 3 | `exe/LianxXI03.html` | `exe/GongNEngSanLianXi.html` | 功能3（Tab 第 4 个）|
| 4 | `exe/li_1.html` | `exe/BaoMingXiangQingLianXi.html` | 报名练习（从首页进）|

> 📌 四套结构一样，**写法略有不同**，可以互相对比哪种更顺。

## 🎯 核心业务：报名流程

```
活动列表页（LianxXI01 / 02 / 03 / li_1）
   │  ① 点击某条活动 → 取 id
   │  ② plus.storage.setItem('xxxID', id)      ← 存到本地存储
   │  ③ mui.openWindow('详情页.html')          ← 跳转
   ▼
活动详情页（GongNEng* / BaoMingXiangQing*）
   │  ④ plus.storage.getItem('xxxID')          ← 读 id
   │  ⑤ 按 id 请求详情 → 显示图片、标题、时间、简介、报名人数
   │  ⑥ 点「报名」→ mui.confirm 确认框
   │  ⑦ 确认 → POST /api/activity/apply
   │  ⑧ 成功后：
   │       · localStorage.setItem('baoming_' + id, '1')   记住「已报名」
   │       · 重新请求详情，更新报名人数
   │       · 通知上一页刷新（currentWebview().opener()）
   ▼
报名人数 +1，按钮变「已报名」✅
```

### 涉及到的 4 个关键点

| 点 | 说明 |
|---|---|
| **跨页传参** | `plus.storage` 存 id + `mui.openWindow` 跳转 |
| **防重复报名** | `localStorage.setItem('baoming_' + id, '1')` 做标记，进页面先查一遍 |
| **报名后刷新人数** | 报名成功后**重新请求详情接口**，用返回的 `applyNum` 更新 |
| **返回父页刷新** | `plus.webview.currentWebview().opener()` 拿到上一页，通知它刷新 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                        登录页（入口）
├── manifest.json                     HBuilderX App 配置
├── exe/                              业务页面
│   ├── page.html                     主框架（底部 4 Tab）
│   ├── home.html                     首页（轮播 + 新闻）
│   ├── li_1.html                     报名练习 · 列表
│   ├── BaoMingXiangQingLianXi.html   报名练习 · 详情
│   ├── LianxXI01.html                功能1 · 列表
│   ├── GongNEngONeXiangQIng.html     功能1 · 详情
│   ├── LianxXI02.html                功能2 · 列表
│   ├── GongEnngErXIangQing.html      功能2 · 详情
│   ├── LianxXI03.html                功能3 · 列表
│   ├── GongNEngSanLianXi.html        功能3 · 详情
│   └── new_file.html                 页面模板
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                       服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js           MUI 框架
├── IMG/                              图片素材（约 8 MB，见下方说明）
└── fonts/
    └── mui.ttf                       MUI 图标字体
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
| 活动列表 | GET | `/api/activity/list` | 4 个列表页都用这个 |
| 活动详情 | GET | `/api/activity/{id}` | 返回 `data`，含 `applyNum`（报名人数）|
| **活动报名** | POST | `/api/activity/apply` | Body：`{ activityId: id }` |

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

## 🐛 已知问题（记录，未修改）

### ❌ 1. 功能1 的 storage key 大小写不一致（**会导致拿不到 id**）

| 位置 | key |
|---|---|
| `exe/LianxXI01.html` **写入** | `bAOmiNGID`（**小写 b**）|
| `exe/GongNEngONeXiangQIng.html` **读取** | `BaoMIngID`（**大写 B**）|

**`localStorage` 的 key 是区分大小写的** → 从功能1 列表点进详情页，**读到的 id 是 `undefined`**。

另外三套（功能2 / 功能3 / 报名练习）的 key 是**完全一致**的，可以正常用。

> ✅ **修法**：把其中一边改成一样即可，建议统一成 `BaoMIngID`。

### ⚠️ 2. `currentWebview().extra` 少了个 `s`

四个详情页写的都是：

```javascript
var extra = plus.webview.currentWebview().extra || {}    // ← extra（单数）
```

但 `mui.openWindow` 传的是 `extras`（**复数**），所以 `extra` 永远是 `undefined`。
现在靠 `plus.storage` 兜着，能用；但**建议改成 `.extras`**。

### ⚠️ 3. 报名接口路径末尾斜杠不统一

| 页面 | 路径 |
|---|---|
| `GongNEngONeXiangQIng.html` | `/api/activity/apply/` ← 带斜杠 |
| `GongNEngSanLianXi.html` | `/api/activity/apply/` ← 带斜杠 |
| `BaoMingXiangQingLianXi.html` | `/api/activity/apply` ← 不带 |
| `GongEnngErXIangQing.html` | `/api/activity/apply` ← 不带 |

**考场以文档为准**，建议统一。

## 📝 练习到的知识点

- [x] 登录（账号密码 + 判空 + localStorage 存 token）
- [x] 底部 Tab + subpages 切换
- [x] 轮播图 + 新闻列表
- [x] 列表渲染（循环拼 HTML → `innerHTML`）
- [x] **跨页传参**（`plus.storage` 存 id + 跳转）
- [x] **报名流程**：确认框 → POST → 刷新人数
- [x] **防重复报名**（localStorage 打标记）
- [x] **返回父页刷新**（`currentWebview().opener()`）
- [x] 图片地址拼接（`httpimg + imgUrl`）

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
