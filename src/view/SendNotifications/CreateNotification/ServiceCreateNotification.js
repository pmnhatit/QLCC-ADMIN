// export const typeList=[
//     {id:0, value:""},
//     {id:1,value:"Tạm ngưng cung cấp điên"},
//     {id:2,value:""}
// ]
export const titlePush="Yêu cầu sử dụng khu vực chung"
export const contentPush="Yêu cầu của anh/chị đã được xử lý"
export const to =[
    {id:"all", value:"Tất cả"},
    {id:"block",value:"Tòa nhà"},
    //{id:3,value:"Tầng"},
    //{id:3,value:"1 Người"}
    
]
 const TitleDialog=[
    {id:"all", value:"Xác nhận thông báo cho tất cả người dùng"},
    {id:"block",value:"Xác nhận thông báo cho tòa nhà"},
    //{id:3,value:"Tầng"},
]
export const returnTitleDialog=(value)=>
{
    for (let item of TitleDialog) {
        if(item.id===value)
           { return item.value;}
}
}