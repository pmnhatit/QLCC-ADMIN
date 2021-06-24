const status = [
  { id: 1, value: "Còn trống" },
  { id: 2, value: "Đã bán" },
];

export const handleData = (data, user, block) => {
  data["owner_info"] = user;
  data["block_value"] = returnBlock(data.block, block);
  data["status_value"] = returnStatus(data.status);

  console.log(block);
  return data;
};
export const returnStatus = (status_id) => {
  for (let item of status) {
    if (item.id === status_id) return item.value;
  }
};
export const returnBlock = (block_id, blockList) => {
  for (let item of blockList) {
    if (item._id === block_id) return item.name;
  }
};
