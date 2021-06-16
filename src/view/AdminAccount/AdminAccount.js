import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceAdminAccount"; 
import { makeStyles } from "@material-ui/core/styles";
import CustomButton from "../../component/CustomButtons/Button.js"
//import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  
}));
export default function AdminAccount() {
  const classes = useStyles();
  //const history = useHistory();
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
        name: "email",
        label: "Email",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "phone",
        label: "Phone",
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
            <CustomButton
              
              color="primary"
              onClick={() => handleClick(tableMeta.rowData[0])}>
              Chi tiết
            </CustomButton>

             <CustomButton
              className={classes.button}
             
             color="danger"
             onClick={() => handleClick(tableMeta.rowData[0])}>
             Xóa
           </CustomButton>
           </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    // e.preventDefault();
    console.log(id);
    //history.push(`/userdetails/${id}`);
  };
  const myclick =()=>
  {
    console.log("click");
  }

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/auth/all`,
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>  
        <CustomButton 
              variant="outlined"
              color="success"
              onClick={e=>myclick(e)}>
              Thêm
            </CustomButton>
        </GridItem>
      </GridContainer>

      <MUIDataTable
        title={"Danh sách tài khoản admin "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
