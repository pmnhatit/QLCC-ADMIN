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
import { to, returnTitleDialog, contentPush, titlePush } from "./ServiceCreateNotification.js";
import TextField from "@material-ui/core/TextField";
import BlockNotification from "./Block/BlockNotification.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoadingOverlay from "react-loading-overlay";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import FloorNotification from "./Floor/FloorNotifications.js"
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
  myButton: {
    float: "right",
  },
}));
export default function CreateNotification() {
  const classes = useStyles();
  const [contentList, setContentList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;

  const token = useSelector((state) => state.user.token);
  const [open, setOpen] = useState(false); 
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [isHandle,setIsHandle]=useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertContent, setAlertContent] = useState(false);
  const [alertLink, setAlertLink] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("all");
  const [image, setImage] = useState("");
  const [block, setBlock] = useState();
  const [floor,setFloor]=useState();
  const [apart_id,setApart_id]=useState();
  const [nameFile, setNameFile] = useState([]);
  const [fileExtension, setFileExtenstion] = useState([]);
  const [fileMediaType, setFileMediaType] = useState([]);
  //const [fileData, setFileData] = useState([]);
  const [review, setReview] = useState([{ src: "" }]);
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [reload, setReload] = useState(false);

  const checkTitle = (name) => { 
    setTitle(name);
    if (name !== "") {
      setAlertTitle(false);
      return true;
    } else {
      setAlertTitle(true);
      return false;
    }
  };
  const checkContent = (content) => {  
    setContent(content);
    if (content !== "") {
      setAlertContent(false);
      return true;
    } else {
      setAlertContent(true);
      return false;
    }
  };
  const checkLink = (link) => {  
    setLink(link);
    if (true) {
      setAlertLink(false);
    } else setAlertLink(true);
  };

  const handleType = (value) => {
    console.log(value);
    setType(value);
    //setReload(!reload);
  };
  const renderTo = () => {
    //console.log(value);
    console.log(type);
    if (type === "all") {
      return ;
    }
    if (type === "block") {
      return <BlockNotification setBlock={setBlock} handleOpenLoading={handleOpenLoading}handleCloseLoading={handleCloseLoading} handleOpenSnackBar={handleOpenSnackBar}></BlockNotification>;
    }
    if (type==="floor")
    {
      return <FloorNotification setBlock={setBlock} setFloor={setFloor} setApart_id={setApart_id} handleOpenLoading={handleOpenLoading}handleCloseLoading={handleCloseLoading} handleOpenSnackBar={handleOpenSnackBar}/>
    }
  };
  const handeFile = async (file, imageUrl) => {
    console.log(file);
    console.log(imageUrl);
    setImage(file);
    let name = [];
    let extension = [];
    let type = [];
    let data = [];
    let reviewImage = [];
    if (file !== undefined) {
      for (let i = 0; i < file.length; i++) {
        let arr = file[i].type.split("/");
        extension.push(arr.pop());
        type.push(arr.pop());
        name.push(file[i].name.split(".").shift());
        reviewImage[i] = {
          src: URL.createObjectURL(file[i]),
        };
      }
      // console.log(name);
      // console.log(extension);
      // console.log(type);
      // console.log(review);
      setReview(reviewImage);
      setNameFile(name);
      setFileExtenstion(extension);
      setFileMediaType(type);
      //setFileData(data);
      setIsSelectFile(true);
    }
  };
  const handleSubmit = () => {
    //getlink();
    handleClose();
    handleOpenLoading()
    getlink();
  };

  const getlink = async () => {
    if (nameFile.length !== 0) {
      try {
        let url = [];
        let key = [];
        for (let i = 0; i < nameFile.length; i++) {
          console.log(fileExtension[i] + fileMediaType[i]);
          const res = await fetch(
            process.env.REACT_APP_API_LINK +
              `/api/uploadv2/signed-url?fileName=${nameFile[i]}&extension=${fileExtension[i]}&mediaType=${fileMediaType[i]}`, ///api/upload-csv/signed-url?fileName=electric&extension=vnd.ms-excel&mediaType=application
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
            console.log("image ok" + i);
            url.push(result.uploadUrl);
            key.push(result.key);
          }  else {
            console.log("SOMETHING WENT WRONG");
          handleCloseLoading()
          handleOpenSnackBar(false)}
        }
        console.log(key);
        upload(url, key);
      } catch (err) {
        console.log(err);
        handleCloseLoading()
        handleOpenSnackBar(false)
      }
    } else {
      console.log("no image");
      createBody([""]);
    }
  };
  const upload = async (url, key) => {
    try {
      for (let i = 0; i < url.length; i++) {
        console.log(fileMediaType[i] + "/" + fileExtension[i]);
        //console.log(fileData[i]);
        const res = await fetch(url[i], {
          method: "PUT",
          headers: {
            "Content-Type": fileMediaType[i] + "/" + fileExtension[i],
          },
          body: image[i],
        });
        if (res.status === 200) {
          //const result = await res.json();
          console.log("upload ok" + i);
        } else {
          console.log("SOMETHING WENT WRONG");
          handleCloseLoading()
          handleOpenSnackBar(false)
        }
      }
      //console.log(key);
      createBody(key);
    } catch (err) {
      console.log(err);
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };
  const createBody = async (key) => {
    
    if (checkContent(content) === true && checkTitle(title) === true) {
      //console.log("check true");
      if (type === "all") {
        //console.log("all true");
        const body = {
          title: title,
          content: content,
          link: link,
          type: type,
          image: key[0],
        };
        console.log(body);
        sendNotification( body);
      }
      if (type === "block") {
        //console.log("block true");
        const body = {
          title: title,
          content: content,
          link: link,
          type: type,
          image: key[0],
          block_id: block,
        };
        
        console.log(body);
        sendNotification(body);
      }
      if (type === "floor") {
        //console.log("block true");
        const body = {
          title: title,
          content: content,
          link: link,
          type: type,
          image: key[0],
          block_id: block,
          floor: floor,
          apart_id:apart_id
        };
        
        console.log(body);
        sendNotification(body);
      }
    }
  };
  const sendNotification = async (body) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/noti/add`,
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

        console.log("send notification");
        console.log(result.tokens_device);
       await PushNotification(result.tokens_device)
       handleCloseLoading()
       handleOpenSnackBar(true);
      } else {
        console.log("SOMETHING WENT WRONG")
        handleCloseLoading()
        handleOpenSnackBar(false)};
    } catch (err) {
      console.log(err);
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };

  const PushNotification=async(token_device)=>
  {
    try {
        const body = {
          tokens: token_device,
          title: titlePush,
          body: contentPush,
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
 
  const handleClickOpen = (temp) => {
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

  return (
    <div> <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="title"
                label="Tiêu đề"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkTitle(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertTitle && (
                <Alert className={classes.alerts} severity="error">
                  Tiêu đề hộ không hợp lệ
                </Alert>
              )}
            </GridItem>
            <GridContainer />

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="content"
                label="Nội dung"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline={true}
                variant="outlined"
                onChange={(e) => checkContent(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertContent && (
                <Alert className={classes.alerts} severity="error">
                  Nội dung không hợp lệ
                </Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="link"
                label="Link đính kèm (nếu có)"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkLink(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertLink && (
                <Alert severity="error" className={classes.alerts}>
                  Diện tích không hợp lệ
                </Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={2} style={{ marginTop: "15px" }}>
              <label style={{ marginTop: "50px" }}>Ảnh </label>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <input
                style={{ marginTop: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files, e.target.value)}
                multiple
                accept="image/*"
              />
            </GridItem>
            {
              <GridItem xs={12} sm={12} md={6}>
                {isSelectFile &&
                  review.map((option) => (
                    <img
                      src={option.src}
                      alt="Girl in a jacket"
                      style={{ width: "100px", height: "100px" }}
                    ></img>
                  ))}
                {/* {<img src={review[0].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} */}
                {/* {<img src={review[1].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} */}
              </GridItem>
            }

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="to"
                select
                label="Người nhận"
                margin="normal"
                defaultValue={to[0]}
                onChange={(e) => handleType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {to.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              {renderTo()}
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
            {alertLink && (
                <Alert severity="error" className={classes.alerts}>
                 Không hợp lệ
                </Alert>
              )}
            </GridItem>
          </GridContainer>
          <GridItem xs={12} sm={12} md={3}>
          </GridItem>
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {returnTitleDialog(type)}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={(e) => handleSubmit()} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </GridContainer>
     </LoadingOverlay>
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
