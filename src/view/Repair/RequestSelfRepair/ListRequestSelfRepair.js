import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "../ServiceRepair.js";
import Button from "@material-ui/core/Button";
import CustomButton from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";

export default function LinkRequestRepair(props) {
  const history = useHistory();
  const {type,status}=props;
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
      name: "apart",
      label: "Tên phòng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "time",
      label: "Ngày tạo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_read_admin",
      label: "",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_read_admin_value",
      label: "Tình trạng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Chi tiết",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <CustomButton
              variant="outlined"
              color="primary"
              onClick={() => handleClick(tableMeta.rowData[0],tableMeta.rowData[4])}
            >
              Chi tiết
            </CustomButton>
          );
        },
      },
    },
  ];
  const handleClick = async(id,is_read_admin) => {
    // e.preventDefault();
    console.log(is_read_admin);
    if(!is_read_admin) await handleChangeStatus(id);
    history.push(`/admin/repair/self_repair/detail/${id}`);
  };
  const handleChangeStatus = async (id) => {
    try {
      const body=
      {
        notice_id: id,
        admin_status: true
      }
    
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/repair/admin/update-is-read`,
        {
          method: "PUT",
          mode: "cors",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (res.status === 200) {
        console.log("ok");
     
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/repair/notices?type=${type}&status=${status}`,
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
