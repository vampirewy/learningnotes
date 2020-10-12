# 在CentOs用Docker安装MongoDB

1. docker search mongo，选择第一个官方的镜像![search mongo](img/dockersearchmongo.png)
2. 拉取镜像 docker pull mongo
3. 开启身份验证启动容器![开启身份验证启动容器](img/dockerrunmongo.png)
4. 以管理员身份进入mongo内部 **docker exec -it mongo mongo admin**
5. 创建管理员帐号 **db.createUser({ user: 'admin', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });**
6. 身份授权 **db.auth('admin','123456')**,如果显示1，说明授权成功
7. 查看现在在哪个database **db**
8. 查看所有database **show dbs 或者 show databases**
9. 创建数据库 **use blog**，如果这个库存在则直接切换，如果不存在，则会自动创建
10. 在blog数据库下创建新用户 **db.createUser({ user: 'test', pwd: '123456', roles: [ { role: "readWrite", db: "blog" } ] });**
