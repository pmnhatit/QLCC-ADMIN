import React from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

// core components
import GridItem from "../../../component/Grid/GridItem.js";

import CustomButton from "../../../component/CustomButtons/Button.js";
import {useHistory} from "react-router-dom"

const styles = {
  
};


const useStyles = makeStyles(styles);

export default function Apart() {
  const classes = useStyles();
  const userInfo=useSelector(state=>state.user.info);
  const token=useSelector(state=>state.user.token);
  const history=useHistory();
  
  return (
      
        <GridItem xs={12} sm={12} md={12}>
        <CustomButton
              variant="outlined"
              color="rose"
              onClick={() => history.push("/admin/repair")}
            >
              Sửa chữa khu vục chung
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="rose"
              onClick={() => history.push("/admin/repair/repair")}
            >
              Sửa chữa dịch vụ
            </CustomButton>
            <CustomButton
              variant="outlined"
              color="rose"
              onClick={() => history.push("/admin/repair/self_repair")}
            >
              Tự sửa chữa
            </CustomButton>
        
     
        </GridItem>
       
      
  );
}