// promise 处理wx.request的问题
export function request(url,methods = "GET"){
    return new Promise((resolve,reject) =>{
        wx.request({
            url:url,
            methods:methods,
            success:(res)=>{
                resolve(res)
            }
        })
    })
}