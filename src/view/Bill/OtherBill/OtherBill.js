import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData ,calTotal, calFilter} from "./ServiceOtherBill";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js";
import GridContainer from "../../../component/Grid/GridContainer";
import GridItem from "../../../component/Grid/GridItem";
//import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function OtherBill(props) {
  const classes = useStyles();
  //const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { selectMonth, selectYear, reLoad } = props;
  const [data, setData] = useState([]);
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
      name: "apart_management",
      label: "Phí quản lý",
      options: {
        
        filter: false,
        sort: true,
      },
    },
    {
      name: "parking_fees",
      label: "Phí đỗ xe",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "maintenance_fee",
      label: "Phí bảo trì",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "service_charge",
      label: "Phí phục vụ",
      options: {
        filter: false,
        sort: true,
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
      name: "note",
      label: "Ghi chú",
      options: {
        filter: true,
        sort: false,
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

    // {
    //   name: "",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <div>
    //           <Button
    //             //className={classes.button}
    //             //variant="outlined"
    //             color="primary"
    //             onClick={() => handleClick(tableMeta.rowData[0])}
    //           >
    //             Chi tiết
    //           </Button>

    //           <Button
    //             className={classes.button}
    //             //variant="outlined"
    //             color="danger"
    //             onClick={() => handleClick(tableMeta.rowData[0])}
    //           >
    //             Xóa
    //           </Button>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];
  const handleClick = (id) => {
    console.log(id);
    //history.push(`/userdetails/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/other-bill/all/${selectMonth}/${selectYear}`,
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
       
        const result = await res.json();
        const result1 = await res1.json(); 
        // console.log("Vo 200OK");
        console.log(result);
        setData(await handleData(result.data, result1.data));
        //setStatis(calTotal(result.data));
        
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, [reLoad]);
  return (
    <div>
      {/* <GridContainer xs={12} sm={12} md={12}>
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
      </GridContainer> */}
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
