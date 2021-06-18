
export const handleData = (apart, block) => {
  console.log(apart);
  console.log(block);
  const newApart = [];
  for (let i = 0; i < apart.length; i++) {
    if (apart[i].is_delete === false) {
      newApart[i] = {
        id: apart[i]._id,
        order: i + 1,
        name: apart[i].name,
        block: returnBlock(apart[i].block, block),
        status: returnStatus(apart[i].status),
      };
    }
  }
  console.log(newApart);
  return newApart;
};
const returnStatus = (status) => {
  switch (status) {
    case 1:
      return <div style ={{color:"green"}}>Còn trống</div>;
    case 2:
      return <div style ={{color:"red"}}>Đã bán</div>;
    default:
      return "";
  }
};
const returnBlock = (apart, blockList) => {
   for (let item of blockList) {   
    if (item._id === apart)   
        return item.name;
  }
};
