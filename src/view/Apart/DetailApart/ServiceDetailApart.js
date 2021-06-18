export const handleData = (data, user) => {
   
    let date = new Date(data.create_date);
    data["time"] =  date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    data["user_name"]=user.name;
    //data["apart_name"]=apart.name;
    // data["status_value"]=returnStatus(data.status);
    data["token_device"]=user.token_device;
     console.log(data);
     return data;
  };