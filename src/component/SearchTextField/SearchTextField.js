import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
const filter = createFilterOptions();
const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  }
}));
export default function FreeSoloCreateOption(props) {
  const classes = useStyles();
  const {data,setSelected}=props
  const [value, setValue] = React.useState(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            identify_card: newValue,
          });
          setSelected(newValue)
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            identify_card: newValue.inputValue,
          });
          setSelected(newValue.inputValue)
        } else {
          setValue(newValue);
          setSelected(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        // if (params.inputValue !== '') {
        //   filtered.push({
        //     inputValue: params.inputValue,
        //     identify_card: `Add "${params.inputValue}"`,
        //   });
        // }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={data}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.identify_card;
      }}
      renderOption={(option) => option.identify_card}
      style={{ width: 480 }}
      freeSolo
      renderInput={(params) => (
        <TextField className={classes.textField} {...params} label="CMND" variant="outlined" />
      )}
    />
  );
}

