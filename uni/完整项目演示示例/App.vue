<script>
	// #ifdef APP-PLUS
		import {
			APPUpdate
		} from "@/js_sdk/zhouWei-APPUpdate/APPUpdate.js";
	// #endif

	export default {

		onLaunch: function() {
			
			// #ifdef APP-PLUS
				//APPUpdate();
			// #endif
		}, 
		onShow: function() {
			
		},
		onHide: function() {

		}
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
