<!--
 * @Author: your name
 * @Date: 2020-06-24 09:08:19
 * @LastEditTime: 2020-06-24 19:34:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learningnotes/整理/一个URL的请求过程.md
-->

### 一个 URL 请求过程的步骤

#### 浏览器缓存[缓存相关内容](./性能优化.md)

假设当这个 URL 非第一次请求，会触发浏览器缓存策略；如果是第一次请求的话，会直接从服务器拉取

#### DNS 域名解析

> DNS，全名 Domain Name System，域名系统的英文缩写。将域名与 IP 地址相映射的分布式数据库

作用：根据域名查出与之对应的 IP 地址

#### 建立 TCP/IP(面向连接) 连接

1. TCP 三次握手
2. TCP 四次挥手

#### HTTP 请求与响应

#### 浏览器获得资源并渲染页面

#### 浏览器请求获取其他资源

#### 关闭 TCP/IP 连接
