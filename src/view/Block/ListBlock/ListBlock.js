import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListBlock.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
const useStyles = makeStyles(styles);
export default function ListBlock() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [isHandle,setIsHandle]=useState(false);
  const [data, setData] = useState([]);

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: false,
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
    // {
    //   name: "block",
    //   label: "Toà nhà",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    
    {
      name: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
            <Tooltip
            id="tooltip-top"
            title="Chi tiết"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    // e.preventDefault();
    console.log(id);
    history.push(`/admin/block/detail/${id}`);
  };
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
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/all`,
        {
          // get block
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res1.status === 200) {
        console.log("Vo 200OK");
        
        const result1 = await res1.json();
        setData(handleData(result1.data));
        console.log(result1.data);
        handleCloseLoading()
      } else {
        const result1 = await res1.json();
        //alert(result1.message);
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
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
      
       </LoadingOverlay> 
       <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
