import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import SearchApart from "../SearchApart.js";

export default function BlockNotification(props) {
  const token = useSelector((state) => state.user.token);
  const {setApart_id, handleOpenLoading,handleCloseLoading,handleOpenSnackBar}=props;
  const [apartList,setApartList]=useState({list:[{name:"Không có căn hộ"}],default:[]});
 // console.log("block");
 const changeData=(apart)=>
 {
    console.log(apart);
    if(apart!==null)
    setApart_id(apart._id)
    else 
    setApart_id("")
 }
  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts?status=2&owner.is_active=true`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        console.log(result.data);
        setApartList({list:result.data,default:[]})
       handleCloseLoading()
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false)
       handleCloseLoading()
      }}catch (err) {
        console.log(err);
       handleOpenSnackBar(false)
        handleCloseLoading()
      }
    };
    getRes();
  }, []);

  return (
      <>
        <br></br>
           <SearchApart data={apartList} changeData={changeData} lable={"Căn hộ thông báo"}></SearchApart>
    </>
  );
}
