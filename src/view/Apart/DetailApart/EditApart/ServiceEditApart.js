
export const directionList =[
    {id:1,name:"Bắc"},
    {id:2,name:"Tây Bắc"},
    {id:3,name:"Đông Bắc"},
    {id:4,name:"Nam"},
    {id:5,name:"Tây Nam"},
    {id:6,name:"Đông Nam"},
    {id:7,name:"Đông"},
    {id:8,name:"Tây"}

]
 export const typeList=[
    {id:1,name:"PENHOUSE"},
    {id:2,name:"Loại A"},
    {id:3,name:"Loại B"},
    {id:4,name:"Loại C"},
 ]
 export const returnIndexType=(type)=>{

 }
 export const returnIndexDicrection=(type)=>{
     
}
export const returnIndexBlock =(block_id,blockList)=>
{
  
   console.log( blockList.map(function(e) { return e._id }).indexOf(block_id))
}
