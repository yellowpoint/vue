<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
  .container {
  	padding: 30px;
  }
  
  .title {
  	text-align: center;
  	font-size: 20px;
  	padding: 20px 0px;
  }
  
  .desc {
  	padding: 10px 0px;
  	font-size: 14px;
  	line-height: 22px;
  	color: #999999;
  }
  
  .form input {
  	height: 40px;
  	border: solid 1px #DDDDDD;
  	text-indent: 10px;
  }
  
  .form input,
  .form button {
  	width: 100%;
  	margin-bottom: 10px;
  }
</style>
