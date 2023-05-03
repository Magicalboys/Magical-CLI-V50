#!/usr/bin/env node

// 导入命令行指令配置
const program = require("commander");

// 导入命令行样式美化工具
const chalk = require("chalk")

// 导入交互式工具
const inquirer = require("inquirer")

// 导入loading效果
const ora = require('ora')

// 导入生成ASCII的艺术字工具
const figlet = require('figlet')

// 生成艺术字
console.log(
  "\r\n" +
    figlet.textSync("magical", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 50,
      whitespaceBreak: true,
    })
);

// 设置 --help 的提示信息
program
      // 版本信息
      .version(`magical-cli ${require("../package.json").version}`)

      // cli 名称
      .name("Hello!")

      // --help 第一行提示
      .usage(`I am a magical cli`);

// 配置 create 命令

program
      .command("create <project-name>")
      .description("create a new project")
      .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
      .action((projectName, cmd) => {
        // 引入 create 模块，并传入参数
        require("../lib/create.js")(projectName, cmd);
      });
// 配置 config 命令
// program
//       .command("config [value]") // config 命令
//       .description("inspect and modify the config")
//       .option("-g, --get <key>", "get value by key")
//       .option("-s, --set <key> <value>", "set option[key] is value")
//       .option("-d, --delete <key>", "delete option by key")
//       .action((value, keys) => {
//         // value 可以取到 [value] 值，keys会获取到命令参数
//         console.log(value, keys);
//       });

// 监听 --help 指令
program.on("--help", function () {
  // 前后两个空行调整格式，更舒适
  console.log();
  console.log(
    `For example:\n  ${chalk.cyan(
      "mg     "
    )}  ${chalk.green(
      "create app"
    )}\n  ${chalk.cyan(
      "magical"
    )}  ${chalk.green(
      "create app"
    )}`
  );
  console.log();
});

// 解析用户执行时输入的参数
program.parse(process.argv);

// 测试 chalk
// console.log(`${chalk.blue("Hello Dear!")}`);

// console.log(chalk.blue.bgYellowBright.bold("Hello world!"));

// console.log(
//   chalk.green(
//     "I am a green line " +
//       chalk.red.underline.bold("with a blue substring") +
//       " that becomes green again!"
//   )
// )

// 交互式功能实现

// const prompts = [
//   {
//       "name": "features", // 选项名称
//       "message": "Check the features needed for your project:", // 选项提示语
//       "pageSize": 10,
//       "type": "list", // 选项类型 另外还有 confirm list 等
//       "choices": [ // 具体的选项
//           {
//               "name": "Babel",
//               "value": "babel",
//               "short": "Babel",
//               "description": "Transpile modern JavaScript to older versions (for compatibility)",
//               "link": "https://babeljs.io/",
//               "checked": true
//           },
//           {
//               "name": "Router",
//               "value": "router",
//               "description": "Structure the app with dynamic pages",
//               "link": "https://router.vuejs.org/"
//           },
//       ]
//   }
// ]

// inquirer.prompt(prompts).then((data) => {
//   console.log(data);
// });



// // 定义一个loading
// const spinner = ora("Loading unicorns");

// // 启动loading
// spinner.start();

// setTimeout(() => {
//   spinner.color = "yellow";
//   spinner.text = "Loading rainbows";
// }, 1000);

// // loading 成功
// spinner.succeed();
// // loading 失败
// spinner.fail();

