import React, { useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import MyButton from "../../../component/CustomButtons/Button.js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {
  month,
  year,
  type,
  handleDataTable,
  columns,
  columnsOther,
} from "./ImportBillService.js";
import DialogTable from "./DialogTable.js";

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
  const [selectYear, setSelectYear] = useState(process.env.REACT_APP_YEAR_START);
  const [isHandle, setIsHandle] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSource, setFileSource] = useState();
  const [data, setData] = useState();
  const [fileName1, setFileName1] = useState("");
  const [fileSource1, setFileSource1] = useState();
  const [data1, setData1] = useState();
  const [fileName2, setFileName2] = useState("");
  const [fileSource2, setFileSource2] = useState();
  const [data2, setData2] = useState();
  const [selectedData, setSelectedData] = useState();
  const [selectedCol, setSelectedCol] = useState();
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const handeFile = async (file, type) => {
    // let arr = file[0].type.split("/");

    //console.log("fileExtension: " + arr.pop()); //fileExtension
    //console.log("fileMediaType: " + arr.pop()); //fileMediaType
    //console.log(path);
    // console.log(fileName);
    const reader = new FileReader();
    await reader.readAsText(file[0]);
    reader.onloadend = async () => {
      switch (type) {
        case 0:
          console.log(reader.result);
          await setFileName(file[0].name.split(".").shift());
          await setFileSource(reader.result);
          setData(handleDataTable(reader.result));
          break;
        case 1:
          console.log(reader.result);
          await setFileName1(file[0].name.split(".").shift());
          await setFileSource1(reader.result);
          setData1(handleDataTable(reader.result));
          break;
        case 2:
          console.log(reader.result);
          await setFileName2(file[0].name.split(".").shift());
          await setFileSource2(reader.result);
          setData2(handleDataTable(reader.result));
          break;
        default:
          break;
      }
    };
  };

  const handleSubmit = async () => {
    setIsHandle(true);
    await getlink(fileName,fileSource,0);
    await getlink(fileName1,fileSource1,1);
    await getlink(fileName2,fileSource2,2);
    setIsHandle(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getlink = async (name,source,type) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/upload-csv/signed-url?fileName=${name}&extension=csv&mediaType=text`, ///api/upload-csv/signed-url?fileName=electric&extension=vnd.ms-excel&mediaType=application
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
        await upload(result.uploadUrl, result.key,source,type);
      } else if (res.status === 500) {
      } else console.log("SOMETHING WENT WRONG");
    } catch (err) {
      console.log(err);
    }
  };
  const upload = async (uploadUrl, key,source,type) => {
    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "text/csv" },
        body: source,
      });
      if (res.status === 200) {
        //const result = await res.json();
        console.log("upload ok");
        await importFile(key,type);
        // } else if (res.status === 500) {
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const importFile = async (key,type) => {
    const body = {
      key: key,
      month: parseInt(selectMonth),
      year: parseInt(selectYear),
    };
    console.log(body);
    let temp = "a";
    console.log("selectType" + selectType);
    if (type === 0) temp = `/api/elec-bill/import-file`;
    if (type === 1) temp = `/api/water-bill/import-file`;
    if (type === 2) temp = `/api/other-bill/import-file`;
    
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
  const createTable = async (type) => {
    switch (type) {
      case 0:
        setSelectedData(data);
        setSelectedCol(columns);
        break;
      case 1:
        setSelectedData(data1);
        setSelectedCol(columns);
        break;
      case 2:
        setSelectedData(data2);
        setSelectedCol(columnsOther);
        break;
      default:
        break;
    }
    handleClickOpen();
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
            <GridItem xs={12} sm={12} md={2}>
              <label  style={{ margin: "50px 15px 15px 15px " }}>Hóa đơn điện</label>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <input
                style={{ margin: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files, 0)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <MyButton color="primary" onClick={e=>createTable(0)}>
                Xem trước
              </MyButton>
            </GridItem>

            <GridItem xs={12} sm={12} md={2}>
              <label  style={{ margin: "15px" }}>Hóa đơn nước</label>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <input
                style={{ margin: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files, 1)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <MyButton color="primary" onClick={e=>createTable(1)}>
                Xem trước
              </MyButton>
            </GridItem>
            <GridItem xs={12} sm={12} md={2}>
              <label  style={{ margin: "15px" }}>Hóa đơn khác</label>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <input
                style={{ margin: "15px" }}
                type="file"
                onChange={(e) => handeFile(e.target.files, 2)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <MyButton color="primary" onClick={e=>createTable(2)}>
                Xem trước
              </MyButton>
            </GridItem>
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
          <MyButton color="primary" onClick={handleSubmit}>
            Tạo
          </MyButton>
          <MyButton color="primary">Thông báo</MyButton>
        </GridItem>
      </GridContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Xác nhận hủy thanh toán
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <DialogTable data={selectedData} columns={selectedCol} ></DialogTable>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Trở về
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
