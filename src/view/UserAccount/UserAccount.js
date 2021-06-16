import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ListUserAccount/ServiceUserAccount";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import CustomTabs from "../../component/CustomTabs/CustomTabs.js";
import ListUserAccount from "./ListUserAccount/ListUserAccount.js";
import AddUserAccount from "./AddUserAccount/AddUserAccount.js"


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  
}));
export default function UserAccount() {
 
  const token = useSelector((state) => state.user.token);
  // const [data, setData] = useState([]);
  
  
  // useEffect(() => {
  //   const getRes = async () => {
  //     const res = await fetch(
  //       process.env.REACT_APP_API_LINK + `/api/user/all`,
  //       {
  //         // get apart
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + `${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (res.status === 200) {
  //       //console.log("Vo 200OK");
  //       const result = await res.json();
  //       setData(await handleData(result.data));
       
  //     } else {
  //       const result = await res.json();
  //       alert(result.message);
  //     }
  //   };
  //   getRes();
  // }, []);
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
