import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListApart.js";

export default function TestList() {
  const [data, setData] = useState([]);
  const userInfo = useSelector((state) => state.user.info);
  const token = userInfo[0].token;
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
        filter: true,
        sort: true,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Tên phòng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "block",
      label: "Toà nhà",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Tình trạng",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];
  useEffect(()  => {
    const getRes = async ()  =>{
    
    const res = await fetch( process.env.REACT_APP_API_LINK + `/api/apart/all-aparts`,{ // get apart
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    const res1 = await fetch( process.env.REACT_APP_API_LINK + `/api/block/all`,{ // get block
      method: 'GET',
      headers: {
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'application/json',
    },
  })
    if(res.status===200 || res1.status===200){
        console.log("Vo 200OK")
        const result = await res.json();
        const result1= await res1.json();
        await setData(await handleData(result.data,result1.data));
        console.log("useeffect"+data);
    }else{
        const result = await res.json();
        alert(result.message);
    }
  }
  getRes();
  }, [])
//   const data = [
//     {
//       id: "6061cca41d1f123978339d99",
//       order: 1,
//       name: "A301",
//       block: "A",
//       status: "Còn trống",
//     },
//     {
//       id: "6061cce41d1f123978339d9a",
//       order: 2,
//       name: "A315",
//       block: "A",
//       status: "Còn trống",
//     },
//     {
//       id: "6061dfd255f5a919c47d3585",
//       order: 3,
//       name: "B401",
//       block: "B",
//       status: "Còn trống",
//     },
//     {
//       id: "6061e00355f5a919c47d3586",
//       order: 4,
//       name: "C501",
//       block: "C",
//       status: "Còn trống",
//     },
//     {
//       id: "6061e03d55f5a919c47d3587",
//       order: 5,
//       name: "C410",
//       block: "C",
//       status: "Còn trống",
//     },
//   ];

  const options = {
    //filterType: "checkbox",
  };
  return (
    <div>
        {console.log(data)}
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
