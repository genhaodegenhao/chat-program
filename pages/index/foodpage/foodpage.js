// pages/index/foodpage/foodpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    food: {},
    allRatings: [],
    posiRatings: [],
    negaRatings: [],
    ratinglength: '',
    positivelength: '',
    negativelength: '',
    typeid: 2,
    POSITIVE: 0,
    NEGATIVE: 1,
    posiFlag: false,
    negaFlag: false,
    allFlag: true,
    activeState: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var food = JSON.parse(decodeURIComponent(options.foodname));
    var ratings = food.ratings;
    var arrpositive = [];
    var arrnegative = [];
    var posiRatings = [];
    var negaRatings = [];
    var allRatings = [];
    for(var i = 0; i < ratings.length; i++) {
      ratings[i].rateTime = new Date(ratings[i].rateTime).toLocaleString();
      allRatings.push(ratings[i]);
      if (ratings[i].rateType == this.data.POSITIVE) {
        arrpositive.push(ratings[i].rateType);
        posiRatings.push(ratings[i]);
      } else if (ratings[i].rateType == this.data.NEGATIVE) {
        arrnegative.push(ratings[i].rateType);
        negaRatings.push(ratings[i]);
      }
    }
    this.setData({
      food: food,
      ratinglength: ratings.length,
      positivelength: arrpositive.length,
      negativelength: arrnegative.length,
      posiRatings: posiRatings,
      negaRatings: negaRatings,
      allRatings: allRatings
    });
  },
  selectType: function(e) {
    var typeid = e.target.dataset.id;
    var posiFlag;
    var negaFlag;
    var allFlag;
    if(typeid == 0) {
      allFlag = false;
      posiFlag = true;
      negaFlag = false;
    } else if(typeid == 1) {
      allFlag = false;
      posiFlag = false;
      negaFlag = true;
    } else {
      allFlag = true;
      posiFlag = false;
      negaFlag = false;
    }
    this.setData({
      typeid: typeid,
      posiFlag: posiFlag,
      negaFlag: negaFlag,
      allFlag: allFlag
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