<template>
	<view class="base-cloud">
		<view class="pd15 ">
			<view class="autoX father" v-if="list.length > 0 || !showEmpty">
				<table>
					<thead>
						<tr>
							<slot name="thead"></slot>
						</tr>
					</thead>
					<tbody>
						<slot name="tbody"></slot>
					</tbody>
				</table>
			</view>
			
			<empty v-if="showEmpty" :list="list"></empty>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"tables" ,
		props:{
			list : {
				default : function(e){
					return [] ;
				}
			},
			showEmpty:{
				default : true 
			}
		}
	}
</script>
