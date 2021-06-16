import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceUserAccount";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  
}));
export default function UserAccount() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
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
        display: false,
        filter: true,
        sort: true,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Tên người dùng",
      options: {
        filter: true,
        sort: false,
      },
    },{
        name: "phone",
        label: "Số điện thoại",
        options: {
          filter: true,
          sort: false,
        },
      },
    {
        name: "license_plates",
        label: "Biển số xe",
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

             <Button
              className={classes.button}
             //variant="outlined"
             color="danger"
             onClick={() => handleClick(tableMeta.rowData[0])}>
             Xóa
           </Button>
           </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    history.push(`/admin/user_account/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/user/all`,
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
        console.log("Vo 200OK");
        const result = await res.json();
        setData(await handleData(result.data));
       
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
        title={"Danh sách căn hộ "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
