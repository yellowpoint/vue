<template>
  <view>
    <lb-picker v-model="value1"
      mode="selector"
      :list="list1"
      :show-header="false"
      inline
      @change="handleChange1">
    </lb-picker>
    <view style="padding:100rpx;">{{ value1 }}</view>

    <lb-picker v-model="value2"
      mode="multiSelector"
      :list="list2"
      :level="3"
      :show-header="false"
      inline
      @change="handleChange2">
    </lb-picker>
    <view style="padding:100rpx;">{{ value2String }}</view>

    <lb-picker v-model="value3"
      mode="unlinkedSelector"
      :show-header="false"
      :list="list3"
      inline
      @change="handleChange3">
    </lb-picker>
    <view style="padding:100rpx;">{{ value3String }}</view>
  </view>
</template>

<script>
	export default {
		data(){
			return {
				value1: 'B',
				list1: [
					{
						label: '选项一',
						value: 'A'
					},
					{
						label: '选项二',
						value: 'B'
					}
				],
				value2: ['2', '21', '213'],
				value2String: '',
				list2: [
					{
						label: '选项1',
						value: '1',
						children: [
							{
								label: '选项11',
								value: '11',
								children: [
									{
										label: '选项111',
										value: '111'
									},
									{
										label: '选项112',
										value: '112'
									},
									{
										label: '选项113',
										value: '113'
									}
								]
							},
							{
								label: '选项12',
								value: '12',
								children: [
									{
										label: '选项121',
										value: '121'
									},
									{
										label: '选项122',
										value: '122'
									},
									{
										label: '选项123',
										value: '123'
									}
								]
							},
							{
								label: '选项13',
								value: '13',
								children: [
									{
										label: '选项131',
										value: '131'
									},
									{
										label: '选项132',
										value: '132'
									},
									{
										label: '选项133',
										value: '133'
									}
								]
							}
						]
					},
					{
						label: '选项2',
						value: '2',
						children: [
							{
								label: '选项21',
								value: '21',
								children: [
									{
										label: '选项211',
										value: '211'
									},
									{
										label: '选项212',
										value: '212'
									},
									{
										label: '选项213',
										value: '213'
									}
								]
							},
							{
								label: '选项22',
								value: '22',
								children: [
									{
										label: '选项221',
										value: '221'
									},
									{
										label: '选项222',
										value: '222'
									},
									{
										label: '选项223',
										value: '223'
									}
								]
							},
							{
								label: '选项23',
								value: '23',
								children: [
									{
										label: '选项231',
										value: '231'
									},
									{
										label: '选项232',
										value: '232'
									},
									{
										label: '选项233',
										value: '233'
									}
								]
							}
						]
					},
					{
						label: '选项3',
						value: '3',
						children: [
							{
								label: '选项31',
								value: '31',
								children: [
									{
										label: '选项311',
										value: '311'
									},
									{
										label: '选项312',
										value: '312'
									},
									{
										label: '选项313',
										value: '313'
									}
								]
							},
							{
								label: '选项32',
								value: '32',
								children: [
									{
										label: '选项321',
										value: '321'
									},
									{
										label: '选项322',
										value: '322'
									},
									{
										label: '选项323',
										value: '323'
									}
								]
							},
							{
								label: '选项33',
								value: '33',
								children: [
									{
										label: '选项331',
										value: '331'
									},
									{
										label: '选项332',
										value: '332'
									},
									{
										label: '选项333',
										value: '333'
									}
								]
							}
						]
					}
				],
				value3: ['2', '33', '222'],
				value3String: '',
				list3: [
					[
						{
						label: '选项1',
						value: '1'
						},
						{
							label: '选项2',
							value: '2'
						},
						{
							label: '选项3',
							value: '3'
						}
					],
					[
						{
						label: '选项11',
						value: '11'
						},
						{
							label: '选项22',
							value: '22'
						},
						{
							label: '选项33',
							value: '33'
						}
					],
					[
						{
						label: '选项111',
						value: '111'
						},
						{
							label: '选项222',
							value: '222'
						},
						{
							label: '选项333',
							value: '333'
						}
					]
				]
			}
		},
		onLoad () {
			this.value2String = JSON.stringify(this.value2)
			this.value3String = JSON.stringify(this.value3)
		},
		methods: {
			handleTap (picker) {
				this.$refs[picker].show()
			},
			handleChange1 (e) {
				if (e.change === 'scroll') {
					this.value1 = e.value
				}
			},
			handleChange2 (e) {
				if (e.change === 'scroll') {
					this.value2 = e.value
					this.value2String = JSON.stringify(this.value2)
				}
			},
			handleChange3 (e) {
				if (e.change === 'scroll') {
					this.value3 = e.value
					this.value3String = JSON.stringify(this.value3)
				}
			}
		}
	}
</script>
