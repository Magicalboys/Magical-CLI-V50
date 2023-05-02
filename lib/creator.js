// Creator.js

const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");
const util = require("util");
const path = require("path");
const { loading } = require("./util");
const { getMagicalRepo, getTagsByRepo } = require("./api");

class Creator {
  // 项目名称及项目路径
  constructor(name, target) {
    this.name = name;
    this.target = target;
    // download-git-repo 模块并不支持 Promise 
    // 需要借助 node 的 util 模块提供的 promisify 方法将其转化为支持 Promise 的方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);

  }
  // 创建项目部分
  async create() {
    // 仓库信息 —— 模板信息
    let repo = await this.getRepoInfo();
    // 标签信息 —— 版本信息
    // let tag = await this.getTagInfo(repo);
    // 下载模板
    // await this.download(repo, tag);
    await this.download(repo);

    console.log(this.name, this.target);
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`);
    console.log("  npm install");
    console.log("  npm run serve\r\n");
  }

  // 获取模板信息及用户最终选择的模板
  async getRepoInfo() {
    // 获取组织下的仓库信息
    let repoList = await loading(
      "waiting for fetching template",
      getMagicalRepo
    );
    if (!repoList) return;
    // 提取仓库名
    const repos = repoList.map((item) => item.name);
    // 选取模板信息
    let { repo } = await new inquirer.prompt([
      {
        name: "repo",
        type: "list",
        message: "Please choose a template",
        choices: repos,
      },
    ]);
    return repo;
  }
  // 获取版本信息及用户选择的版本
  async getTagInfo(repo) {
    let tagList = await loading(
      "waiting for fetching version",
      getTagsByRepo,
      repo
    );
    if (!tagList) return;
    const tags = tagList.map((item) => item.name);
    // 选取模板信息
    let { tag } = await new inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "Please choose a version to create project",
        choices: tags,
      },
    ]);
    return tag;
  }

  // async download(repo,tag) {
  async download(repo) {
    // 模板下载地址
    // const templateUrl = `Magical-cli-v-1/${repo}${tag ? "#" + tag : ""}`;
    const templateUrl = `Magical-cli-v-1/${repo}`;
    // 调用 downloadGitRepo 方法将对应模板下载到指定目录
    await loading(
      "downloading template, please wait",
      this.downloadGitRepo,
      templateUrl,
      path.resolve(process.cwd(), this.target) // 项目创建位置
    );
  }

}

module.exports = Creator;