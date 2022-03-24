# 代码模板——制造业备件出入库集成到钉钉

## 1. 背景介绍
对于大型制造业企业，备件库管理在售后服务中是至关重要的一个环节。备件库管理者按需采购备件，避免库存积压，降低公司采购成本，同时确保服务人员及时领取备件，快速响应客户售后服务。

## 2. 项目结构

> **fronted**：前端模块，使用vue构建，主要功能有：接入钉钉JSAPI获取authCode、构建工单、获取部门列表。
>
> **backend**：后端模块，使用springboot构建，主要功能有：使用authCode获取access_token、使用access_token获取用户信息、jsapi鉴权、发送工作通知等。

以下为目录结构与部分核心代码文件：

```
.
├── README.md     ----- 说明文档
├── backend
│   ├── dingBoot-linux.sh     ----- 启动脚本（linux）
│   ├── dingBoot-mac.sh    ----- 启动脚本（mac）
│   ├── dingBoot-windows.bat     ----- 启动脚本（windows）
│   ├── pom.xml
│   └── src
│     └── main
│         ├── java
│         │   └── com
│         │       └── dingtalk
│         │           ├── Application.java     ----- 启动类
│         │           ├── config
│         │           │   └── AppConfig.java     ----- 应用配置类
│         │           ├── controller
│         │           │   └── BizController.java     ----- 核心业务接口
│         │           └── service
│         │               └── BizManager.java     ----- 核心业务代码
│         └── resources
│             └── application.yml     ----- 应用配置文件
├── frontend
│   └── src     ----- 前端展示页面和交互代码
└── pom.xml
```

## 研发环境准备

1. 需要有一个钉钉注册企业，如果没有可以创建：https://oa.dingtalk.com/register_new.htm#/

2. 成为钉钉开发者，参考文档：https://developers.dingtalk.com/document/app/become-a-dingtalk-developer

3. 登录钉钉开放平台后台创建一个H5应用： https://open-dev.dingtalk.com/#/index

4. 配置应用

   配置开发管理，参考文档：https://developers.dingtalk.com/document/app/configure-orgapp

   - **此处配置“应用首页地址”需公网地址，若无公网ip，可使用钉钉内网穿透工具：**

     https://developers.dingtalk.com/document/resourcedownload/http-intranet-penetration

![image-20210706171740868](https://img.alicdn.com/imgextra/i4/O1CN01C9ta8k1L3KzzYEPiH_!!6000000001243-2-tps-953-517.png)



配置相关权限：https://developers.dingtalk.com/document/app/address-book-permissions

本demo使用接口相关权限：

- “通讯录部门信息读权限”
- “通讯录部门成员读权限”
- “成员信息读权限”
- “审批流数据管理权限”

![image-20210706172027870](https://img.alicdn.com/imgextra/i3/O1CN016WCr6428wDdBhkWi6_!!6000000007996-2-tps-1358-571.png)

## 脚本启动（推荐）

### 脚本说明

脚本中内置了内网穿透工具，不需要再额外启动

```shell
dingBoot-linux.sh     # linux版本
dingBoot-mac.sh       # mac版本
dingBoot-windows.bat  # windows版本
```

### 启动命令

执行时将其中参数替换为对应的应用参数，在backend目录下执行（脚本同级目录），参数获取方法：

1. 获取corpId——开发者后台首页：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

- **启动linux脚本**

```shell
./dingBoot-linux.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **mac系统(mac m1芯片暂不支持)**

```shell
./dingBoot-mac.sh start {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```
- **windows系统 使用cmd命令行启动**

```shell
./dingBoot-windows.bat {项目名} {端口号} {appKey} {appSecret} {agentId} {corpId}
```

- **示例（linux脚本执行）**

```sh
 ./dingBoot-linux.sh start h5-demo 8080 ding1jmkwa4o19bxxxx ua2qNVhleIx14ld6xgoZqtg84EE94sbizRvCimfXrIqYCeyj7b8QvqYxxx 122549400 ding9f50b15bccd1000
```

### 启动后配置

1. **配置地址**

启动完成会自动生成临时域名，配置方法：进入开发者后台->进入应用->开发管理->应用首页地址和PC端首页地址

2. **发布应用**

配置好地址后进入“版本管理与发布页面”，发布应用，发布后即可在PC钉钉或移动钉钉工作台访问应用

## 手动启动

### 下载本项目至本地

```shell
git clone https://github.com/open-dingtalk/h5app-equipment-terminal-dingtalk-repair-demo.git
```

### 获取相应参数

获取到以下参数，修改后端application.yaml

```yaml
app:
  app_key: *****
  app_secret: *****
  agent_id: *****
  corp_id: *****
```

参数获取方法：登录开发者后台

1. 获取corpId：https://open-dev.dingtalk.com/#/index
2. 进入应用开发-企业内部开发-点击进入应用-基础信息-获取appKey、appSecret、agentId

### 修改前端页面

**打开项目，命令行中执行以下命令，编译打包生成build文件**

```shell
cd front-end
npm install
npm run build
```

**将打包好的静态资源文件放入后端**

![image-20210706173224172](https://img.alicdn.com/imgextra/i2/O1CN01QLp1Qw1TCVrPddfjZ_!!6000000002346-2-tps-322-521.png)

### 启动项目

- 启动springboot
- 移动端钉钉点击工作台，找到应用，进入应用

### 页面展示

应用首页
![](https://img.alicdn.com/imgextra/i2/O1CN01VWGonw1rt9ZAxEkQQ_!!6000000005688-2-tps-800-463.png)

审批列表
![](https://img.alicdn.com/imgextra/i4/O1CN01Am1kKy1GsZHEdv5qR_!!6000000000678-2-tps-800-471.png)

可选备件
![](https://img.alicdn.com/imgextra/i3/O1CN01T3rrMW1SLqMmz3Ug3_!!6000000002231-2-tps-800-459.png)

发起审批
![](https://img.alicdn.com/imgextra/i2/O1CN01rdHc5R1gmmHRCNJ6x_!!6000000004185-2-tps-800-474.png)

发起审批
![](https://img.alicdn.com/imgextra/i2/O1CN01rdHc5R1gmmHRCNJ6x_!!6000000004185-2-tps-800-474.png)

审批页面
![](https://img.alicdn.com/imgextra/i4/O1CN01fEyrIS1vQXHjObdVz_!!6000000006167-2-tps-800-510.png)

审批通过查看
![](https://img.alicdn.com/imgextra/i3/O1CN014S2LyW2855kDckdBw_!!6000000007880-2-tps-800-458.png)

### **参考文档**

1. 获取企业内部应用access_token，文档链接：https://open.dingtalk.com/document/orgapp-server/obtain-orgapp-token
2. 通过免登码获取用户信息，文档链接：https://open.dingtalk.com/document/orgapp-server/obtain-the-userid-of-a-user-by-using-the-log-free
3. 获取部门用户基础信息：https://open.dingtalk.com/document/orgapp-server/queries-the-simple-information-of-a-department-user
4. 创建或更新审批模板，文档链接：https://open.dingtalk.com/document/orgapp-server/save-approval-template
5. 获取模板code，文档链接：https://open.dingtalk.com/document/orgapp-server/obtains-the-template-code-based-on-the-template-name
6. 创建实例，文档链接：https://open.dingtalk.com/document/orgapp-server/initiate-an-approval-process-without-a-process
7. JSAPI鉴权，文档链接：https://open.dingtalk.com/document/orgapp-client/jsapi-authentication
8. PC端选择企业内部的人，文档链接：https://open.dingtalk.com/document/isvapp-client/on-the-pc-select-the-person-in-the-enterprise
9. 创建待办事项，文档链接：https://open.dingtalk.com/document/orgapp-server/create-a-to-do-task
10. 更新待办状态，文档链接：https://open.dingtalk.com/document/orgapp-server/update-to-do-task-status
