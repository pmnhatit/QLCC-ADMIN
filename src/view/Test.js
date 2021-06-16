import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../component/Grid/GridItem.js";
import GridContainer from "../component/Grid/GridContainer.js";
import Button from "../component/CustomButtons/Button.js";

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  alerts: {
    marginTop: "18px",
  },
}));
export default function Test() {
  const classes = useStyles();
  const [review,setReview]=useState([{src:""},{src:""}]);
  const [isSelectFile,setIsSelectFile]=useState(false);
  


  const handeFile = async (file,imageUrl) => {
    console.log(file);
    console.log(imageUrl);
    let name = [];
    let extension = [];
    let type = [];
    let data = [];
    let reviewImage=[];
    if (file !== undefined) {
      for (let i = 0; i < file.length; i++) {
        let arr = file[i].type.split("/");
        extension.push(arr.pop());
        type.push(arr.pop());
        name.push(file[i].name.split(".").shift());
        reviewImage[i]={
                 src: URL.createObjectURL(file[i])
         }
       
        // let reader = new FileReader();
        // await reader.readAsText(file[i]);
        // reader.onloadend = async () => {
        //   //data.push(reader.result);
        //   reviewImage[i]={
        //     src:reader.result
        //   }
        // };
      }
    //   console.log(name);
    //   console.log(extension);
    //   console.log(type);
      console.log(reviewImage);
      setReview(reviewImage);
      //setFileData(data);
      setIsSelectFile(true); 
      
    }
  };
  const handleSubmit = () => {
    console.log(review);
    //getlink();
  };


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
              <input
                style={{ margin: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files,e.target.value)}
                 multiple
              />
            </GridItem>
            {<GridItem xs={12} sm={12} md={4}>
              {isSelectFile && review.map((option) => (
                  <img src={option.src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>
                ))}
              
                 {/* {<img src={review[0].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} 
               {<img src={review[1].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} */}
            </GridItem>}
          </GridContainer>

          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
