import axios from "axios";
const request = axios.create({
  // baseURL: "http://47.95.13.131:8081",
  timeout: 5000,
});
request.interceptors.request.use((confirm) => {
  // console.log(localStorage.getItem("token"));
  confirm.headers.set("Token", `${localStorage.getItem("token")}`); //localStorage.getItem 读取本地存储的值
  return confirm;
});
export default request;
