// pages/index/foodpage/foodpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food: {},
    ratings: {},
    ratinglength: '',
    positivelength: '',
    negativelength: '',
    typeid: 0,
    POSITIVE: 0,
    NEGATIVE: 1,
    activeState: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var food = JSON.parse(decodeURIComponent(options.foodname));
    console.log(food);
    var ratings = food.ratings;
    console.log(ratings);
    var arrpositive = [];
    var arrnegative = [];
    for(var i = 0; i < ratings.length; i++) {
      if (ratings[i].rateType == this.data.POSITIVE) {
        arrpositive.push(ratings[i].rateType);
      } else if (ratings[i].rateType == this.data.NEGATIVE) {
        arrnegative.push(ratings[i].rateType);
      }
    }
    this.setData({
      food: food,
      ratinglength: ratings.length,
      positivelength: arrpositive.length,
      negativelength: arrnegative.length,
    });
  },
  selectType: function(e) {
    var typeid = e.target.dataset.id;
    this.setData({
      typeid: typeid
    })
  },
  showRatingInfo: function(e) {
    if(this.data.activeState == false) {
      this.setData({
        activeState: true,
      })
    } else {
      this.setData({
        activeState: false,
      })
    }
  },
  sendMessage: function(e) {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})