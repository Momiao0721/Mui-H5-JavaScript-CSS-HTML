# 时代楷模 · 复习练习集（home / 报名 / 数据分析）

> 中职移动应用与开发赛项备赛复习项目，基于 DCloud MUI 框架。
> 同一个功能写了**多套版本**用来对比练习：3 套报名、3 套数据分析。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面总览（11 个页面）

### 登录 + 主框架

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | 时代楷模练习 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |

**底部 Tab：首页 / 练习1 / 练习2 / 练习3**

### 首页

| 页面 | 文件 | 接口 |
|---|---|---|
| 首页 | `exe/home.html` | `building/banner/list`、`model/list` |

首页里另有 3 个宫格入口，分别跳 `li_1` / `li_2` / `li_3`。

### 3 套「报名」练习

| 套 | 列表页 | 详情页 | 接口 |
|---|---|---|---|
| 练习1 | `exe/LianXiOne.html` | `exe/LianXiOneXiangQing.html` | `activity/list` → `activity/{id}` + `activity/apply` |
| 练习2 | `exe/LianXiTou.html` | `exe/LianXiTouXiangQing.html` | 同上 |
| 练习3 | `exe/li_3.html` | `exe/BaoMingListSan.html` | 同上 |

### 3 套「数据分析」练习

| 套 | 文件 | 标题 | 接口 |
|---|---|---|---|
| 练习3 | `exe/LianXiSan.html` | 数据分析 | 三张图 |
| 宫格1 | `exe/li_1.html` | 数据分析练习 | 三张图 |
| 宫格2 | `exe/li_2.html` | 练习 | 三张图 |

三图接口（三套都一样）：

| 图表 | 接口 | 字段 |
|---|---|---|
| 条形图 | `/api/data/comment/list_2` | `name`（月份）/ `woman` / `man` |
| 折线图 | `/api/read/book/list_1` | `name`（月份）/ `value` |
| 饼状图 | `/api/read/book/list/type_1` | `name`（类型）/ `count`（数量）|

## 🎯 这套复习练到了什么

| 技能 | 出现次数 | 位置 |
|---|:---:|---|
| 登录 + token | 1 | `index.html` |
| 底部 4 Tab + subpages | 1 | `page.html` |
| 轮播图首尾复制循环 | 1 | `home.html` |
| 新闻列表 | 1 | `home.html` |
| 宫格入口 | 1 | `home.html` |
| **报名列表 → 详情跨页传参** | **3 套** | `LianXiOne` / `LianXiTou` / `li_3` |
| **活动报名 POST** | **3 套** | 各详情页 |
| **echarts 柱 / 折 / 饼** | **3 套** | `LianXiSan` / `li_1` / `li_2` |
| 手动组装饼图数据 | 3 套 | `{name, value}` |

> 💡 **同一个功能重复写 3 遍**是很有效的肌肉记忆训练 —— 第 3 遍基本可以默写了。

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
├── exe/                              业务页面（11 个）
│   ├── page.html                     主框架（底部 4 Tab）
│   ├── home.html                     首页
│   ├── ── 报名练习 1 ──
│   ├── LianXiOne.html                练习1 · 列表
│   ├── LianXiOneXiangQing.html       练习1 · 详情 + 报名
│   ├── ── 报名练习 2 ──
│   ├── LianXiTou.html                练习2 · 列表
│   ├── LianXiTouXiangQing.html       练习2 · 详情 + 报名
│   ├── ── 报名练习 3 ──
│   ├── li_3.html                     练习3 · 列表
│   ├── BaoMingListSan.html           练习3 · 详情 + 报名
│   ├── ── 数据分析练习 ──
│   ├── LianXiSan.html                数据分析（三图）
│   ├── li_1.html                     数据分析练习（三图）
│   └── li_2.html                     练习（三图）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                       服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js           MUI 框架
│   └── echarts.js                    图表库
└── fonts/
    └── mui.ttf                       MUI 图标字体
```

> 📌 本项目**没有本地图片目录**，图片全部走接口返回的地址。

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

**字段名注意**

| 接口 | 字段 | 说明 |
|---|---|---|
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

## 📝 可以整理的地方

- [ ] **页面命名建议统一**：`LianXiOne` / `LianXiTou` / `li_3` 三套命名风格不一致
      （有拼音、有英文、有 li_N），建议改成 `BaoMing1` / `BaoMing2` / `BaoMing3`
- [ ] `home.html` 里的 Tab 是「首页 / 电话 / 邮件 / 设置」——这是 **MUI 模板自带的示例 Tab**，
      和当前业务无关，可删掉
- [ ] 各页 `<title>` 和 `<h1 class="mui-title">` 多为「练习1」「练习2」等占位名
- [ ] 登录页记得确认 **`JSON.stringify`**（`Content-Type: application/json` 时必须）
- [ ] 饼图 `formatter` 建议统一成 **`'{b}: {d}%'`**（名称 + 比例）
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习复习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/)；ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
