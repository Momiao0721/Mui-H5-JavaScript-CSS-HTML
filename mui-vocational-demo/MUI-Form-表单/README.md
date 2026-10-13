# MUI 移动端练习项目 · （时代楷模）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 项目内容比较全：登录、首页、公益活动、学习心得（含增删改）、数据分析、多个列表页。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 说明 |
|---|---|---|---|
| 登录页 | `index.html` | — | 入口页 |
| 主框架 | `exe/page.html` | — | 底部 Tab 切换 |
| 首页 | `exe/home.html` | 时代楷模 | 轮播图（`building/banner/list`）+ 新闻列表（`model/list`）|
| 公益活动 | `exe/gy.html` | — | 活动列表 |
| 学习心得 · 版本1 | `exe/li_1.html` | 学习心得 | 感言列表 / 新增 / 删除 + 学习历史 |
| 学习心得 · 版本2 | `exe/li_2.html` | — | 感言列表（按时间倒序）/ 新增 / 删除 + 学习历史 |
| 学习心得 · 版本3 | `exe/xd.html` | — | 感言列表 + 学习历史（另一版写法）|
| 添加感言 | `exe/addGY.html` | 添加感言 | 表单提交（`testimonials`）|
| 添加笔记 | `exe/addBJ.html` | 添加笔记 | 表单提交 |
| 编辑笔记 | `exe/editBJ.html` | 编辑笔记 | 表单提交 |
| 数据分析 | `exe/sjfx.html` | 公益活动 | 页面标题写的是"公益活动"（可能命名笔误）|
| li_3 ~ li_6 | `exe/li_3 ~ li_6.html` | — | **空壳**（108 B，只有 html 骨架）|

> 📌 `li_1` / `li_2` / `xd` 是**同一功能的三版不同写法**，可以对比哪种更顺。

## 🎯 这个练习练到了什么

| 技能 | 体现在哪 |
|---|---|
| **增删改（CRUD）** | 感言：新增（`addGY`）+ 删除 + 列表；笔记：新增（`addBJ`）+ 编辑（`editBJ`）+ 删除 |
| **表单页** | `addGY.html` / `addBJ.html` / `editBJ.html` —— 输入校验 + 提交 + 返回刷新 |
| **轮播图** | `home.html` —— 首尾复制节点实现无限循环 |
| **列表渲染** | 循环拼 HTML → `innerHTML`（列表项含缩略图 + 标题 + 内容省略号）|
| **跨页传参** | `mui.openWindow` 的 `extras` + `currentWebview()` 读取 |
| **Ajax + token** | 所有请求走 `mui.ajax`，请求头带 `Authorization` |
| **图片地址拼接** | 接口返回相对路径，用 `httpimg` 拼服务器地址 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html            登录页（入口）
├── manifest.json         HBuilderX App 配置
├── exe/                  业务页面
│   ├── page.html         主框架
│   ├── home.html         首页（轮播 + 新闻列表）
│   ├── gy.html           公益活动
│   ├── li_1 / li_2.html  学习心得（两种写法）
│   ├── xd.html           学习心得（第三种写法）
│   ├── addGY.html        添加感言
│   ├── addBJ.html        添加笔记
│   ├── editBJ.html       编辑笔记
│   ├── sjfx.html         数据分析（标题写的是"公益活动"）
│   └── li_3 ~ li_6.html  空壳页面
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js           服务器地址配置（需自己填，见下）
│   ├── mui.js
│   └── mui.min.js
├── images/               图标与图片素材（底部 Tab 图标、九宫格图标等）
│   ├── home.png / home-active.png      首页图标（普通 / 选中）
│   ├── gy.png / gy-active.png          公益图标
│   ├── xd.png / xd-active.png          心得图标
│   ├── mine.png / mine-active.png      我的图标
│   ├── add.png / edit.png              新增 / 编辑图标
│   ├── kmlb / yxgs / sbyx / wzjz / qzxq / more.png   九宫格各入口图标
│   └── lf.jpg                          练习配图
└── fonts/
    └── mui.ttf           MUI 图标字体
```

> 💡 底部 Tab 图标**成对出现**（`xxx.png` 普通态 + `xxx-active.png` 选中态），
> 这是 MUI 底部导航切换高亮的常见做法。

## 🔌 用到的接口

| 功能 | 方法 | 路径 |
|---|---|---|
| 首页轮播 | GET | `/api/building/banner/list` |
| 首页新闻 | GET | `/api/model/list` |
| 感言列表 | GET | `/api/testimonials/list` |
| 感言列表（置顶优先） | GET | `/api/testimonials/listByDesc` |
| 新增感言 | POST | `/api/testimonials` |
| 删除感言 | DELETE | `/api/testimonials/{id}` |
| 学习历史 | GET | `/api/history/list` |
| 添加 / 编辑 / 删除笔记 | POST / PUT / DELETE | `/api/history/note` |

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

## 📝 待办

- [ ] `exe/li_3 ~ li_6.html` —— 空壳页面内容
- [ ] `exe/sjfx.html` —— 确认是数据分析还是公益活动（标题与文件名不一致）
- [ ] `exe/gy.html` / `li_1` / `li_2` / `xd` —— 三个版本择优保留，避免重复
- [ ] 打包练习：产出 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
