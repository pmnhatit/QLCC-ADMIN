import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData, calTotal, calFilter } from "./ServiceElectricBill";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js";
//import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridContainer from "../../../component/Grid/GridContainer";
import GridItem from "../../../component/Grid/GridItem";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function ElectricBill(props) {
  const classes = useStyles();
  //const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { selectMonth, selectYear, reLoad } = props;
  const [data, setData] = useState([]);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);
  const [statis, setStatis] = useState({
    total: 0,
    total_pay: 0,
    total_not_pay: 0,
  });
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    downloadOptions:{filterOptions:{useDisplayedRowsOnly:true}}
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "order",
      label: "STT",
      options: {
        filter: false,
        sort: true,
        download:false
      },
    },
    {
      name: "apart",
      label: "Căn hộ",
      options: {
        filter: true,
        sort: false,
        download:false
      },
    },
    {
      name: "time",
      label: "Thời gian",
      options: {
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "old_index",
      label: "Chỉ số cũ",
      options: {
        display: false,
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "new_index",
      label: "Chỉ số mới",
      options: {
        display: false,
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "consume",
      label: "Số điện",
      options: {
        filter: false,
        sort: true,
        download:false
      },
    },

    {
      name: "total",
      label: "Tổng giá",
      options: {
        filter: false,
        sort: true,
        download:false
      },
    },
    {
      name: "is_pay",
      label: "Tình trạng.",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
        download:false
      },
    },
    {
      name: "flag",
      label: "flag",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "is_pay_value",
      label: "Tình trạng",
      options: {
        
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "order",
      label: "Order",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      },
    },
    {
      name: "apart",
      label: "Apart",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "old_index",
      label: "Old index",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "new_index",
      label: "New index",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "consume",
      label: "Consume",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      },
    },

    {
      name: "total",
      label: "Total",
      options: {
        display: "excluded",
        filter: false,
        sort: true,
      },
    },
    {
      name: "is_pay_download",
      label: "Is pay",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
      },
    },

  ];
  
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
 const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
  }

  useEffect(() => {
    handleOpenLoading()
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/elec-bill/all/${selectMonth}/${selectYear}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200 || res1.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        const result1 = await res1.json();
        setData(await handleData(result.data, result1.data));
        setStatis(calTotal(result.data));
        handleCloseLoading()
      } else {
        const result = await res.json();
        alert(result.message);
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
  }, [reLoad]);
  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
    <GridContainer>
    <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={3}>
          <h3 style={{marginLeft:"30px"}}>Thông kê tháng</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <h3>Tổng tiền : {<NumberFormat value={statis.total} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => value} />}</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <h3 style={{ color: "green" }}>Tiền đã thu : {<NumberFormat value={statis.total_pay} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => value} />}</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <h3 style={{ color: "red" }}>
            Tiền còn lại: {<NumberFormat value={statis.total_not_pay} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => value} />}
          </h3>
        </GridItem>
      </GridContainer>

    

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
