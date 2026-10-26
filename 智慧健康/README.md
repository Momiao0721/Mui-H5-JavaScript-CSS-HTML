# 生态环保回收 App · 2025TiaoYuan

> 中职移动应用与开发赛项备赛练习项目（2025 省赛练习），基于 DCloud MUI 框架。
> 主题为**生态环保 / 旧物回收**：首页、公司回收、数据分析、我的（环保中心）。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

### 登录相关（根目录）

| 页面 | 文件 | 标题 | 说明 |
|---|---|---|---|
| 登录页 | `index.html` | — | 账号密码登录，POST `/api/login`，存 token 跳主框架 |
| 注册账号 | `MianMiDengLu.html` | 注册账号 | 从登录页进入 |
| 免密登录协议 | `MianMiDengLuuu.html` | 免密登录协议 | 协议页 |
| 忘记密码 | `WangJiMiMai.html` | 忘记密码 | 找回密码页 |
| 用户隐私协议 | `YongHuYingSiXieYi.html` | 用户隐私协议 | 协议页 |

### 业务页面（`exe/`）

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| 主框架 | `page.html` | — | 底部 4 个 Tab：首页 / 公司回收 / 数据分析 / 我的 |
| 首页 | `home.html` | 首页 | `building/banner/list` |
| 搜索框 | `BaiDuKuang.html` | — | 无（输入框页面）|
| 公司详情 | `XiangQingYei.html` | 公司详情 | 无（静态页）|
| **我的（环保中心）** | `wd.html` | 我的 | `common/user/getInfo` |
| **数据分析** | `sjfx.html` | 数据分析 | 三张图表接口 |
| 模板 | `new_file.html` | — | 空白模板 |

## 🏠 首页内容（`exe/home.html`）

按样题模块A 任务2「首页界面设计」的要素做的：

| 区块 | 内容 |
|---|---|
| 顶部搜索框 | ✅ 点击跳 `BaiDuKuang.html` |
| 轮播图 | ✅ `building/banner/list` |
| 快捷功能宫格 | ✅ 回收分类 / 旧物去向 / 附近回收机 / 积分商城 |
| 预约上门回收按钮 | ✅ |
| 回收步骤 | ✅ 第一步免费上门 → 第二步订单完成 → 第三步用户福利 → 第四步 |
| 用户福利 / 预约成功提示 | ✅ 静态示例「王*花预约成功 2021-07-21 10:15:20」|
| 爱心活动列表 | ✅ 静态示例「100000积分=1袋猫粮，快来给动物们集物资」|

## 👤 我的（环保中心 `exe/wd.html`）

按样题模块A 任务1「环保中心界面设计」的要素做的：

| 入口 | 状态 |
|---|---|
| 用户头像 / 昵称 | ✅ `avatar` / `nickName` / `userName` |
| 积分记录 | ✅ |
| 积分兑换记录 | ✅ |
| 我的贡献 | ✅ |
| 收入记录 | ✅ |
| 设置 | ✅ |

## 📊 数据分析（`exe/sjfx.html`）

| 图表 | 接口 | 说明 |
|---|---|---|
| **条形图** | `/api/data/comment/list_2` | `name`（月份）/ `woman` / `man` 双系列 |
| **折线图** | `/api/read/book/list_1` | `name`（月份）/ `value` |
| **饼状图** | `/api/read/book/list/type_1` | `name` / `count`（组装成 `{name, value}`）|

```javascript
// 饼图数据组装
BingBIng.push({ value: d.count[i], name: d.name[i] })
```

## 🎯 练到的知识点

| 技能 | 位置 |
|---|---|
| 登录 + token | `index.html` |
| 多入口登录页（注册 / 免密 / 忘记密码 / 隐私协议）| 根目录 4 个页面 |
| 底部 Tab + subpages | `page.html` |
| 轮播图 | `home.html` |
| 宫格快捷入口 | `home.html` |
| 静态排版（步骤条 / 活动卡）| `home.html` |
| 搜索框页面 | `BaiDuKuang.html` |
| 个人中心信息 | `wd.html` |
| echarts 柱 / 折 / 饼 | `sjfx.html` |

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
├── index.html                    登录页（入口）
├── manifest.json                 HBuilderX App 配置
├── MianMiDengLu.html             注册账号
├── MianMiDengLuuu.html           免密登录协议
├── WangJiMiMai.html              忘记密码
├── YongHuYingSiXieYi.html        用户隐私协议
├── exe/                          业务页面（7 个）
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页
│   ├── BaiDuKuang.html           搜索框
│   ├── XiangQingYei.html         公司详情
│   ├── wd.html                   我的（环保中心）
│   ├── sjfx.html                 数据分析（三图）
│   └── new_file.html             空白模板
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
│   └── echarts.js                图表库
├── IMG/                          图片素材（15 个，约 7 MB）
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🖼 关于 `IMG/` 目录

- 部分文件**用图片 MD5 值命名**（如 `56eeee9b....jpg`），这是素材库的命名习惯。
- ⚠️ **版权说明**：图片素材**并非本人原创**，版权归原作者所有。
  本仓库仅作个人学习练习，**不做任何商业用途**；如涉及侵权请联系删除。
- 💡 其中有一个 **2 MB 的 GIF**，已在 `.gitignore` 中排除。

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 用户信息 | GET | `/api/common/user/getInfo` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

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

### 🔴 结构缺口

- [ ] **`exe/gshs.html`（公司回收）不存在** —— `page.html` 已声明该子页面，点「公司回收」Tab 会报错
- [ ] `exe/new_file.html`（375 B）空模板

### 🟡 数据未接接口（现在是静态写死的）

- [ ] `home.html` 宫格 4 个入口（回收分类 / 旧物去向 / 附近回收机 / 积分商城）是**静态 HTML**，未接接口
- [ ] `home.html`「爱心活动列表」是**静态一条**，题目要求是列表（图片 + 标题）
- [ ] `home.html`「回收步骤」「预约成功提示」都是静态示例
- [ ] `XiangQingYei.html`（公司详情）**没有任何接口**，全是静态内容
- [ ] `BaiDuKuang.html`（搜索框）没有搜索接口

### 🟢 细节

- [ ] `sjfx.html` 饼图 label 是 `'{d}%'`，只显示百分比，**建议改成 `'{b}: {d}%'`**（名称 + 比例）
- [ ] 各页面 `<title>` 为空，建议补上
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- **图片素材版权归原作者所有**，仅作学习用途。
- MUI 版权归 [DCloud](https://www.dcloud.io/)；ECharts 版权归 Apache 基金会。

## 📄 License

代码部分：学习用途，可自由参考。
图片素材：**不适用**，版权归原作者，请勿二次分发。
