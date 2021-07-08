import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../../component/CustomButtons/Button.js";
import { checkUser } from "./serviceProfile.js";
import TextField from "@material-ui/core/TextField";
import { addUser,deleteUser,updateUser } from "../../redux/action/userAction";
import Snackbar from "../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";



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
  },root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },myButton:{
      float: "right"
   }
 
  }));
export default function ChangeProfile() {
  const dispatch=useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userInfo = useSelector((state) => state.user.info);
  const token = useSelector((state) => state.user.token);

  const [alertName, setAlertName] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [name, setName] = useState(userInfo.name);
  const [phone, setPhone] = useState(userInfo.phone);
  const [email, setEmail] = useState(userInfo.email);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false); 
const [reload,setReload]=useState(true)
  const checkName = (name) => { 
    setName(name);
    if (name !== "") {
      setAlertName(false);
      return true;
    } else {
      setAlertName(true);
      return false;
    }
  };
  const checkPhone = (phone) => {  
    setPhone(phone);
    if (phone !== "" && phone.match(phoneCheck)) {
      setAlertPhone(false);
      return true;
    } else {
      setAlertPhone(true);
      return false;
    }
  };
  const checkEmail = (email) => {  
     setEmail(email);
    if (email !== "" && email.match(emailCheck)) {
      setAlertEmail(false);
      return true;
    } else {
      setAlertEmail(true);
      return false;
    }
  };
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

  
  const handleSubmit = async () => {
    handleClose()
    handleOpenLoading()
    if (await checkName(name) && await checkEmail(email)&& await checkPhone(phone)) {
      const body = {
        user_id: userInfo._id,
        name: name,
        phone: phone,
        email: email,
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/auth/update-info`,
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
          //delete
          // let action1 = addUser({}, null);
          // dispatch(action1);
          // push in redux
          
          const action2 = updateUser(result.data);
          dispatch(action2);
          console.log("success");
          console.log(result);
          handleCloseLoading()
          handleOpenSnackBar(true)
          setReload(!reload)
        } else {console.log("SOMETHING WENT WRONG")
        handleCloseLoading()
        handleOpenSnackBar(false)};
      } catch (err) {
        console.log(err);
        handleCloseLoading()
    handleOpenSnackBar(false)
      }
    } else {
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };
  // useEffect(() => {
  //   handleOpenLoading() 
  //   //setIsLoading(true);
  //   const getRes = async () => {
  //     try{
     
  //     const res = await fetch(
  //       process.env.REACT_APP_API_LINK + `/api/user/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + `${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
        
      
  //     if (res.status === 200) {      
  //       const result = await res.json();         
  //       setName(result.data.name);
  //       setEmail(result.data.email);
  //       setPhone(result.data.phone)
  //       handleCloseLoading()
  //     } else {
  //       const result = await res.json();
  //       alert(result.message);
       
  //       handleOpenSnackBar(false)
  //       handleCloseLoading()
  //     }
  //   }catch (err) {
  //     console.log(err);
     
  //     handleOpenSnackBar(false)
  //     handleCloseLoading()
  //   }
  //   };
  //   getRes();
  // }, [reload]);
  return (
    <div> <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin cá nhân</h4>
            </CardHeader> */}
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <TextField
                id="name"
                label="Họ và tên"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={name}
                onChange={(e) => checkName(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                {alertName && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
            <GridItem xs={12} sm={12} md={8}>
            <TextField
                id="email"
                label="Email"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={email}
                onChange={(e) => checkEmail(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                {alertEmail && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
            <GridItem xs={12} sm={12} md={8}>
            <TextField
                id="phone"
                label="Số điên thoại"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}type="number"
                variant="outlined"
                defaultValue={phone}
                onChange={(e) =>checkPhone(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                {alertPhone && (
                  <Alert severity="error" className={classes.alerts}>
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
          </GridContainer>
          <GridItem xs={12} sm={12} md={9}>
          <Button className={classes.myButton} color="primary"  onClick={(e) => handleClickOpen()}>
            Lưu lại
          </Button></GridItem>
        </GridItem>
       
      </GridContainer>
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
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
