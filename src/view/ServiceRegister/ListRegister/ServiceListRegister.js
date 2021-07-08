import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import { FreeBreakfastSharp } from "@material-ui/icons";

export const title = "Yêu cầu sử dụng khu vực chung";
export const content = "Yêu cầu của anh/chị đã được xử lý";

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
      draw_date: list[i].date,
      date:
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
      create_date:
        createdate.getHours() +
        ":" +
        createdate.getMinutes() +
        " " +
        createdate.getDate() +
        "/" +
        (createdate.getMonth() + 1) +
        "/" +
        createdate.getFullYear(),
      service_id: list[i].service_id,
      service_value: returnPlace(list[i].service_id, place),
      term: list[i].term,
      term_value: returnTerm(list[i].term),
      content: list[i].content,
      is_read_admin: list[i].is_read_admin,
      is_read_admin_value: list[i].is_read_admin ? (
        <div style={{ color: "green" }}>Đã đọc</div>
      ) : (
        <div style={{ color: "red" }}>Chưa đọc</div>
      ),
      user_id: list[i].user_id,
    };
  }
  console.log(newlist);
  return newlist;
};
const listTerm = [
  { id: 0, name: "Cả ngày" },
  { id: 1, name: "Sáng" },
  { id: 2, name: "Chiều" },
];
const returnTerm = (term) => {
  for (let item of listTerm) {
    if (item.id === term) return item.name;
  }
};

const returnPlace = (list, placeList) => {
  for (let item of placeList) {
    if (item._id === list) return item.name;
  }
};

export const findDate = (list, date) => {
  console.log(list);

  let all = false;
  let mor = false;
  let after = false;
  for (let item of list) {
    if (compareDate(item.date, date)) {
      if (item.term === 0) all = true;
      else {
        if (item.term === 1) mor = true;
        if (item.term === 2) after = true;
      }
    }
  }
  return { all, mor, after };
};
const compareDate = (data1, data2) => {
  let date1 = new Date(data1);
  let date2 = new Date(data2);
  if (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getYear() === date2.getYear()
  )
    return true;
  return false;
};
export const renderLine = (value) => {
  let morColor = "primary";
  let afterColor = "primary";
  if (value.all === true) {
    morColor = "secondary";
    afterColor = "secondary";
  } else {
    if (value.mor === true) morColor = "secondary";

    if (value.after === true) afterColor = "secondary";
  }
  return (
    <Timeline align="right">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={morColor} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent> Sáng</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={afterColor} />
        </TimelineSeparator>
        <TimelineContent>Chiều</TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};
export const checkTerm = (term, termList) => {
  console.log(term);
  console.log(termList);
  switch (term) {
    case 0:
      if (
        termList.all === false &&
        termList.mor === false &&
        termList.after === false
      )
        return true;
      return false;

    case 1:
      if (termList.mor === false) return true;
      return false;
    case 2:
      if (termList.after === false) return true;
      return false;

    default:
      break;
  }
};
