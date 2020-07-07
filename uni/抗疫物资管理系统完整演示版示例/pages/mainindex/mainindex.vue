<template>
	<view>
		<view style="height: 500rpx;background-color: #007AFF;">
			
			<view class="contitle"  @tab='tabClick'> 新冠物资发放管理</view>
			
		</view>
		<view class="conview">
			<block v-for="(items,indexs) in indexList" :key='indexs'>
				<uni-grid :column="3" class="mygrid" :show-border='bor'>
					<block v-for="(item,index) in items" :key='index'>
						<view @click='tabClick(item.type)'>
							<uni-grid-item>
								<image class="gridimg" :src="item.img"></image>
								<text class="gridtext">{{item.title}}</text>
							</uni-grid-item>
						</view>
					</block>
				</uni-grid>
			</block>
			<!-- <uni-grid :column="3" class="mygrid" :show-border='bor'>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资入库</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资发放</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资库存</text>
				</uni-grid-item>
			</uni-grid>
			
			<uni-grid :column="3" class="mygrid" :show-border='bor' >
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
					<text class="gridtext">物资设置</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">物资类别</text>
				</uni-grid-item>
				<uni-grid-item>
					<image class="gridimg" src="../../static/logo.png"></image>
						<text class="gridtext">单位/组织</text>
				</uni-grid-item>
			</uni-grid> -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bor:false,
				indexList:[
					[
						{
							type:'wzrk',
							img:'../../static/logo.png',
							title:'物资入库'
						},
						{
							type:'wzff',
							img:'../../static/logo.png',
							title:'物资发放'
						},
						{
							type:'wzkc',
							img:'../../static/logo.png',
							title:'物资库存'
						}
					],
					[
						{
							type:'wzzl',
							img:'../../static/logo.png',
							title:'物资资料'
						},
						{
							type:'wzlb',
							img:'../../static/logo.png',
							title:'物资类别'
						},
						{
							type:'dwzz',
							img:'../../static/logo.png',
							title:'单位/组织'
						}
					]
				]
			}
		},
		methods: {
			tabClick(type){
				switch (type){
					case 'wzrk':
						console.log('物资发放');
						this.$util.navigateTo('wzrk','../mater_oper/materListIn')
						break;
					case 'wzff':
						console.log('物资发放');
						this.$util.navigateTo('wzff','../mater_oper/materListOut',true)
						break;
					case 'wzkc':
						console.log('物资库存');
						this.$util.navigateTo('wzkc','../mainstroage/mainstroageList')
						break;
					case 'wzzl':
						console.log('物资资料');
						this.$util.navigateTo('wzzl','../matermodel_oper/matermodelList')
						break;
					case 'wzlb':
						console.log('物资类别');
						this.$util.navigateTo('wzlb','../materialtype_oper/materialtypeList')
						break;
					case 'dwzz':
						console.log('单位组织');
						this.$util.navigateTo('dwgl','../mecompany_oper/mecompanyList')
						break;
				}
			}			
		}
	}
</script>


<style>
.contitle{color: #FFFFFF;text-align: center;padding-top: 100rpx;}
.conview{
	background-color: #FEFEFE; 
	width: 550rpx;
	/* height: 380rpx; */
	border: #C0C0C0 solid 1rpx;  
	border-radius: 5rpx; 
	position: absolute;
	left: calc((100% - 550rpx) / 2); 
	top: 350rpx;
	padding: 20upx 0;
	}
.gridimg{width: 100rpx;height: 100rpx;margin: auto;}
.gridtext{text-align: center;font-size: 28rpx;}

</style>
