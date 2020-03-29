<template>
  <view class="container">
    <view class="title">
      <text>uniCloud微信支付确认页面</text>
    </view>
    <view class="desc">
      <view>本示例为简易支付示例</view>
    </view>
    <view class="form">
      <button type="primary" @click="complete">已完成支付</button>
      <button type="primary" @click="fail">未完成支付</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        out_trade_no: '1583149541925ze6757ch8lk'
      }
    },
    onLoad(e) {
      // this.out_trade_no = e.out_trade_no
    },
    methods: {
      complete() {
        uni.showLoading({
          title: '请稍后...',
          mask: false
        });
        uniCloud.callFunction({
          name: 'wxpay-check',
          data: {
            out_trade_no: this.out_trade_no,
            token: uni.getStorageSync('token') // token最好不要每次从storage内取，本示例为了简化演示代码才这么写
          }
        }).then((res) => {
          uni.hideLoading()
          console.log(res)
          if (res.result.status === 0) {
            uni.showModal({
              content: res.result.msg || '订单已完成',
              showCancel: false
            })
          } else {
            uni.showModal({
              content: res.result.msg || '支付状态查询失败',
              showCancel: false
            })
          }
        }).catch((err) => {
          uni.hideLoading()
          console.log(err);
          uni.showModal({
            content: err.message || '支付状态查询失败，请稍后再试',
            showCancel: false
          })
        })
      },
      fail() {
        uni.showModal({
          content: '此时一般需跳转到订单列表，本示例不做此演示',
          showCancel: false
        })
      }
    }
  }
</script>

<style>

</style>
