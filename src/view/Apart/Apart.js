import React from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import Button from "../../component/CustomButtons/Button.js";

import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import ListApart from "./ListApart/ListApart.js";
import ListApartNotApp from "./ListApart/ListApartNotApp.js"
//import AddApart from "./AddApart/AddApart.js"
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

export default function Apart() {
  const classes = useStyles();
  const userInfo=useSelector(state=>state.user.info);
  const token=useSelector(state=>state.user.token);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Danh sách căn hộ",
                //tabIcon: BugReport,
                tabContent: (      
                    <ListApart/>
                )
              },
              {
                tabName: "Danh sách căn hộ không sử dụng app",
                //tabIcon: BugReport,
                tabContent: (      
                    <ListApartNotApp/>
                )
              },
              // {
              //   tabName: "Thêm căn hộ",
              //   //tabIcon: Code,
              //   tabContent: (
              //     <AddApart/>
              //   )
              // },
              
            ]}
          />
        </GridItem>
       
      </GridContainer>
    </div>
  );
}