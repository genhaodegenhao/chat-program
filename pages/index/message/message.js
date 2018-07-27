// pages/index/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    disable: true,
    ratingLists: [],
    messageText: '',
    pageNumber: 0,
    pageSize: 5,
    infinitflag: true,
    nomoreflag: false,
    onReachBottomDistance: 100
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  },
  onLoad: function() {
    let pageNumber = this.data.pageNumber;
    this.initData();
  },
  initData: function() {
    let _this = this;
    wx.request({
      url: 'https://www.luckygenhao3.top/blog/selectText.php',
      data: {
        pageNumber: this.data.pageNumber,
        pageSize: this.data.pageSize
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
  handlemsgInput: function(e) {
    let text = e.detail.value.trim();
    if(text.length > 0) {
      this.setData({
        messageText: text,
        disable: false
      })
    } else {
      this.setData({
        disable: true
      })
    }
  },
  submitmsg: function(e) {
    let _this = this;
    wx.request({
      url: 'https://www.luckygenhao3.top/blog/addBlogMessage.php',
      data: {
        "message": this.data.messageText,
        "username": 'hhh'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          _this.setData({
            messageText: '',
            disable: true,
            pageNumber: 0,
            ratingLists: []
          })
          _this.initData();
        } else {
          wx.showToast({
            title: '请检查网络',
          });
        }
      }
    })
  },
  bindzan: function(e) {
    let _this = this;
    let dataid = e.currentTarget.dataset.id;
    console.log(e);
    let addcount = parseInt(e.currentTarget.dataset.addnum) + 1;
    wx.request({
      url: 'https://www.luckygenhao3.top/blog/ding.php',
      data: {
        "id": dataid,
        "addcount": addcount
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          let zanList = _this.data.ratingLists;
          for(let i=0; i < zanList.length; i++) {
            if(dataid == zanList[i].id) {
              zanList[i].addcount = parseInt(zanList[i].addcount) + 1;
              _this.setData({
                ratingLists: zanList,
              })
            }
          }
        } else {
          wx.showToast({
            title: '请检查网络',
          });
        }
      }
    })
  },
  bindcai: function(e) {
    let _this = this;
    let dataid = e.currentTarget.dataset.id;
    console.log(e);
    let mincount = parseInt(e.currentTarget.dataset.mincount) + 1;
    wx.request({
      url: 'https://www.luckygenhao3.top/blog/cai.php',
      data: {
        "id": dataid,
        "mincount": mincount
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          let caiList = _this.data.ratingLists;
          for(let i=0; i < caiList.length; i++) {
            if(dataid == caiList[i].id) {
              caiList[i].mincount = parseInt(caiList[i].mincount) + 1;
              _this.setData({
                ratingLists: caiList,
              })
            }
          }
        } else {
          wx.showToast({
            title: '请检查网络',
          });
        }
      }
    })
  },
  binddelete: function(e) {
    let _this = this;
    let dataid = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.luckygenhao3.top/blog/deleter.php',
            data: {
              "id": dataid,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.statusCode == 200) {
                _this.setData({
                  pageNumber: 0,
                  ratingLists: []
                })
                _this.initData();
              } else {
                wx.showToast({
                  title: '请检查网络',
                });
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  onReachBottom: function(e) {
    let _this = this;
    if(_this.data.infinitflag) {
      this.setData({
        pageNumber: this.data.pageNumber + 1
      })
      _this.initData();
    }
  }
})