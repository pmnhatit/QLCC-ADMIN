export const handleData=(data,apart)=>
{
    console.log(data);
    const newdata=[];
    for (let i=0;i<data.length;i++)
    {   
        if (data[i].is_delete === false) {
            newdata[i] = {
              id: data[i]._id,
              order: i + 1,
              time: data[i].month + "/" + data[i].year,
              apart: returnApart(data[i].apart_id, apart),
              old_index: data[i].old_index,
              new_index: data[i].new_index,
              consume: data[i].consume,
              total_money: data[i].total_money,
              is_pay: data[i].is_pay ?"Đã thanh toán":"Chưa thanh toán",//(<div style={{color:"green"}}>Đã thanh toán</div> ):<div style={{color:"red"}}>Chưa thanh toán</div>
              flag:data[i].is_pay
            };
          }
    }
    //console.log(newdata);
    return newdata;
}
export const calTotal = (data) => {
    let total = 0;
    let total_pay = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_delete === false) {
        if (data[i].is_pay !== false) {
          total_pay = total_pay + data[i].total_money;
        }
        total=total+data[i].total_money
      }
    }
    return {total,total_pay,"total_not_pay":total-total_pay}
  };
  export const calFilter = (data) => {
      let total = 0;
      let total_pay = 0;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
          if(data[i].data[9]!== false)
             { total_pay=total_pay+data[i].data[7];
             }
             total=total+data[i].data[7];
        
      }
      return {total,total_pay,"total_not_pay":total-total_pay}
    };
const returnApart = (apart, apartList) => {
    for (let item of apartList) {   
     if (item._id === apart)   
         return item.name;
   }
 };