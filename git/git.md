<!--
 * @Author: your name
 * @Date: 2020-08-13 10:35:46
 * @LastEditTime: 2020-08-13 11:14:57
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
```

#### 删除本地分支和远程分支

```javascript
// 删除本地分支
git branch -d <branchName>
git branch -D <branchName> //删除远程分支后，想删除本地分支需执行 -D

//删除远程分支
git push --deleta origin <branchName>
```

#### 查看所有分支

```javascript
git branch -a
```

#### 查看本地分支与远程分支关联情况

```javascript
git branch -vv
```
