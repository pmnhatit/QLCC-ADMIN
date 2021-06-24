import React from "react";
// @material-ui/core components
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import Button from "../../component/CustomButtons/Button.js";
import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import ListAdminAccount from "./ListAdminAccount.js"
import AddAdmin from "./AddAdminAccount.js"


export default function Apart() {


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Danh sách tài khoản",
                //tabIcon: BugReport,
                tabContent: (      
                    <ListAdminAccount/>
                )
              }, 
              {
                tabName: "Tạo tào khoản",
                //tabIcon: Code,
                tabContent: (
                  <AddAdmin/>
                )
              },
              
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}