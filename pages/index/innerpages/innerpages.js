Page({
  data: {
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' },
    lists: [
      {
        "num": 123,
        "text": "数字123"
      },
      {
        "num": 234,
        "text": "数字234"
      },
      {
        "num": 345,
        "text": "数字345"
      }
    ],
    length: 1
  },
  onLoad: function (option) {
    console.log(option);
    var that = this;
    if(option.id === '1') {
      console.log(1);
      that.setData({
        title: option.title
      })
    } else if(option.id === '2') {
      console.log(2);
      that.setData({
        title: option.title
      })
    }
  },
})