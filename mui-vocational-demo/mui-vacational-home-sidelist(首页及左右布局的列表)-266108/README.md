# MUI 移动端练习项目（中职移动应用与开发赛项）

> 个人练习 Demo —— 用 MUI 框架做的移动端页面练习，覆盖轮播图、登录、双列列表、跨页传参等常见题型。

很菜喵，慢慢来 OVO，有路过的大佬愿意指点两句就太感谢了 ^_^

---

## 📱 页面功能

| 页面 | 文件 | 说明 |
|---|---|---|
| 登录页 | `index.html` | 账号密码输入、非空校验、`localStorage` 存 token、跳转主框架 |
| 主框架 | `exe/page.html` | 底部 Tab 切换 |
| 首页 | `exe/home.html` | 轮播图（循环播放 + 圆点指示器）、九宫格入口、新闻列表 + 查看更多分页 |
| 双列列表 | `exe/ylsj.html` | 左右两列排版布局 |
| 空模板 | `exe/new_file.html` | 新页面模板 |

## 🛠 技术栈

- **HTML5 / CSS3 / JavaScript**（原生，无构建工具）
- **MUI**（DCloud 移动端 UI 框架）
- **Ajax**：`mui.ajax` 调用 RESTful 接口，请求头带 `Authorization` token
- 打包：HBuilderX

## 📂 目录结构

```
.
├── index.html            登录页（入口）
├── manifest.json         HBuilderX App 配置
├── exe/
│   ├── page.html         主框架（底部导航）
│   ├── home.html         首页
│   ├── ylsj.html         双列列表
│   └── new_file.html     新页面模板
├── css/
│   ├── mui.css
│   └── mui.min.css
├── js/
│   ├── mui.js            MUI 框架本体
│   ├── mui.min.js
│   └── http.js           服务器地址配置（需自己填，见下）
└── fonts/
    └── mui.ttf           图标字体
```

## 🚀 本地运行

### 1. 打开项目

用 **HBuilderX** 打开本文件夹（不要打开里面的单个文件），
然后「运行 → 运行到手机或模拟器」。

也可以直接用浏览器打开 `index.html`，但底部 Tab 等原生能力需要真机/模拟器。

### 2. 配置服务器地址

本项目**不包含任何真实服务器地址**（已做脱敏）。运行前请编辑 `js/http.js`：

```javascript
var API_BASE = 'http://YOUR_SERVER_HOST:PORT';
```

替换成你自己的接口服务器地址，例如：

```javascript
// 浏览器调试
var API_BASE = 'http://127.3.2.1:8080';
// 模拟器 / 真机（用本机局域网 IP）
var API_BASE = 'http://1922.133.13.120:8080';
```

> ⚠️ `API_BASE` 同时用于**调接口**和**显示图片**。如果你的后端图片路径还有额外前缀，
> 按你的实际约定调整代码里的拼接方式即可。

### 3. 接口约定

所有请求返回结构一般为：

```json
{ "code": 200, "msg": "操作成功", "rows": [ ... ], "total": 10 }
```

需要认证的接口在请求头带：

```javascript
headers: { 'Authorization': localStorage.getItem('token') }
```

## ⚠️ 说明

- 本仓库为**个人学习练习**，代码风格以「能跑通、看得懂」为主，不是生产级代码。
- 仓库内**不含**任何赛项原始资料、接口文档或真实服务器地址。
- MUI 框架版权归 [DCloud](https://www.dcloud.io/) 所有，此处仅作学习使用。

## 📄 License

学习用途，代码可自由参考。MUI 框架遵循其自身开源协议。
