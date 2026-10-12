# MUI 报名加人功能练习（JiaJianGongNeng）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益项目/公益活动的列表 → 详情 → 报名（加人）**这套完整业务逻辑。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 入口页 |
| 主框架 | `exe/page.html` | 底部 4 个 Tab 切换 |
| **功能1** · 项目列表 | `exe/GengNeng1.html` | 公益项目列表（`public/projects/list`）|
| **功能1** · 项目详情 | `exe/GongNeng1XingQing.html` | 详情 + 报名（确认框 → 提交 → 人数刷新）|
| **功能2** · 公益活动 | `exe/GengNeng2.html` | 公益活动列表（`activity/list`）|
| **功能2** · 活动详情 | `exe/XingQingYeiHTML.html` | 活动详情 + 报名 |
| **功能3** · 报名功能 | `exe/GengNeng3.html` | 活动列表（`activity/list`）|
| **功能4** · 功能页 | `exe/GengNeng4.html` | 活动列表（`activity/list`）|
| **功能4** · 详情页 | `exe/GoneNengYei4listXiangQingYei.html` | 活动详情 + 报名（`activity/{id}` + `activity/apply`）|
| 模板 | `exe/new_file.html` | 新页面模板 |

## 🎯 这个练习解决的核心问题

**「报名之后，报名人数为什么不更新？」**

```
列表页（GengNeng1 / GengNeng2 / GengNeng3 / GengNeng4）
   │  ① 点「报名」→ 取 id → extras 传给详情页
   ▼
详情页（XingQingYei*）
   │  ② 按 id 请求详情，显示报名人数
   │  ③ 点「报名」→ mui.confirm 确认框
   │  ④ 确认 → POST /api/activity/apply
   │  ⑤ 成功后：禁用按钮（防重复）+ 重新请求详情刷新人数
   ▼
返回列表页
   │  ⑥ 列表页监听 show 事件 → 重新请求列表
   ▼
报名人数已更新 ✅
```

### 三个关键技巧

| 技巧 | 作用 |
|---|---|
| **`show` 事件重新拉数据** | 从详情页返回时列表自动刷新，不用手动改 DOM |
| **报名后禁用按钮** | `setAttribute('disabled')` + `mui-disabled` class，防重复报名 |
| **重新请求详情刷人数** | 不本地加数字，重新拉接口，数据最准 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                              登录页（入口）
├── manifest.json                           HBuilderX App 配置
├── 新建文本文档.md                          学习笔记
├── new_file.html                           页面模板
├── exe/
│   ├── page.html                           主框架（底部 4 Tab）
│   ├── GengNeng1.html                      功能1 · 项目列表
│   ├── GongNeng1XingQing.html              功能1 · 项目详情
│   ├── GengNeng2.html                      功能2 · 公益活动列表
│   ├── XingQingYeiHTML.html                功能2 · 活动详情
│   ├── GengNeng3.html                      功能3 · 报名功能
│   ├── GengNeng4.html                      功能4 · 功能页
│   ├── GoneNengYei4listXiangQingYei.html   功能4 · 详情页
│   └── new_file.html
├── css/                                    MUI 样式
├── img/
│   └── 56eeee9b7cf007f3df2b4ac6027371df.jpg    练习用图片（见下方说明）
├── js/
│   ├── http.js                             服务器地址配置（需自己填）
│   └── mui.js                              MUI 框架
└── fonts/                                  MUI 图标字体
```

## 🖼 关于 `img/` 目录里的图片

```
img/56eeee9b7cf007f3df2b4ac6027371df.jpg    1300 × 866    842 KB
```

- 这是一张**二次元风格插画**，从**备赛素材库**复制过来的，用来练习页面配图。
- 文件名 `56eeee9b...` 是这张图的 **MD5 值**（素材库用 MD5 命名图片，好处是同图不会重名）。
- ⚠️ **当前代码里没有任何页面引用它** —— 属于暂存的"孤儿文件"，
  页面实际显示的图片都是**从接口返回的图片地址**动态加载的。
- ⚠️ **版权说明**：该图片为**学习练习用素材**，**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
  若你要把本项目用于公开分享，**建议把这张图删掉**（代码不依赖它）。

> 💡 想真正用上它，可以在页面里这样引用（相对路径）：
> ```html
> <img src="../img/56eeee9b7cf007f3df2b4ac6027371df.jpg"
>      alt="练习配图" style="width:100%;">
> ```

## 🔌 用到的接口

| 页面 | 方法 | 路径 | 说明 |
|---|---|---|---|
| 登录 | POST | `/api/login` | 传 username / password，返回 token |
| 功能1 列表 | GET | `/api/public/projects/list` | 公益项目列表 |
| 功能1 详情 | GET | `/api/public/projects/{id}` | 公益项目详情 |
| 功能2/3/4 列表 | GET | `/api/activity/list` | 公益活动列表 |
| 功能2/4 详情 | GET | `/api/activity/{id}` | 公益活动详情 |
| **报名** | POST | `/api/activity/apply` | Body：`{ activityId: id }` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

> 📌 **注意**：功能1 用的是「公益**项目**」接口（`public/projects`），
> 但报名调的是「公益**活动**」的接口（`activity/apply`）。
> **这两套在真实服务器上可能是不同的数据表**，报名时要确认用哪个接口。

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

## 📝 练习到的知识点

- [x] 列表渲染（循环拼 HTML → `innerHTML`）
- [x] **跨页传参**（`mui.openWindow` 的 `extras` + `currentWebview()` 读取）
- [x] 参数判空保护（拿不到 id 就提示，不往下跑）
- [x] **报名流程**：确认框 → POST → 成功后刷新
- [x] **防重复报名**（按钮置灰禁用）
- [x] **页面返回自动刷新**（`show` 事件 + 重新请求接口）
- [x] 事件委托给动态生成的按钮绑事件

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
