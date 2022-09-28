import {
  UsersOnCommunityUpdateInput,
  UsersOnCommunityCreateInput,
  UsersOnCommunity,
  UsersOnCommunityWhereInput,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useUsersOnCommunityStore = defineStore("usersoncommunity-store", {
  state: () => {
    return {
      usersoncommunityList: [] as Array<UsersOnCommunity>,
      isLoading: false,
      error: null as Object | any,
      usersoncommunity: null as UsersOnCommunity | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchUsersOnCommunities(payload: {userId:string,communityId?:string,pagination:IPagination}) {
      this.isLoading = true;
      
      try {
        const arg=payload.userId!==''?{"where[user][id]":payload.userId}:{"where[community][id]":payload.communityId}
        const { data } = await service.api.usersOnCommunityControllerFindMany({
          ...arg,
          skip: payload.pagination.skip,
          take: payload.pagination.take,
        });
        this.usersoncommunityList=[]
        this.usersoncommunityList = data.paginatedResult;
console.log(this.usersoncommunityList,"this.usersoncommunityList");

        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.pagination.skip,
          take: payload.pagination.take,
        };
        this.error = null;
      } catch (err: any) {
        this.usersoncommunityList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUsersOnCommunity(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersOnCommunityControllerDelete(
          payload
        );
        this.usersoncommunityList = this.usersoncommunityList.filter(
          (usersoncommunity) => usersoncommunity.id !== data.id
        );
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
    async editUsersOnCommunity(payload: {
      data: UsersOnCommunityUpdateInput;
      id: string;
    }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersOnCommunityControllerUpdate(
          payload.id,
          payload.data
        );
        this.usersoncommunityList = this.usersoncommunityList.map((item) =>
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
    async getUsersOnCommunityById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersOnCommunityControllerFindOne(
          payload
        );
        this.usersoncommunity = data;
        this.error = null;
      } catch (err: any) {
        this.usersoncommunity = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createUsersOnCommunity(payload: UsersOnCommunityCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersOnCommunityControllerCreate(
          payload
        );
        this.usersoncommunityList = [...this.usersoncommunityList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
