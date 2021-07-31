import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/common/CampDetails"),
  { ssr: false }
);

const DisplayCampDetails = () => {
  return <DynamicComponentWithNoSSR />;
};

export default DisplayCampDetails;
