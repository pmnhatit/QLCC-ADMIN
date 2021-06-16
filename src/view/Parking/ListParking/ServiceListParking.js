export const handleData = (data, user) => {
    console.log(user);
    const newdata = [];
    

    
    for (let i = 0; i < data.length; i++) {
      let date = new Date(data[i].create_date);
      if (data[i].is_delete === false) {
        newdata[i] = {
          id: data[i]._id,
          order: i + 1,
          time: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
          //apart: returnApart(data[i].apart_id, apart),
          user: returnUser(data[i].author,user),
          is_read_admin:data[i].is_read_admin,
          is_read_admin_value:(data[i].is_read_admin ?<div style={{color:"green"}}>Đã đọc</div> :<div style={{color:"red"}}>Chưa đọc</div>)
        };
      }
    }
    console.log(newdata);
    return newdata;
  };
  const returnUser = (user_id, userList) => {
    for (let item of userList) {
      if (item.id === user_id) return item.name;
    }
  };
  // console.log("Date: "+date.getDate()+
  //       "/"+(date.getMonth()+1)+
  //       "/"+date.getFullYear()+
  //       " "+date.getHours()+
  //       ":"+date.getMinutes()+
  //       ":"+date.getSeconds());