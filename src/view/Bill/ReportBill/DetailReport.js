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
import Card from "../../../component/Card/Card.js";

import SlideShow from "../../../component/SlideShow/SlideShow.js"
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';
const useStyles = makeStyles((theme) => ({

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
export default function DetailReport(props) {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
  });
  
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true);// true:chấp nhận|| false:không chấp nhận
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false); 
const [reload,setReload]=useState(true);


  const handleSubmit = async () => {
    handleClose();
    let body = {};
    handleOpenLoading()
    try {
      if (selected)
        body = {
          apart_id: data.apart_id,
          title: "Khiếu nại đã được xử lý",
          content:
            "BQL chung cư thông báo, khiếu nại của anh/chị đã được giải quyết. Đề nghị kiểm tra lại.",
        };
      else
        body = {
          apart_id: data.apart_id,
          title: "Khiếu nại không được xác nhận",
          content:
            "BQL chung cư thông báo, khiếu nại của anh/chị chưa hợp lệ. Đề nghị liên hệ BQL để giải quyết.",
        };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/bill-noti/create-confirm`,
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
        console.log("ok");
        if(await handleChangeReport()){
          if (selected) await handleChangeStatus();
          // else history.push(`/admin/reportbill`)
            setReload(!reload)
            handleCloseLoading()
        }
        else{ handleOpenSnackBar(false)
          handleCloseLoading()}
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
  const handleChangeStatus = async () => {
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
        handleOpenSnackBar(true)
        handleCloseLoading()
        return true
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
        handleCloseLoading()
        return false
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
      
    }
  };
  const handleChangeReport = async () => {
    try {
      const body = {
        bill_id: data.id,
        status: false,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-report`,
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
        return true;
        
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
        handleCloseLoading()
        return false
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
      return false
    }
  };
  
  const handleClickOpen = (temp) => {
    setSelected(temp);
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
  const getUrl = async (key) => {
    let temp=[];
    if (key.length >= 1) {
      try {
        for (let i=0;i<key.length;i++)
       { const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key[i]}`,
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
          console.log("get url ok");
          temp[i]={value:result.imageUrl};
        } else {
          handleOpenSnackBar(false)
        }}
        console.log(temp);
        return temp;
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
      }
    }
    else
   return [""]
  };
  useEffect(() => {
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/${id}`,
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
        console.log("Vo 200OK");
        console.log(result.data);
        setData(result.data);
        setImage(await getUrl(await result.data.image));
        setIsLoad(false);
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false)  
      }}catch (err) {
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
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
            <SlideShow  images={image}></SlideShow>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {data.report ? "Khiếu nại chưa xử lý" : "Khiếu nại đã xử lý"}
              </h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="aprt_name"
                  label="Tên Phòng"
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
                  defaultValue={data.apart_name || ""}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="time"
                  label="Thời gian"
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
                  defaultValue={data.month + "/" + data.year}
                  //onChange={(e) => setName(e.target.value)}
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
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={3}>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {data.report ? (
              <>
                <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(true)}>
                  Chấp nhận
                </Button>
                <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(false)}>
                  Không chấp nhận
                </Button>
              </>
            ) : (
              <div />
            )}
          </GridItem>
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
          {selected ? "Xác nhận đã xử lý" : "Xác nhận không xử lý"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>Căn hộ: {data.apart_name}</div>
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

     </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
