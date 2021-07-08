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
import CardAvatar from "../../../component/Card/CardAvatar.js";

import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import { handleData } from "./ServiceDetailNotification";
import Snackbar from "../../../component/SnackBar/Snackbar.js";
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
  myButton: {
    float: "right",
    width: "150px",
  },
}));
export default function DetailPublicArea(props) {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [isHandle, setIsHandle] = useState(false);
  const [image, setImage] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [data,setData]=useState();
  //   const token = useSelector((state) => state.user.token);
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
  const handleOpenLoading = () => {
    setIsHandle(true);
  };
  const handleCloseLoading = () => {
    setIsHandle(false);
  };
  const handleDelete=async()=>{
    handleClose()
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
        
        history.push('/admin/notification')
      } else{ console.log("SOMETHING WENT WRONG")
      handleOpenSnackBar(false)
      handleCloseLoading()};
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  }

  const getUrl = async (key) => {
    if (key.length >= 1) {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key}`,
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
          console.log("get image OK");
          return result.imageUrl;
          // setImage(result.imageUrl);
          // setIsLoad(false);
        } else {
          const result = await res.json();
          console.log(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoad(false);
  };

  
  useEffect(() => {
    setIsLoad(true);
    const getRes = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK +
            `/api/noti/${id}`,
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
          console.log(" useEffect OK");
          console.log(result.data);
          // await getUserAndApart(result.data);
          setData(await handleData(result.data))
          if (result.data.image !== "")setImage(await getUrl(result.data.image));
          else setImage("")
          setIsLoad(false);
        } else {
          const result = await res.json();
          console.log(result.message);
          handleOpenSnackBar(false);
        }
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false);
      }
    };
    getRes();
  }, [reload]);

  return (
    <div>
      <LoadingOverlay
        active={isHandle}
        spinner
        text="Đang xử lý vui lòng chờ..."
      >
        {!isLoad ? (
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <Card profile>
                <CardAvatar>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {image!==""? <img
                      src={image}
                      alt="Không có ảnh"
                      width="400"
                      height="400"
                    ></img> : <img  width="400" height="400"  src={process.env.PUBLIC_URL + '/noImage.jpg'}></img>}
                  </a>
                </CardAvatar>
              </Card>
             
            </GridItem>
            <GridItem xs={12} sm={12} md={7}>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Chi tiết thông báo
                </h4>
              </CardHeader>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <TextField
                    id="title"
                    label="Tiêu đề"
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
                    defaultValue={data.title}
                    //onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="content"
                    label="Nội dung"
                    //style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline={true}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    defaultValue={data.content}
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
                    defaultValue={data.time}
                    //onChange={(e) => setName(e.target.value)}
                  />

                
                  <TextField
                    id="link"
                    label="Link"
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
                    defaultValue={data.link}
                    //onChange={(e) => setName(e.target.value)}
                  ></TextField>
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12} />
              <Button className={classes.myButton} onClick={e=>handleClickOpen()} color="primary"> Xóa</Button>
            </GridItem>
            <div />
            <GridItem xs={12} sm={12} md={3} />
           
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
                Xác nhận xóa thông báo
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleDelete() } color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
      <Snackbar
        open={openSnackBar}
        type={snackType}
        handleClose={handleCloseSnackBar}
      ></Snackbar>
    </div>
  );
}
