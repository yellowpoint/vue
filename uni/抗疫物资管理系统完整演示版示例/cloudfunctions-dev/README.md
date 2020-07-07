# 云函数开发目录`cloudfunctions-dev`

> 在此编写依赖npm的云函数，通过打包覆盖`cloudfunctions-aliyun`目录下同名云函数

### 云函数打包命令

```bash
# 1.当前目录(D:\XXX\cloudfunctions-dev)下在命令行执行,安装依赖
yarn
# 2.打包全部云函数
yarn build
# 3.打包指定云函数
node build-api.js 函数名1 函数名2 ...
# 4.例如
D:\XXX\cloudfunctions-dev>node .\build-api.js register
```

### 目录说明

`src->api`为存放云函数位置

云函数目录为`api/functionName/functionName.js`，打包云函数后在`cloudfunctions-aliyun`下对应目录生成云函数`index.js`

### 其他说明

- 代码需统一风格，目前是编写源码使用`import`，`export`的`es`风格，导出为`cjs`风格