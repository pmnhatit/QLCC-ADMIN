import React,{useEffect, useState} from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import Alert from "@material-ui/lab/Alert";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import CustomInput from "../../component/CustomInput/CustomInput.js";
import Button from "../../component/CustomButtons/Button.js";
import Card from "../../component/Card/Card.js";
import CardHeader from "../../component/Card/CardHeader.js";
import CardBody from "../../component/Card/CardBody.js";
import CardFooter from "../../component/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";

import avatar from "../../asset/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function ChangePassword() {
  const classes = useStyles();
  const userInfo=useSelector(state=>state.user.info);
  const token=useSelector(state=>state.user.token);
  const [newPass,setNewPass]= useState();
  const [oldPass,setOldPass]= useState();
  const [confirm, setConFirm]= useState();
  const [alert,setAlert]= useState(false);


  const checkOldPass= async (data)=>
  {
    await setOldPass(data);
    console.log(data)
    if(data=="")
    await setAlert(true);
    else
    await setAlert(false);
  }
  const checkNewPass= async (data)=>
  {
    await setNewPass(data);
    if(data=="")
      await setAlert(true);
    else
      await setAlert(false);
  }
  const checkComfirm =async (data)=>
  {
    await setConFirm(data);
    if(data!==newPass||data=="")
    {
        await setAlert(true);
    }
    else
    setAlert(false);
  }

  const handleSubmit = async()=>
  {
    if(oldPass!=""&& newPass!=""&& confirm!="")
    {
    // const body ={
    //   ID_User:localStorage.getItem('id'),
    //   Name:data
    // }
    // const token=JSON.parse(localStorage.getItem('token'));
    
    // const res =await fetch(linkurl+`boards/add`,
    // {
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //      Authorization:'Bearer '+ `${token}`,
    //      'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(body)
    
    // });
    
  }
}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="old_pass"
                label="Mật khẩu cũ"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
             
                onChange={(e) => checkOldPass(e.target.value)}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
            <TextField
                id="new_pass"
                label="Mật khẩu mới"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"   
                onChange={(e) => checkNewPass(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            <TextField
                id="phone"
                label="Nhập lại mật khẩu mới"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkComfirm(e.target.value)}
              />
            </GridItem>
          </GridContainer>
          <Button color="primary" onClick={e=>handleSubmit(e)}>Lưu lại</Button>
        </GridItem>
       { alert && <Alert severity="error">This is an error alert — check it out!</Alert>}
      </GridContainer>
    </div>
  );
}