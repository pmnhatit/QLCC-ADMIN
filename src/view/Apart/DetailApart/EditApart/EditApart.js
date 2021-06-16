import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";
import { directionList, typeList } from "./ServiceAddApart.js";
import TextField from "@material-ui/core/TextField";
import { Block } from "@material-ui/icons";

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
export default function AddApart() {
  const classes = useStyles();
  const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertApartName, setAlertApartName] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);
  const [alertArea, setAlertArea] = useState(false);
  const [alertDirection, setAlertDirection] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertDescription, setAlertDescription] = useState(false);

  const [apartName, setApartName] = useState("");
  const [block, setBlock] = useState("");
  const [area, setArea] = useState("");
  const [direction, setDirection] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [nameFile, setNameFile] = useState([]);
  const [fileExtension, setFileExtenstion] = useState([]);
  const [fileMediaType, setFileMediaType] = useState([]);
  //const [fileData, setFileData] = useState([]);
  const [review,setReview]=useState([{src:""}]);
  const [isSelectFile,setIsSelectFile]=useState(false);
  

  const checkApartName = (name) => {
    if (name !== "" && name.match(nameCheck)) {
      setAlertApartName(false);
      setApartName(name);
    } else setAlertApartName(true);
  };
  const checkBlock = (block) => {
    if (block !== "") {
      setAlertBlock(false);
      setBlock(block);
    } else setAlertBlock(true);
  };
  const checkArea = (area) => {
    if (area !== "" && area.match(phoneCheck)) {
      setAlertArea(false);
      setArea(area);
    } else setAlertArea(true);
  };
  const checkDirection = (direction) => {
    if (true) {
      setAlertDirection(false);
      setDirection(direction);
    } else setAlertDirection(true);
  };
  const checkType = (Type) => {
    if (true) {
      setAlertType(false);
      setType(Type);
    } else setAlertType(true);
  };
  const checkDescription = (address) => {
    if (address !== "") {
      setAlertDescription(false);
      setDescription(address);
    } else setAlertDescription(true);
  };

  const handeFile = async (file,imageUrl) => {
    console.log(file);
    console.log(imageUrl);
    setImage(file)
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
      addApart(key);
    } catch (err) {
      console.log(err);
    }
  };
  const addApart = async (key) => {
    if (true) {
      const body = {
        name: apartName,
        block: block,
        area: parseInt(area),
        direction: direction.id,
        type: type.id,
        images: key,
        description: description,
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/add`,
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

          console.log("add apart");
          console.log(result);
        } else if (res.status === 500) {
        } else console.log("SOMETHING WENT WRONG");
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };
  useEffect(() => {
    const getRes = async () => {
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
        setBlock(result1.data[0]._id);
        setType(typeList[0]);
        setDirection(directionList[0]);
        // setData(await handleData(result.data, result1.data));
      } else {
        const result = await res1.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên căn hộ"
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
              {alertApartName && (
                <Alert className={classes.alerts} severity="error">
                  Tên căn hộ không hợp lệ
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
                id="area"
                label="Diện tích căn hộ(m2)"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkArea(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertArea && (
                <Alert severity="error" className={classes.alerts}>
                  Diện tích không hợp lệ
                </Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="direction"
                select
                label="Hướng căn hộ"
                margin="normal"
                onChange={(e) => checkDirection(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {directionList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertDirection && <Alert className={classes.alerts} severity="error">Tòa nhà không hợp lệ</Alert>}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="type"
                select
                label="Loại căn hộ"
                margin="normal"
                defaultValue={typeList[0]}
                onChange={(e) => checkType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {typeList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertType && (
                <Alert className={classes.alerts} severity="error">
                  Loại căn hộ không hợp lệ
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
              <label style={{ marginTop: "50px" }}>Ảnh căn hộ</label>
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
        </GridItem>
      </GridContainer>
    </div>
  );
}
