import React from "react";
import LoadingOverlay from "react-loading-overlay";

export default function CustomLoadingOverlay(props) {
  const { isActive } = props;

  return (
    <LoadingOverlay active={true} spinner text="Đang xử lý vui lòng chờ...">
    </LoadingOverlay>
  );
}
