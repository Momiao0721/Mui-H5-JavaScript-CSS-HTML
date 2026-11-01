# 时代楷模 · 功能练习（GongNWngLianXi）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 分功能拆开练：首页 + 感言（列表 / 添加 / 删除）+ 心得笔记（增 / 删）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| **功能一 · 感言列表** | `exe/GongNiengYi.html` | 功能一:感言列表 | `testimonials/list`、`DELETE /testimonials/{id}` |
| **功能一 · 添加感言** | `exe/TiaoJia.html` | 感言详情 | `POST /testimonials` |
| **功能二 · 心得笔记** | `exe/GongNiengER.html` | 功能二-练习 | `history/list`、`DELETE /history/note` |
| **功能三 · 添加笔记** | `exe/GongNiengSan.html` | 功能三 | `history/list`、`POST /history/note` |
| 功能练习四 | `exe/li_1.html` | 功能练习四 | `history/list` |
| 模板 | `exe/new_file.html` | — | 空白模板 |

## 🎯 功能实现

### 登录页（`index.html`）

- 账号 / 密码输入 + 非空校验
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 功能一 / 功能二 / 功能三**，4 个子页面**全部存在** ✅

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list` |
| 新闻列表 | ✅ `model/list` |
| 宫格入口 | ⚠️ 3 个，名称是占位 `li_1`~`li_3` |

### 功能一 · 感言（`GongNiengYi.html` → `TiaoJia.html`）

```
GongNiengYi.html（感言列表，testimonials/list）
   ├─ 点「添加」  → TiaoJia.html（POST /testimonials）
   └─ 点「删除」  → DELETE /testimonials/{id}
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ `testimonials/list`，字段 `id` / `title` / `content` / `createTime` |
| 添加 | ✅ `POST /testimonials`，参数 `title` / `content` |
| 删除 | ✅ `DELETE /testimonials/{id}` |

### 功能二 · 心得笔记（`GongNiengER.html`）

| 实现 | 说明 |
|---|---|
| 列表 | ✅ `history/list` |
| 删除 | ✅ `DELETE /history/note?noteId=&studyHistoryId=` |
| `JSON.stringify` | ✅ 有 |

### 功能三 · 添加笔记（`GongNiengSan.html`）

| 实现 | 说明 |
|---|---|
| 列表 | ✅ `history/list` |
| 添加笔记 | ✅ `POST /history/note`，参数 `noteTitle` / `noteContent` / `studyHistoryId` / `noteId` |
| 删除 | ✅ `DELETE /history/note` |
| 底部按钮 | ✅「添加笔记 / 取消 / 保存」 |

### 功能练习四（`li_1.html`）

✅ `history/list`，另一个版本的心得列表

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| 登录 + token | `index.html` |
| 底部 4 Tab + subpages | `page.html` |
| 轮播图 + 新闻列表 | `home.html` |
| **列表 + 删除（DELETE）** | `GongNiengYi.html` / `GongNiengER.html` |
| **表单添加（POST）** | `TiaoJia.html` / `GongNiengSan.html` |
| 跨页传参 | `GongNiengYi.html` → `TiaoJia.html` |
| `JSON.stringify` 提交 | `GongNiengER.html` / `GongNiengSan.html` |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage`
- 打包：HBuilderX

> 📌 本项目**没有引入 ECharts**，不含数据分析页面。

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 新闻 + 宫格）
│   ├── GongNiengYi.html          功能一 · 感言列表
│   ├── TiaoJia.html              功能一 · 添加感言
│   ├── GongNiengER.html          功能二 · 心得笔记
│   ├── GongNiengSan.html         功能三 · 添加笔记
│   ├── li_1.html                 功能练习四
│   └── new_file.html             空白模板
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
| 感言列表 | GET | `/api/testimonials/list` |
| **添加感言** | POST | `/api/testimonials` |
| **删除感言** | DELETE | `/api/testimonials/{id}` |
| 学习历史列表 | GET | `/api/history/list` |
| **添加笔记** | POST | `/api/history/note` |
| **删除笔记** | DELETE | `/api/history/note?noteId=&studyHistoryId=` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

**字段名注意**

| 接口 | 字段 | 说明 |
|---|---|---|
| `testimonials/list` | `id` / `title` / `content` / `createTime` | 感言 |
| `history/list` | `id` / `title` / `content` / `wstudyNote`（笔记对象）| 学习历史 |
| `history/note` | `noteId` / `noteTitle` / `noteContent` / `studyHistoryId` | 笔记 |

> ⚠️ `history/list` 返回的笔记信息套在 **`wstudyNote`** 里，
> 删除/编辑笔记要用 `wstudyNote.noteId` 和 `wstudyNote.studyHistoryId`。

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

- [ ] `home.html` 宫格 3 个名称还是占位 `li_1`~`li_3`，应改成实际功能名
- [ ] 宫格跳转只做了 `li_1.html`，`li_2.html` / `li_3.html` 还没建
- [ ] `new_file.html`（375 B）空模板，可删
- [ ] `TiaoJia.html`（添加感言）**缺 `JSON.stringify`** ——
      `Content-Type: application/json` 时可能报 500
- [ ] `GongNiengYi.html`（感言列表）也**缺 `JSON.stringify`**（删除接口无 body 时可忽略）
- [ ] 各页面 `<title>` 多为「标题」「功能二-练习」等占位
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议。

## 📄 License

学习用途，代码可自由参考。
