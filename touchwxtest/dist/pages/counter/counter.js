'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    inputTime: null,
    remainTime: 0,
    counter: null
  },
  bindTimeInput: function bindTimeInput(e) {
    this.data.inputTime = e.detail.value;
  },
  start: function start() {
    var _this = this;

    if (isNaN(this.data.inputTime) || this.data.inputTime < 0) {
      wx.showToast({
        title: '请输入正确的时间',
        icon: 'none',
        duration: 2000
      });
      this.data.inputTime = null;
      return;
    }
    this.setData({
      remainTime: this.data.inputTime
    });
    this.setData({
      counter: setInterval(function () {
        if (_this.data.remainTime > 0) {
          _this.data.remainTime -= 0.01;
          _this.setRemainTime(_this.data.remainTime);
        } else {
          wx.showToast({
            title: '时间到！',
            icon: 'none',
            duration: 2000
          });
          _this.end();
        }
      }, 10)
    });
  },
  end: function end() {
    clearInterval(this.data.counter);
    this.setData({
      counter: null
    });
  },
  setRemainTime: function setRemainTime(remainTime) {
    var retTime = 0;
    var nRemainTime = Number(remainTime);
    if (nRemainTime > 0) {
      retTime = nRemainTime.toFixed(2);
    }
    this.setData({
      remainTime: retTime
    });
  }
});