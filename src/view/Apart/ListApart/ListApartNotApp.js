import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListApart.js";
import CustomButton from "../../../component/CustomButtons/Button.js"
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
export default function ListApart() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [isHandle,setIsHandle]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    downloadOptions:{filterOptions:{useDisplayedRowsOnly:true}}
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: false,
        sort: true,
        download:false
      },
    },
    {
      name: "name",
      label: "Tên phòng",
      options: {
        filter: true,
        sort: false,
        download:false
      },
    },
    {
      name: "block",
      label: "Toà nhà",
      options: {
        filter: true,
        sort: false,
        download:false
      },
    },
    {
      name: "status",
      label: "Tình trạng",
      options: {
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "status_name",
      label: "Tình trạng",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
        download:false
      },
    },
    {
      name: "order",
      label: "Order",
      options: {
        filter: false,
        sort: true,
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "Apart Name",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "block",
      label: "Block",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
   
    {
      name: "status_name_download",
      label: "Status",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
       
      },
    },
    {
      name: "",
      options: { filter: false,
        sort: false,
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
              // color="primary"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon color="primary"/>
            </Fab>
          </Tooltip>
          </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {

    history.push(`/admin/apart/detail/${id}`);
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
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts?status=2&owner.is_active=false`,
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
      if (res.status === 200 || res1.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        const result1 = await res1.json();
        console.log(result.data);
        setData(await handleData(result.data, result1.data));
        handleCloseLoading()
      } else {
        const result = await res.json();
        alert(result.message);
        handleCloseLoading()
        handleOpenSnackBar(false)
      }}
      catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
  }
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
