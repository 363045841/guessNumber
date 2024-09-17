import { defineStore } from "pinia";

export interface User {
    id: string;
    exp: number;
}

interface UserData {
    userList: User[]
}

export const useUserData = defineStore("userData", {
    state: (): UserData => ({
        userList: [
            { id: "default", exp: 0 },
            { id: "admin", exp: 100 },
            { id: "litiansuo", exp: 114514 }]
    }),
    getters: {},
    actions: {}
})