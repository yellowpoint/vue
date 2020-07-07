<!-- 这个文件我在做 我是群员(道长 1459347320) -->
<template>
	<view class="page">
		<view class="list">
			<view class="part">
				<view class="title">发放人</view>
				<view class="font"><input type="text" placeholder="请输入发放人" /></view>
			</view>
			<view class="part">
				<view class="title">发放单位</view>
				<view class="font"><input type="text" placeholder="请输入发放单位" /></view>
			</view>
			<view class="part">
				<view class="title">领取人</view>
				<view class="picker">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view>{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
				<uni-icons type="arrowright" size="24"></uni-icons>
			</view>
		</view>
		<view class="proof">
			<view class="p-title">
				<view>拍照附件</view>
				<view>{{imageList.length}}/9</view>
			</view>
			<view class="images">
				<view v-for="(image,index) in imageList" :key="index">
					<view style="position: relative;">
						<image class="image" :src="image" :data-src="image" @tap="previewImage"></image>
						<image class="image-x" src="../../static/icon/remove.png" @click="remove(index)"></image>
					</view>
				</view>
				<image v-if="imageList.length<9" class="image" src="../../static/icon/save.png" @click="chooseImage"></image>
			</view>
		</view>
		<view class="detail">
			<view class="title">物资明细</view>
			<view class="d-list">
				<view v-for="(item,index) in 3">
					<view class="materials">
						<image class="img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580545258795&di=c8f802b6f0fa8b9d62688cdbf3c585b6&imgtype=0&src=http%3A%2F%2Fimg.99114.com%2Fgroup1%2FM00%2F3A%2FCF%2FwKgGMFctoRuAGZD-AAGcExaGvhY255.jpg"></image>
						<view class="name">
							<view class="n-va">3M医用口罩</view>
							<view class="n-va">数量 : 15</view>
						</view>
						<view class="remove">
							 <uni-number-box class="n-btn" :min="0" value="15"></uni-number-box>
							<view class="btn" @click="removeMaterials(index)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 14vw;"></view>
		<view class="button">
			<view class="b-t" @click="toSaveGrant()">
				<uni-icons class="icon" type="plus" size="26"></uni-icons>
				<view class="wz">添加</view>
			</view>
			<view class="b-t">
				<uni-icons class="icon" type="checkbox" size="26"></uni-icons>
				<view class="wz">发放</view>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				materials_list: [],
				imageList: [],
				multiArray: [
					['河南人民医院', '郑州妇幼保健院'],
					['呼吸科', '五官科'],
					['张三', '李四', '王二']
				],
				multiIndex: [0, 0, 0],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods: {
			toSaveGrant(){
				uni.navigateTo({
					url:'/pages/mainstroage/saveGrant'
				})
			},
			removeMaterials(index){
				uni.showModal({
					title: '删除物资',
					content: '确定要删除准备发放的物资吗?',
					success: (res) => {
						if (res.confirm) {
							
						}
					}
				})
			},
			remove(index) {
				uni.showModal({
					title: '取消图片',
					content: '确定要取消当前上传的图片吗?',
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})

			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			chooseImage: function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {}
				})
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				this.$forceUpdate()
			},
		}
	}
</script>

<style lang="scss">
	.page {
		.list {
			.part {
				display: flex;
				flex-wrap: nowrap;
				padding: 3vw;
				border-bottom: 1rpx solid #BEBEBE;

				.title {
					font-size: 4vw;
					width: 20vw;
				}

				.picker {
					font-size: 3.8vw;
					width: 75vw;
				}

				.font {
					font-size: 3.8vw;
					width: 80vw;
				}
			}
		}

		.proof {
			border-bottom: 1rpx solid #BEBEBE;

			.p-title {
				padding: 3vw 3vw 1vw 3vw;
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				font-size: 4vw;
			}

			.images {
				padding: 2vw 0vw;
				display: flex;
				flex-wrap: wrap;
				justify-content: left;

				.image {

					margin-left: 3vw;
					width: 30vw;
					height: 30vw;
					border-radius: 1.5vw;
				}

				.image-x {
					position: absolute;
					top: 1vw;
					left: 26vw;
					width: 6vw;
					height: 6vw;
				}
			}
		}

		.detail {

			.title {
				padding: 3vw;
				font-size: 4vw;
				width: 20vw;
			}

			.d-list {
				.materials {
					margin: 2vw 0vw 0vw 3vw;
					width: 94vw;
					height: 17vw;
					border-radius: 1vw;
					border: 1rpx solid #BEBEBE;
					display: flex;
					flex-wrap: nowrap;

					.img {
						width: 17vw;
						height: 17vw;
						border-radius: 1vw;
					}

					.name {
						margin-left: 4vw;
						width: 27vw;

						.n-va {
							padding-top: 2vw;
							font-size: 3.7vw;
						}
					}

					.remove {
						display: flex;
						justify-content: space-between;
						width: 49vw;
						.n-btn{
							width:20vw ;
							height: 6vw;
							margin-top: 4vw;
						}
						.btn {
							margin-right: 3.5vw;
							margin-top: 3.5vw;
							width: 16vw;
							height: 10vw;
							border-radius: 1vw;
							font-size: 4vw;
							line-height: 10vw;
							border: 1rpx solid #BEBEBE;
							text-align: center;
						}
					}
				}
			}
		}

		.button {
			position: fixed;
			bottom: 0vw;
			width: 94vw;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			padding: 2vw 3vw;

			.b-t {

				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
				width: 22vw;
				height: 10vw;
				border-radius: 1vw;
				border: 1rpx solid #BEBEBE;
				background: #F1F1F1;

				.icon {
					line-height: 10vw;
				}

				.wz {
					margin-left: 1vw;
					font-size: 3.8vw;
					line-height: 10vw;
				}
			}

		}
	}
</style>
