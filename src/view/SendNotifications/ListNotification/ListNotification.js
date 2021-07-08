import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListNotification";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import Close from "@material-ui/icons/Close";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  
}));
export default function UserAccount() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  
  const [reload,setReload]=useState();
 const [openSnackBar,setOpenSnackBar]=useState(false);
 const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);
const [open, setOpen] = useState(false);

const [id,setID]=useState("");
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    download: false,
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "excluded",
        filter: true,
        sort: true,
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
      name: "date",
      label: "Ngày tạo",
      options: {
        filter: true,
        sort: true,
      },
    },{
        name: "title",
        label: "Tiêu đề",
        options: {
          filter: true,
          sort: false,
        },
      },
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
              color="red"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon color="primary"/>
            </Fab>
          </Tooltip>
         <Tooltip
                id="tooltip-top-start"
                title="Xóa"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => {setID(tableMeta.rowData[0]); handleClickOpen()}}
                >
                  <Close />
                </Fab>
          </Tooltip>
          </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    history.push(`/admin/notification/detail/${id}`);
  };
  const handleDelete=async()=>{
    console.log(id);
    handleOpenLoading()
    console.log("submit");
    handleClose();
    try {
  
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/noti/delete/${id}`, 
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
         
          }, 
         
        }
      );
      if (res.status === 200) {
        console.log("delete ok");
        setReload(!reload);
        handleOpenSnackBar(true)
        handleCloseLoading()
      } else{ console.log("SOMETHING WENT WRONG")
      handleOpenSnackBar(false)
      handleCloseLoading()};
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        process.env.REACT_APP_API_LINK + `/api/noti/all/${1}/${200}`,
        {
          // get apart
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
        setData(await handleData(result.data));
        handleCloseLoading()
        
      } else {
        const result = await res.json();
        alert(result.message);
        handleCloseLoading()
        handleOpenSnackBar(false);
      }
    } catch (err) {
      console.log(err); 
      handleCloseLoading()
      handleOpenSnackBar(false);
     
    }
    };
    getRes();
  }, [reload]);
  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"> Xác nhận xóa thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
