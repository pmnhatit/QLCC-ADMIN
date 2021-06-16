import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
// import Button from "../../../component/CustomButtons/Button.js";
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
  },root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  }));
export default function InfoUser(props) {
  const classes = useStyles();
  const  {data,apart}=props;
  console.log(data);
  return (
    <div>
      <GridContainer>
        {console.log("in" +data.name)}
        <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="name"
                label="Họ và tên"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.name}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
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
                defaultValue={data.email}    
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
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
                defaultValue={data.phone}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
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
                defaultValue={data.identify_card}       
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
            <TextField
                id="address"
                label="Quê quán"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.native_place}
              />
              {/* <TextField
          id="outlined-select-currency-native"
          select
          label="Căn hộ sở hữu"
          // value={currency}
          // onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          {apart.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField> */}

            </GridItem>
          </GridContainer>
    </div>
  );
}
