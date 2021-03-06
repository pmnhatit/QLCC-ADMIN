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
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";

const useStyles = makeStyles(styles);

export default function ListBrowsePost() {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false);

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    download: false,
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
  const handleClick = async(id) => {
    await handleChangeStatus(id)
    history.push(`/admin/browse_post/detail/${id}`);
  };
  const handleChangeStatus = async (id) => {
  
    try {
      const body=
      {
        post_id: id
      }
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/post/change-is-read`,
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
        handleCloseLoading()
      } else {
        const result = await res.json();
        console.log(result.message)
        handleOpenSnackBar(false)
        handleCloseLoading()
      }}catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
      </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
