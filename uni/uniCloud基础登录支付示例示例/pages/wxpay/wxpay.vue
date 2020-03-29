<template>
  <view class="container">
    <view class="title">
      <text>uniCloud微信支付</text>
    </view>
    <view class="desc">
      <view>本示例为简易支付示例</view>
    </view>
    <view class="form">
      <button type="primary" @click="order">下单</button>
      <button type="primary" @click="pay">微信支付</button>
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
    methods: {
      order() {
        uni.showLoading({
          title: '请稍后...',
          mask: false
        });
        uniCloud.callFunction({
          name: 'order',
          data: {
            token: uni.getStorageSync('token') // token最好不要每次从storage内取，本示例为了简化演示代码才这么写
          }
        }).then((res) => {
          uni.hideLoading()
          console.log(res)
          if (res.result.status === 0) {
            this.out_trade_no = res.result.out_trade_no
            uni.showModal({
              content: '下单成功，现在可以支付了',
              showCancel: false
            })
          } else {
            uni.showModal({
              content: res.result.msg || '下单失败',
              showCancel: false
            })
          }
        }).catch((err) => {
          uni.hideLoading()
          console.log(err);
          uni.showModal({
            content: err.message || '下单失败',
            showCancel: false
          })
        })
      },
      pay() {
        if (!this.out_trade_no) {
          uni.showModal({
            content: '请先下单再进行支付',
            showCancel: false
          })
          return
        }
        uni.showLoading({
          title: '请稍后...',
          mask: false
        });
        uniCloud.callFunction({
          name: 'wxpay',
          data: {
            out_trade_no: this.out_trade_no,
            token: uni.getStorageSync('token') // token最好不要每次从storage内取，本示例为了简化演示代码才这么写
          }
        }).then((res) => {
          console.log(res);
          if (res.result.status !== 0) {
            return Promise.reject(new Error(res.result.msg || '获取支付参数失败'))
          }
          uni.hideLoading()
          return new Promise((resolve, reject) => {
            uni.requestPayment({
              ...res.result.payParams,
              provider: 'wxpay',
              success(res) {
                resolve(res)
              },
              fail(err) {
                console.log(err);
                reject(new Error(err.message || '支付失败'))
              }
            })
          })
        }).then((res) => {
          console.log(res);
          uni.navigateTo({
            url: '/pages/wxpay-check/wxpay-check?out_trade_no=' + this.out_trade_no
          })
        }).catch((err) => {
          uni.hideLoading()
          console.log(err);
          uni.showModal({
            content: err.message || '支付失败',
            showCancel: false
          })
        })
      }
    }
  }
</script>

<style>

</style>
