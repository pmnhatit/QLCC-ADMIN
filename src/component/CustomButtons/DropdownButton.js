import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
//import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
//import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  myButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const {data,setData}=props;
  
  const handleData = (event) => {
    setData(event.target.value); 
  };
  
  return (
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={e=>handleData(e)}
          name="Species"
          className={classes.selectEmpty}
          // inputProps={{ 'aria-label': 'age' }}
        >
          {data.map((prop) => {
            return <option key={prop.id}>{prop.name}</option>;
          })}
        </NativeSelect>
      </FormControl>
   
  );
}
