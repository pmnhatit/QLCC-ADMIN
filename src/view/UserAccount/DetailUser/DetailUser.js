import React,{useEffect, useState} from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
// import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import CardAvatar from "../../../component/Card/CardAvatar.js";
// import CardBody from "../../../component/Card/CardBody.js";
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import InfoUser from "./InfoUser.js"
import avatar from "../../../asset/img/faces/marc.jpg";
import {useParams} from 'react-router-dom';
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import EditUser from "./EditUser.js"
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

export default function UserProfile() {
  const classes = useStyles();
  const token=useSelector(state=>state.user.token);
  const [data,setData]= useState("");
  const [apart,setApart]=useState([]);
  const [isLoading,setIsLoading]=useState(false);
  const {id}=useParams();
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);
const [reload,setReload]=useState(false);
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
const handleOpenLoading=()=>{
  setIsHandle(true);
}
const handleCloseLoading=()=>{
  setIsHandle(false);
}
const handleReload=()=>{
  setReload(!reload);
}
const getUrl = async (key) => {
  if (key.length >= 1) {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const result = await res.json();
        console.log("get image OK");
        return result.imageUrl;
        // setImage(result.imageUrl);
        // setIsLoad(false);
      } else {
        const result = await res.json();
        alert(result.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  else{
      return 
  }
};
  useEffect(() => {
    handleOpenLoading() 
    setIsLoading(true);
    const getRes = async () => {
      try{
     
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/user/${id}`,
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
        console.log(result1.data);
        
        setData(result.data);
        setApart(result1.data);
        setIsLoading(false);
        handleCloseLoading()
      } else {
        const result = await res.json();
        alert(result.message);
        setIsLoading(false);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    }catch (err) {
      console.log(err);
      setIsLoading(false);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
    };
    getRes();
  }, [reload]);

  return (
    <div> <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <GridContainer>
      <GridItem xs={12} sm={12} md={4}>
          <Card profile >
            <CardAvatar style={{marginTop:"20px"}} profile>    
                <img src={avatar} alt="..." />
            </CardAvatar>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
        <CustomTabs
            headerColor="primary"
            tabs={[  
              {
                tabName: "Thông tin tài khoản",
                //tabIcon: BugReport,
                tabContent: (      
                    !isLoading ? <InfoUser apart={apart} data={data} />: <div>Loading....</div>
                )
              }, 
               {
                tabName: "Chỉnh sửa căn hộ",
                //tabIcon: BugReport,
                tabContent: (      
                    <EditUser id={id} handleOpenLoading={handleOpenLoading} handleCloseLoading={handleCloseLoading} handleReload={handleReload}/>
                )
              },    
             
                    
            ]}
          />
        </GridItem>
       
      </GridContainer>
     </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>

    </div>
  );
}