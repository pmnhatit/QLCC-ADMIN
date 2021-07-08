import React from "react";
import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import GridItem from "../../component/Grid/GridItem.js";
import AddUserAccount from "./AddUserAccount/AddUserAccount.js";
import ListUserAccount from "./ListUserAccount/ListUserAccount.js";

export default function UserAccount() {
 
  return (
   
      <GridContainer>      
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Danh sách người dùng",
                //tabIcon: BugReport,
                tabContent: (      
                    <ListUserAccount/>
                )
              },
              {
                tabName: "Tạo tài khoản",
                //tabIcon: Code,
                tabContent: (
                  <AddUserAccount/>
                )
              },
              
            ]}
          />
        </GridItem>
       
      </GridContainer>  
  );
}
