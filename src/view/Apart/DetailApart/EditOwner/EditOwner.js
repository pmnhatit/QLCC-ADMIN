import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../../component/Grid/GridItem.js";
import GridContainer from "../../../../component/Grid/GridContainer.js";
import Button from "../../../../component/CustomButtons/Button.js";
// import { directionList, typeList } from "./ServiceEditApart.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../../component/SnackBar/Snackbar.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchTextField from "../../../../component/SearchTextField/SearchTextField.js"
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  alerts: {
    marginTop: "18px",
  },
  myButton: {
    float: "right",
  },
}));
const is_activeList=[{id:false,name:"Không dùng app"},{id:true,name:"Có dùng app"},
]
const statusList=[
  {id:1,name:"Căn hộ trống"},
  {id:2,name:"Đã bán"}
]
export default function EditApart(props) {
  const classes = useStyles();
  // const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [open, setOpen] = useState(false);
  const { data, isLoad, blockList, setIsHandle } = props;
  const [alertIs_Active, setAlertIs_Active] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertUserSelected, setAlertUserSelected] = useState(false);
  const [is_Active, setIs_Active] = useState(false);
  const [status,setStatus]=useState(1);
  const [userList,setUserList]=useState();
  const [userSelected,setUserSelected]=useState();
  
  const checkIs_Active = (value) => {
    if (value !== "") {
      setAlertIs_Active(false);
      setIs_Active(value);
      return true;
    } else {
      setAlertIs_Active(true);
      return false;
    }
  };const checkStatus = (value) => {
    if (value !== "") {
      setAlertStatus(false);
      setStatus(value);
      return true;
    } else {
      setAlertStatus(true);
      return false;
    }
  };

  const checkUserSelected = (userSelected) => {

    if (userSelected !== undefined &&userSelected !== null ) {
      console.log(userSelected);
      setAlertUserSelected(false);
      setUserSelected(userSelected);
      return true;
    } else {
      setAlertUserSelected(true);
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
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const editApart = async () => {
    handleClose();
    setIsHandle(true);
    if (checkIs_Active(is_Active) && checkUserSelected(userSelected) && checkStatus(status)) {
      const body = {
        apart_id: data._id,
        user_id: userSelected.id,
        is_active: is_Active===true?true:false,
        status:status

      };
      console.log(body);

      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/update-owner`,
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
          console.log("edit ok");
          console.log(result);
          setIsHandle(false);
          handleOpenSnackBar(true);
        } else {
          console.log("SOMETHING WENT WRONG");
          setIsHandle(false);
          handleOpenSnackBar(false);
        }
      } catch (err) {
        console.log(err);
        setIsHandle(false);
        handleOpenSnackBar(false);
      }
    }
    else{
      setIsHandle(false);
      handleOpenSnackBar(false);
    }
  };
  const renderValue=(value)=>{
    if(!value)
      return ;
    else 
      return (<>
        <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="useername"
                  label="Tên người dùng"
                  fullWidth
                  margin="normal"
                  value={userSelected.name}
                  //defaultValue={userSelected.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
        
                  variant="outlined"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="phone"
                  label="Số điện thoại"
                  fullWidth
                  margin="normal"
                  value={userSelected.phone}
                  //defaultValue={userSelected.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
        
                  variant="outlined"
                />
              </GridItem>
      </>)
  }

  useEffect(() => {
    setIsHandle(true);
    const getRes = async () => { 
      try{
      const res = await fetch(
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

      if (res.status === 200 ) {
        console.log("Vo 200OK");
        const result = await res.json();
        console.log(result.data);
        setUserList(result.data);
       setIsHandle(false)
        
      } else {
        const result = await res.json();
        alert(result.message);
        handleOpenSnackBar(false)
        setIsHandle(false)
      }}
      catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        setIsHandle(false)
      }
  }
    getRes();
  }, []);

  return (
    <div>
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer><GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tình trạng căn hộ"
                  margin="normal"
                  defaultValue={data.block}
                  onChange={(e) => checkStatus(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {statusList.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
              
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tình trạng chủ căn hộ"
                  margin="normal"
                  defaultValue={data.block}
                  onChange={(e) => checkIs_Active(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {is_activeList.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertIs_Active && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
                
              <GridItem xs={12} sm={12} md={9}>
                <SearchTextField data={userList} setSelected ={setUserSelected}></SearchTextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertUserSelected && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
              {renderValue(userSelected)}
            </GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <Button
                className={classes.myButton}
                color="primary"
                onClick={(e) => handleClickOpen()}
              >
                Lưu lại
              </Button>
            </GridItem>
          </GridItem>

          <Snackbar
            open={openSnackBar}
            type={snackType}
            handleClose={handleCloseSnackBar}
          ></Snackbar>

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
              <Button onClick={(e) => editApart(e)} color="primary">
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </GridContainer>
      )}
    </div>
  );
}
