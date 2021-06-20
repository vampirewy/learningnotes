<!--
 * @Author: your name
 * @Date: 2020-08-13 10:35:46
 * @LastEditTime: 2021-06-20 16:03:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/git/git.md
-->
### Git相关命令行

#### 克隆

```javascript
// https 协议
git clone https协议对应的远程仓库地址

// SSH协议
git clone SSH协议对应的远程仓库地址

// 克隆指定分支， -b 指定分支名字，实际上是克隆所有分支并切换到 develop 分支上
git clone -b develop https协议对应的远程仓库地址

// --single-branch 完全只克隆指定分支
git clone -b develop --single-branch https协议对应的远程仓库地址

// 指定克隆后的文件夹名称
git clone https协议对应的远程仓库地址 git-study # 如果后面是 . 在当前目录创建

// 递归克隆，如果项目包含子模块就非常有用
git clone --recursive SSH协议对应的远程仓库地址

// 克隆深度为1, 只克隆指定分支, 历史记录只克隆最后一条, 减少克隆时间
git clone --depth=1 https协议对应的远程仓库地址
```

#### 创建分支并切换到当前创建的分支

```javascript
// 创建分支
git branch <branchName>

// 切换到新创建的分支
git checkout <branchName>

//创建并切换到这条分支
git checkout -b <branchName>
```

#### 创建分支后拉取远程分支

```javascript
git pull --rebase origin master
```

#### 新建分支推送时与远程分支建立关联

```javascript
git push --set-upstream origin <branchName> //一般与本地同名
git push -u origin <branchName>
```

#### 删除本地分支和远程分支

```javascript
// 删除本地分支
git branch -d <branchName>
git branch -D <branchName> //删除远程分支后，想删除本地分支需执行 -D

//删除远程分支
git push --delete origin <branchName>
```

#### 查看所有分支

```javascript
git branch -a
```

#### 查看本地分支与远程分支关联情况

```javascript
git branch -vv
```

#### 查看提交日志

```javascript
//查看不了全部的提交记录
git log
//只显示提交信息的第一行
git log --pretty=short
//显示指定文件提交日志
git log README.md
//显示文件的改动
git log -p 文件名(可以看查这个文件的改动记录)
//查看更清晰的提交记录
git log --graph
//查看所有提交的记录
git reflog
//显示所有历史操作，找到你需要的提交（包括已经被删除的commit记录，git log则不能察看已经删除了的commit记录）
git log -g
```

#### cherry-pick 撛选(意义?只是让提交记录更直观?)

```javasrctip
//只需单个commit id
git cherry-pick commitId
//多个commit id
git cherry-pick commitId1^..commitId100 //等同于从1~100的提交记录
git cherry-pick commitId1..commitId100 //等同于从2~100的提交记录，不包头包尾
```

#### 压缩历史commitId号

```javascript
//合并多个提交点，可以去除无意义的提交记录
git rebase -i
```

#### merge和rebase 提交合并分支

1. git rebase 的目的也是将一个分支的更改并入到另外一个分支中去

```json
// 如先切换至master,拉取最新的代码，然后切换回自己需要合并的当支，如feature-test1.0-w，再执行下方操作
git rebase master //默认当前分支
```

#### 切换分支的时候，创建分支，这个创建的分支会copy上一个切换过来的分支内容

```javasript
//解决方案 创建并切换分支，拉取远程仓库代码
//分支 'aaaaa' 设置为跟踪来自 'origin' 的远程分支 'test',并切换到一个新分支 'aaaaa'
git checkout -b <branchName> origin/<branchName>
//创建并切换分支，拉取本地仓库代码，后一个是本地另一个仓库，如test
git checkout -b <branchName> <branchName>h
//如:分支'aaaaa' 设置为跟踪来自 'origin' 的远程分支 'test'
git branch <branchhName> origin/<branchName>
```

#### 文件贮茂

```javascript
//把本地的修改暂存起来
git stash 
//在暂存的时候备注上Message
git stash save "添加message信息"
//取出被暂存的文件
git satsh apply
//查看现有多少暂存记录(列表)
git stash list
//删除所有被暂存的记录
git stash clear
//应用最近一次暂存的修改，并删除暂存的记录
git stash pop
//删除最新一次的暂存记录
git stash drop
```
