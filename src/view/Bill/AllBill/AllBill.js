import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridContainer from "../../../component/Grid/GridContainer";
import GridItem from "../../../component/Grid/GridItem";
import { handleData, calTotal} from "./ServiceAllBill";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import NumberFormat from 'react-number-format';
const useStyles = makeStyles(styles);

export default function AllBill(props) {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { selectMonth, selectYear, reLoad } = props;
  const [data, setData] = useState([]);
  const [open,setOpen]=useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);
  const [selectedRow,setSelectRow]=useState([null, 0, null, null, 0, 0, 0, 0, null, false]);
  const [reload2,setReload2]=useState(true);
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
        display: false,
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "electric",
      label: "Tiền điện",
      options: {
        display: false,
        filter: false,
        sort: true,
        download:false
      },
    },
    {
      name: "water",
      label: "Tiền nước",
      options: {
        display: false,
        filter: false,
        sort: true,
        download:false
      },
    },
    {
      name: "other",
      label: "Phí khác",
      options: {
        display: false,
        filter: false,
        sort: true,
        download:false
      },
    },

    {
      name: "total",
      label: "Tổng tiền",
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
        //display: "excluded",
        filter: false,
        sort: false,
        download:false
      },
    },
    {
      name: "is_active",
      label: "Tình trạng chủ căn hộ",
      options: {
        display: "false",
        filter: true,
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
        sort: false,
      },
    },
    {
      name: "apart",
      label: "Apart",
      options: {
        display: "excluded",
        filter: false,
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
      name: "electric",
      label: "Electric fee",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        
      },
    },
    {
      name: "water",
      label: "Water fee",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
       
      },
    },
    {
      name: "other",
      label: "Other fee",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },

    {
      name: "total",
      label: "Total",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "is_pay_download",
      label: "Is pay",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "is_active_download",
      label: "Owner's status",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
      },
    },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        download:false,
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
          {  !tableMeta.rowData[9]?
          <Tooltip
          id="tooltip-top"
          title="Thanh toán"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            className={classes.margin}
            onClick={() => handleIsPay(tableMeta.rowData)}
          >
            <Check />
          </Fab>
        </Tooltip>: <Tooltip
                id="tooltip-top-start"
                title="Hủy thanh toán"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => handleIsPay(tableMeta.rowData)}
                >
                  <Close />
                </Fab>
              </Tooltip>}
            
          </div>
              
            
          );
        },
        
      },
    },
  ];
  const handleClick = (id) => {
    console.log(id);
    history.push(`/admin/bill/detail/all/${id}`);
  };
  const handleIsPay = (row) => {
    setSelectRow(row);
    handleClickOpen();
    console.log(row);
    //history.push(`/userdetails/${id}`);
  };
  const handleSubmit= async()=>{
    handleOpenLoading()
    console.log("submit");
    handleClose();
    try {
      const body=
      {
        bill_id:selectedRow[0],
        status:!selectedRow[9]
      }
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/change-pay`, 
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
         
          }, 
          body:JSON.stringify(body)
        }
      );
      if (res.status === 200) {
        //const result = await res.json();
        console.log("ok");
        setReload2(!reload2);
        handleOpenSnackBar(true)
        handleCloseLoading()
      } else{ console.log("SOMETHING WENT WRONG")
      handleOpenSnackBar(false)
      handleCloseLoading()};
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
          `/api/all-bill/all/${selectMonth}/${selectYear}`,
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
        console.log(result.data);
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
  }, [reLoad,reload2]);
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{selectedRow[9]||false?"Xác nhận hủy thanh toán":"Xác nhận thanh toán"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <div>Căn hộ: {selectedRow[2]} </div> 
            <div>Tổng tiền: {selectedRow[7]}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </GridContainer>
    </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
