import React from "react";
import MarketingList from "./MarketingList";
import HasilPerhitunganList from "./HasilPerhitunganList";
import PenjualanList from "./PenjualanList";

const LayoutList = () => {
  return (
    <>
      <MarketingList />
      <PenjualanList />
      <HasilPerhitunganList />
    </>
  );
};

export default LayoutList;
