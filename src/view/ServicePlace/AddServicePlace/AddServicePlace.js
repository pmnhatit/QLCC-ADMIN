import React, { useEffect, useState } from "react";
import {useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";
//import { directionList, typeList } from "./ServiceAddApart.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";

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
  myButton:{
    float: "right"
 }
}));
export default function AddServicePlace() {
  const classes = useStyles();
  const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertName, setAlertName] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);

  const [alertDescription, setAlertDescription] = useState(false);

  const [name, setName] = useState("");
  const [block, setBlock] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [nameFile, setNameFile] = useState([]);
  const [fileExtension, setFileExtenstion] = useState([]);
  const [fileMediaType, setFileMediaType] = useState([]);
  //const [fileData, setFileData] = useState([]);
  const [review,setReview]=useState([{src:""}]);
  const [isSelectFile,setIsSelectFile]=useState(false);
  const [isLoad,setIsLoad]=useState(true);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);

  const checkApartName = (name) => {
    setName(name);
    if (name !== "" ) {
      setAlertName(false);
      return true
    } else {setAlertName(true)
       return false};
  };
  const checkBlock = (block) => {  
    setBlock(block);
    if (block !== "") {
      setAlertBlock(false);
      return true
    } else {setAlertBlock(true)
    return false};
  };
  const checkDescription = (address) => {
    setDescription(address);
    if (address !== "") {
      setAlertDescription(false);
      return true
    } else {setAlertDescription(true)
      return false};
  };

  const handeFile = async (file,imageUrl) => {
    console.log(file);
    console.log(imageUrl);
    setImage(file)
    let name = [];
    let extension = [];
    let type = [];
    //let data = [];
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
      }
      // console.log(name);
      // console.log(extension);
      // console.log(type);
      // console.log(review);
      setReview(reviewImage);
      setNameFile(name);
      setFileExtenstion(extension);
      setFileMediaType(type);
      //setFileData(data);
      setIsSelectFile(true); 
      
    }
  };
  const handleSubmit = () => {
    handleOpenLoading()
    getlink();
  };

  const getlink = async () => {
    if (nameFile.length !== 0) {
      try {
        let url=[];
        let key=[];
        for (let i = 0; i < nameFile.length; i++) {
          console.log(fileExtension[i] +fileMediaType[i] );
          const res = await fetch(
            process.env.REACT_APP_API_LINK +
              `/api/uploadv2/signed-url?fileName=${nameFile[i]}&extension=${fileExtension[i]}&mediaType=${fileMediaType[i]}`, ///api/upload-csv/signed-url?fileName=electric&extension=vnd.ms-excel&mediaType=application
            {
              method: "GET",
              mode: "cors",
              headers: {
                Authorization: "Bearer " + `${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            const result = await res.json();
            console.log("image ok" +i);
            url.push(result.uploadUrl);
            key.push(result.key);
          } else if (res.status === 500) {
          } else console.log("SOMETHING WENT WRONG");
        }
        console.log(key);
        upload(url,key);
      } catch (err) {
        console.log(err);
      }
    }
    else
    {
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  };
  const upload = async (url,key) => {
    try {
      
      for(let i=0;i<url.length;i++)
     
      { 
      const res = await fetch(url[i], {
        method: "PUT",
        headers: { "Content-Type": fileMediaType[i]+"/"+fileExtension[i] },
        body: image[i],
      });
      if (res.status === 200) {
        //const result = await res.json();
        console.log("upload ok" +i);
       
      } else {
        console.log("SOMETHING WENT WRONG");
        //setIsError(true);
      }}
      //console.log(key);
      AddServicePlace(key);
    } catch (err) {
      console.log(err);
    }
  };
  const AddServicePlace = async (key) => {
    if (checkApartName(name) && checkBlock(block)&& checkDescription(description)) {
      const body = {
        name: name,
        block_id: block,
        images: key,
        description: description,
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/service/create`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (res.status === 200) {
          const result = await res.json();

          console.log("add place");
          console.log(result);
          handleOpenSnackBar(true)
          handleCloseLoading()
        } else {console.log("SOMETHING WENT WRONG")
        handleOpenSnackBar(false)
        handleCloseLoading()};
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    } else {
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  };const handleOpenSnackBar = (type) => {
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
    setIsLoad(true);
    const getRes = async () => {
      try{
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/all`,
        {
          // get block
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res1.status === 200) {
        console.log("Vo 200OK");
        const result1 = await res1.json();
        console.log(result1.data);
       
        setBlockList(result1.data);
        setBlock(result1.data[0]._id)
        setIsLoad(false);
        // setData(await handleData(result.data, result1.data));
      } else {
        const result = await res1.json();
        console.log(result.message);
        handleOpenSnackBar(false)
      }} catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        
      }
    };
    getRes();
  }, []);

  return (
    <div> <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <GridContainer>
        {!isLoad &&<GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên khu vực"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkApartName(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertName && (
                <Alert className={classes.alerts} severity="error">
                  Tên khu vực không hợp lệ
                </Alert>
              )}
            </GridItem>
            <GridContainer />

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Tòa nhà"
                margin="normal"
                onChange={(e) => checkBlock(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {blockList.map((option) => (
                  <option key={option.id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertBlock && (
                <Alert className={classes.alerts} severity="error">
                  Tòa nhà không hợp lệ
                </Alert>
              )}
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="description"
                label="Mô tả"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                //defaultValue={address}
                onChange={(e) => checkDescription(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertDescription && (
                <Alert className={classes.alerts} severity="error">
                  Mô tả không hợp lệ
                </Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={2} style={{ marginTop: "15px" }}>
              <label style={{ marginTop: "50px" }}>Ảnh khu vực</label>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <input
                style={{ marginTop: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files,e.target.value)}
                multiple
                accept="image/*"
              />
            </GridItem>
            {<GridItem xs={12} sm={12} md={6}>
              {isSelectFile && review.map((option) => (
                  <img src={option.src} alt="Girl in a jacket" style={{width:"50px",height:"50px"}}></img>
                ))}
                 {/* {<img src={review[0].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} */}
               {/* {<img src={review[1].src} alt="Girl in a jacket" style={{width:"30px",height:"30px"}}></img>} */}
            </GridItem>}
          </GridContainer>
          <GridItem xs={12} sm={12} md={9}>
          <Button className={classes.myButton} color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button>
          </GridItem>
        </GridItem>}
      </GridContainer>
     </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
