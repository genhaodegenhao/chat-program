//rating.js
//获取应用实例
const app = getApp();
Page({
    data: {
        name: 'genhao'
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: 'https://www.luckygenhao3.top/blogmsg/selectText.php',
            data: {
                "pageSize": 5,
                "pageNum": 1
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res.data);
            }
        })
    },
    onReachBottom: function(e) {
        console.log(1111111111);
    }
})
