import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData} from "../ListRegister/ServiceListRegister.js";


import MUIDataTable from "mui-datatables";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";

import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
const useStyles = makeStyles(styles);

export default function ListAccepted() {
  const classes = useStyles();
  
 const [openSnackBar,setOpenSnackBar]=useState(false);
 const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);


  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [isLoad,setIsLoad]=useState(false);
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
  };
  const columns = [
    {
      name: "id",   //0
      label: "id",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "order", //1
      label: "Số thứ tự",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "date",
      label: "Ngày sử dụng",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "create_date",
      label: "Thời gian tạo",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "service_value",
      label: "Địa điểm",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
        name: "term_value",  //5
        label: "Buổi",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "content",
        label: "Mục đích",
        options: {
          filter: false,
          sort: false,
        },
      },
    {
        name: "is_read_admin",
        label: "Tình trạng",
        options: {
          display: false,
          filter: false,
          sort: false,
        },
      },
      {
        name: "draw_date",   //8
        label: "Ngày sử dụng",
        options: {
          display: false,
          filter: false,
          sort: false,
        },
      },
      {
        name: "service_id",
        label: "Địa điểm",
        options: {
          display: false,
          filter: false,
          sort: false,
        },
      },
      {
        name: "term",
        label: "Buổi",
        options: {
          display: false,
          filter: false,
          sort: false,
        },
      },
      {
        name: "user_id", //11
        label: "user",
        options: {
          display: false,
          filter: false,
          sort: false,
        },
      },

  ];
  const handleOpenSnackBar = (type) => {
    if (type) setSnackType(true);
    else setSnackType(false);
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
 const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
  }

  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/register-service/all-register?status=1`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/service/all-services`,
        {
          // get block
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200 || res1.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        const result1 = await res1.json();
        //console.log(result.data);
        //console.log(result1.data);
        setData(await handleData(result.data, result1.data));
        
        handleCloseLoading()
      } else {
        const result = await res.json();
        console.log(result.message); 
        handleOpenSnackBar(false)
        handleCloseLoading()
      }}
      catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    };
    getRes();
  }, []);
  return (
    <div><LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      {isLoad && <div>Đang xử lý...</div>}
      <MUIDataTable
        title={" "}
        data={data}
        columns={columns}
        options={options}
      />
      </GridItem>

    </GridContainer>
    </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar></div>
  );
}
