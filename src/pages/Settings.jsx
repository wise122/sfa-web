import React from "react";
import DiscountSettings from "../components/DiscountSettings";
import BonusSettings from "../components/BonusSettings";
import DataExport from "../components/DataExport";

const Settings = () => {
  return (
    <>
      <DiscountSettings />
      <BonusSettings />
      <DataExport />
    </>
  );
};

export default Settings;
