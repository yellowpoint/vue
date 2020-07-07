# 物资管理系统
项目负责人：常州-_陈默，在QQ群797192690里。

项目预览地址：[wuzi.m3w.cn](https://wuzi.m3w.cn) 体验账户用户名：13800138000；密码：123456。此地址为测试体验地址，具体某单位上线时，需要单独部署。

本项目是基于木兰宽松许可证的开源项目，代码全部开源，开发者可自由使用其中的代码，自己部署相关的系统。

![image-20200215100538381](README.assets/image-20200215100538381.png)

#### 介绍
新型冠状病毒疫情期间抗疫相关物料的管理系统，领用、派发记录，库存查询统计。

#### 功能
物资入库：包括捐赠物资、上级下拨物资、自行采购物资

物资发放：物资直接发放、物资发放型号、数量、领取时间、领取人信息

物资库存：查看物资剩余库存

#### 界面及其详细功能细节

[初步详细设计界面](https://free.modao.cc/app/587de5304407459d3e4b163cd97ae854d56bb7ab)

##  项目运行说明

1. 下载HBuilderX

本项目需要HBuilderX 2.5.11以上版本才能运行。**切记看清版本号，要最新alpha版**

[下载地址]((https://www.dcloud.io/hbuilderx.html))

![输入图片说明](https://images.gitee.com/uploads/images/2020/0213/022916_c822f4df_1628277.png "hx下载.png")

下载时选alpha版。然后根据自己的操作系统下载，下载标准版即可，运行项目时会自动安装依赖的插件。

HBuilderX是绿色的，Windows版解压后直接运行里的HBuilderX.exe即可。

2. 拉取项目源码

从本项目中复制git地址：[https://gitee.com/dcloud/material_management.git](https://gitee.com/dcloud/material_management.git)

在HBuilderX中点菜单文件-导入，选择从git导入，粘贴刚才复制的git地址。




#### 运行和部署

本项目需要HBuilderX 2.5.10以上版本才能运行。

项目需要注册和开通uniCloud，因阿里云审核要求，需要实名认证。

拉取项目源码后，对cloudfunctions目录点右键，选择你的服务空间。如果没有服务空间，需要创建，创建时会引导登录和注册uniCloud。

修改 manifes.json 中的 DCloud_AppID 为自己的。

配好服务空间后，请根据项目下的db.md文件，在你的云数据库中创建相应的表。具体方式是对cloudfunctions目录点右键，打开uniCloud web控制台，在里面的云数据库界面点击新建表，表名里把db.md涉及的表名都创建一遍（只需要表名，不需要创建数据结构）。

对每个云函数点右键，上传并部署到你的服务空间中。

最后，可以运行了。运行到内置浏览器或小程序、app都可以。