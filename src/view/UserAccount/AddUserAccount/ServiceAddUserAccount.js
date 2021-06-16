export const checkUser = async()=>
  {  
      return true;

  }
  export const handleRawApart=async(block_id,apartList)=>{
    let temp=[]
    //console.log(block_id);
    for (let i=0;i<apartList.length;i++) {
      if(apartList[i].block===block_id)
       {  
         //console.log("add");
          temp.push(apartList[i]);
       }
  }
  if(temp.length===0)
  {
    temp.push({_id:"",name:"Tòa nhà không có căn hộ"})
  }
  //console.log(temp);
  return temp;
}
export const statusList=[
  {id:1,name:"Còn trống"},
  {id:2, name:"Đã thuê"},
  {id:3, name:"Đã bán"}
]
