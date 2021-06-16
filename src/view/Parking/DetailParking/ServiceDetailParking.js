export const handleData = (data, user) => {
   
    let date = new Date(data.create_date);
    data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    data["is_confirm_value"] =  data.is_confirm ? "Đã xử lý":"Chưa xử lý"
    // data["next_status"] =  data.status+1;
    // data["next_status_value"] =  returnStatus(data.status+1);
    data["author_name"]=user.name;
    data["token_device"]=user.token_device;
    // data["apart_name"]=apart.name;
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
  {id:2,name:"Đã sửa xong"},
  {id:3,name:"Không duyệt"},
]
export const title="Đã xử lý "
export const content="Khiếu nại bãi xe đã được xử lý"