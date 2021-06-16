import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomizedTables(props) {
  const token = JSON.parse(localStorage.getItem('token'));
  const classes = useStyles();
  const [listUser, setListUser] = useState([]);
  const history = useHistory();
  const {columns}=props;
  
  
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false
  };
  
  
  const handleClick = (id) =>{
    // e.preventDefault();
    console.log(id);
    history.push(`/userdetails/${id}`);
  }

  const handleClickHistory = (id) =>{
    // e.preventDefault();
    console.log(id);
    history.push(`/userhistories/${id}`);
  }


  
  return(
      <div>
            <MUIDataTable
                title={"List User"}
                data={listUser}
                columns={columns}
                options={options}
/>
      </div>
  );
}
