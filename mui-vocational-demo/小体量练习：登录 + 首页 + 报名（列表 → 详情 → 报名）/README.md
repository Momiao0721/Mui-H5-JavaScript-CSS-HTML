# 时代楷模 · 练习 001（SDKMlianxi001）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 小体量练习：登录 + 首页 + 报名（列表 → 详情 → 报名）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | 时代楷模练习 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 时代楷模 | `building/banner/list`、`model/list` |
| **练习二 · 报名列表** | `exe/LianXiTou.html` | 练习二 | `activity/list` |
| **练习二 · 报名页** | `exe/LianXiTouXiangQing.html` | 报名页 | `activity/{id}`、`activity/apply` |

## 🎯 功能实现

### 登录页（`index.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 练习1 / 练习2 / 练习3**

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点实现无限循环 + 圆点指示器 |
| 新闻列表 | ✅ `model/list` |

### 练习二 · 报名（`exe/LianXiTou.html` → `exe/LianXiTouXiangQing.html`）

```
LianXiTou.html（报名列表，activity/list）
   └─ 点某条 → LianXiTouXiangQing.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ `activity/list` |
| 跨页传参 | ✅ `plus.storage` 存 id + `mui.openWindow` |
| 详情 | ✅ `activity/{id}` |
| 报名 | ✅ `POST /activity/apply` |

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| 登录 + token | `index.html` |
| 底部 4 Tab + subpages | `page.html` |
| 轮播图首尾复制循环 | `home.html` |
| 列表渲染 | `home.html` / `LianXiTou.html` |
| **跨页传参** | `LianXiTou.html` → `LianXiTouXiangQing.html` |
| **活动报名 POST** | `LianXiTouXiangQing.html` |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage`
- 打包：HBuilderX

> 📌 本项目**没有引入 ECharts**，所以不含数据分析页面。

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 新闻列表）
│   ├── LianXiTou.html            练习二 · 报名列表
│   └── LianXiTouXiangQing.html   练习二 · 报名页
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
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

**字段名注意**

| 接口 | 字段 | 说明 |
|---|---|---|
| `building/banner/list` | `id` / `title` / `imgUrl` / `sort` | 轮播 |
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` | 新闻（`name` 是楷模姓名）|
| `activity/list` | `activityName` / `briefIntroduction` / `imgUrl` / `startEndTime` / `applyNum` | 公益活动 |

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

- [ ] **`exe/LianXiOne.html`（练习1）不存在** —— `page.html` 声明了它，点该 Tab 会报错
- [ ] **`exe/LianXiSan.html`（练习3）不存在** —— 点该 Tab 会报错
- [ ] 只有「练习2」做了完整的报名流程，练习1 / 练习3 可以照同样的结构补
- [ ] 登录页确认有 `JSON.stringify`（`Content-Type: application/json` 时必须）
- [ ] 各页面 `<title>` 为空
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议。

## 📄 License

学习用途，代码可自由参考。
