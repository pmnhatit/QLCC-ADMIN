import { pathToFileURL } from "url";

export const month = [
  { id: 1, name: "Tháng 1" },
  { id: 2, name: "Tháng 2" },
  { id: 3, name: "Tháng 3" },
  { id: 4, name: "Tháng 4" },
  { id: 5, name: "Tháng 5" },
  { id: 6, name: "Tháng 6" },
  { id: 7, name: "Tháng 7" },
  { id: 8, name: "Tháng 8" },
  { id: 9, name: "Tháng 9" },
  { id: 10, name: "Tháng 10" },
  { id: 11, name: "Tháng 11" },
  { id: 12, name: "Tháng 12" },
];
export const year = [{ id: 2020 }, { id: 2021 }];
export const type = [
  { id: "Hóa đơn điện" },
  { id: "Hóa đơn nước" },
  { id: "Hóa đơn khác" },
];

export const handleDataTable = (data) => {
    var lines=data.split("\n");

    var result = [];
  
    var headers=lines[0].split(",");
    headers[headers.length-1]=headers[headers.length-1].substring(0, headers[headers.length-1].length-1);

    for(var i=1;i<lines.length-1;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
    }
    console.log(result);
    return result;
};
//   export const handleDataTable=(data)=>
//   {
//     var allTextLines = data.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];

//     for (var i = 1; i < allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {

//             var tarr = [];
//             for (var j = 0; j < headers.length; j++) {
//                  tarr.push(headers[j] + ":" + data[j]);

//             }
//             lines.push(tarr);
//         }
//     }
//     console.log(lines);
//   }
export const columns= [
  {
    name: "apart_name",
    label: "Tên phòng",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "old_index",
    label: "Chỉ số cũ",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "new_index",
    label: "Chỉ số mới",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "total_money",
    label: "Tổng tiền",
    options: {
      filter: false,
      sort: false,
    },
  },
];
export const columnsOther= [
  {
    name: "apart_name",
    label: "Tên phòng",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "apart_management",
    label: "Phí quản lý",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "parking_fees",
    label: "Phí đỗ xe",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "maintenance_fee",
    label: "Phí bảo trì",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "service_charge",
    label: "Phí dịch vụ",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "other_fees",
    label: "Phí khác",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "total_money",
    label: "Tổng tiền",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "note",
    label: "Ghi chú",
    options: {
      filter: false,
      sort: false,
    },
  },
];