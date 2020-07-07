# 物资下发管理系统 数据库(初稿)
#用户管理表
#物资类别表
#物资库存表
#物资领取表
#单位列表

#图标色：1296db

#### 用户表
```
user
{
    _id: "", // string，自生成 用户唯一标识，注册时生成无法修改
	_ids:"",//用户编号
    photo: "", // string 图片url地址
    username: "", // string 用户
	company:"",//string 所属单位 JSON
	section:""//所属部门 JSON
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    id_card: "", // string 身份证号，需验证符合规则
    sname: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    status: 0, // int 0正常 1冻结
    permission: 0, int 默认0，9超级管理员, 1普通管理员, 0普通
	power:"" //string 权限。（"1，3，4，5"）权限字符
    create_time: 0,// 时间戳 GMT
    create_ip: "",// 注册 ip
	
}
```
#### 单位列表
```
company
{
    _id: "", // string，自生成  单位ID
    _ids:"", // string 编号
    compname: "", // string 单位名称
    jname:"",//单位简称
    contacts:"",//负责人
    tel:"",//联系电话
    cpaddress:"",
    cplogo:"",
    desc:"",//备注说明
    indexs:"",//顺序
    create_time: 0// 时间戳 GMT	
}
暂时作废	address: {country: 0, province: 0, city: 0, district: 0, street: ""}
```

#### 权限表
```
powerlist
{
    _id: "", // string，自生成
    powerid: "", // int 权限标识ID
    powername: "", // string 权限名称
	
}
```

#### 审批表
```
approvallist
{
    _id: "", // string，自生成
    guidid: "", // int 用户标识ID
    materoutid: "", // string 物资id
}
```




#### 单位部门表
```
department
{
    _id: "", // string，自生成
	_ids:"", // string 编号
	company:"",//JSon
    compid: "", // string 单位ID
	section:"",//部门名称
	desc:"",//备注
	indexs:"",//顺序
}
```

#### 物资类别表
```
materialtype
{
    _id: "", // string，自生成
	_ids:"", //string 类别编号 1001 1002
	titles:""类型名称
	indexs:0位置排列
	
}
作废    types_id:"",//物资类型 （类似主键 1 2 3 4 5 6）
```

#### 物资资料
```
materModel
{
    _id: "", // string，自生成
	_ids:"", //string 物资编号
	materType:"",物资类型Json
    types_id:"",//物资类型ID materialtype 里的_id
	mat_title:"",//物资名称
	mat_img:"",物资图片
	unit:"",//单位  （计量单位）
	model:"",//型号（物料规格）
	manufacturer:"",//生产厂家
	bar_code_number:"",//物资条码
	indexs:"",   //物资排序1，2，3 ，4 升序	
	mat_number:"",库存数量
	mat_des:"",物资说明
	mat_regtime:""第一次入库时间
	mat_lasstime:""最后一次入库时间
	
	
}

	暂时作废model_id:""唯一标识
```
#### 物资状态表
```
materout_tions
{
    _id: "", // string，自生成
    tions: "", // int 状态编号 1，2，3，4，0
	tionname:""//状态名称，已申请，已发放，采购中，已结束
}
```

#### 物资领取表
```
materout
{
    _id: "", // string，自生成
    model_id: "", // string 物资唯一标识，添加时生成无法修改产品编号
	guid:""//领取人谁领的
	matincomp:""//领取单位
	matname:""//物资名称
	matimg:""//物资封图
	materout_tions:1//状态
	approval:""//物资审批
	approvalcount:""//审批人数
	outnumber:0//领取数量
	outuserid:""//下发人
	outmatcomp:""下发单位
	mattime:""//下发时间
	address: {country: 0, province: 0, city: 0, district: 0, street: ""},（下发信息）
	matdes:""//详情说明
	mattypes:0//领取类型，是进还是出

}
```






#### 成员操作历史
```
// 增加人员时需要写入
member_opera_history
{
    _id: "", // string，自生成
	materout:0//领取时的流水id
    user_guid: "", // string 用户唯一标识
    member_id: 0, // string 成员唯一标识
    status: 0, // int 0新增，1删除
    create_time: 0, // int 时间戳 GMT
    create_ip: "", // string 当前操作ip
}
```


#### 物资进出库表
```
materMain
{
	_id: "", // string，自生成
	materOperType:'', //string 业务形态 10 物资入库 20 物资发放
	materShowType:'',//string 显示类型 针对入库分三种类型 1001 捐赠 1002 下拨 1003 采购 1004 采退
								      出库分两种类型 2001 直接发放 2002 申请发放
	detail_balance:"",//1 入库 -1 出库
	serialNumber:"入库编号",
	materOperUer:'',//sting 操作人
	materOperCom:'',//sting 操作单位
	materOperDept:'',//sting 操作部门
	relationUser:"", //sting 关联人
	relationCom:"", //sting 关联单位
	relationDept:"", //sting 关联部门
	relationPhone:"",
	fj_img:"", //数组 附件照片 9张内
	create_time: 0,// 时间戳 GMT
	check_time: 0,// 时间戳 GMT审核完成时间
	status:"", //状态  入库 1001 申请 1002 驳回 1099 完成
	total_Nums:""//总数
	materOperUerJson:'',//sting 操作人
	materOperComJson:'',//sting 操作单位
	materOperDeptJson:'',//sting 操作部门
	relationUserJson:"", //sting 关联人
	relationComJson:"", //sting 关联单位
	relationDeptJson:"", //sting 关联部门
}
materDetail
{
	_id: "", // string，自生成
	materMain_id:"", //主表ID
	detail_balance:"",//1 增加 -1减少
	materModel_id:"", //物资ID
	types_id:"", //物资类型关联
	mat_title:"",//物资名称
	mat_img:"",物资图片
	unit:"",//单位  （计量单位）
	model:"",//型号（物料规格）
	manufacturer:"",//生产厂家
	bar_code_number:"",//物资条码
	mat_top:"",   //物资排序1，2，3 ，4 升序	
	mat_number:"",数量
	mat_des:"",物资说明
}
``` 