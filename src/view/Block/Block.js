import React from "react";
import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import GridContainer from "../../component/Grid/GridContainer.js";
// @material-ui/core components
// core components
import GridItem from "../../component/Grid/GridItem.js";
import ListApart from "./ListBlock/ListBlock.js";
//import AddBlock from "./AddBlock/AddBlock.js";



export default function Block() {

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Danh sách tòa nhà",
                //tabIcon: BugReport,
                tabContent: (      
                    <ListApart/>
                )
              },
              // {
              //   tabName: "Thêm tòa nhà",
              //   //tabIcon: Code,
              //   tabContent: (
              //     <AddBlock></AddBlock>
              //   )
              // },
              
            ]}
          />
        </GridItem>
       
      </GridContainer>
    </div>
  );
}