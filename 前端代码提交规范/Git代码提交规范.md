### 分支命名规则

1. 生产分支 -- master，只允许将上线的代码进行推送，禁止在此分支上进行直接代码操作，如修改等
2. 预发分支 -- pre(项目暂无)
3. 测试分支 -- test
4. 线上修复分支以 hotfix 开头，如上线后有 bug 需要修复，请以 **master** 创建 **hotfix-xxx 功能-姓名缩写** 分支
5. 功能分支以 feature 开头

#### 功能分支 -- 开发新功能而创建

1. 单人开发：-- 禁用 **merge** 功能

- 命名方式：feature-功能名-姓名缩写，如：feature-userCenterModule-wy

2. 多人协作：-- 禁用 **merge** 功能

- 1. 以 master 分支创建公共分支，命名方式：feature-功能名-public，如：feature-userCenterModule-public -- **不允许在此分支上进行功能开发**
- 2. 每人以 public 分支创建自己的功能分支并在各自分支上进行开发，命名方式：feature-功能名-姓名缩写，如：feature-userCenterModule-wy
- 3. 功能开发完成后， 将各自的 feature 分支的 commitId **cherry-pick**到 public 分支上
- 4. 将 public 的 commitId **cherry-pick** 到 test 分支上

### 代码提交规范

1. commit message 主要分为七大类： -- git commit -m '功能前缀:具体内容'

| 功能前缀                       | 具体内容                    | 备注                                    |
| ------------------------------ | --------------------------- | --------------------------------------- |
| feat 新增功能                  | feat:新增用户中心添加功能   |
| fix 修改 bug 等                | fix:修复登录点击失败        |
| docs 文案、文档修改            | docs:修改文案               |
| style 样式修改                 | style:修改按钮样式          |
| test：增加测试                 |                             |
| refactor 重构                  |                             | 不是新增功能，也不是修改 bug 的代码改动 |
| chore 构建过程或辅助工具的变动 | chore:修改 webpack 某某功能 |

### 上线前的准备

1. 单人开发： 以自己的 **feature** 功能分支 **rebase** **master** 分支，并通知有操作权限(master 分支)的同事进行上线前的代码推送
2. 多人协作：将各自 **feature** 功能分支 **rebase** 同一功能的 **public** 分支，并通知有操作权限(master 分支)的同事进行上线前的代码推送
