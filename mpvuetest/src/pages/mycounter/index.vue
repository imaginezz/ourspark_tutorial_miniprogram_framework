<template>
  <div class="counter">
    <p>请输入倒计时的时间（秒）：</p>
    <input type="text" v-model="inputTime" />
    <p>剩余时间：{{remainTimeShow}} 秒</p>
    <button v-show="counter==null" @click="start">开始！</button>
    <button v-show="counter!=null" @click="end">停止！</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputTime: null,
      remainTime: 0,
      counter: null,
      remainTimeShow: 0
    }
  },
  methods: {
    fixNum(val) {
      let nVal = Number(val)
      if (nVal < 0) {
        return 0
      }
      let transVal = nVal.toFixed(2)
      return transVal
    },
    start() {
      if (isNaN(this.inputTime) || this.inputTime < 0) {
        wx.showToast({
          title: '请输入正确的时间',
          icon: 'none',
          duration: 2000
        })
        this.inputTime = null
        return
      }
      this.remainTime = this.inputTime
      this.counter = setInterval(() => {
        if (this.remainTime > 0) {
          this.remainTime -= 0.01
          this.remainTimeShow = this.fixNum(this.remainTime)
        } else {
          wx.showToast({
            title: '时间到',
            icon: 'none',
            duration: 2000
          })
          this.end()
        }
      }, 10)
    },
    end() {
      clearInterval(this.counter)
      this.counter = null
    }
  }
}
</script>

<style scoped>
p {
  font-size: 18px;
  color: #333;
}
button {
  height: 34px;
  cursor: pointer;
  font-size: 18px;
  padding: 0 20px 0 20px;
  color: #fff;
  background-color: #3385ff;
  border-style: none;
  border-bottom-style: none;
  border-bottom-style: solid;
  border-bottom-color: #3385ff;
  border-bottom-width: 0.8px;
}
button:hover {
  background: #5599ff;
}
input {
  height: 32px;
  width: 250px;
  margin-right: 20px;
  border-style: solid;
  border-color: #d8d8d8;
  border-width: 1px;
}
input:focus {
  border-color: #3385ff;
}
</style>
