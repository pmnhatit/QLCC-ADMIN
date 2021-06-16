import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
import CardAvatar from "../../../component/Card/CardAvatar.js";

import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
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
export default function DetailReport(props) {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
  });
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true); // true:chấp nhận|| false:không chấp nhận
  //   const token = useSelector((state) => state.user.token);

  const handleSubmit = async () => {
    console.log("submit");
    handleClose();
    let body = {};
    try {
      if (selected)
        body = {
          apart_id: data.apart_id,
          title: "Khiếu nại đã được xử lý",
          content:
            "BQL chung cư thông báo, khiếu nại của anh/chị đã được giải quyết. Đề nghị kiểm tra lại.",
        };
      else
        body = {
          apart_id: data.apart_id,
          title: "Khiếu nại không được xác nhận",
          content:
            "BQL chung cư thông báo, khiếu nại của anh/chị chưa hợp lệ. Đề nghị liên hệ BQL để giải quyết.",
        };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/bill-noti/create-confirm`,
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
        //const result = await res.json();
        console.log("ok");
        setIsError(false);
        await handleChangeReport();
        if (selected) handleChangeStatus();
        else history.push(`/admin/reportbill`)
        
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeStatus = async () => {
    try {
      const body = {
        bill_id: data.id,
        status: !data.is_pay,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-pay`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {
        //const result = await res.json();
        console.log("ok");
        setIsError(false);
        //setReload(!reload);
        history.push(`/admin/reportbill`);
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeReport = async () => {
    try {
      const body = {
        bill_id: data.id,
        status: false,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-report`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {
        //const result = await res.json();
        console.log("ok");
        setIsError(false);
        //setReload(!reload);
        
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUrl = async (key) => {
    if (key.length > 0) {
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
          console.log("Vo 200OK");
          setImage(result.imageUrl);
          //console.log(result.imageUrl);
          setIsLoad(false);
        } else {
          const result = await res.json();
          alert(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoad(false);
  };
  const handleClickOpen = (temp) => {
    setSelected(temp);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/${id}`,
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
        console.log("Vo 200OK");
        console.log(result.data);
        setData(result.data);
        getUrl(result.data.image);
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);

  return (
    <div>
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={image} alt="..." width="400" height="auto" />
                </a>
              </CardAvatar>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {data.report ? "Khiếu nại chưa xử lý" : "Khiếu nại đã xử lý"}
              </h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="aprt_name"
                  label="Tên Phòng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.apart_name || ""}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="time"
                  label="Thời gian"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.month + "/" + data.year}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="elec"
                  label="Hóa đơn điện"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.electric_bill}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="water"
                  label="Hóa đơn nước"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.water_bill}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="other"
                  label="Hóa đơn khác"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.other_bill}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="total"
                  label="Tổng tiền"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={data.total_money}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="is_pay"
                  label="Tình trạng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  defaultValue={
                    data.is_pay ? "Đã thanh toán" : "Chưa thanh toán"
                  }
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={3}>
            {/* {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}*/}
            {isError && (
              <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {data.report ? (
              <>
                <Button color="primary" onClick={(e) => handleClickOpen(true)}>
                  Chấp nhận
                </Button>
                <Button color="primary" onClick={(e) => handleClickOpen(false)}>
                  Không chấp nhận
                </Button>
              </>
            ) : (
              <div />
            )}
          </GridItem>
        </GridContainer>
      ) : (
        <div>Đang xử lý, vui lòng chờ...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {selected ? "Xác nhận đã xử lý" : "Xác nhận không xử lý"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Căn hộ: {data.apart_name}
            Tổng tiền: {data.total_money}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
