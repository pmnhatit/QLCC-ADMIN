export const handleData = (data, user,apart) => {
   
    let date = new Date(data.create_date);
    data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    data["status_value"] =  returnStatus(data.status);
    // data["next_status"] =  data.status+1;
    // data["next_status_value"] =  returnStatus(data.status+1);
    data["next_status"] =  status[data.status+1].id;
    data["next_status_value"] =  status[data.status+1].name;
    
    data["author_name"]=user.name;
    data["apart_name"]=apart.name;
    data["token_device"]=user.token_device;
     console.log(data);
     return data;
  };
export const returnStatus =(status_id)=>
{
  for (let item of status) {
    if (item.id === status_id) return item.name;
  }
}
export const status= [
  {id:0,name:"Chưa xác nhận"},
  {id:1,name:"Đã xác nhận"},
  //{id:2,name:"Đã sửa xong"},
  {id:3,name:"Không duyệt"},
  {id:"",name:""},
  {id:"",name:""}
]
export const title="Thông báo sửa chữa"
export const content="Yêu cầu của anh/chị đã thay đổi trạng thái"