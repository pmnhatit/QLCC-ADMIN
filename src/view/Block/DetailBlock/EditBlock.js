import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
// import { directionList ,typeList } from "./ServiceAddBlock.js.js";
import TextField from "@material-ui/core/TextField";
import {useParams} from "react-router-dom"
import LoadingOverlay from "react-loading-overlay";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
  alerts:{
    marginTop:"18px"
  },
  myButton:{
    float: "right"
 }

}));
export default function EditBlock() {
  const classes = useStyles();
  //   const [open, setOpen] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck =  /^[a-zA-Z0-9]+$/;
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [isLoad,setIsLoad]=useState(true);
  const [isHandle,setIsHandle]=useState(false);
  const [open, setOpen] = useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [data,setData]=useState();

  const [alertApartName, setAlertApartName] = useState(false);
  const [apartName, setApartName] = useState("");
  
  const checkApartName = (name) => {
    if (name !== ""&& name.match(nameCheck)) {
      setAlertApartName(false);
      setApartName(name);
      return true
    } else {setAlertApartName(true)
    return false};
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
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
  
  const handleSubmit = async () => {
    handleClose();
    handleOpenLoading();
    if (checkApartName(apartName)) {
      const body = {       
          name: apartName,
          block_id:data._id
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/block/update`,
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
          const result = await res.json();

          console.log("success");
          console.log(result);
          handleOpenSnackBar(true);
          handleCloseLoading();
        } else  {
          console.log("SOMETHING WENT WRONG")
          handleOpenSnackBar(false)
          handleCloseLoading()
      };
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    } else {
      handleOpenSnackBar(false)
      handleCloseLoading();
    }
  };

  
  useEffect(() => {
    handleOpenLoading();
    const getRes = async () => {
      try{
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/${id}`,
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
        setData(result1.data);
        setApartName(result1.data.name)
        console.log(result1.data);
        setIsLoad(false);
        handleCloseLoading();
      } else {
        const result1 = await res1.json();
        alert(result1.message);
      }}catch (err) {
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin tòa nhà</h4>
            </CardHeader>
            { !isLoad && 
             <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên tòa nhà"
                fullWidth
                margin="normal"
                defaultValue={data.name}
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.textField}
                variant="outlined"
                onChange={(e) => checkApartName(e.target.value)}
              />
            </GridItem>
             <GridItem xs={12} sm={12} md={3}>
              {alertApartName && <Alert className={classes.alerts} severity="error">Không hợp lệ</Alert>}
            </GridItem>
            </GridContainer>}
           
            <GridContainer /> 
            <GridItem xs={12} sm={12} md={9}>
          <Button className={classes.myButton} color="primary" onClick={handleClickOpen}>
            Lưu lại chỉnh sửa
          </Button></GridItem>  
        </GridItem>
      </GridContainer>


      
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
                  Xác nhận chỉnh sửa
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleSubmit(e)} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
    </div>
  );
}
