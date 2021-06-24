import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData,content,title } from "./ServiceListRegister.js";
import CustomButton from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';

import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle"
import Button from "../../../component/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import LoadPlace from "./LoadPlace.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
const useStyles = makeStyles(styles);

export default function ListRegister() {
  const classes = useStyles();
  
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [isLoad,setIsLoad]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);
  const [service_id,setService_id]=useState("");
  const [serviceName,setServiceName]=useState("");
  const [draw_date,setDraw_date]=useState();
  const [selectdate,setSelectDate]=useState("");
  const [reloadPlace,setReloadPlace]=useState(true);
  const [show,setShow]=useState (false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [selectRow,setSelectRow]=useState();
  const [reason,setReason]=useState();
  const [reload,setReload]=useState(true);
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    onTableChange: (action, tableState) => {
      console.log(action, tableState);

      // a developer could react to change on an action basis or
      // examine the state as a whole and do whatever they want
      switch (action) {

        case "filterChange"://,"search"
         
          handleFilter(tableState.displayData,tableState.filterList);
          break;
        default:
      }
    },
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
      {
        name: "",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
             
              <div>
                <Tooltip
                id="tooltip-top"
                title="Chấp nhận"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => handleClick(tableMeta.rowData)}
                >
                  <Check />
                </Fab>
              </Tooltip>
              <Tooltip
                id="tooltip-top-start"
                title="Không chấp nhận"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => handleClick1(tableMeta.rowData)}
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

  const handleClick = async(row) => {
    setSelectRow(row);
    handleClickOpen();
  }

  const handleClick1 = async(row) => {
    setSelectRow(row);
    handleClickOpen1();
  }
  const handleClickOpen = (temp) => {
    
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen1 = (temp) => {
    
    setOpen1(true);
  };

  const handleAccepted= async () => {
    handleClose();
    console.log(selectRow);
    const body = {
      register_id: selectRow[0],
      service_id:selectRow[9] ,
      registed:{date: selectRow[8], term: selectRow[10], user_id:selectRow[11] }
  
  };
 // console.log(body);
  handleChangeStatus(selectRow[0],process.env.REACT_APP_API_LINK + `/api/register-service/update-confirm`,body, await getUser(selectRow[11]))
  }
  const handleDenied= async () => {
    handleClose1();
    console.log(selectRow);
    const body = {
      register_id: selectRow[0],
      reason: reason
  
  };
  handleChangeStatus(selectRow[0],process.env.REACT_APP_API_LINK + `/api/register-service/update-reject`,body, await getUser(selectRow[11]))
  }
  const handleChangeStatus = async (id,url,body,token_device) => {
    handleOpenLoading();
    try {   
      console.log(body);

      const res = await fetch(
        url,
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
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/register-service/change-is-read`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({register_id: id}),
        }
      );
      if (res.status === 200&&res1.status === 200) {
       
        console.log("change ok");
        await PushNotification(token_device);
        setReloadPlace(!reloadPlace)
        //history.push(`/admin/reportbill`);
        handleOpenSnackBar(true)
        handleCloseLoading()
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  };
  const PushNotification=async(token_device)=>
  {
    try {
        const body = {
          tokens: [token_device],
          title: title,
          body: content,
          type: 2,
        };

        console.log(body);
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/push-noti/add-notice`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        if (res.status === 200) {
          //const result = await res.json();
          console.log("push noti ok");
          setReload(!reload);
          //history.push(`/admin/reportbill`);
        } else {
          console.log("SOMETHING WENT WRONG");
        }
      } catch (err) {
        console.log(err);
      }
  }
  const getUser = async (user_id)=>
  { 
    const res = await fetch(
      process.env.REACT_APP_API_LINK + `/api/user/${user_id}`,
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
      const result = await res.json();
      console.log("token_device ok ");
      return result.data.token_device;
    } else {
      const result = await res.json();
      console.log(result.message);
    }

  }
  const handleFilter =async(data,list)=>
  {
      console.log(data);
      console.log(list);
      if(list[2].length!==0 &&list[4].length!==0 &&data.length!==0) // đã filter ngày va nơi
      {
        console.log("ok"); 
        setService_id(data[0].data[9]);  // lấy service_id dòng đầu
        setDraw_date(data[0].data[8]);  // lấy draw date dòng dâu
        setServiceName (data[0].data[4]);//tên
        setSelectDate(data[0].data[2]); //ngày
        setReloadPlace(!reloadPlace);
        setShow(false);
        setShow(true);      
      }
      else
      {console.log("chua chon dủ");
      setShow(false);}
  }
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
        process.env.REACT_APP_API_LINK + `/api/register-service/all-register?status=0`,
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
  }, [reload]);
  return (
  <div> <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
    <GridContainer>
      <GridItem xs={12} sm={12} md={10}>
      {isLoad && <div>Đang xử lý...</div>}
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
      </GridItem>
      <GridItem xs={12} sm={12} md={2} >
       <LoadPlace service_id={service_id} service_name={serviceName} draw_date={draw_date} date={selectdate} reload={reloadPlace} show={show}></LoadPlace>
      </GridItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Xác nhận xử lý
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAccepted} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Xác nhận xử lý
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lý do"
            type="text"
            fullWidth
            onChange={e=>setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDenied} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      
    </GridContainer></LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
