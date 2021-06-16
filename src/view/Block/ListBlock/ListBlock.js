import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListBlock.js";
import Button from "@material-ui/core/Button";
import CustomButton from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
export default function ListBlock() {
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
      label: "Tên phòng",
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "block",
    //   label: "Toà nhà",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    
    {
      name: "Chi tiết",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <CustomButton
              variant="outlined"
              color="primary"
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              Chi tiết
            </CustomButton>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    // e.preventDefault();
    console.log(id);
    history.push(`/admin/block/detail/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/all`,
        {
          // get block
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res1.status === 200) {
        console.log("Vo 200OK");
        
        const result1 = await res1.json();
        setData(handleData(result1.data));
        console.log(result1.data);
      } else {
        const result1 = await res1.json();
        alert(result1.message);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <MUIDataTable
        title={"Danh sách tòa nhà "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
