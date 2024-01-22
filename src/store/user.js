// import axios from "axios";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// create返回值是一个hook函数
const useUserStore = create(
  persist(
    immer(function (set, get) {
      // create的回调函数的返回值 (对象) 是状态
      return {
        user: {
          name: "simon",
          age: "18",
          info: {},
        },
        firname: "cc",
        async setInfAsync() {
          // const res = await axios.post("")
        },
        setUserAge() {
          set((state) => {
            state.user.age++;
          });
        },
        setUserName(name) {
          set((state) => {
            state.user.name = `${get().firname} ${name}`;
          });
        },
      };
    }),
    { name: "user-store" }
  )
);
export default useUserStore;
