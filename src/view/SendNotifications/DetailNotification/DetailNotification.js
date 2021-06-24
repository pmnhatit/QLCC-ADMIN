// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import SlideShow from "../../../component/SlideShow/SlideShow.js";
import APIDetailApart from "./APIDetailApart.js";
import Edit from "./Edit.js";
import InfoApart from "./InfoApart/InfoApart.js";
import { handleData } from "./ServiceDetailApart.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function Apart() {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  
  const {getUrl,getUser,getBlock}=APIDetailApart();
  const { apart_id } = useParams();
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [data, setData] = useState([]);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [isHandle,setIsHandle]=useState(false);

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

  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      setIsLoad(true);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/${apart_id}`,
          {// get apart
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const result = await res.json();
          console.log("Vo 200OK");
          console.log(result.data);
           // Image
           if (result.data.images !== [])
           setImage(await getUrl(result.data.images));
         else console.log("no image");
          //Info
          
          setIsLoad(false);
          handleCloseLoading();
        } else {
          const result = await res.json();
          alert(result.message);
          handleCloseLoading()
          handleOpenSnackBar(false)
        }
      } catch (err) {
        console.log(err);
        handleCloseLoading()
        handleOpenSnackBar(false)
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <SlideShow images={image}></SlideShow>:
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            
          </GridItem>
        </GridContainer>
      )}
      </LoadingOverlay>
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
