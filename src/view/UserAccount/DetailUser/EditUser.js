import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchApart from "./SearchApart.js"
import {handleData,handleApart} from "./ServiceEditUser.js"
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
export default function EditUserApart(props) {
  const classes = useStyles();
  const {id,handleOpenLoading,handleCloseLoading, handleReload}=props
  // const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [open, setOpen] = useState(false);
  const[reload,setReload]=useState(false);

    const [isLoad,setIsLoad]=useState(false);
     //list:all apart List-- default:list apart of user
    const[apartList,setApartList]=useState({list:[{name:"Không có căn hộ"}],default:[]});
    const [apart_id, setApart_id] = useState();
    const[block_id,setBlock_id]=useState("")

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
  const changeData=async(apart)=>
  {
       let result=await handleApart(apart);
       setApart_id(result.apart_id)
       setBlock_id(result.block_id)
  }
  const editUserApart = async () => {
    handleClose();
    handleOpenLoading()
      const body = {
        user_id:id,
        apartment_id:apart_id,
        block_id:block_id
      };
      console.log(body);

      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/user/update`,
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
          setReload(!reload)
          handleReload()
          handleOpenSnackBar(true);
          handleCloseLoading()
        } else {
         console.log("SOMETHING WENT WRONG");
        
         handleOpenSnackBar(false);
         handleCloseLoading()
          }
      } catch (err) {
        console.log(err); 
        handleOpenSnackBar(false);
        handleCloseLoading()
      }
    
  };
  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      try{
       setIsLoad(true); 
       const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts?status=1`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts?owner.id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200|| res1.status===200) {
        
        const result = await res.json();
        const result1= await res1.json();
        console.log(result.data);
        console.log(result1.data);
        //console.log(result.data.push(result1.data));
        setApartList({list:await handleData(result.data,result1.data),default:result1.data});
        await changeData(result1.data)

        
        handleCloseLoading()
        setIsLoad(false);
      } else {
        const result = await res.json();
        alert(result.message);
        handleOpenSnackBar(false)
        handleCloseLoading()
        setIsLoad(false);
      }
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
    };
    getRes();
  }, [reload]);

  return (
    <div>
    
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
              <SearchApart data={apartList} changeData={changeData}></SearchApart>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
              </GridItem>
              <GridContainer />
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
          <Button onClick={(e) => editUserApart(e)} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
        </GridContainer>
      )}
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
