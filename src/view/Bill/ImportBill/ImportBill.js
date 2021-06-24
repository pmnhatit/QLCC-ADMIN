import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../component/SnackBar/Snackbar.js";
import LoadingOverlay from "react-loading-overlay";
import Alert from "@material-ui/lab/Alert";
import {
  createTimeChoice,
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
  myButton: {
    float: "right",
  },
}));
export default function InfoBill() {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const history=useHistory();
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [selectType, setSelectType] = useState("Hóa đơn điện");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState(currentYear);
  const { month, year } = createTimeChoice();
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
  const [isClear, setIsClear] = useState(true);
  const [open, setOpen] = useState(false); // dialog review
  const [open1, setOpen1] = useState(false); //dialog xác nhận

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [isHandle, setIsHandle] = useState(false);
  
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
          //console.log(reader.result);
          await setFileName(file[0].name.split(".").shift());
          await setFileSource(reader.result);
          setData(handleDataTable(reader.result));
          break;
        case 1:
          //console.log(reader.result);
          await setFileName1(file[0].name.split(".").shift());
          await setFileSource1(reader.result);
          setData1(handleDataTable(reader.result));
          break;
        case 2:
          //console.log(reader.result);
          await setFileName2(file[0].name.split(".").shift());
          await setFileSource2(reader.result);
          setData2(handleDataTable(reader.result));
          break;
        default:
          break;
      }
    };
  };
  const handleSelectMonth = async (month) => {
    setSelectMonth(month);
    await checkClear(month, selectYear);
  };
  const handleSelectYear = async (year) => {
    setSelectYear(year);
    await checkClear(selectMonth, year);
  };
  const checkClear = async (month, year) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/all/${month}/${year}`,
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
        if (result.data.length !== 0) {
          console.log("not clear");
          setIsClear(false);
        } else {
          console.log("clear");
          setIsClear(true);
        }
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false);
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
    }
  };
  const deleteData = async () => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/delete/${selectMonth}/${selectYear}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log("delete ok");
        return true;
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
      return false;
    }
  };

  const handleOpenSnackBar = (type) => {
    if (type) setSnackType(true);
    else setSnackType(false);
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const handleOpenLoading = () => {
    setIsHandle(true);
  };
  const handleCloseLoading = () => {
    setIsHandle(false);
  };
  const handleSubmit = async () => {
    handleClose1();
    handleOpenLoading();
    let temp;
    if ( selectMonth !== "" &&fileSource !== undefined &&fileSource1 !== undefined &&fileSource2 !== undefined) {
      if (isClear === false) temp = await deleteData();
      else temp=true;

      if (temp && (await getlink(fileName, fileSource, 0)) &&(await getlink(fileName1, fileSource1, 1)) &&(await getlink(fileName2, fileSource2, 2)))
     { handleOpenSnackBar(true);
        setIsClear(false)}
      else {
       handleOpenSnackBar(false);}
    }
    else{ handleOpenSnackBar(false);}
    handleCloseLoading();
    
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const getlink = async (name, source, type) => {
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
        console.log("getlink ok");
        return await upload(result.uploadUrl, result.key, source, type);
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
      return false;
    }
  };
  const upload = async (uploadUrl, key, source, type) => {
    try {
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "text/csv" },
        body: source,
      });
      if (res.status === 200) {
        //const result = await res.json();
        console.log("upload ok");
        return await importFile(key, type);
        // } else if (res.status === 500) {
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
      return false;
    }
  };
  const importFile = async (key, type) => {
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
        return true;
        // } else if (res.status === 500) {
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false);
        return false;
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
      return false;
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
  //
 
  return (
    <div>
      <LoadingOverlay
        active={isHandle}
        spinner
        text="Đang xử lý vui lòng chờ..."
      >
        <GridContainer>
          <hr></hr>
          <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Nhập hóa đơn</h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tháng"
                  margin="normal"
                  //defaultValue={currentMonth}
                  onChange={(e) => handleSelectMonth(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {month.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {!isClear && (
                  <Alert id={isClear} severity="warning">
                    Tháng đã có dữ liệu. Hệ thống sẽ xóa dữ liệu cũ nếu tiếp tục
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Năm"
                  margin="normal"
                  defaultValue={currentYear}
                  onChange={(e) => handleSelectYear(e.target.value)}
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
              <GridItem xs={12} sm={12} md={3}></GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <label style={{ margin: "50px 15px 15px 15px " }}>
                  Hóa đơn điện
                </label>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <input
                  style={{ margin: "15px" }}
                  type="file"
                  onChange={(e) => handeFile(e.target.files, 0)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={(e) => createTable(0)}>
                  Xem trước
                </Button>
              </GridItem>

              <GridItem xs={12} sm={12} md={2}>
                <label style={{ margin: "15px" }}>Hóa đơn nước</label>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <input
                  style={{ margin: "15px" }}
                  type="file"
                  onChange={(e) => handeFile(e.target.files, 1)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={(e) => createTable(1)}>
                  Xem trước
                </Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <label style={{ margin: "15px" }}>Hóa đơn khác</label>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <input
                  style={{ margin: "15px" }}
                  type="file"
                  onChange={(e) => handeFile(e.target.files, 2)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={(e) => createTable(2)}>
                  Xem trước
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />

          <GridItem xs={12} sm={12} md={9}>
            <Button
              className={classes.myButton}
              color="primary"
              onClick={(e) => handleClickOpen1()}
            >
              Tạo
            </Button>
          </GridItem>
        </GridContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Xác nhận</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <DialogTable
                data={selectedData}
                columns={selectedCol}
              ></DialogTable>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Trở về
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {isClear
              ? "Xác nhận xử lý"
              : "Xác nhận xóa dữ liệu cũ trước khi xử lý"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {!isClear && (
                <Alert severity="warning">
                  Tháng đã có dữ liệu. Hệ thống sẽ xóa dữ liệu cũ nếu tiếp tục
                </Alert>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} color="primary">
              Hủy
            </Button>
            <Button onClick={(e) => handleSubmit()} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </LoadingOverlay>
      <Snackbar
        open={openSnackBar}
        type={snackType}
        handleClose={handleCloseSnackBar}
      ></Snackbar>
    </div>
  );
}
