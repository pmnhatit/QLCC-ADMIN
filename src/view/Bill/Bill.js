import React, { useState } from "react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
// import DropdownButton from "../../component/CustomButtons/DropdownButton";
import TextField from "@material-ui/core/TextField";
import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import Button from "../../component/CustomButtons/Button.js";
import ElectricBill from "./ElectricBill/ElectricBill.js";
import { createTimeChoice } from "./BillService.js";
import { month,year } from "./BillService";
import WaterBill from "./WaterBill/WaterBill.js";
import OtherBill from "./OtherBill/OtherBill.js";
import AllBill from "./AllBill/AllBill.js"

export default function Bill() {
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
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Tháng"
              defaultValue={currentMonth}
              onChange={e=>changeMonth(e.target.value)}
              SelectProps={{
                native: true,
              }}
              fullWidth
              variant="outlined"
            >
              {month.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.id}
                </option>
              ))}
            </TextField>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Năm"
              defaultValue={currentYear}
              onChange={e=>changeYear(e.target.value)}
              SelectProps={{
                native: true,
              }}
              fullWidth
              variant="outlined"
            >
              {year.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.id}
                </option>
              ))}
            </TextField>
          </GridItem>

          <GridItem xs={12} sm={12} md={3}>
          <Button
                //className={classes.button}
                //variant="outlined"
                color="danger"
                onClick={() => history.push('/admin/bill/importbill')}
              >
                Nhập hóa đơn
              </Button>
          </GridItem>
        
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary" //"warning","success","danger","info","primary","rose"
            tabs={[
              {
                tabName: "Hóa đơn tổng",
                //tabIcon: Cloud,
                tabContent: (
                 <AllBill selectMonth={selectMonth} selectYear={selectYear} reLoad={reLoad}></AllBill>
                )
              },
              {
                tabName: "Hóa đơn điện",
                //tabIcon: BugReport,
                tabContent: <ElectricBill selectMonth={selectMonth} selectYear={selectYear} reLoad={reLoad}  />,
              },
              {
                tabName: "Hóa đơn nước",
                //tabIcon: Code,
                tabContent: 
                  <WaterBill selectMonth={selectMonth} selectYear={selectYear} reLoad={reLoad}  />,
                
              },
              {
                tabName: "Hóa đơn khác",
                //tabIcon: Cloud,
                tabContent: (
                  <OtherBill selectMonth={selectMonth} selectYear={selectYear} reLoad={reLoad}/>
                )
              },
             
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
