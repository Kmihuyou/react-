import React from "react";
import Router from "./router/index";
import ErrBoundary from "./components/ErrBoundary";
// import useUserStore from "./store/user";//数据保存获取
const App = () => {
  // const { user, setUserName, setUserAge } = useUserStore();
  return (
    <div>
      <ErrBoundary>
        <Router />
      </ErrBoundary>
    </div>
  );
};

export default App;
