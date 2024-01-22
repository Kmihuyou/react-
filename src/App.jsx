import React from "react";
import Router from "./router/index";
// import useUserStore from "./store/user";//数据保存获取
const App = () => {
  // const { user, setUserName, setUserAge } = useUserStore();
  return (
    <div>
      {/* <h1>{user.name}</h1>
      <h1>{user.age}</h1>
      <button onClick={() => setUserAge()}>增加</button>
      <button onClick={() => setUserName("c")}>修改</button> */}
      <Router />
    </div>
  );
};

export default App;
