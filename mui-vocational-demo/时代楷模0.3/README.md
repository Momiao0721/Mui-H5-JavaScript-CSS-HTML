# 时代楷模 App · 完整练习版 0.3

> 个人练习 Demo —— 中职移动应用与开发赛项备赛练习，基于 DCloud MUI 框架。
> 这一版**功能最不全**：首页、英雄列表/详情、身边英雄、公益活动（含报名）、
> 学习心得（增删改）、数据分析（echarts 三图）、用户中心都有。
> 增删改,是老师的版本自己后期还会练

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能（19 个业务页面）

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 登录页 | `index.html` | — | 登录 |
| 主框架 | `exe/page.html` | — | 底部 Tab |
| 首页 | `exe/home.html` | — | `building/banner/list`、`model/list` |
| 英雄列表 | `exe/li_1.html` | 英雄列表 | `hero/list` |
| 身边英雄 | `exe/li_2.html` | 身边英雄 | `around/list` |
| **数据分析** | `exe/li_5.html` | 数据分析 | **三张图** |
| 更多 | `exe/li_6.html` | 更多 | — |
| **数据分析** | `exe/sjfx.html` | 数据分析 | **三张图**（另一版）|
| 公益活动 | `exe/gy.html` | 公益活动 | `activity/list`、`public/projects/list` |
| **报名详情** | `exe/BaoMIngXiangQingHTML.html` | 报名页 | `activity/{id}`、`activity/apply` |
| 公益项目详情 | `exe/GongYiXiangMuXiangQing.html` | — | — |
| 英雄详情 | `exe/YingXingListHTML.html` | 标题 | `hero/{id}`、`hero/evaluate/list` |
| 英雄详情（另一版） | `exe/YingXungHTML.html` | 英雄LIst详情页 | — |
| 学习心得 | `exe/xd.html` | — | `testimonials/listByDesc`、`testimonials/{id}` |
| 添加感言 | `exe/addGY.html` | 添加感言 | `testimonials` |
| 添加笔记 | `exe/addBJ.html` | 添加笔记 | `history/note` |
| 编辑笔记 | `exe/editBJ.html` | 编辑笔记 | — |
| 用户中心 | `exe/YongHu.html` | 用户 | `common/user/getInfo` |
| 模板 | `ShengbianYinXingHTL.html` | — | 375 B 模板 |
| li_3 / li_4 | `exe/li_3.html` / `li_4.html` | — | 待完善 |

## 📊 数据分析（两个页面都做了三张图）⭐

| 图表 | 接口 | 返回字段 |
|---|---|---|
| 条形图（新闻评论数·按性别） | `/api/data/comment/list_2` | `data.name[]` / `data.woman[]` / `data.man[]` |
| 折线图（阅读书籍数量趋势） | `/api/read/book/list_1` | `data.name[]` / `data.value[]` |
| 饼状图（书籍类型占比） | `/api/read/book/list/type_1` | `data.name[]` / `data.count[]` / `data.data[]` |

> `exe/li_5.html` 和 `exe/sjfx.html` 是**同一功能的两版实现**，可以对比。

## 🎯 这个练习练到了什么

| 技能 | 体现在哪 |
|---|---|
| **增删改（CRUD）** | 感言：新增 + 删除；笔记：新增（`addBJ`）+ 编辑（`editBJ`）+ 删除 |
| **表单页** | `addGY` / `addBJ` / `editBJ` —— 校验 + 提交 + 返回刷新 |
| **报名流程** | `BaoMIngXiangQingHTML.html` —— 确认框 → POST → 刷新人数 |
| **轮播图无限循环** | `home.html` —— 首尾复制节点 + 圆点指示器 |
| **多种列表渲染** | 英雄列表 / 身边英雄 / 公益 / 感言 |
| **详情页 + 评论** | `YingXingListHTML.html` —— 两个接口配合 |
| **echarts 三图** | `li_5.html` / `sjfx.html` |
| **用户信息** | `YongHu.html` —— `common/user/getInfo` |
| **Ajax + token** | 所有请求走 `mui.ajax`，请求头带 `Authorization` |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（数据可视化，`js/echarts.js`）
- **Ajax**：`mui.ajax` 调 RESTful 接口
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── ShengbianYinXingHTL.html      页面模板
├── exe/                          19 个业务页面
│   ├── page.html                 主框架
│   ├── home.html                 首页
│   ├── li_1 ~ li_6.html          各列表/图表页
│   ├── gy.html                   公益活动
│   ├── BaoMIngXiangQingHTML.html 报名详情
│   ├── GongYiXiangMuXiangQing.html 公益项目详情
│   ├── YingXingListHTML.html     英雄详情 + 评论
│   ├── YingXungHTML.html         英雄详情（另一版）
│   ├── xd.html                   学习心得
│   ├── addGY / addBJ / editBJ    表单页
│   ├── YongHu.html               用户中心
│   └── sjfx.html                 数据分析（另一版）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
│   └── echarts.js                图表库
├── IMG/                          图片素材（约 8 MB，见下方说明）
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🖼 关于 `IMG/` 目录

共 17 个文件、约 **8 MB**，是从**备赛素材库**复制的练习用图片。

- 部分文件**用图片的 MD5 值命名**（例如 `56eeee9b7cf007f3df2b4ac6027371df.jpg`）。
  已在 `.gitignore` 中排除，避免暴露个人信息。
- ⚠️ **版权说明**：图片素材**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
- 💡 其中有一个 **2 MB 的 GIF**，也已在 `.gitignore` 中排除。

## 🔌 用到的接口

| 功能 | 方法 | 路径 |
|---|---|---|
| 登录 | POST | `/api/login` |
| 用户信息 | GET | `/api/common/user/getInfo` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 首页新闻 | GET | `/api/model/list` |
| 英雄列表 | GET | `/api/hero/list` |
| 英雄详情 | GET | `/api/hero/{id}` |
| 英雄评论 | GET | `/api/hero/evaluate/list?heroId=` |
| 身边英雄 | GET | `/api/around/list` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 公益项目列表 | GET | `/api/public/projects/list` |
| 感言列表 | GET | `/api/testimonials/listByDesc` |
| 新增感言 | POST | `/api/testimonials` |
| 删除感言 | DELETE | `/api/testimonials/{id}` |
| 添加 / 编辑笔记 | POST / PUT | `/api/history/note` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

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
> 两边都带斜杠会拼成 `//profile/p1.jpg` 导致图片加载失败。

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

- [ ] `exe/li_3.html` / `li_4.html` —— 待完善
- [ ] 两个数据分析页（`li_5` / `sjfx`）、两个英雄详情页（`YingXingListHTML` / `YingXungHTML`）—— 建议择优保留，避免重复
- [ ] `exe/GongYiXiangMuXiangQing.html`（544 B）—— 公益项目详情内容待补
- [ ] 打包练习：产出 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码以「能跑通、看得懂」为主，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有；
  ECharts 版权归 Apache 基金会所有，均仅作学习使用。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
