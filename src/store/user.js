// import axios from "axios";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import queru from "@/utils/http";

// create返回值是一个hook函数
const useUserStore = create(
  persist(
    immer(function (set, get) {
      // create的回调函数的返回值 (对象) 是状态
      return {
        user: {
          info: [],
          data: [],
        },
        async setInfAsync() {
          const getdept = await queru.get("/api/system/dept/list");
          set((state) => {
            state.user.info = getdept.data.data;
          });
        },
        async setInfAsyncc() {
          const getdepts = await queru.get("/api/system/dept/treeselect");
          set((state) => {
            state.user.data = getdepts.data.data;
          });
        },
      };
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
