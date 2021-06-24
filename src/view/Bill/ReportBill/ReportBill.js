import React from "react";
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import GridItem from "../../../component/Grid/GridItem.js";
import HandledReport from "./HandledReport.js";
import NewReport from "./NewReport.js";

export default function ReportBill() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            headerColor="primary" //"warning","success","danger","info","primary","rose"
            tabs={[
              {
                tabName: "Kiếu nại chưa xử lý",
                //tabIcon: Cloud,
                tabContent: <NewReport></NewReport>,
              },
              {
                tabName: "Kiếu nại đã xử lý",
                //tabIcon: BugReport,
                tabContent: <HandledReport></HandledReport>,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
