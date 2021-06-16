export const handleData = (data, token_device) => {
   
    // let date = new Date(data.create_date);
    // data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    // data["is_confirm_value"] =  data.is_confirm ? "Đã xử lý":"Chưa xử lý"
    // data["next_status"] =  data.status+1;
    // data["next_status_value"] =  returnStatus(data.status+1);
    data["token_device"]=token_device;
    // data["apart_name"]=apart.name;
     console.log(data);
     return data;
  };

export const title="Đã xử lý "
export const content="Khiếu nại bãi xe đã được xử lý"