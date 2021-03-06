import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";
import { handleApart } from "./ServiceAddUserAccount.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchApart from "../DetailUser/SearchApart.js"
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
  alerts: {
    marginTop: "18px",
  },
  myButton:{
    float: "right"
 }

}));
export default function ChangeProfile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [isHandle,setIsHandle]=useState(false);
  const [reload,setReload]=useState(true)
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertName, setAlertName] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertID_Card, setAlertID_Card] = useState(false);
  const [alertAddress, setAlertAddress] = useState(false);
  const [alertLicense_plates, setAlertLicense_plates] = useState(false);
  const [alertApart, setAlertApart] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id_card, setId_card] = useState("");
  const [address, setAddress] = useState("");
  const [license_plates, setLicense_plates] = useState("");
  const [block_id, setBlock_id] = useState("");
  const [apart_id, setApart_id] = useState("");
  const [apartList, setApartList] = useState({list:[{name:"Kh??ng c?? c??n h???"}],default:[]});

  
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
  const checkID_Card = (id_card) => {  
     setId_card(id_card);
    if (id_card !== "" && id_card.match(nameCheck)) {
      setAlertID_Card(false);
      return true;
    } else {
      setAlertID_Card(true);
      return false;
    }
  };
  const checkAddress = (address) => {
    if (address !== "") {  
      setAddress(address);
      setAlertAddress(false);
      return true;
    } else {
      setAlertAddress(true);
      return false;
    }
  };
  const checkLicense_plates = (license_plates) => {
    if (license_plates !== "") { 
       setLicense_plates(license_plates);
      setAlertLicense_plates(false);
      return true;
    } else {
      setAlertLicense_plates(true);
      return false;
    }
  };
  const checkApart = (apart_id) => {
    if (apart_id !== "") { 
       setApart_id(apart_id);
      setAlertApart(false);
      return true;
    } else {
      setAlertApart(true);
      return false;
    }
  };
  const changeData=async(apart)=>
  {
       let result=await handleApart(apart);
       setApart_id(result.apart_id)
       setBlock_id(result.block_id)
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

  const handleSubmit = async () => {
    handleClose()
    handleOpenLoading()
    if (
      checkName(name) &&
      checkPhone(phone) &&
      checkEmail(email) &&
      checkID_Card(id_card) &&
      checkAddress(address) && checkApart(apart_id)
    ) {
      const body = {
        name: name,
        phone: phone,
        email: email,
        identify_card: id_card,
        native_place: address,
        apartment_id: apart_id, //["6061e00355f5a919c47d3586"]
        block_id: block_id, //["6051fc3a449d422710797e73"]
        license_plates: [license_plates], //["78N2-8668"]
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/user/add`,
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
          const result = await res.json();

          console.log("success");
          console.log(result);
          handleCloseLoading()
          handleOpenSnackBar(true);
          setReload(!reload)
        } else if(res.status === 400){
          setAlertID_Card(true)
          handleCloseLoading()
          handleOpenSnackBar(false);
        } else {
          console.log("SOMETHING WENT WRONG")
        handleCloseLoading()
        handleOpenSnackBar(false);};
      } catch (err) {
        console.log(err);
        handleCloseLoading()
        handleOpenSnackBar(false);
      }
    } else {
      handleCloseLoading()
      handleOpenSnackBar(false);
    }
    
  };

  useEffect(() => { 
    handleOpenLoading()
    setIsLoad(true);
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/aparts-empty`,
        {
          // get content
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
        setApartList({list:result.data,default:[]})
        setIsLoad(false);
        handleCloseLoading()
        // setData(await handleData(result.data, result1.data));
      } else {
        const result = await res.json();
        alert(result.message);
        handleCloseLoading()
        handleOpenSnackBar(false);
      }} catch (err) {
      console.log(err); 
      handleCloseLoading()
      handleOpenSnackBar(false);
     
    }
     
    };
    getRes();
  }, [reload]);

  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="??ang x??? l?? vui l??ng ch???...">
   
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="name"
                  label="H??? v?? t??n"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkName(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertName && (
                  <Alert className={classes.alerts} severity="error">
                    T??n kh??ng h???p l??? 
                  </Alert>
                )}
              </GridItem>
              <GridContainer />
              <GridItem xs={12} sm={12} md={9}>
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
                  //defaultValue={email}
                  onChange={(e) => checkEmail(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertEmail && (
                  <Alert className={classes.alerts} severity="error">
                    Email kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="phone"
                  label="S??? ??i??n tho???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  variant="outlined"
                  onChange={(e) => checkPhone(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertPhone && (
                  <Alert severity="error" className={classes.alerts}>
                    S??? ??i???n tho???i kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="cmnd"
                  label="S??? CMND/CCCD"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={cmnd}
                  onChange={(e) => checkID_Card(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertID_Card && (
                  <Alert className={classes.alerts} severity="error">
                    S??? CMND kh??ng h???p l??? ho???c ???? t???n t???i
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="address"
                  label="Qu?? qu??n"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={address}
                  onChange={(e) => checkAddress(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertAddress && (
                  <Alert className={classes.alerts} severity="error">
                    Qu?? qu??n kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="license_plates"
                  label="Bi???n s??? xe"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={address}
                  onChange={(e) => checkLicense_plates(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertLicense_plates && (
                  <Alert className={classes.alerts} severity="error">
                    Bi???n s??? xe kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
                  {!isLoad && ( <GridItem xs={12} sm={12} md={9}>
                <SearchApart data={apartList} changeData={changeData}></SearchApart>
                </GridItem>
               )}
              <GridItem xs={12} sm={12} md={3}>
              {alertApart && (
                  <Alert className={classes.alerts} severity="error">
                    C??n h??? kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
             
            
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Button className={classes.myButton} color="primary" onClick={(e) => handleClickOpen()}>
                  L??u l???i
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
              X??c nh???n t???o t??i kho???n
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y
          </Button>
          <Button onClick={(e) => handleSubmit()} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
     
		
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>

    </div>
  );
}
