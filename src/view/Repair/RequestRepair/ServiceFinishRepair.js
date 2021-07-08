import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

export const handleData = (data, apart) => {
    console.log(data);
    const newdata = [];
    

    
    for (let i = 0; i < data.length; i++) {
      let date = new Date(data[i].create_date);
      if (data[i].is_delete === false) {
        newdata[i] = {
          id: data[i]._id,
          order: i + 1,
          time: date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
          apart: returnApart(data[i].apart_id, apart),
          is_read_admin:data[i].is_read_admin,
          is_read_admin_value:(data[i].is_read_admin ?<div style={{color:"green"}}>Đã đọc</div> :<div style={{color:"red"}}>Chưa đọc</div>),
          is_read_admin_name:(data[i].is_read_admin ?"Đã đọc":"Chưa đọc"),
          evaluation:data[i].evaluation.is_evaluate?(data[i].evaluation.is_like?<ThumbUpIcon /> : <ThumbDownIcon />):<div>__</div>
        };
      }
    }
    console.log(newdata);
    return newdata;
  };
  const returnApart = (apart, apartList) => {
    for (let item of apartList) {
      if (item._id === apart) return item.name;
    }
  };