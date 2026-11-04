# 时代楷模 App · 练习六（LianXiWiu）

> 中职移动应用与开发赛项备赛练习项目，基于 DCloud MUI 框架。
> 覆盖：**引导页** + 登录 + 首页（含文字轮播）+ 心得（**增删**）+ 公益（列表 / 详情 / 报名）+ 数据分析三图。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点指点就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 标题 | 主要接口 |
|---|---|---|---|
| **引导页** | `index.html` | — | `guide/list` |
| 登录页 | `SengluYei.html` | 登录 | `/api/login` |
| 主框架 | `exe/page.html` | — | 底部 4 个 Tab |
| 首页 | `exe/home.html` | 标题 | `building/banner/list`、`model/list` |
| **心得** | `exe/xd.html` | 心得 | `history/list`、`POST /history/note`、`DELETE /history/note` |
| **公益列表** | `exe/gy.html` | 公益 | `activity/list` |
| **公益详情** | `exe/GongYiXiangqing.html` | 详情页 | `activity/{id}`、`activity/apply` |
| **数据分析** | `exe/sjfx.html` | 数据分析 | 三张图表接口 |

> ✅ 4 个 Tab 的子页面**全部存在**，点哪个都不会断。

---

## 🎯 功能实现

### 引导页（`index.html`）✅

| 功能 | 实现 |
|---|---|
| 引导图轮播 | ✅ `guide/list`，`mui-slider` 自动播放 |
| **5 秒倒计时** | ✅ `setTimeout(WuMiao, 1000)` |
| **倒计时结束自动跳登录页** | ✅ `if (c < 0) { mui.openWindow('SengluYei.html') }` |
| 跳过按钮 | ✅ 手动提前跳转 |

```javascript
var c = 5

function WuMiao(){
    document.getElementById('time').innerHTML = c;
    c = c - 1;

    if (c < 0) {                                     // 到 0 → 自动跳
        mui.openWindow({ url: 'SengluYei.html', id: 'SengluYei' });
        return;
    }
    setTimeout(WuMiao, 1000);                        // ★ 必须带延时
}
WuMiao();
```

> ⚠️ **`setTimeout(fn)` 不写第二个参数 = 延时 0 毫秒**，
> 几次循环会在同一毫秒跑完，人眼只看到最后一帧 → **看起来数字完全不变**。

### 登录页（`SengluYei.html`）

- 账号 / 密码输入 + 「登录」按钮
- `POST /api/login` → 存 token → 跳 `./exe/page.html`

### 主框架（`exe/page.html`）

底部 4 个 Tab：**首页 / 心得 / 公益 / 数据分析**

> 💡 MUI 对 `.mui-bar-tab > .mui-tab-item` **自动切换 `mui-active` 高亮**，不用手写 `classList`。

### 首页（`exe/home.html`）

| 区块 | 实现 |
|---|---|
| 轮播图 | ✅ `building/banner/list`，首尾复制节点 + 圆点 |
| **文字轮播** | ✅ 公告/新闻文字滚动播放 |
| 新闻列表 | ✅ `model/list`，字段 `title` / `content` / `imgUrl` |
| 列表分页 | ✅ `kmlbWuTiao = 5`，点「更新」`+= 5` |
| 宫格入口 | ✅ 3 个 |

> 💡 宫格 `name` 现在是占位 `li_1`~`li_3`，可改成真实功能名。

### 心得（`exe/xd.html`）⭐ 本项目最完整的一块

| 功能 | 状态 |
|---|---|
| 列表 | ✅ `history/list` |
| 笔记嵌套读取 | ✅ `wstudyNote` 的 `noteId` / `noteTitle` / `noteContent` |
| **增加笔记** | ✅ `POST /history/note` |
| **删除笔记** | ✅ `DELETE /history/note` + `mui.confirm` 二次确认 |
| 编辑笔记 | ⚠️ 有「更改」按钮，但没有 `PUT` 请求 |
| 操作后刷新 | ✅ 调用 `XingDeEEEList()` 重新拉列表 |

**按钮用 class 区分，取值用 `this.getAttribute`：**

```javascript
// 删除按钮：.mui-media
// 增加按钮：.mui-media-ZhengJia
var dels = document.querySelectorAll('#XingDeList .mui-media')
var adds = document.querySelectorAll('#XingDeList .mui-media-ZhengJia')
```

> 💡 **这是好习惯**：用不同 class 区分不同动作，
> 而不是靠位置或者 `getElementById` 猜。
>
> ⚠️ 但注意：**循环绑定事件时上限要用 `节点列表.length`**，
> 不能用 `data.rows.length` —— 两者数量不一定相等，会取到 `undefined` 报错。

### 公益（`exe/gy.html` → `exe/GongYiXiangqing.html`）

```
gy.html（公益列表，activity/list）
   └─ 点某条 → GongYiXiangqing.html（详情 + 报名）
                    └─ 报名 → POST /activity/apply
```

| 页面 | 实现 |
|---|---|
| 列表 | ✅ 6 个字段：`activityName` / `applyNum` / `id` / `imgUrl` / **`initiator`** / `startEndTime` |
| 列表显示报名人数 | ✅ `applyNum` |
| 报名按钮 | ✅ |
| 详情 | ✅ `activity/{id}` + 报名 `POST /activity/apply` |
| 跨页传参 | ✅ |

> ⚠️ 页面提示「**报名后点击更新**」——
> 说明从详情页返回列表时**不会自动刷新报名人数**，需要手点更新。
> 想自动刷新见下方「待补」。

### 数据分析（`exe/sjfx.html`）✅

| 图表 | 接口 | 说明 |
|---|---|---|
| **条形图** | `/api/data/comment/list_2` | `name`（月份）/ `woman` / `man` 双系列 |
| **折线图** | `/api/read/book/list_1` | `name`（月份）/ `value` |
| **饼状图** | `/api/read/book/list/type_1` | `name` / `count` → 组装 `{name, value}` |

## 🎯 练到的知识点

| 技能 | 位置 | 状态 |
|---|---|:---:|
| **引导页倒计时 + 自动跳转** | `index.html` | ✅ |
| 登录 + token | `SengluYei.html` | ✅ |
| 底部 4 Tab + subpages | `page.html` | ✅ |
| 轮播图首尾复制循环 | `home.html` | ✅ |
| **文字轮播（公告滚动）** | `home.html` | ✅ |
| 列表分页「+5 条」 | `home.html` | ✅ |
| **笔记嵌套读取（`wstudyNote`）** | `xd.html` | ✅ |
| **增加笔记（POST）** | `xd.html` | ✅ |
| **删除笔记（DELETE + confirm）** | `xd.html` | ✅ |
| 编辑笔记（PUT） | `xd.html` | ⚠️ 未做 |
| 跨页传参 | `gy.html` → `GongYiXiangqing.html` | ✅ |
| **活动报名 POST** | `GongYiXiangqing.html` | ✅ |
| echarts 柱 / 折 / 饼 | `sjfx.html` | ✅ |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **ECharts**（`js/echarts.js`）
- **Ajax**：`mui.ajax` + `Authorization: token`
- **HTML5+**：`plus.webview` / `plus.storage` / `mui.openWindow`
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html                    引导页（入口，5 秒倒计时）
├── SengluYei.html                登录页
├── manifest.json                 HBuilderX App 配置
├── exe/
│   ├── page.html                 主框架（底部 4 Tab + subpages）
│   ├── home.html                 首页（轮播 + 文字轮播 + 新闻 + 宫格）
│   ├── xd.html                   心得（列表 + 增加 + 删除）
│   ├── gy.html                   公益列表
│   ├── GongYiXiangqing.html      公益详情 + 报名
│   ├── sjfx.html                 数据分析（三图）
│   └── new_file.html             空白模板（可删）
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── http.js                   服务器地址配置（需自己填，见下）
│   ├── mui.js / mui.min.js       MUI 框架
│   └── echarts.js                图表库
└── fonts/
    └── mui.ttf                   MUI 图标字体
```

## 🔌 接口清单

| 功能 | 方法 | 路径 |
|---|---|---|
| 引导图列表 | GET | `/api/guide/list?type=1` |
| 登录 | POST | `/api/login` |
| 首页轮播 | GET | `/api/building/banner/list` |
| 热点新闻列表 | GET | `/api/model/list` |
| 学习历史列表 | GET | `/api/history/list` |
| **新增笔记** | POST | `/api/history/note` |
| **删除笔记** | DELETE | `/api/history/note?noteId=&studyHistoryId=` |
| **编辑笔记**（待补）| PUT | `/api/history/note` |
| 公益活动列表 | GET | `/api/activity/list` |
| 公益活动详情 | GET | `/api/activity/{id}` |
| **活动报名** | POST | `/api/activity/apply` |
| 图表·条形 | GET | `/api/data/comment/list_2` |
| 图表·折线 | GET | `/api/read/book/list_1` |
| 图表·饼图 | GET | `/api/read/book/list/type_1` |

> ⚠️ 路径是**脱敏后的写法**（去掉了平台前缀）。考场以**现场发放的接口文档**为准，**照抄路径**。

## ⚠️ 字段名注意

### `history/list` 是**两层**结构

```
rows[i]
 ├─ id              ← 历史 id（也是 studyHistoryId）
 ├─ title / content / issueTime
 └─ wstudyNote      ← 笔记对象（可能为 null）
     ├─ noteId      ← ★ 编辑/删除要用这个
     ├─ noteTitle
     ├─ noteContent
     └─ studyHistoryId
```

> ⚠️ **`noteId` 要从 `wstudyNote` 里取，不是 `rows[i].id`。**
> 用错会导致「删了没反应」或「删错条目」。

### 其他字段

| 接口 | 字段 |
|---|---|
| `building/banner/list` | `id` / `title` / `imgUrl` / `sort` |
| `model/list` | `id` / `title` / `imgUrl` / `content` / `name` |
| `activity/list` | `activityName` / `applyNum` / `id` / `imgUrl` / **`initiator`** / `startEndTime` |
| `activity/{id}` | 上面全部 + `overTime`（截止）/ `activityDetail`（正文）|
| `data/comment/list_2` | `name` / `woman` / `man` |
| `read/book/list_1` | `name` / `value` |
| `read/book/list/type_1` | `name` / `count` / `data` |

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

### 🟡 心得「更改」还没接接口

现在有「更改」按钮，但只调了 `POST`（增加）和 `DELETE`（删除），**缺 `PUT`**：

```javascript
mui.ajax(http + '/api/history/note', {
    data: { noteId: noteId, noteTitle: newTitle, noteContent: newContent },
    headers: { 'Authorization': localStorage.getItem('token') },
    dataType: 'json',
    type: 'PUT',
    timeout: 10000,
    success: function (res) {
        if (res.code == 200) {
            mui.toast('修改成功');
            XingDeEEEList();        // ★ 重新拉列表
        }
    }
});
```

### 🟡 从详情页返回列表不刷新

**现象**：详情页报名成功 → 返回列表 → 报名人数还是旧的（所以页面上写了「报名后点击更新」）。

**修法 A（推荐）**：详情页 `beforeback` 通知列表页

```javascript
// GongYiXiangqing.html
mui.init({
    beforeback: function () {
        var opener = plus.webview.currentWebview().opener();
        if (opener) { mui.fire(opener, 'refresh'); }
        return true;                       // ★ 必须 true
    }
})

// gy.html
window.addEventListener('refresh', function () { loadGongYi(); })
```

**修法 B（更短）**：列表页监听 `show`

```javascript
plus.webview.currentWebview().addEventListener('show', function () {
    loadGongYi();
})
```

### 🟢 其他

- [ ] 宫格 `name` 改成真实功能名
- [ ] `home.html` 的标题「标题」改成「时代楷模」
- [ ] `exe/new_file.html`（375 B）空模板可删
- [ ] 打包 release 版 APK

## ⚠️ 说明

- 本仓库为**个人学习练习**，非生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- 所有图片均由接口返回，**不含本地图片素材**。
- MUI 版权归 [DCloud](https://www.dcloud.io/) 所有，采用 MIT 开源协议；
  ECharts 版权归 Apache 基金会。

## 📄 License

学习用途，代码可自由参考。
