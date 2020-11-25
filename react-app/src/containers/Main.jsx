import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../redux/reducers/routesSlice";
import { configs } from "../../redux/reducers/configsSlice";
import create from "../Interaction/InteractorApi";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Input from "./Input";

function Main() {
  const routesObj = useSelector(routes);
  const configsObj = useSelector(configs);
  const Interactor = create(vscode);

  function axiosReq({ type, route }) {
    const [key, subkey] = route.split(",");
    const { config } = routesObj[key][subkey][type];
    Interactor.axiosReq(config);
  }

  const routesArr = [];
  Object.keys(routesObj).forEach((key) => {
    Object.keys(routesObj[key]).forEach((subkey) => {
      const vals = [key, subkey];
      routesArr.push(
        <option key={subkey} value={vals}>
          {subkey}
        </option>,
      );
    });
  });

  return (
    <div className="container__main">
      <Header routesArr={routesArr} axiosReq={axiosReq} />
      <Input />
      <Sidebar />
    </div>
  );
}

export default Main;
