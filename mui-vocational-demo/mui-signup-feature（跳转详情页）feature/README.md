# MUI 报名加人功能练习（JiaJianGongNeng）

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 主要练**公益项目报名 + 报名人数变化（加人）**这套业务逻辑。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 入口页 |
| 主框架 | `exe/page.html` | 底部 Tab 切换 |
| 功能1 · 项目列表 | `exe/GengNeng1.html` | 公益项目列表 + 「报名」按钮跳详情 |
| 功能1 · 项目详情 | `exe/GongNeng1XingQing.html` | 详情 + 报名（确认框 → 提交 → 人数刷新）|
| 功能2 · 公益活动 | `exe/GengNeng2.html` | 公益活动列表，点击跳活动详情 |
| 功能2 · 活动详情 | `exe/XingQingYeiHTML.html` | 活动详情页 |
| 空模板 | `exe/new_file.html` | 新页面模板 |

## 🎯 这个练习解决的核心问题

**「报名之后，报名人数为什么不更新？」**

```
项目列表页 (GengNeng1)
   │  ① 点「报名」→ 取 id → extras 传给详情页
   ▼
项目详情页 (GongNeng1XingQing)
   │  ② 按 id 请求详情，显示报名人数
   │  ③ 点「报名」→ mui.confirm 确认框
   │  ④ 确认 → POST 报名接口
   │  ⑤ 成功后：禁用按钮（防重复）+ 重新请求详情刷新人数
   ▼
返回列表页 (GengNeng1)
   │  ⑥ 列表页监听 show 事件 → 重新请求列表
   ▼
报名人数已更新 ✅
```

### 两个关键技巧

| 技巧 | 位置 | 作用 |
|---|---|---|
| **`show` 事件重新拉数据** | `GengNeng1.html` | 从详情页返回时列表自动刷新 |
| **报名后禁用按钮** | `GongNeng1XingQing.html` | `disabled` + `mui-disabled`，防重复报名 |
| **重新请求详情刷人数** | `refreshRenShu()` | 不本地加数字，重新拉接口，数据最准 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                      登录页（入口）
├── manifest.json                   HBuilderX App 配置
├── 开发者笔记.md                    学习笔记
├── new_file.html                   页面模板
├── exe/
│   ├── page.html                   主框架（底部 Tab）
│   ├── GengNeng1.html              功能1 · 项目列表
│   ├── GengNeng2.html              功能2 · 公益活动列表
│   ├── GongNeng1XingQing.html      功能1 · 项目详情
│   ├── XingQingYeiHTML.html        功能2 · 活动详情
│   └── new_file.html
├── css/                            MUI 样式
├── img/
│   └── 56eeee9b7cf007f3df2b4ac6027371df.jpg    练习用图片（见下方说明）
├── js/
│   ├── http.js                     服务器地址配置（需自己填）
│   └── mui.js                      MUI 框架
└── fonts/                          MUI 图标字体
```

## 🖼 关于 `img/` 目录里的图片

```
img/56eeee9b7cf007f3df2b4ac6027371df.jpg    1300 × 866    842 KB
```

**说明：**

- 这是一张**二次元风格插画**，从**素材库**复制过来的，用来练习页面配图。
- 文件名 `56eeee9b...` 是这张图的 **MD5 值**（素材库用 MD5 命名图片，好处是同图不会重名）。
- ⚠️ **当前代码里没有任何页面引用它** —— 属于暂存的"文件"，页面实际显示的图片都是**从接口返回的图片地址**动态加载的。
- ⚠️ **版权说明**：该图片为**学习练习用素材**，**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
  若你要把本项目用于公开分享，**建议把这张图删掉**（代码不依赖它）。

> 💡 想真正用上它，可以在页面里这样引用（相对路径）：
> ```html
> <img src="../img/56eeee9b7cf007f3df2b4ac6027371df.jpg"
>      alt="练习配图" style="width:100%;">
> ```

## 🚀 本地运行

### 1. 打开项目

用 **HBuilderX** 打开本文件夹（不要打开里面的单个文件），
然后「运行 → 运行到手机或模拟器」。

### 2. 配置服务器地址

本项目**不包含任何真实服务器地址**（已脱敏）。运行前编辑 `js/http.js`：

```javascript
var API_BASE = 'http://YOUR_SERVER_HOST:PORT';
```

替换成你自己的接口地址，例如：

```javascript
var API_BASE = 'http://127.0.0.1:8080';        // 浏览器调试
var API_BASE = 'http://192.168.1.100:8080';    // 模拟器 / 真机
```

> ⚠️ `API_BASE` 同时用于**调接口**和**显示图片**。
> 如果你的后端图片地址需要额外前缀（比如 `/prod-api`），
> 记得把它一起写进 `API_BASE`，例如 `http://192.168.1.100:8080/prod-api`。

### 3. 接口约定

返回结构一般为：`{ code, msg, rows, total }`，其中 `code` 为 200 表示成功。

需要认证的接口：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## 📝 练习到的知识点

- [x] 列表渲染（循环拼 HTML → `innerHTML`）
- [x] **跨页传参**（`mui.openWindow` 的 `extras` + `currentWebview()` 读取）
- [x] 参数判空保护
- [x] **报名流程**：确认框 → POST → 成功后刷新
- [x] **防重复报名**（按钮置灰禁用）
- [x] **页面返回自动刷新**（`show` 事件 + 重新请求接口）
- [x] 事件委托给动态生成的按钮绑事件

## ⚠️ 已知待办（记录，未修改）

- [ ] `exe/page.html` 声明了 `GengNeng3.html` / `GengNeng4.html`，但这两个文件还没建
- [ ] 详情页读参数用的是 `.extra`，但传参用的是 `.extras`（复数），建议统一
- [ ] 确认「公益项目报名」在真实服务器上对应哪个接口

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途，详见上方「关于 img 目录」。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
