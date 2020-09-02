<template>
	<view class="base-cloud">
		<view class="fixAutoNoPd middle">
			
			<view class="clear" v-if="showFirst || showCount > 0">
				<block v-for="( item , index) in list" :key="index" v-if="index == 0 || index < showCount ">
					<view class="w300 fl">
						<block v-if="item.type == 'time'">
							
							<datepicker :noPadding="true" :name="item.name" :endName="item.endName" :value="conditionsSync[item.name]" :endValue="item.endName ? conditionsSync[item.endName]:''" :titleWidth="0" @clear="clearDate($event,item.name,item.endName)" @confirm="chooseDate($event,item.name,item.endName)" :type="item.timeType||'range'" :showSeconds="item.showSeconds" :placeholder="`请选择${item.title}`"></datepicker>
							
						</block>
						
						<block v-else-if="item.type == 'select'">
							
							<selects :noPadding="true" :title="item.title" :titleWidth="0" :name="item.name"  :list="item.list" v-model="conditionsSync[item.name]"></selects>
							
						</block>
						
						<block v-else-if="item.type == 'multi-select'">
							
							<multi-selects :noPadding="true" :title="item.title" :titleWidth="0" :name="item.name"  :list="item.list" v-model="conditionsSync[item.name]" ></multi-selects>
							
						</block>
						
						<block v-else>
							<inputs :noPadding="true" :titleWidth="0" :name="item.name" v-model="conditionsSync[item.name]" :placeholder="`请输入${item.title}搜索`"></inputs>
						</block>
					</view>
				</block>
				
				
			</view>
			<!-- 确认搜索按钮 -->
			<view class="w55">
				<view class="btn line grayBg mr20" @tap="confirm">{{confirmText}}</view>
			</view>
			<view class="w50">
				<view class="noBreak grey hover fz12" @tap="show=true" v-if="(list.length > 0 && !showFirst) || list.length > 1 ">
					<view class="bIcon-filter inline "></view>
					<view class="pl5 inline">{{showFirst || showCount > 0 ? '更多筛选' : '筛选'}}</view>
				</view>
			</view>
		</view>
		<view class="fixed wp" @tap="show=false" v-if="show">
			<view class="abs right whiteBg w350 fadeInRight pb85 autoY" @tap.stop="stop">
				<view class="pd10">
					<view class="mb10" v-for="( item , index) in list" :key="index">
						
						<block v-if="item.type == 'time'">
							<datepicker :noPadding="true" :name="item.name" :endName="item.endName" :value="conditionsSync[item.name]" :endValue="item.endName ? conditionsSync[item.endName]:''" :title="item.title" :isVertical="true" @clear="clearDate($event,item.name,item.endName)" @confirm="chooseDate($event,item.name,item.endName)" :type="item.timeType||'range'" :showSeconds="item.showSeconds" :placeholder="`请选择${item.title}`"></datepicker>
							
						</block>
						
						<block v-else-if="item.type == 'select'">
							
							<selects :noPadding="true" :name="item.name" :title="item.title" :list="item.list" v-model="conditionsSync[item.name]" :isVertical="true"></selects>
							
						</block>
						
						<block v-else-if="item.type == 'multi-select'">
							
							<multi-selects :noPadding="true" :name="item.name" :title="item.title" :list="item.list" v-model="conditionsSync[item.name]" :isVertical="true"></multi-selects>
							
						</block>
						
						<block v-else>
							<inputs :noPadding="true" :name="item.name" :title="item.title" v-model="conditionsSync[item.name]" :isVertical="true" :placeholder="`请输入${item.title}搜索`"></inputs>
						</block>
						
					</view>
				</view>
				<view class="abs bottom text-center gridNoMb ptb20 bt">
					<view>
						<view class="btn block line" @tap="show=false">取消</view>
					</view>
					<view>
						<button class="btn block" @tap="confirm">{{confirmText}}</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"conditions" ,
		props:{
			list : {
				default : function(){
					return [] ;
				}
			},
			conditions : {
				default : function(){
					return {} ;
				}
			},
			confirmText : {
				default : "筛选"
			},
			showFirst:{
				type : Boolean ,
				default : false 
			},
			showCount : {
				type : Number ,
				default : 0 
			}
		},
		created() {
			this.bcc.bindEnter(this , "confirm");
		},
		data() {
			return {
				show : false ,
				conditionsSync: this.conditions
			};
		},
		watch:{
			conditions : function(e){
				Object.assign(this.conditionsSync , this.conditions);
				console.log(this.conditionsSync);
			},
		},
		methods:{
			stop:function(e){},
			chooseDate:function(e , name , endName){
				this.conditionsSync[name] = e.startTime ;
				if (endName) {
					this.conditionsSync[endName] = e.endTime ;
				}
			},
			clearDate:function( e , name , endName){
				this.conditionsSync[name] = "" ;
				if (endName) {
					this.conditionsSync[endName] = "" ;
				}
			},
			confirm:function(e){
				this.show = false ;
				this.$emit("confirm" , {
					conditions : this.conditionsSync
				});
			},
		}
	}
</script>

<style lang="scss">
@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
</style>
