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
import { directionList ,typeList } from "./ServiceAddBlock.js";
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
  alerts:{
    marginTop:"18px"
  }
}));
export default function AddBlock() {
  const classes = useStyles();
  //   const [open, setOpen] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck =  /^[a-zA-Z0-9]+$/;
  
  const token = useSelector((state) => state.user.token);
  const [alertApartName, setAlertApartName] = useState(false);
  const [apartName, setApartName] = useState("");
  const checkApartName = (name) => {
    if (name !== ""&& name.match(nameCheck)) {
      setAlertApartName(false);
      setApartName(name);
    } else setAlertApartName(true);
  };
  
  const handleSubmit = async () => {
    if (true) {
      const body = {       
          name: apartName,
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/block/add`,
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
  };
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
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
              {alertApartName && <Alert className={classes.alerts} severity="error">Tên tòa nhà không hợp lệ</Alert>}
            </GridItem>
            <GridContainer />   
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
