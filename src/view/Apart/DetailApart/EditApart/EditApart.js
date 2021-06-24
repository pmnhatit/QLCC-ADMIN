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
import { directionList, typeList } from "./ServiceEditApart.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../../component/SnackBar/Snackbar.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
export default function EditApart(props) {
  const classes = useStyles();
  // const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [open, setOpen] = useState(false);
  const { data, isLoad, blockList,setIsHandle } = props;
  const [alertApartName, setAlertApartName] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);
  const [alertArea, setAlertArea] = useState(false);
  const [alertFloor, setAlertFloor] = useState(false);
  const [alertDirection, setAlertDirection] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertDescription, setAlertDescription] = useState(false);

  const [apartName, setApartName] = useState(data.name);
  const [block, setBlock] = useState(data.block);
  const [area, setArea] = useState(data.area);
  const [floor, setFloor] = useState(data.floor);
  const [direction, setDirection] = useState(data.direction);
  const [type, setType] = useState(data.type);
  const [description, setDescription] = useState(data.description);
  console.log("apart");
  const checkApartName = (name) => {
    if (name !== "" && name.match(nameCheck)) {
      setAlertApartName(false);
      setApartName(name);
      return true;
    } else {
      setAlertApartName(true);
      return false;
    }
  };
  const checkBlock = (block) => {
    if (block !== "") {
      setAlertBlock(false);
      setBlock(block);
      return true;
    } else {
      setAlertBlock(true);
      return false;
    }
  };
  const checkArea = (area) => {
    if (area !== "" && area.toString().match(phoneCheck)) {
      setAlertArea(false);
      setArea(area);
      return true;
    } else {
      setAlertArea(true);
      return false;
    }
  };
  const checkFloor = (floor) => {
    if (floor !== "" && floor.toString().match(phoneCheck)) {
      setAlertFloor(false);
      setFloor(floor);
      return true;
    } else {
      setAlertFloor(true);
      return false;
    }
  };
  const checkDirection = (direction) => {
    if (direction !== "") {
      console.log(direction);
      setAlertDirection(false);
      setDirection(direction);
      return true;
    } else {
      setAlertDirection(true);
      return false;
    }
  };
  const checkType = (type) => {
    if (type !== "") {
      setAlertType(false);
      setType(type);
      return true;
    } else {
      setAlertType(true);
      return false;
    }
  };
  const checkDescription = (address) => {
    if (address !== "") {
      setAlertDescription(false);
      setDescription(address);
      return true;
    } else {
      setAlertDescription(true);
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

  const editApart = async () => {
    handleClose();
    setIsHandle(true);
    if (
      checkApartName(apartName) &&
      checkBlock(block) &&
      checkArea(area) &&
      checkFloor(floor) &&
      checkDirection(direction) &&
      checkType(type) &&
      checkDescription(description)
    ) {
      const body = {
        apart_id: data._id,
        name: apartName,
        block: block,
        area: parseInt(area),
        direction: direction,
        type: type,
        images: data.images,
        description: description,
        floor: parseInt(floor),
      };
      console.log(body);

      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/update`,
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
  };

  return (
    <div>
    
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="apartname"
                  label="Tên căn hộ"
                  fullWidth
                  margin="normal"
                  defaultValue={data.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkApartName(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertApartName && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridContainer />

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tòa nhà"
                  margin="normal"
                  defaultValue={data.block}
                  onChange={(e) => checkBlock(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {blockList.map((option) => (
                    <option key={option.id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertBlock && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="area"
                  label="Diện tích căn hộ(m2)"
                  defaultValue={data.area}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkArea(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertArea && (
                  <Alert severity="error" className={classes.alerts}>
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="area"
                  label="Tầng"
                  defaultValue={data.floor}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkFloor(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertFloor && (
                  <Alert severity="error" className={classes.alerts}>
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="direction"
                  select
                  label="Hướng căn hộ"
                  margin="normal"
                  defaultValue={data.direction}
                  onChange={(e) => checkDirection(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {directionList.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertDirection && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="type"
                  select
                  label="Loại căn hộ"
                  margin="normal"
                  defaultValue={data.type}
                  onChange={(e) => checkType(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {typeList.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertType && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="description"
                  label="Mô tả"
                  fullWidth
                  margin="normal"
                  defaultValue={data.description}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={address}
                  onChange={(e) => checkDescription(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertDescription && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
            </GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <Button
                className={classes.myButton}
                color="primary"
                onClick={e=>handleClickOpen()}
              >
                Lưu lại
              </Button>
            </GridItem>
          </GridItem>
         
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
