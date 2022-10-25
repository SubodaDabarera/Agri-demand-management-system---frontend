import React from "react";
import { Route, Routes } from "react-router-dom";
import AddDemand from "../../pages/buyer/AddDemand";
import BuyerHeader from "../headers/BuyerHeader";
import ViewDemands from "../../pages/buyer/ViewDemands";
import UpdateDemand from "../../pages/buyer/UpdateDemand";
import BuyerProfile from "../../pages/buyer/BuyerProfile";
import UpdateBuyerProfile from "../../pages/buyer/UpdateBuyerProfile";

function BuyerLayout() {
  return (
    <div>
      <BuyerHeader />
      <Routes>
        <Route path="/add-demand" element={<AddDemand />} />
        <Route path="/view-demands" element={<ViewDemands />} />
        <Route path="/update-demand/:id" element={<UpdateDemand />} />
        <Route path="/profile" element={<BuyerProfile />} />
        <Route path="/profile/edit" element={<UpdateBuyerProfile />} />
      </Routes>
    </div>
  );
}

export default BuyerLayout;
