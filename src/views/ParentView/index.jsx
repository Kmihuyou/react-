import React from "react";
import { Outlet } from "react-router-dom";
const ParentView = () => {
  return (
    <div>
      <h1>ParentView</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default ParentView;
