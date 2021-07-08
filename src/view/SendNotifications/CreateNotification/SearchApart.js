/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function LimitTags(props) {
  const classes = useStyles();
    const {data,changeData,lable}=props
  return (
    <div className={classes.root}>
      <Autocomplete
        //multiple
        limitTags={5}
        fullWidth={true}
        onChange={(event, newValue) => {
            console.log(newValue);
            changeData(newValue)
            // let a=[top100Films[0],top100Films[1]]
        }}
        id="multiple-limit-tags"
        options={data.list}
        getOptionLabel={(option) => option.name}
        defaultValue={data.default}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={lable} placeholder="" />
        )}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
