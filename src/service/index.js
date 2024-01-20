import request from "../utils/http";
export const sysLogin = (params) => request.post("/api/login", params);

export const getRouters = () => request.get("/api/getRouters");
