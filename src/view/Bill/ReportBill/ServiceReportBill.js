import NumberFormat from 'react-number-format';
export const month = [
    { id: 1, name: "Tháng 1" },
    { id: 2, name: "Tháng 2" },
    { id: 3, name: "Tháng 3" },
    { id: 4, name: "Tháng 4" },
    { id: 5, name: "Tháng 5" },
    { id: 6, name: "Tháng 6" },
    { id: 7, name: "Tháng 7" },
    { id: 8, name: "Tháng 8" },
    { id: 9, name: "Tháng 9" },
    { id: 10, name: "Tháng 10" },
    { id: 11, name: "Tháng 11" },
    { id: 12, name: "Tháng 12" },
  ];
  export const year=[
      {id:2020},
      {id:2021}
  ]

export const handleData = (data, apart) => {
    //console.log(data);
    const newdata = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_delete === false) {
        newdata[i] = {
          id: data[i].id,
          order: i + 1,
          apart_id: data[i].apart_id,
          apart_name: data[i].apart_name, 
          time: data[i].month + "/" + data[i].year,
          total_money: <NumberFormat value={data[i].total_money} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => value} />,
          is_pay: data[i].is_pay ?"Đã thanh toán":"Chưa thanh toán",   
          is_pay_value: data[i].is_pay ?(<div style={{color:"green"}}>Đã thanh toán</div> ):<div style={{color:"red"}}>Chưa thanh toán</div>, 
          flag:data[i].is_pay,
          image:data[i].image
        };
      }
    }
    return newdata;
}