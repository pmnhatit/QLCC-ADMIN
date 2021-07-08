export const handleData = (data, user) => {
   
    let date = new Date(data.create_date);
    data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    data["is_confirm_value"] =  data.is_confirm ? "Đã xử lý":"Chưa xử lý"
    data["type_name"]=returnType(data.type)
    data["link"]=data.link===""?"Không có":data.link
     console.log(data);
     return data;
  };
 const returnType =(status_id)=>
{
  for (let item of typeList) {
    if (item.id === status_id) return item.name;
  }
}
const typeList =[ 
   
    {id:"all", value:"Tất cả"},
    {id:"block",value:"Tòa nhà"},
    {id:"apart",value:"1 Căn hộ"}  ,
    {id:"floor",value:"Tầng(Thông báo có căn hộ sửa chữa)"},
]

export const title="Đã xử lý "
export const content="Khiếu nại bãi xe đã được xử lý"