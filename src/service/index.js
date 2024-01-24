import request from "../utils/http";
// 登录
export const sysLogin = (params) => request.post("/api/login", params);
// 获取路由
export const getRouters = () => request.get("/api/getRouters");
//查询身体部位列表
export const getBodypartslist = (params) =>
  request.get("/api/business/Bodyparts/list", { params });

// 查询
export const getBodypartid = (params) =>
  request.get("/api/business/Bodyparts/list", { params });
