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
import { handleRawApart } from "./ServiceAddUserAccount.js";
import TextField from "@material-ui/core/TextField";

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
export default function ChangeProfile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isHandle, setIsHandle] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [isLoadApart, setIsLoadApart] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertName, setAlertName] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertID_Card, setAlertID_Card] = useState(false);
  const [alertAddress, setAlertAddress] = useState(false);
  const [alertLicense_plates, setAlertLicense_plates] = useState(false);
  const [alertApart, setAlertApart] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id_card, setId_card] = useState("");
  const [address, setAddress] = useState("");
  const [license_plates, setLicense_plates] = useState("");
  const [block, setBlock] = useState("");
  const [apart_id, setApart_id] = useState("");
  const [blockList, setBlockList] = useState([]);
  const [rawApartList, setRawApartList] = useState([]);
  const [apartList, setApartList] = useState([]);

  const checkName = (name) => {
    if (name !== "") {
      setAlertName(false);
      setName(name);
      return true;
    } else {
      setAlertName(true);
      return false;
    }
  };
  const checkPhone = (phone) => {
    if (phone !== "" && phone.match(phoneCheck)) {
      setAlertPhone(false);
      setPhone(phone);
      return true;
    } else {
      setAlertPhone(true);
      return false;
    }
  };
  const checkEmail = (email) => {
    if (email !== "" && email.match(emailCheck)) {
      setAlertEmail(false);
      setEmail(email);
      return true;
    } else {
      setAlertEmail(true);
      return false;
    }
  };
  const checkID_Card = (id_card) => {
    if (id_card !== "" && id_card.match(nameCheck)) {
      setAlertID_Card(false);
      setId_card(id_card);
      return true;
    } else {
      setAlertID_Card(true);
      return false;
    }
  };
  const checkAddress = (address) => {
    if (address !== "") {
      setAlertAddress(false);
      setAddress(address);
      return true;
    } else {
      setAlertAddress(true);
      return false;
    }
  };
  const checkLicense_plates = (license_plates) => {
    if (license_plates !== "") {
      setAlertLicense_plates(false);
      setLicense_plates(license_plates);
      return true;
    } else {
      setAlertLicense_plates(true);
      return false;
    }
  };
  const checkApart = (apart_id) => {
    if (apart_id !== "") {
      setAlertApart(false);
      setApart_id(apart_id);
      return true;
    } else {
      setAlertApart(true);
      return false;
    }
  };
  const handleChangeBlock = async (block_id) => {
    setIsLoadApart(true);
    setBlock(block_id);
    const temp = await handleRawApart(block_id, rawApartList);
    setApartList(temp);
    setApart_id(temp[0]._id);

    setIsLoadApart(false);
  };
  const handleSubmit = async () => {
    setIsHandle(true);
    if (
      checkName(name) &&
      checkPhone(phone) &&
      checkEmail(email) &&
      checkID_Card(id_card) &&
      checkAddress(address)
    ) {
      const body = {
        name: name,
        phone: phone,
        email: email,
        identify_card: id_card,
        native_place: address,
        apartment_id: [apart_id], //["6061e00355f5a919c47d3586"]
        block_id: [block], //["6051fc3a449d422710797e73"]
        license_plates: [license_plates], //["78N2-8668"]
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/user/add`,
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

          console.log("success");
          console.log(result);
        } else if (res.status === 500) {
        } else console.log("SOMETHING WENT WRONG");
      } catch (err) {
        console.log(err);
      }
    } else {
    }
    setIsHandle(false);
  };

  useEffect(() => {
    setIsLoad(true);
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/all`,
        {
          // get content
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/aparts-empty`,
        {
          // get content
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200 && res1.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        console.log(result.data);
        setBlockList(result.data);
        setBlock(result.data[0]._id);
        const result1 = await res1.json();
        console.log(result1.data);
        setRawApartList(result1.data);
        const temp = await handleRawApart(result.data[0]._id, result1.data);
        setApartList(temp);
        setApart_id(temp[0]._id);

        setIsLoad(false);

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
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="name"
                  label="Họ và tên"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkName(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertName && (
                  <Alert className={classes.alerts} severity="error">
                    Tên không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridContainer />
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="email"
                  label="Email"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={email}
                  onChange={(e) => checkEmail(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertEmail && (
                  <Alert className={classes.alerts} severity="error">
                    Email không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="phone"
                  label="Số điên thoại"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkPhone(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertPhone && (
                  <Alert severity="error" className={classes.alerts}>
                    Số điện thoại không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="cmnd"
                  label="Số CMND"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={cmnd}
                  onChange={(e) => checkID_Card(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertID_Card && (
                  <Alert className={classes.alerts} severity="error">
                    Số CMND không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="address"
                  label="Quê quán"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={address}
                  onChange={(e) => checkAddress(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertAddress && (
                  <Alert className={classes.alerts} severity="error">
                    Quê quán không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="license_plates"
                  label="Biển số xe"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={address}
                  onChange={(e) => checkLicense_plates(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertLicense_plates && (
                  <Alert className={classes.alerts} severity="error">
                    Biển số xe không hợp lệ
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tòa nhà"
                  margin="normal"
                  defaultValue={blockList[0]}
                  onChange={(e) => handleChangeBlock(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {blockList.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              {!isLoadApart && (
                <GridItem xs={12} sm={12} md={9}>
                  <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Căn hộ"
                    margin="normal"
                    defaultValue={apartList[0]}
                    onChange={(e) => checkApart(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                    variant="outlined"
                  >
                    {apartList.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </GridItem>
              )}
              <GridItem xs={12} sm={12} md={3}>
              {alertApart && (
                  <Alert className={classes.alerts} severity="error">
                    Căn hộ không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
             
                {isHandle && <div>Đang xử lý, vui lòng chờ ...</div>}
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Button color="primary" onClick={(e) => handleSubmit(e)}>
                  Lưu lại
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      )}
    </div>
  );
}
