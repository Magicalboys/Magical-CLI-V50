# magical-cli-v50

👉模板仓库地址：[magical-cli-v50](https://github.com/orgs/Magical-cli-v-1/repositories)

## 全局安装

`npm i -g magical-cli-v50`

## 常用命令

* `magcial create <project name>`: 创建项目
  
* For example： 

  * `mg create app`
  
  * `magcial create app`

## 选择模板
  
# [`election-template`](https://github.com/Magical-cli-v-1/electron-template-v50)

## 傻瓜式配置，直接将你的 web 页面变成 PC 端应用 🤺

### 配置

* `cnpm install` ，注意，这里最好用 `cnpm`.

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

### 通信

* 如果渲染进程（web项目）想与主进程（electron）通信咋办？

* 因为这里是分别进行的打包，所以没有办法在自己的项目使用electron提供的进程通信`ipcAPI`。

* 这里我们可以利用 `socket.io` 建立 `websocket` 连接,实现进程间通信.

* 此模板已经使用koa搭建了后台服务器，并发起了 socket.io 连接,详见`app/main/server.js`.

  ```
  // 1. 创建 app
  const koaApp = new Koa()

  koaApp.use((ctx, next) => {
    ctx.body = `服务器访问成功`
  })

  // 服务器端口号
  const server = koaApp.listen(8000, () => {
    console.log('electron 的服务器启动成功')
  })

  const io = socket(server, {
    cors: {
      // web 端 URL
      origin: "http://localhost:3000",
      credentials: true,
    },
  })

  module.exports = io;
  ```


* 所以你需要在你的 web项目 里执行下列步骤：
  
    * `socket.io-client`
    
    * 与服务器建立连接,（8000 是服务器的端口号）
    
    * 发布一个订阅
    
    ```
    import io from 'socket.io-client' 
    
    const socket = io('ws://localhost:8000');
    
    socket.emit('create-left-window');
    ```
 * 然后回到 electron 项目的 `app/main/index.js` 编辑监听事件的具体逻辑即可
    
 * 这里我写的是在左侧拓展屏创建一个新窗口并显示项目指定的路由页面,具体的实现逻辑可以再项目里看到.
 
   ```
    // TODO: 利用 socket.io 和 渲染进程 建立通信
    io.on('connection', (socket) => {
      socket.on('create-left-window', createLeftWindow);
    });
   ```

### 打包

* `npm run make`

* `exe` 文件 在打包出来的 `out\Magical-electron-template-win32-x64\Magical-electron-template.exe` 里面.










