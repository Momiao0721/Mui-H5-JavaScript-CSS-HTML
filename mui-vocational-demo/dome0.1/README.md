# MUI 移动端练习项目 · dome0.1

> 个人练习 Demo —— 中职移动应用与开发赛项（时代楷模主题）备赛练习，
> 基于 DCloud MUI 框架开发。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 状态 | 说明 |
|---|---|:---:|---|
| 登录页 | `index.html` | ✅ | 账号密码输入、非空校验、`localStorage` 存 token、跳转主框架 |
| 主框架 | `exe/page.html` | ✅ | 底部 4 个 Tab（subpages + 切换）|
| 首页 | `exe/home.html` | ✅ | **轮播图**（首尾复制节点实现无限循环 + 圆点指示器）、**九宫格**入口、**热点新闻列表**（默认 5 条 + 查看更多每次 +5）|
| 公益活动 | `exe/gy.html` | ✅ | 项目列表渲染、Tab 切换、点击跳详情 |
| 学习心得 | `exe/xd.html` | 🟡 | 学习历史列表已实现；感言/笔记的增删改待补 |
| 数据分析 | `exe/sjfx.html` | ⬜ | **空壳**，echarts 三个图表待做 |
| 楷模列表 | `exe/li_1.html` | ⬜ | 空壳（只有标题栏）|
| 英雄故事 | `exe/li_2.html` | ⬜ | 空壳 |
| 身边英雄 | `exe/li_3.html` | ⬜ | 空壳 |
| 物资捐赠 | `exe/li_4.html` | ⬜ | 空壳 |
| 更多 | `exe/li_6.html` | ⬜ | 空壳 |

> 📌 空壳页面都是「有标题栏 + `mui.init()` + 统一返回按钮」的模板，方便后续直接往里写功能。

## 🎯 这个练习练到了什么

| 技能 | 体现在哪 |
|---|---|
| **轮播图无限循环** | `home.html` —— 首尾各复制一张（首 = 最后一张，尾 = 第一张），中间 `for` 循环渲染 |
| **圆点指示器** | 循环图片时同步生成 `<div class="mui-indicator">` |
| **九宫格布局** | `home.html` —— `mui-grid-view mui-grid-9` + `mui-col-xs-4` |
| **列表分页「查看更多」** | 默认 5 条，每次点击 +5，到底后按钮变文案 |
| **列表渲染** | 循环拼 HTML → 一次性写入 `innerHTML` |
| **跨页传参** | `mui.openWindow` 的 `extras` + `currentWebview()` 读取 |
| **Ajax + token** | 所有请求走 `mui.ajax`，请求头带 `Authorization` |
| **图片地址拼接** | 接口返回相对路径，需要拼服务器地址才能显示 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架，含 `mui.js` / `mui.css` / 图标字体）
- **Ajax**：`mui.ajax` 调 RESTful 接口
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html            登录页（入口）
├── manifest.json         HBuilderX App 配置
├── exe/                  业务页面
│   ├── page.html         主框架（底部 4 Tab）
│   ├── home.html         首页（轮播 + 九宫格 + 新闻列表）
│   ├── gy.html           公益活动
│   ├── xd.html           学习心得
│   ├── sjfx.html         数据分析（空壳）
│   └── li_1 ~ li_6.html  列表/详情页模板（空壳）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js           服务器地址配置（需自己填，见下）
│   ├── mui.js
│   └── mui.min.js
├── img/                  九宫格图标（本地图片，不依赖接口）
│   ├── kmlb.png          楷模列表
│   ├── yxgs.png          英雄故事
│   ├── sbyx.png          身边英雄
│   ├── wzjz.png          物资捐赠
│   └── gd.png            更多
└── fonts/
    └── mui.ttf           MUI 图标字体
```

## 🔌 用到的接口

| 页面 | 方法 | 路径 | 说明 |
|---|---|---|---|
| 登录 | POST | `/api/login` | 传 username / password，返回 token |
| 首页轮播 | GET | `/api/building/banner/list` | 返回 `rows` 数组 |
| 首页新闻 | GET | `/api/model/list` | 楷模新闻列表 |
| 公益活动 | GET | `/api/public/projects/list` | 公益项目列表 |
| 学习心得 | GET | `/api/history/list` | 学习历史列表 |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## 🚀 本地运行

### 1. 打开项目

用 **HBuilderX** 打开本文件夹（不要打开里面的单个文件），
然后「运行 → 运行到手机或模拟器」。

也可以直接用浏览器打开 `index.html`，但底部 Tab 等原生能力需要真机/模拟器。

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
> - `httpimg` —— 只用来**显示图片**，末尾**带** `/prod-api`
>
> 写错的话接口会 404 或图片全部裂开。

### 3. 接口约定

返回结构一般为：

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

`code` 为 200 表示成功。需要认证的接口在请求头带：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。
- `img/` 里的图标为练习用素材，版权归原作者所有，仅作学习用途。

## 📝 待办

- [ ] `exe/sjfx.html` —— echarts 柱状图 / 折线图 / 饼图
- [ ] `exe/li_1 ~ li_6.html` —— 楷模列表、英雄故事、身边英雄、物资捐赠等各页面内容
- [ ] `exe/xd.html` —— 学习感言与笔记的增删改
- [ ] 打包练习：产出 release 版 APK

## 📄 License

学习用途，代码可自由参考。
