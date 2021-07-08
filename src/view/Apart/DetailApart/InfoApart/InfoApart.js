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
export default function InfoApart(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const {data}=props

 

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên căn hộ"
                fullWidth
                defaultValue={data.name}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
            </GridItem>
            <GridContainer />

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="outlined-select-currency-native"
                label="Tòa nhà"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.block_value}
                fullWidth
                variant="outlined"
              >
               
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="outlined-select-currency-native"
                label="Tình trạng"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.status_value}
                fullWidth
                variant="outlined"
              >
               
              </TextField>
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="area"
                label="Diện tích căn hộ(m2)"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.area}
                variant="outlined"
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="direction"
                label="Hướng căn hộ"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.direction}
                fullWidth
                variant="outlined"
              >
               
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="type"
                label="Loại căn hộ"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.type}
                fullWidth
                variant="outlined"
              >
                
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="description"
                label="Mô tả"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                multiline={true}
                defaultValue={data.description}
                variant="outlined"
                //defaultValue={address}
              />
            </GridItem>
            {data.owner_info!==null
            ?
              <>
              <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="username"
                label="Người sở hữu"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.owner_info.name}
                variant="outlined"
              />
            </GridItem> 
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="cmnd"
                label="CMND"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.owner_info.identify_card}
                variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="cmnd"
                label="Tình trạng chủ hộ"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={data.owner.is_active?"Có sử dụng app":"Không sử dụng app"}
                variant="outlined"
              />
            </GridItem> 
            </>:<></>}    
          </GridContainer>
          <GridItem xs={12} sm={12} md={9}>
          {/* <Button className={classes.myButton} color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button> */}
          </GridItem>
        </GridItem>
      </GridContainer>
    </div>
  );
}
