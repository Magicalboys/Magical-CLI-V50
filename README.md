# Magical-CLI-V50

**👉模板仓库地址：[magical-cli-v50](https://github.com/orgs/Magical-cli-v-1/repositories)**

## 全局安装

`npm i -g magical-cli-v50`

## 常用命令

* `mg / magcial create <project name>`: 创建项目
  
* For example： 

  * `mg create app`
  
  * `magcial create app`

## 选择模板
  
## [`election-template`](https://github.com/Magical-cli-v-1/electron-template-v50)

### 傻瓜式配置，将你的 web 页面秒变 PC 端应用 🤺

### 配置

* `cnpm install` ，注意，这里最好用 `cnpm`

* 在 `app/main/index.js` 文件夹找到 `http://localhost:3000/` 直接替换为你自己项目的 web页面 `URL`
  ```
  // 创建一个变量来保存主窗口实例
  let win;

  // TODO: 创建主窗口
  const createWindow = () => {

    // TODO: 需要嵌入的web页面的 URL
    win.loadURL('http://localhost:3000/')

  }
  ```

### 启动

* 先在自己的项目执行 `npm run start`（如果是已经部署的就不需要了）

* 然后在此项目执行   `npm run start` 

### 打包

* `npm run park`










