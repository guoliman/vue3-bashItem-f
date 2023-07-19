<p align="center">
    <img src="https://img.shields.io/badge/Vue-3.3.1-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-4.3.5-green.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.3.6-blue.svg"/>
    <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
    <a href="https://gitee.com/youlaiorg" target="_blank">
        <img src="https://img.shields.io/badge/Author-gavin-orange.svg"/>
    </a>
</p>

## 项目介绍

[vue3-bashItem](https://gitee.com/youlaiorg/vue3-element-admin) 是基于 Vue3 + Vite4 + TypeScript5 + Pinia + Element-Plus 等最新主流技术栈构建的后台管理前端模板（配套后端源码）。

项目有以下特性：

- 基于 vue-element-admin 升级到 vue3 版本，无自定义封装，易上手，减少学习成本。
- 权限系统功能齐全，包括用户管理、角色管理、菜单管理、字典管理和部门管理等，以满足您对权限管理的需求。
- 项目还提供了基础设施支持，包括动态路由、按钮级别的权限控制、国际化支持、代码规范、Git 提交规范以及常用组件的封装，以便开发人员更高效地开发和维护项目。

## 项目预览

<!-- - **在线预览**： [https://vue3.youlai.tech/](https://vue3.youlai.tech/) -->

- **控制台**

 ![暗黑模式](https://s2.loli.net/2023/03/13/QvjY4zf3VCGteNF.png)

- **权限管理系统**

 | ![用户管理](https://s2.loli.net/2023/03/13/L9xgT5sSMVZukQj.png) | ![image-20230313003008012](https://s2.loli.net/2023/03/13/nQg6HmrtFUkPDYv.png) |
 | --- | --- |
 | ![image-20230313003028425](https://s2.loli.net/2023/03/13/C4fDRJeTuUO7gPI.png) | ![字典管理](https://s2.loli.net/2023/03/13/BzqjHpa64wfeWhE.png) |

<!-- ## 项目地址

| 项目 | Gitee | Github |GitCode |
| --- | --- | --- | --- |
| 前端 | [vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin) | [vue3-element-admin](https://github.com/youlaitech/vue3-element-admin) |[vue3-element-admin](https://gitcode.net/youlai/vue3-element-admin)|
| 后端 | [youlai-boot](https://gitee.com/youlaiorg/youlai-boot) | [youlai-boot](https://github.com/haoxianrui/youlai-boot.git) |[youlai-boot](https://gitcode.net/youlai/youlai-boot)| -->

## 环境准备

|     环境     | 名称版本    | 备注            |
| ----------- | :-------- | --------------|
| **开发工具**         | VSCode       | [下载地址](https://code.visualstudio.com/Download)                                                            |
| **运行环境**         | Node 16+                 |  [下载地址](http://nodejs.cn/download)   |
| **VSCode插件(必装)** | 1. `Vue Language Features (Volar)` <br/> 2. `TypeScript Vue Plugin (Volar)`  <br/>3. 禁用 Vetur | ![image-20230224222541797](https://s2.loli.net/2023/02/24/Qt4XDGHFOWqfsyB.png) |

## 项目启动

```bash
# 克隆代码
git clone https://github.com/guoliman/vue3-bashItem-f.git

# 安装 pnpm
npm install pnpm -g

# 安装依赖
pnpm install

# 启动运行
pnpm run dev
```

## 项目部署

```bash
# 项目打包
pnpm run build:prod

# 上传文件至远程服务器
将打包生成在 `dist` 目录下的文件拷贝至 `/usr/share/nginx/html` 目录

# nginx.cofig 配置
server {
 listen     80;
 server_name  localhost;
 location / {
   root /usr/share/nginx/html;
   index index.html index.htm;
 }
 # 反向代理配置
 location /prod-api/ {
   proxy_pass http://127.0.0.1:8888/; # 替换成你的后端API地址
 }
}
```

## 注意事项

- **自动导入插件自动生成默认关闭**

  模板项目的组件类型声明已自动生成。如果添加和使用新的组件，请按照图示方法开启自动生成。在自动生成完成后，记得将其设置为 `false`，避免重复执行引发冲突。

  ![](https://s2.loli.net/2023/06/03/lrcsHzInYV6wWqo.png)

- **项目启动浏览器访问空白**

  请升级浏览器尝试，低版本浏览器内核可能不支持某些新的 JavaScript 语法，比如可选链操作符 `?.`。

- **项目同步仓库更新升级**

  项目同步仓库更新升级之后，建议 `pnpm install` 安装更新依赖之后启动 。
