

export const handleData = (data, user) => {
   
    let date = new Date(data.create_date);
    data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    data["user_name"]=user.name;
    //data["apart_name"]=apart.name;
    data["status_value"]=returnStatus(data.status);
    data["token_device"]=user.token_device;
     console.log(data);
     return data;
  };
export const returnStatus =(status_id)=>
{
  
  for (let item of  status) {
    if (parseInt(item.id) === parseInt(status_id)) return item.name;
  }
}
export const status= [
  {id:0,name:"Chưa xác nhận"},
  {id:1,name:"Đã xác nhận"},
  {id:2,name: "Không duyệt"}
]
export const title="Yêu cầu đăng bài"
export const content="Yêu cầu đăng bài của anh/chị đã xử lý"