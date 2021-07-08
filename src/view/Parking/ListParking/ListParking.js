import Fab from '@material-ui/core/Fab';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js";
import { handleData } from "./ServiceListParking";
const useStyles = makeStyles(styles);


 
export default function ListParking(props) { 
  const classes = useStyles();
  const history = useHistory();
  //const {type,status}=props;
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);

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
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "user",
      label: "Người gửi",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "time",
      label: "Ngày tạo",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "is_read_admin",
      label: "",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "is_read_admin_value",
      label: "Tình trạng",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "is_read_admin_name",
      label: "Tình trạng.",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_confirm",
      label: "Xử lý",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "is_confirm_name",
      label: "Xử lý.",
      options: {
        display: "excluded", 
        filter: true,
        sort: false,
      },
    },
    {
      name: "Chi tiết",
      options: { filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            
            <Tooltip
            id="tooltip-top"
            title="Chi tiết"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Fab
              size="small"
              color="red"
              aria-label="add"
              className={classes.margin}
              onClick={() =>  handleClick(tableMeta.rowData[0],tableMeta.rowData[4])}
            >
              <EditIcon color="primary"/>
            </Fab>
          </Tooltip>
          );
        },
      },
    },
  ];
  const handleClick = async(id,is_read_admin) => {
    // e.preventDefault();
    console.log(is_read_admin);
    if(!is_read_admin) await handleChangeStatus(id);
    history.push(`/admin/noti_parking/${id}`);
  };
  const handleChangeStatus = async (id) => {
    try {
      const body=
      {
        notice_id: id
      }
    
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/noti-parking/change-is-read`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {
        console.log("ok");
     
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
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

  useEffect(() => {handleOpenLoading()
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/noti-parking/allreport`,
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
        process.env.REACT_APP_API_LINK + `/api/user/all`,
        {
          // get apart
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
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      /> </LoadingOverlay>
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
