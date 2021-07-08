import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridContainer from "../../../component/Grid/GridContainer.js";
import TextField from "@material-ui/core/TextField";
// import Timeline from "@material-ui/lab/Timeline";
// import TimelineItem from "@material-ui/lab/TimelineItem";
// import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
// import TimelineConnector from "@material-ui/lab/TimelineConnector";
// import TimelineContent from "@material-ui/lab/TimelineContent";
// import TimelineDot from "@material-ui/lab/TimelineDot";

import { findDate, renderLine } from "./ServiceListRegister.js";

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function LoadPlace(props) {
  const classes = useStyles();
  const { service_id, service_name, draw_date, date, reload, show ,setTerm} = props;

  const token = useSelector((state) => state.user.token);
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsLoad(true);

    const getRes = async () => {
      try {
        if (service_id.length > 2) {
          const res = await fetch(
            process.env.REACT_APP_API_LINK +
              `/api/service/all-services?_id=${service_id || 1}`,
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
            console.log("ook LoadPlace");
            console.log(result.data);
            setData(await findDate(result.data[0].registed, draw_date)); //1621616400000
            setTerm (await findDate(result.data[0].registed, draw_date));
            console.log(await findDate(result.data[0].registed, draw_date));
            setIsLoad(false);
          } else {
            const result = await res.json();
            alert(result.message);
          }
        } else setIsLoad(false);
      } catch (err) {
        console.log(err);
      }
    };
    getRes();
  }, [reload]);
  return (
    <>
      <h4 style={{color:"red"}}>Lọc "Ngày sử dụng" và "Địa điểm" để xem lịch trình trong ngày trước khi xử lý</h4>

      <hr />
      {isLoad && <div>Đang xử lý...</div>}
      {show && !isLoad && (
        <GridContainer>
          <div style={{ color: "#f40454" }}>Màu đỏ: buổi đã duyệt</div>
          <div style={{ color: "#3c53b3" }}>Màu xanh: buổi còn trống</div>
          <TextField
            id="apart_name"
            label="Địa điểm"
            //style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
              readOnly: true,
            }}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            defaultValue={service_name || ""}
            //onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="apart_name"
            label="Ngày"
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
            defaultValue={date || ""}
            //onChange={(e) => setName(e.target.value)}
          />
          {data && renderLine(data)}
        </GridContainer>
      )}
    </>
  );
}
