import { Skeleton } from "antd";
import React from "react";

export default function SkeletonComp({ sk_count, tab_col }) {
  const skeletonArray = Array.from(
    { length: sk_count },
    (_, index) => index + 1
  );
  const columnCount = Array.from({ length: tab_col }, (_, index) => index + 1);

  return skeletonArray.map((item) => (
    <tr key={item}>
      {columnCount.map((item) => (
        <td key={item}>
          <Skeleton.Input size="small" />
        </td>
      ))}
    </tr>
  ));
}
