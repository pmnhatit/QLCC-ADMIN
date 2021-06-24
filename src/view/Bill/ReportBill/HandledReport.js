import Fab from '@material-ui/core/Fab';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from '@material-ui/icons/Edit';
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GridContainer from "../../../component/Grid/GridContainer.js";
import GridItem from "../../../component/Grid/GridItem.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js";
import { createTimeChoice } from "../BillService.js";
import { handleData } from "./ServiceReportBill.js";

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
  const {month,year}= createTimeChoice()  
  const [isHandle,setIsHandle]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
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
      label: "Tình trạng.",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_pay_value",
      label: "Tình trạng",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Tooltip
            id="tooltip-top"
            title="Chi tiết"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Fab
              size="small"
              color="red"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon color="primary"/>
            </Fab>
          </Tooltip>
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
   const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
  }
  
 const handleOpenSnackBar = (type) => {
  if (type) setSnackType(true);
  else setSnackType(false);
  setOpenSnackBar(true);
};
const handleCloseSnackBar = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenSnackBar(false);
};
  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      try{
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
        handleCloseLoading()
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }}
      catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    };
    getRes();
  }, [reload]);
  return ( 
  <div>
    <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
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
    </LoadingOverlay>
      <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
