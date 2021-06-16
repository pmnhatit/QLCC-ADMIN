import React, { useState } from "react";
import {useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";

import TextField from "@material-ui/core/TextField";
import { month, year, type } from "./ImportBillService.js";

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
}));
export default function InfoBill() {
  //const dispatch = useDispatch();
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [selectType, setSelectType] = useState("Hóa đơn điện");
  const [selectMonth, setSelectMonth] = useState(1);
  const [selectYear, setSelectYear] = useState(2020);
  const [isHandle, setIsHandle] = useState(false);
  const [fileName, setFileName] = useState("");
  //const [fileExtension, setFileExtension] = useState();
  //const [fileMediaType, setFileMediaType] = useState();
  const [fileSource, setFileSource] = useState();
  //const [path, setPath] = useState();
  // const [uploadUrl, setUploadUrl] = useState();
  // const [key, setKey] = useState();
  const [isError, setIsError] = useState(false);
  //   const token = useSelector((state) => state.user.token);
  const handeFile = async (file, path) => {
   
    let arr = file[0].type.split("/");
    // await setFileExtension(arr.pop());
    // await setFileMediaType(arr.pop());
    await setFileName(file[0].name.split(".").shift());
    console.log("fileExtension: " + arr.pop()); //fileExtension
    console.log("fileMediaType: " + arr.pop()); //fileMediaType 
    //console.log(path);
    // console.log(fileName);
    const reader = new FileReader();
    await reader.readAsText(file[0]);
    reader.onloadend = async () => {
      console.log(reader.result);
      await setFileSource(reader.result);
    };
  };

  const handleSubmit = async () => {
    setIsHandle(true);
    await getlink();
    setIsHandle(false);
  };
  const getlink = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/upload-csv/signed-url?fileName=${fileName}&extension=csv&mediaType=text`, ///api/upload-csv/signed-url?fileName=electric&extension=vnd.ms-excel&mediaType=application
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
        console.log(result.uploadUrl);
         await upload(result.uploadUrl,result.key);
      } else if (res.status === 500) {
      } else console.log("SOMETHING WENT WRONG");
    } catch (err) {
      console.log(err);
    }
  };
  const upload = async (uploadUrl, key) => {
    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers:   {"Content-Type": "text/csv"},
        body: fileSource,
      });
      if (res.status === 200) {
        //const result = await res.json();
        console.log("upload ok");
        await importFile(key);
      // } else if (res.status === 500) {
      } else{ console.log("SOMETHING WENT WRONG");
              setIsError(true);
              }
    } catch (err) {
      console.log(err);
    }

    
  };
  const importFile = async (key) => {
    const body = {
      key: key,
      month: parseInt(selectMonth),
      year: parseInt(selectYear),
    };
    console.log(body);
    let temp = "a";
    console.log("selectType" + selectType);
    if (selectType === "Hóa đơn điện") temp = `/api/elec-bill/import-file`;
    if (selectType === "Hóa đơn nước") temp = `/api/water-bill/import-file`;
    if (selectType === "Hóa đơn khác") temp = `/api/other-bill/import-file`;
    console.log(temp);
    try {
      const res = await fetch(process.env.REACT_APP_API_LINK + temp, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        const result = await res.json();
        console.log(result);
        console.log("import ok");
        // } else if (res.status === 500) {
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Nhập hóa đơn</h4>
          </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Tháng"
                margin="normal"
                //defaultValue={currentMonth}
                onChange={(e) => setSelectMonth(e.target.value)}
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
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Năm"
                margin="normal"
                //defaultValue={currentYear}
                onChange={(e) => setSelectYear(e.target.value)}
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
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Loại hóa đơn"
                margin="normal"
                //defaultValue={currentYear}
                onChange={(e) => setSelectType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {type.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>

            <input
              style={{ margin: "15px" }}
              type="file"
              onChange={(e) => handeFile(e.target.files, e.target.value)}
            />
          </GridContainer>
        </GridItem>
        <div />
        <GridItem xs={12} sm={12} md={6} />
        <GridItem xs={12} sm={12} md={3}>
          {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}
          {isError && <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>}
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Button color="primary" onClick={handleSubmit}>
            Tạo
          </Button>
          <Button color="primary">Thông báo</Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
