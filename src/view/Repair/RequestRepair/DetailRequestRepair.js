import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import CardAvatar from "../../../component/Card/CardAvatar.js";
import CardBody from "../../../component/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import { handleData, title, content } from "../ServiceDetail.js";
import PushNotiAdmin from "../../PushNotiAdmin.js"
import Snackbar from "../../../component/SnackBar/Snackbar.js"
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
  },
}));
export default function DetailRequestRepair(props) {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const {PushNotificationAdmin}=PushNotiAdmin()
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { notice_id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
    status_value: "",
    next_status_value: "",
    evaluation: {
      is_evaluate: false,
      comment: "",
      image: "",
      is_like: true,
    },
  });
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState();
  const [commentImage, setCommentImage] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [reload, setReload] = useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false); 
  //const [selected, setSelected] = useState(true); // true:ch???p nh???n|| false:kh??ng ch???p nh???n
  //   const token = useSelector((state) => state.user.token);

  const handleChangeStatus = async (next_status) => {
    try {
      handleClose();
      handleClose1();
      handleOpenLoading()
      const body = {
        notice_id: data._id,
        status: next_status,
      };

      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/repair/update-status`,
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
        await PushNotification();
        PushNotificationAdmin();
        setIsError(false);
        setReload(!reload);
        //history.push(`/admin/reportbill`);
        handleOpenSnackBar(true)
        handleCloseLoading()
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
        handleCloseLoading()
    }
  };
  const PushNotification = async () => {
    try {
      const body = {
        tokens: [data.token_device],
        title: title,
        body: content,
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
        //history.push(`/admin/reportbill`);
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          console.log("Vo 200OK");

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
  const handleClickOpen = (temp) => {
    // setSelected(temp);
    setOpen(true);
  };
  const handleClickOpen1 = (temp) => {
    //setSelected(temp);
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const renderButton = () => {
    console.log(data.status);
    if (data.status === 0) {
      return (
        <div>
          <Button
            className={classes.myButton}
            color="primary"
            onClick={(e) => handleClickOpen(true)}
          >
            {data.next_status_value}
          </Button>
          <Button
            className={classes.myButton}
            color="primary"
            onClick={(e) => handleClickOpen1(true)}
          >
            Kh??ng duy???t
          </Button>
        </div>
      );
    } else if (data.status === 2||data.status === 3) {
      return <div></div>;
    } else {
      return (
        <Button className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(true)}>
          {data.next_status_value}
        </Button>
      );
    }
  }; const handleOpenSnackBar = (type) => {
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
  const getUserAndApart = async (data) => {
    try{
    const res = await fetch(
      process.env.REACT_APP_API_LINK + `/api/user/${data.author}`,
      {
        // get apart
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const res1 = await fetch(
      process.env.REACT_APP_API_LINK + `/api/apart/${data.apart_id}`,
      {
        // get apart
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200 && res1.status === 200) {
      const result = await res.json();
      const result1 = await res1.json();
      console.log("Vo 200OK");
      setData(handleData(data, result.data, result1.data));
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
  useEffect(() => {
    setIsLoad(true);
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/repair/${notice_id}`,
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

        await getUserAndApart(result.data);
        if (result.data.image !== "") setImage(await getUrl(result.data.image));
        if (result.data.evaluation.is_evaluate === true)
          setCommentImage(await getUrl(result.data.evaluation.image));
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
    <div> <LoadingOverlay active={isHandle} spinner text="??ang x??? l?? vui l??ng ch???...">
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    src={image}
                    alt="Kh??ng c?? ???nh"
                    width="400"
                    height="400"
                  />
                </a>
              </CardAvatar>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Chi ti???t th??ng b??o d???ch v??? s???a ch???a
              </h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="apart_name"
                  label="T??n Ph??ng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.apart_name || ""}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="time"
                  label="Th???i gian"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.time}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="author"
                  label="Ng?????i g???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.author_name}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="title"
                  label="Ti??u ?????"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.title}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="content"
                  label="N???i dung"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.content}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="is_pay"
                  label="Tr???ng th??i hi???n t???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.status_value}
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={4}>
            {/* {isHandle && (
            <div style={{ marginTop: "15px" }}>??ang x??? l??, vui l??ng ch???...</div>
          )}*/}
            {isError && (
              <div style={{ marginTop: "15px" }}>Vui l??ng th??? l???i</div>
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            {renderButton()}
          </GridItem>
        </GridContainer>
      ) : (
        <div>??ang x??? l??, vui l??ng ch???...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          X??c nh???n chuy???n tr???ng th??i
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Chuy???n t??? {data.status_value} th??nh {data.next_status_value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y
          </Button>
          <Button
            onClick={(e) => handleChangeStatus(data.next_status)}
            color="primary"
          >
            X??c nh???n
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
          X??c nh???n chuy???n tr???ng th??i
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Chuy???n t??? {data.status_value} th??nh Kh??ng duy???t
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            H???y
          </Button>
          <Button onClick={(e) => handleChangeStatus(3)} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>
      <GridContainer>
        <hr></hr>
        <hr></hr>
       {data.evaluation.is_evaluate&& <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>????nh gi??</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10}>
                N???i dung: {data.evaluation.comment}
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                {data.evaluation.is_like ? <ThumbUpIcon /> : <ThumbDownIcon />}
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                {commentImage && (
                  <img
                    src={commentImage}
                    alt="Kh??ng c?? ???nh"
                    style={{ width: "100px", height: "100px" }}
                  ></img>
                )}
              </GridItem>
            </GridContainer>
          </CardBody>
        </GridItem>}
      </GridContainer>

      </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>

    </div>
  );
}
