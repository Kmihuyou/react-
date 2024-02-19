import request from "../utils/http";
// 登录
export const sysLogin = (params) => request.post("/api/login", params);
// 获取路由
export const getRouters = () => request.get("/api/getRouters");
//查询身体部位列表
export const getBodypartslist = (params) =>
  request.get("/api/business/Bodyparts/list", { params });
//删除
export const elletebody = (ids) =>
  request.delete(`/api/business/Bodyparts/${ids}`);
//添加
export const addbody = (params) =>
  request.post("/api/business/Bodyparts", params);

// 查询就诊卡管理列表
export const getcardlist = (params) =>
  request.get("/api/business/Cards/list", { params });
// 删除
export const deletecards = (params) =>
  request.delete(`/api/business/Cards/${params}`);

// 用户管理
// 获取部门列表
export const getdept = (params) => request.get("/api/system/dept/list", params);
export const getdepts = (params) =>
  request.get("/api/system/dept/treeselect", params);
//删除部门
export const getDelete = (params) =>
  request.delete(`/api/system/dept/${params}`);
