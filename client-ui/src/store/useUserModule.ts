import { UserUpdateInput, UserCreateInput, User } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useUserStore = defineStore("user-store", {
  state: () => {
    return {
      userList: [] as Array<User>,
      isLoading: false,
      error: null as Object | any,
      user: null as User | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchUsers(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerGetUserList(
          {
          skip: payload.skip,
          take: payload.take,
        });
        console.log("users", data)
        this.userList = data.paginatedResult;

        this.userList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.userList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAudience(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerGetAudienceList(
          {
          skip: payload.skip,
          take: payload.take,
        });
        console.log("users", data)
        this.userList = data.paginatedResult;

        this.userList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.userList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUser(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerDelete(payload);
        this.userList = this.userList.filter((user) => user.id !== data.id);
        this.pagination.total--;
        this.isLoading = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async editUser(payload: { data: UserUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerUpdate(
          payload.id,
          payload.data
        );
        this.userList = this.userList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async getUserById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerFindOne(payload);
        this.user = data;
        this.error = null;
      } catch (err: any) {
        this.user = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createUser(payload: UserCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.userControllerCreate(payload);
        this.userList = [...this.userList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
