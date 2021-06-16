import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
// import { directionList ,typeList } from "./ServiceAddBlock.js.js";
import TextField from "@material-ui/core/TextField";
import { Block } from "@material-ui/icons";
import {useParams} from "react-router-dom"

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
export default function EditBlock() {
  const classes = useStyles();
  //   const [open, setOpen] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck =  /^[a-zA-Z0-9]+$/;
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [isLoad,setIsLoad]=useState(true);
  const [data,setData]=useState();

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
          block_id:data._id
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/block/update`,
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

  
  useEffect(() => {
    const getRes = async () => {
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/${id}`,
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
        setData(result1.data);
        console.log(result1.data);
        setIsLoad(false);
      } else {
        const result1 = await res1.json();
        alert(result1.message);
      }
    };
    getRes();
  }, []);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin tòa nhà</h4>
            </CardHeader>
            { !isLoad && <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên tòa nhà"
                fullWidth
                margin="normal"
                defaultValue={data.name}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkApartName(e.target.value)}
              />
            </GridItem>}
            <GridItem xs={12} sm={12} md={3}>
              {alertApartName && <Alert className={classes.alerts} severity="error">Tên tòa nhà không hợp lệ</Alert>}
            </GridItem>
            <GridContainer />   
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại chỉnh sửa
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
