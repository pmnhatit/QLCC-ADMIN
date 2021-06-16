import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
 import { handleData } from "./ServiceReportBill.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function NewReport(props) {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
 // const { selectMonth, selectYear, reLoad } = props;
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
                onClick={() => handleClick(tableMeta.rowData[0])}>
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
    history.push(`/admin/reportbill/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/all-report`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (res.status === 200 ) {
       
        const result = await res.json();
        console.log("Vo 200OK");
        console.log(result.data);
        setData(await handleData(result.data));
        // setStatis();
        //calTotal(result.data)
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
