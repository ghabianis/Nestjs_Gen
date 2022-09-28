import {
  UsersSkillUpdateInput,
  UsersSkillCreateInput,
  UsersSkill,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useUsersSkillStore = defineStore("usersskill-store", {
  state: () => {
    return {
      usersskillList: [] as Array<UsersSkill>,
      isLoading: false,
      error: null as Object | any,
      usersskill: null as UsersSkill | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchUsersSkills(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersSkillControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.usersskillList = data.paginatedResult;

        this.usersskillList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object") {
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
        this.usersskillList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteUsersSkill(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersSkillControllerDelete(payload);
        this.usersskillList = this.usersskillList.filter(
          (usersskill) => usersskill.id !== data.id
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
    async editUsersSkill(payload: { data: UsersSkillUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersSkillControllerUpdate(
          payload.id,
          payload.data
        );
        this.usersskillList = this.usersskillList.map((item) =>
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
    async getUsersSkillById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersSkillControllerFindOne(payload);
        this.usersskill = data;
        this.error = null;
      } catch (err: any) {
        this.usersskill = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createUsersSkill(payload: UsersSkillCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.usersSkillControllerCreate(payload);
        this.usersskillList = [...this.usersskillList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
