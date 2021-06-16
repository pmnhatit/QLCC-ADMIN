
export const handleData = ( block) => {
  console.log(block);
  const newBlock = [];
  for (let i = 0; i < block.length; i++) {
    if (block[i].is_delete === false) {
      newBlock[i] = {
        id: block[i]._id,
        order: i + 1,
        name: block[i].name,
      };
    }
  }
  console.log(newBlock);
  return newBlock;
};
