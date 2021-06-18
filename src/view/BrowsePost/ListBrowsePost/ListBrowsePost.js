import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { handleData } from "./ServiceListBrowsePost.js";

import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function ListBrowsePost() {
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
      name: "title",
      label: "Tiêu đề",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "content",
      label: "Nội dung",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    {
      name: "create_date",
      label: "Ngày tạo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_read_value",
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
              color="default"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon color="primary" />
            </Fab>
          </Tooltip>
          </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {

    history.push(`/admin/browse_post/detail/${id}`);
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
        process.env.REACT_APP_API_LINK + `/api/post/all-post?status=0`,
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
        console.log("Vo 200OK");
        const result = await res.json();
        console.log(result.data);
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
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
