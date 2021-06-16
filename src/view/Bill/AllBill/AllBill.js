import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MyButton from "../../../component/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridContainer from "../../../component/Grid/GridContainer";
import GridItem from "../../../component/Grid/GridItem";
import { handleData, calTotal} from "./ServiceAllBill";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  MyButton: {
    margin: theme.spacing(1),
  },
}));
export default function AllBill(props) {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { selectMonth, selectYear, reLoad } = props;
  const [data, setData] = useState([]);
  const [open,setOpen]=useState(false);
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
      name: "apart",
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
      name: "electric_bill",
      label: "Tiền điện",
      options: {
        display: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: "water_bill",
      label: "Tiền nước",
      options: {
        display: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: "other_bill",
      label: "Chi phí khác",
      options: {
        display: false,
        filter: false,
        sort: true,
      },
    },

    {
      name: "total_money",
      label: "Tổng tiền",
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
      name: "flag",
      label: "flag",
      options: {
        display: "excluded",
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
              <MyButton
                //className={classes.MyButton}
                //variant="outlined"
                color="primary"
                onClick={() => handleClick(tableMeta.rowData[0])}
              >
                Chi tiết
              </MyButton>

              <MyButton
                className={classes.MyButton}
                //variant="outlined"
                color="danger"
                
                onClick={() => handleIsPay(tableMeta.rowData)}
              >
              {  tableMeta.rowData[9]?"Hủy thanh toán":"  Thanh toán  "}
              </MyButton>
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
      } else console.log("SOMETHING WENT WRONG");
    } catch (err) {
      console.log(err);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getRes = async () => {
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
        console.log(result);
       setData(await handleData(result.data, result1.data));
        setStatis(calTotal(result.data));
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, [reLoad,reload2]);
  return (
    <GridContainer>
      <GridContainer xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={3}>
          <div>Thông kê toàn dữ liệu</div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div>Tổng tiền : {statis.total}</div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div style={{ color: "green" }}>Tiền đã thu : {statis.total_pay}</div>
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <div style={{ color: "red" }}>
            Tiền còn lại: {statis.total_not_pay}
          </div>
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
            Căn hộ: {selectedRow[2]}       
            Tổng tiền: {selectedRow[7]}
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
  );
}
