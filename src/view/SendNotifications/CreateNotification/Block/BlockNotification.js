// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


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
  const {setBlock, handleOpenLoading,handleCloseLoading,handleOpenSnackBar}=props;
  const [isLoad,setIsLoad]=useState(true);
  const [blockList,setBlockList]=useState([]);
 // console.log("block");
  useEffect(() => {
    setIsLoad(true);
    handleOpenLoading()
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
        setBlock(result1.data[0]._id);
        setIsLoad(false);
        handleCloseLoading()
        // setData(await handleData(result.data, result1.data));
      } else {
        const result = await res1.json();
        console.log(result.message);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }}catch (err) {
        console.log(err);
         handleOpenSnackBar(false)
        handleCloseLoading()
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
