import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../../component/Grid/GridItem.js";
import GridContainer from "../../../../component/Grid/GridContainer.js";
import Button from "../../../../component/CustomButtons/Button.js";
import { to, typeList } from "../ServiceCreateNotification.js";
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
  myButton:{
    float: "right"
 }
}));
export default function BlockNotification(props) {
  const token = useSelector((state) => state.user.token);
  const {setBlock}=props;
  const [isLoad,setIsLoad]=useState(true);
  const [blockList,setBlockList]=useState([]);
 // console.log("block");
  useEffect(() => {
    setIsLoad(true);
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
      <>
      {!isLoad &&
              <TextField
                id="to"
                select
                label="Tòa nhà"
                margin="normal"
                defaultValue={to[0]}
                onChange={(e) => setBlock(e.target.value)}
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
              </TextField>}
    </>
  );
}
