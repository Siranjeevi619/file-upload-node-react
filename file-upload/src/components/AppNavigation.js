import React from "react";
import { Route, Routes } from "react-router-dom";
import FileInputHandler from "./FileInputHandler";
import FileOutputHandler from "./FileOutputHandler";
// import App from "./FileInputHandler";

function AppNavigation() {
  return (
    <div>
      {/* <Routes ></Routes> */}
      <Routes>
        <Route path="/upload" element={<FileInputHandler />}></Route>
        <Route path="/download" element={<FileOutputHandler />}></Route>
      </Routes>
    </div>
  );
}

export default AppNavigation;
