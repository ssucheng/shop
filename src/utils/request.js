// promise 处理wx.request的问题
export function request(url,methods = "GET",data = {}){
    return new Promise((resolve,reject) =>{
        // 页面的加载就是数据的请求 所以用下面的函数为了提高用户的体验 mask禁止穿透图层
        wx.showLoading({
            title:"努力加载中 ~亲~",
            mask:true,
            
        })
        wx.request({
            url:url,
            methods:methods,
            data:data,
            success:(res)=>{
                resolve(res)
                wx.hideLoading()
            }
        })
    })
}
// 给request添加一个方法处理get带参数的
request.get = (url,data)=>{
   return request(url,"GET",data)
}