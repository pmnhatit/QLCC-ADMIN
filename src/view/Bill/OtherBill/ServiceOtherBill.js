var numeral = require('numeral');
export const handleData=(data,apart)=>
{
    console.log(data);
    const newdata=[];
    for (let i=0;i<data.length;i++)
    {   
        if(data[i].is_delete === false)
        { newdata[i]=
        {
            id:data[i]._id,
            order: i + 1,
            time :data[i].month+"/"+data[i].year,
            apart: returnApart(data[i].apart_id,apart), 
            apart_management:numeral(data[i].apart_management).format('0,0,0') + " VND",
            parking_fees:numeral(data[i].parking_fees).format('0,0,0') + " VND",
            maintenance_fee:numeral(data[i].maintenance_fee).format('0,0,0') + " VND",
            service_charge:numeral(data[i].service_charge).format('0,0,0') + " VND",
            total_money:data[i].total_money ,
            total:numeral(data[i].total_money).format('0,0,0') + " VND",
            note:data[i].note,
            is_pay: data[i].is_pay ?"Đã thanh toán":"Chưa thanh toán",
            is_pay_download: data[i].is_pay ?"Paid":"Unpaid",
            is_pay_value: data[i].is_pay ?(<div style={{color:"green"}}>Đã thanh toán</div> ):<div style={{color:"red"}}>Chưa thanh toán</div>,
            flag:data[i].is_pay
        }} 
    }
    console.log(newdata);
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