import React, { useState } from "react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
// import DropdownButton from "../../component/CustomButtons/DropdownButton";
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import Button from "../../../component/CustomButtons/Button.js";
import NewReport from "./NewReport.js";
import HandledReport from "./HandledReport.js"

export default function ReportBill() {
  const history = useHistory();
 const date= new Date();
 const currentMonth=date.getMonth();
 const currentYear=date.getFullYear();
 const [reLoad,setReLoad]=useState(true);
 const [selectMonth,setSelectMonth]= useState(currentMonth);
 const [selectYear,setSelectYear]= useState(currentYear);
 
const changeMonth=async (value)=>
{
  setReLoad(false);
  await setSelectMonth(value);
  setReLoad(true);
}
const changeYear=(value)=>
{
  setReLoad(false);
  setSelectYear(value);
  setReLoad(true);
}

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary" //"warning","success","danger","info","primary","rose"
            tabs={[
              {
                tabName: "Kiếu nại chưa xử lý",
                //tabIcon: Cloud,
                tabContent: (
                    <NewReport></NewReport>
                )
              },
              {
                tabName: "Kiếu nại đã xử lý",
                //tabIcon: BugReport,
                tabContent:(<HandledReport></HandledReport>)
              },
              
             
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
