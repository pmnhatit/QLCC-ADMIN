import React, { useEffect, useState } from "react";
import EditApart from "./EditApart/EditApart.js"
import EditOwner from "./EditOwner/EditOwner.js"
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import TextField from "@material-ui/core/TextField";


export default function Edit(props){
 
    const {data,isLoad,blockList,setIsHandle}=props;
    const List =[
        {id:1,name:"Cập nhật thông tin"},
        {id:2,name:"Cập nhật chủ căn hộ"},
    ]
    const [id,setID]=useState(1);
     const[reload,setReload]=useState(true);
     const handleChange=(id)=>{
       setID(id)
      console.log(id);
    
  }
    const renderEdit=(id)=>{
      
        if(parseInt(id)===1)
        return (<EditApart data={data} isLoad={isLoad} blockList={blockList} setIsHandle={setIsHandle}></EditApart>);
        if(parseInt(id)===2)
        return (<EditOwner  data={data} isLoad={isLoad} blockList={blockList} setIsHandle={setIsHandle}></EditOwner>)
    }
    
    console.log("render");
    return(
        <div>
            <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="type"
                  select
                  label="Thông tin chỉnh sửa"
                  margin="normal"
                  defaultValue={List[0]}
                  onChange={(e) => {handleChange(e.target.value)}}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {List.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem> <GridItem xs={12} sm={12} md={12}>
              {renderEdit(id)}</GridItem>
              </GridContainer>
        </div>
    )
}