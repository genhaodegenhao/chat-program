//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgUrls: [
      {
        "id": 1,
        "title": "page1",
        "imagesUrl": "http://pic.58pic.com/58pic/14/90/28/76958PICdwu_1024.jpg"
      },
      {
        "id": 2,
        "title": "page2",
        "imagesUrl": "http://pic.58pic.com/58pic/14/90/98/82t58PICJ7F_1024.jpg"
      },
      {
        "id": 3,
        "title": "page3",
        "imagesUrl": "http://pic.qiantucdn.com/58pic/14/89/82/83N58PICkjM_1024.jpg"
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    animationData: {},
    animationDatar: {},
    animationDate: {},
    text: 'Hello World',
    toView: 'menu0',
    iconsImg: [],

    ratingLists: [],
    infinitflag: true,
    nomoreflag: false,
    onReachBottomDistance: 100
  },
  onLoad: function() {
    this.initFoodData();
    this.initRatingData();
  },
  initFoodData: function() {
    var that = this;
    wx.request({
      url: 'https://www.luckygenhao3.top/elm/static/data.json',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        if(res.statusCode == 200){
          console.log(res.data.goods);
          that.setData({
            goods: res.data.goods,
            seller: res.data.seller
          })
        }
      }
    })
  },
  tabFun: function (e) {
    //获取触发事件组件的dataset属性 
    console.log(e);
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Hello World',
      path: '/page/user?id=123',
      imageUrl: '/pages/images/shareicon.jpg',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
      wx.request({
        url: 'https://www.luckygenhao3.top/elm/static/data.json',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            console.log(res.data.goods);
            wx.showToast({
              title: '刷新成功',
            });
            wx.stopPullDownRefresh();
          }
        }
      })
  },
  onPageScroll: function (res) {
    // Do something when page scroll
    // console.log(res.scrollTop);
  },
  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  clickhref: function(current) {
    var id = current.currentTarget.dataset.id;
    var title = current.currentTarget.dataset.title;
    console.log(id);
    wx.navigateTo({
      url: 'innerpages/innerpages?id='+id+'&title='+title,
    })
  },
  // content
  clickfindid: function (e) {
    var menu = e.target.id;
    var leftid = e.currentTarget.dataset.leftid;
    console.log(e);
    console.log(leftid);
    this.setData({
      toView: menu,
      leftFlag: leftid
    })
  },
  clickfooddetail: function (current) {
    var obj = current.currentTarget.dataset.foodname;
    console.log(obj);
    var foodname = encodeURIComponent(JSON.stringify(obj));
    wx.navigateTo({
      url: "foodpage/foodpage?foodname="+foodname,
    })
  },
  scaleImg: function(e) {
    console.log(e);
    wx.previewImage({
      current: e.target.dataset.src, // 当前显示图片的http链接
      urls: this.data.seller.pics // 需要预览的图片http链接列表
    })
  },
  initRatingData: function() {
    let _this = this;
    wx.request({
      url: 'https://www.luckygenhao3.top/blog/selectText.php',
      data: {
        pageNumber: 0,
        pageSize: 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res.data);
          if(res.data.length == 0) {
            _this.setData({
              infinitflag: false,
              nomoreflag: true,
            })
          } else {
            for(let i = 0; i < res.data.length; i++){
              res.data[i].ptime = new Date(res.data[i].ptime * 1000).toLocaleString();
              _this.data.ratingLists.push(res.data[i]);
            }
            _this.setData({
              ratingLists: _this.data.ratingLists,
            });
          }
        } else {
          wx.showToast({
            title: '请检查网络',
          });
        }
      }
    })
  },
  moreRating: function(e) {
    wx.navigateTo({
      url: './message/message',
    })
  }
})
