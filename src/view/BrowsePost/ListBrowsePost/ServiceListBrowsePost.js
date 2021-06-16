
export const title="Yêu cầu đăng bài"
export const content="Yêu cầu của anh/chị đã được xử lý"

export const handleData = (list, place) => {
   console.log(list);
  console.log(place);
  const newlist = [];
  for (let i = 0; i < list.length; i++) {
    let createdate = new Date(list[i].create_date);
    let date = new Date(list[i].date);
    newlist[i] = {
      id: list[i]._id,
      order: i + 1,
      draw_create_date: list[i].create_date,
      create_date:
      createdate.getDate() + "/" + (createdate.getMonth() + 1) + "/" + createdate.getFullYear(),
      content: list[i].content,
      title: list[i].title,
      is_read: list[i].is_read,
      is_read_value: list[i].is_read ? (
        <div style={{ color: "green" }}>Đã đọc</div>
      ) : (
        <div style={{ color: "red" }}>Chưa đọc</div>
      ),
      user_id:list[i].user_id,
    };
  }
  console.log(newlist);
  return newlist;
};
