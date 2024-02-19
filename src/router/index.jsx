// 引入所需的依赖文件
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import generateRoutes from "./router.dynamic";
// 引入所需要路由的页面

export const RoutesContext = createContext();
const Routes = () => {
  const [routes] = useContext(RoutesContext);
  return useRoutes(routes);
};

const Router = () => {
  // console.log([...generateRoutes()]);
  const [routes, setRoutes] = useState([...generateRoutes()]);
  return (
    <RoutesContext.Provider value={[routes, setRoutes]}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </RoutesContext.Provider>
  );
};

export default Router;
