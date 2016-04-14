# 开始
#### 1、clone 代码到本地

```bash
git clone git@git.coding.net:hxhxiao/company_manage.git
```

#### 2、下载最新的 `develop` 分支到本地，并切换到 `develop` 分支

```bash
git fetch origin develop:develop
git checkout develop
```


#### 3、初始化 `git flow` 工作流（一路回车）

```bash
git flow init
```

#### 4、开始你自己的功能分支（`版本号 / 用户名缩写大写 / 功能名`）

```bash
git flow feature start 1.0.0.0/HXH/initProject
```

接下来你就可以进行开发了...

#### 5、在合并到 `develop` 分支之前，你的工作分支都是自己的功能分支，每次完成功能片段后，都应该做一次提交：

```bash
git add .
git add -u
git commit -m '提交说明'
git push origin 1.0.0.0/HXH/initProject
```

# 开发环境

#### 1、安装环境依赖的 npm 包

```bash
npm install
```

#### 2、启动服务器

```bash
pm2 start app.js  --watch
```
`pm2` 是一个可以在后台运行的 node 服务器，加上 `--watch` 参数后可以监控文件变化，不必重启服务器。

如果遇到程序报错，看不到错误信息，则需要切换到普通的 node 服务器

```bash
pm2 delete app.js
node app.js
```

#### 3、启动文件监控

由于 `sass` 文件和 js es6 文件需要打包编译，所以要在修改这些文件后即使编译才能看到效果：

```bash
npm run watch
```

如果上面的监控未能正确运行或者遇到意外退出，重新执行

```bash
npm run build
```
上面的命令会编译所有的任务


# 完成功能分支

完成当前的功能分支后，我们需要将其合并到 `develop` 和 `master` 分支。

合并当前功能分支到 `develop` 分支上，同时保留功能分支，并且切换到 `develop` 分支。

`-k`：保留当前功能分支

```bash
git flow feature finish -k 1.0.0.0/HXH/initProject
```


# 发布版本

#### 1、创建一个 `release/v1.0.0.0` 分支，并且切换到该分支
```bash
git flow release start v1.0.0.0
```
注意： 在远端的分支中查看最新的 release 版本号，确保不重复



#### 2、然后在这里进行测试。如果测试没问题，则将该分支推送到远端进行备份：

```bash
git push origin release/v1.0.0.0
```

#### 3、完成发布

将该发布分支的内容合并到 `master` 分支和 `develop` 分支，并且打上 tag `v1.0.0.0`，最后切换到 `master` 分支

```bash
git flow release finish -k -m '发布信息' v1.0.0.0
```

现在我们可以通过 `git tag` 命令查看到上面的命令创建的 tag

#### 4、将本地 `master` 和 `develop` 分支 和 release tag 推送到远端

```bash
git push origin matser
git push origin develop
git push origin v1.0.0.0
```
 
#### 5、冲突解决

在上面的 `push` 操作之前，为了避免冲突，可以先 `fetch` 远端的分支到本地，再合并。

比如在推送 `develop` 分支的时候：

```bash
git checkout develop
git fetch origin develop:tmp
git merge tmp
git push origin develop
```
