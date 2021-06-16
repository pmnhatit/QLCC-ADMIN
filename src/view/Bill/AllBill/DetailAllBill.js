import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
// import Card from "../../../component/Card/Card.js";
// import CardAvatar from "../../../component/Card/CardAvatar.js";
// import CardBody from "../../../component/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
// import avatar from "../../../asset/img/faces/marc.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {handleData,title,content} from "./ServiceDetailAllBill.js"

import { useParams } from "react-router-dom";
import { Fastfood } from "@material-ui/icons";
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
     float: "right"
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
  const [reload, setReload] = useState(true);
  const [isLate, setIsLate] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isHandle,setIsHandle]=useState(false);
  const checkTime = (data) => {
    if (isLastMonth(data) && currentDate >= process.env.REACT_APP_TIME_LATE) {
      setIsLate(true);
      console.log("1 true");
    }
    if (isLastMonth(data) && currentDate >= process.env.REACT_APP_TIME_DENIED) {
      setIsDenied(true);
      console.log("2 true");
    }
  };
  const isLastMonth=(data)=>
  { 
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
      setIsHandle(true);
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
    setIsHandle(true);
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
        setIsHandle(false);
      } else console.log("SOMETHING WENT WRONG");
    } catch (err) {
      console.log(err);
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
        setData(handleData(data,result.token_device));
        //history.push(`/admin/reportbill`);
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const getRes = async () => {
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
        alert(result.message);
      }
    };
    getRes();
  }, [reload]);
  return (
    <div>
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

                <TextField
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
                  defaultValue={data.electric_bill}
                />
                <TextField
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
                  defaultValue={data.water_bill}
                />
                <TextField
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
                  defaultValue={data.other_bill}
                />
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
                  defaultValue={data.total_money}
                  //onChange={(e) => setName(e.target.value)}
                />
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
           {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}  
          {/*
          {isError && <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>} */}
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
              <Button className={classes.myButton} color="primary" onClick={(e) => handleNoti1()}>
                Thông báo trễ hạn
              </Button>
            }
            {isDenied &&(
              <Button  className={classes.myButton} color="primary" onClick={(e) => handleNoti2()}>
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
            Căn hộ: {data.apart_name}
            Tổng tiền: {data.total_money}
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
    </div>
  );
}
