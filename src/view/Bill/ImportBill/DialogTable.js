import React from "react";
import MUIDataTable from "mui-datatables";

export default function DialogTable(props) {
  const { data,columns } = props;
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
  };
  

  return (
    <MUIDataTable title={""} data={data} columns={columns} options={options} />
  );
}
