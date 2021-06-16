
export const handleData = (list, block) => {
    console.log(list);
    console.log(block);
    const newlist = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].is_delete === false) {
        newlist[i] = {
          id: list[i]._id,
          order: i + 1,
          name: list[i].name,
          block: returnBlock(list[i].block_id, block),
        };
      }
    }
    console.log(newlist);
    return newlist;
  };
  const returnStatus = (status) => {
    switch (status) {
      case 1:
        return "Còn trống";
      case 2:
        return "Đã thuê";
      case 3:
        return "Đã bán";
      default:
        return "";
    }
  };
  const returnBlock = (list, blockList) => {
     for (let item of blockList) {   
      if (item._id === list)   
          return item.name;
    }
  };
  