import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData, month, year } from "./ServiceReportBill.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import TextField from "@material-ui/core/TextField";
import Button from "../../../component/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    
  },
}));
export default function HandledReport(props) {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  //   const { selectMonth, selectYear, reLoad } = props;
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [selectYear, setSelectYear] = useState(currentYear);
  const [reload,setReload]=useState(true);
  const [data, setData] = useState([]);

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "apart_name",
      label: "Căn hộ",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "time",
      label: "Thời gian",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "total_money",
      label: "Tổng giá",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "is_pay",
      label: "Tình trạng",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button
                //className={classes.button}
                //variant="outlined"
                color="primary"
                onClick={() => handleClick(tableMeta.rowData[0])}
              >
                Chi tiết
              </Button>

              {/* <Button
                className={classes.button}
                //variant="outlined"
                color="danger"
                onClick={() => handleClick(tableMeta.rowData[0])}
              >
                Xóa
              </Button> */}
            </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    console.log(id);
    history.push(`reportbill/${id}`);
  };
  const changeMonth=(month)=>
  {
    setSelectMonth(month);
    setReload(!reload);
  }
   const changeYear=(year)=>{
     setSelectYear(year)
    setReload(!reload);
   }
  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/all-resolved/${selectMonth}/${selectYear}`,
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
        console.log(result);
        setData(await handleData(result.data));
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, [reload]);
  return (
    <GridContainer>
     
        <GridItem xs={12} sm={12} md={3}>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Tháng"
            defaultValue={currentMonth}
            onChange={(e) => changeMonth(e.target.value)}
            SelectProps={{
              native: true,
            }}
            fullWidth
            variant="outlined"
          >
            {month.map((option) => (
              <option key={option.id} value={option.id}>
                {option.id}
              </option>
            ))}
          </TextField>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Năm"
            defaultValue={currentYear}
            onChange={(e) => changeYear(e.target.value)}
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
      
      <GridItem xs={12} sm={12} md={12}>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
      </GridItem>
    </GridContainer>
  );
}
