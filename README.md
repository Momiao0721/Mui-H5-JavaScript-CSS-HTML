# MUI 移动端练习项目集

> 中职移动应用与开发赛项练习项目，基于 **DCloud MUI** 框架开发。
> Exercise projects for the Vocational Mobile Application Development Competition, built with the DCloud MUI framework.

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📖 这个仓库是什么

2026 山西省第二十届职业院校技能大赛（中职组）**移动应用与开发赛项**的备赛练习记录。

所有项目都是原生 **HTML5 + CSS3 + JavaScript** + **MUI 3.7.3** + **HBuilderX** 开发，
不依赖构建工具，用 HBuilderX 直接打开即可运行。

**主题覆盖**（都是赛项常见题材）：

| 主题 | 说明 |
|---|---|
| **时代楷模** | 楷模新闻、英雄列表、学习心得、公益活动、数据分析 |
| **智慧健康** | 智慧养老、免密登录、忘记密码、隐私协议 |
| **数字社区** | 社区首页、友邻社交、社区公告、物业缴费 |
| **数字生活** | 生活服务、轮播图、列表详情 |

---

## 📂 目录结构

```
.
├── LianXi/                    跨页传参专项练习（11 个页面）
├── mui-vocational-demo/       各类专项练习合集（14 个子项目）
├── 新版时代楷模/                时代楷模完整项目（9 个页面）
├── 智慧健康/                   智慧健康完整项目（12 个页面）
└── .gitignore
```

---

## 1️⃣ `LianXi/` —— 跨页传参专项

专门练「列表 → 详情」的数据传递，同一个功能写了多遍加强记忆。

| 文件 | 说明 |
|---|---|
| `index.html` | 登录页（入口） |
| `exe/page.html` | 主框架 |
| `exe/LianXi1~4.html` | 4 个列表页 |
| `exe/LianXi1XiangQheng.html`<br>`exe/LianXi1XiangQheng1.html` | 列表 1 的详情页（两个版本） |
| `exe/XingQingYei3.html`<br>`exe/XiangQungYeii2.html`<br>`exe/XingQingYei4.html` | 其余详情页 |
| `exe/exe.html`、`exe/new_file.html` | 页面模板 |

**练到的点**：`mui.openWindow({extras})` 传参 · `plus.webview.currentWebview().extras` 接收 · `plus.storage` 兜底 · `mui.fire` 返回刷新

---

## 2️⃣ `新版时代楷模/` —— 时代楷模完整项目

赛项经典题材，页面最完整的一个。

| 页面 | 文件 | 功能 |
|---|---|---|
| 登录页 | `index.html` | 账号密码登录、存 token |
| 主框架 | `exe/page.html` | 底部 Tab + subpages |
| 首页 | `exe/home.html` | 轮播图 + 新闻列表（分页 +5） |
| 学习心得 | `exe/xd.html` | 心得列表 |
| 活动报名 | `exe/BaoMingXiangQing.html` | 公益项目列表 |
| 报名详情 | `exe/BaoMIngXiangQingHTML.html` | 报名表单 |
| 参观详情 | `exe/CaiKanXiangQing.html` | 项目详情 |
| 我的信息 | `exe/WoDeXiangXi.html` | 个人中心 |
| 数据分析 | `exe/sjfx.html` | echarts 柱 / 折 / 饼 三图 |
| 设置 | `exe/SeiZhi.html` | 设置页 |

**看点**：轮播图首尾复制实现无限循环、三张 echarts 图表、跨页传参双保险

---

## 3️⃣ `智慧健康/` —— 智慧健康项目

登录流程做得最细的一个，把「各种登录方式」都做了一遍。

| 页面 | 文件 | 功能 |
|---|---|---|
| 登录主页 | `index.html` | 账号密码登录 |
| 免密登录 | `MianMiDengLu.html` | 手机验证码登录 |
| 免密登录协议 | `MianMiDengLuuu.html` | 协议页 |
| 忘记密码 | `WangJiMiMai.html` | 找回密码 |
| 用户隐私协议 | `YongHuYingSiXieYi.html` | 隐私政策 |
| 主框架 | `exe/page.html` | 底部 Tab |
| 首页 | `exe/home.html` | 轮播 + 列表 |
| 我的 | `exe/wd.html` | 个人中心 |
| 搜索 | `exe/BaiDuKuang.html` | 搜索框页 |
| 详情 | `exe/XiangQingYei.html` | 详情页 |
| 数据分析 | `exe/sjfx.html` | echarts 三图 |

**看点**：多入口登录体系的组织方式、协议页跳转

---

## 4️⃣ `mui-vocational-demo/` —— 专项练习合集

按「一个功能一个项目」拆开的练习包，方便单独跑、单独对照。

| 子项目 | 练什么 |
|---|---|
| `MUI Carousel Practice（MUI 轮播图练习）LBT` | 轮播图：首尾复制节点实现无限循环 + 圆点指示器 |
| `MUI-Data analysis-数据分析` | echarts 柱状图 / 折线图 / 饼图 三件套 |
| `MUI-Form-表单` | 表单页 + 增删改（CRUD） |
| `mui-vacational-home-sidelist(首页及左右布局的列表)-266108` | 首页 + 左右布局列表 |
| `mui-signup-feature(练习一)` | 报名功能：列表 → 详情 → 提交 |
| `mui-signup-feature（跳转详情页）` 系列 ×4 版 | 报名 + 跳转详情，4 个迭代版本 |
| `dome0.1` | 时代楷模初版（登录 / 首页 / 公益 / 心得） |
| `时代楷模0.3` | 时代楷模完整版（19 个页面） |
| `SDKM` / `SDKM-Full` | 时代楷模限时练习（首页 / 心得增改 / 公益报名 / 数据分析） |
| `复习01` | 复习题：**3 套报名** + **3 套数据分析** 对照练习 |

> 💡 **`mui-signup-feature` 有 5 个版本**，是同一个「报名 + 跳详情」功能的迭代记录，
> 从最基础到加上防重复报名、返回刷新等细节，适合对比学习。

---

## 🛠 技术栈

| 类别 | 内容 |
|---|---|
| **基础** | HTML5 / CSS3 / JavaScript（原生 ES5 为主） |
| **UI 框架** | [MUI](https://www.dcloud.io/mui.html) 3.7.3（DCloud） |
| **图表** | ECharts（柱状图 / 折线图 / 饼图） |
| **网络** | `mui.ajax` + `Authorization: token` |
| **原生能力** | HTML5+：`plus.webview` / `plus.storage` / `plus.nativeUI` |
| **开发工具** | HBuilderX |
| **打包** | HBuilderX 云打包 / 本地打包（release APK） |

---

## 🎯 已练到的知识点

-  **登录**：判空校验、`POST /login`、`localStorage` 存 token、跳转主框架
-  **底部导航**：`mui.init({subpages})` + `plus.webview.getWebviewById().show()`
      （MUI 自动处理 `.mui-tab-item` 的 `mui-active` 高亮，无需手写）
- **轮播图**：首尾复制节点实现无限循环、圆点指示器、自动播放
- **宫格布局**：`mui-grid-view mui-grid-9` + `mui-col-xs-4`（每行 3 个）
- **列表渲染**：循环拼 HTML → 一次性写入 `innerHTML`
- **列表分页**：「查看更多」每次 +5 条
- **跨页传参**：`extras` + `plus.storage` 双保险
- **返回刷新**：`beforeback` + `mui.fire(opener, 'refresh')`
- **增删改**：表单页 + `POST` / `PUT` / `DELETE`
- **报名功能**：确认框 → `POST /apply` → 重新请求刷新人数 → 防重复报名
- **ECharts 三图**：柱状图双系列、折线图、饼图（手动组装 `{name, value}`）
- **图片地址拼接**：接口返回相对路径 + `httpimg` 拼完整 URL

---

## 🚀 怎么跑起来

### 1. 打开项目

用 **HBuilderX** 打开**某一个子项目文件夹**（不要打开整个仓库），
例如：

```
HBuilderX → 文件 → 打开目录 → 选择 新版时代楷模/
```

### 2. 配置服务器地址

每个项目的服务器地址都在 `js/http.js` 里，**需要自己填**：

```javascript
var http    = 'http://YOUR_SERVER_HOST:PORT';            // 调接口（不带 /prod-api）
var httpimg = 'http://YOUR_SERVER_HOST:PORT/prod-api';   // 显示图片（带 /prod-api）
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
> - `http` —— 只用来**调接口**，末尾**不带** `/prod-api`，也**不带** `/`
> - `httpimg` —— 只用来**显示图片**，末尾**带** `/prod-api`，且**不要再加 `/`**
>
> 因为接口返回的图片字段（如 `/profile/p1.jpg`）本身以 `/` 开头，
> 两边都带斜杠会拼成 `//profile/p1.jpg`，图片就加载不出来。

### 3. 运行

HBuilderX →「运行」→「运行到手机或模拟器」

> 底部 Tab、轮播等依赖 HTML5+ 的能力需要**真机或模拟器**，浏览器里跑不完全。

### 4. 接口返回格式

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

`code == 200` 表示成功。需要认证的接口带请求头：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

---

## 📌 关于接口

本仓库**不包含任何接口文档**，也不含任何真实服务器地址。

- 各项目里的接口路径是**脱敏后的相对路径**（如 `/api/login`、`/api/activity/list`）
- 实际比赛/练习时，路径以**现场发放的接口文档**为准
- 想跑起来需要自己准备后端服务，或对接你练习用的模拟接口

---

## ⚠️ 说明

- 本仓库为**个人学习练习记录**，代码以「能跑通、看得懂」为主，**非生产级代码**。
- 部分项目是同一个功能的**多个迭代版本**，保留历史版本用于对比学习，不代表最终水平。
- **图片素材版权归原作者所有**，仅作学习用途，**不做任何商业用途**。
  如涉及侵权请联系删除。
- 仓库内**不含**任何赛项原始资料、官方文档或选手个人信息。
- **MUI 框架**版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议，
  已保留原版权声明。
- **ECharts** 版权归 Apache 基金会所有。

---

## 📄 License

**代码部分**：学习用途，可自由参考。

**框架与第三方库**：遵循各自开源协议（MUI - MIT，ECharts - Apache 2.0）。

**图片素材**：**不适用**，版权归原作者，请勿二次分发。

---

<div align="center">

如果这些练习对你有帮助，给个 ⭐ 吧～

</div>
