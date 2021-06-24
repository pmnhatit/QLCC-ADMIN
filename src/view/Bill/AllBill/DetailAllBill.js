// import avatar from "../../../asset/img/faces/marc.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import NumberFormat from 'react-number-format';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js";
import { content, handleData, title } from "./ServiceDetailAllBill.js";
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  myButton:{
     float: "right",
     width:"200px"
  }
}));
export default function DetailAllBill(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const date = new Date();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const { bill_id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
  });
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [reload, setReload] = useState(true);
  const [isLate, setIsLate] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isHandle,setIsHandle]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
   const [snackType,setSnackType]=useState(true);
  const checkTime = (data) => {
    if (isLastMonth(data) && currentDate >= process.env.REACT_APP_TIME_LATE) {
      setIsLate(true);
    }
    if (isLastMonth(data) && currentDate >= process.env.REACT_APP_TIME_DENIED) {
      setIsDenied(true);
    }
  };
  const isLastMonth=(data)=>
  { 
    if(parseInt(currentMonth)===parseInt(data.month) &&parseInt(currentYear)===parseInt(data.year))
    return true;
  }
  const handleSubmit = async () => {
    console.log("submit");
    handleClose();
    try {
      const body = {
        bill_id: data.id,
        status: !data.is_pay,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-pay`,
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
        //const result = await res.json();
        console.log("ok");
        setReload(!reload);
      } else console.log("SOMETHING WENT WRONG");
    } catch (err) {
      console.log(err);
    }
  };
  const handleNoti1 = async() => {
      handleOpenLoading()
      const body = {
        apart_id: data.apart_id,
        apart_name: data.apart_name,
        month: data.month,
        year: data.year,
        total_money: data.total_money 
    
      };
      console.log(body);
     handleNoti(body,`/api/bill-noti/create-reminder`,"POST")
    

  };
  const handleNoti2 = () => {
    handleOpenLoading()
  const body = {
        apart_id: data.apart_id,
        apart_name: data.apart_name,
        month: data.month,
        year: data.year,
    
      };
      console.log(body);
     handleNoti(body,`/api/bill-noti/create-stop`,"POST")
  };
  const handleNoti = async(body, url,method)=>
  {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + url,
        {
          method: method,
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
        console.log("noti ok");
        await PushNotification();
        handleOpenSnackBar(true)
        handleCloseLoading()
      } else {console.log("SOMETHING WENT WRONG");
      handleOpenSnackBar(false)
      handleCloseLoading()}
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  
  };
  const PushNotification=async()=>
  {
    try {
        const body = {
          tokens: [data.token_device],
          title: title,
          body: content,
          type: 1,
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
          console.log("push noti ok");
         
        } else {
          console.log("SOMETHING WENT WRONG");
        }
      } catch (err) {
        console.log(err);
      }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
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
  const getToken_device =async(data,apart_id)=>
  {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/user/token-device/${apart_id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },

        }
      );
      if (res.status === 200) {
        const result = await res.json();
        
        console.log("get token device ok");
        setData(await handleData(data,result.token_device));
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
    }
  }
  
  
  useEffect(() => {
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/${bill_id}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    

      if (res.status === 200 ) {
        const result = await res.json();
       
        console.log("Vo 200OK");
        console.log(result);
        await getToken_device(result.data,result.data.apart_id)
        checkTime(result.data);
        setIsLoad(false);
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false)
      }
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
     
    }
    };
    getRes();
  }, [reload]);
  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chi tiết hóa đơn tổng</h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              
                <TextField
                  id="apart_name"
                  label="Tên Phòng"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.apart_name || ""}
                />

                <TextField
                  id="time"
                  label="Thời gian"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.month + "/" + data.year}
                />

                <NumberFormat value={data.electric_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => <TextField
                  id="elec"
                  label="Hóa đơn điện"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={value}
                />} />
                <NumberFormat value={data.water_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  <TextField
                  id="water"
                  label="Hóa đơn nước"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={value}
                />} />
               <NumberFormat value={data.other_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  <TextField
                  id="other"
                  label="Hóa đơn khác"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={value}
                />} />
               <NumberFormat value={data.total_money} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  
               <TextField
                  id="total"
                  label="Tổng tiền"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={value}
                  //onChange={(e) => setName(e.target.value)}
                />} />
               
                <TextField
                  id="is_pay"
                  label="Tình trạng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={
                    data.is_pay ? "Đã thanh toán" : "Chưa thanh toán"
                  }
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />

          
          <GridItem xs={12} sm={12} md={4}>
           
          </GridItem>
          {data.is_pay ? (
             <GridItem xs={12} sm={12} md={8}  >
                <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen()}>
                Hủy thanh toán
                </Button>
              </GridItem>
            ) :
          <GridItem xs={12} sm={12} md={8}>
            <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen()}>
                Thanh toán
              </Button>
            {isLate &&
              <Button className={classes.myButton} color="primary" onClick={(e) => handleClickOpen1()}>
                Thông báo trễ hạn
              </Button>
            }
            {isDenied &&(
              <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen2()}>
                Thông báo cắt điện nước
              </Button>
            )}
              
          </GridItem>
        }
        </GridContainer>
      ) : (
        <div>Đang xử lý, vui lòng chờ...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {data.is_pay || false
            ? "Xác nhận hủy thanh toán"
            : "Xác nhận thanh toán"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>Căn hộ: {data.apart_name}</div>
            <div>Tổng tiền: {data.total_money}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
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
            Xác nhận thông báo trễ hạn
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Căn hộ: {data.apart_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleNoti1()} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Xác nhận thông báo cắt điện
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Căn hộ: {data.apart_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleNoti2()} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
