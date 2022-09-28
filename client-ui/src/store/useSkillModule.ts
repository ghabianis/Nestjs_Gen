import { SkillUpdateInput, SkillCreateInput, Skill } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useSkillStore = defineStore("skill-store", {
  state: () => {
    return {
      skillList: [] as Array<Skill>,
      isLoading: false,
      error: null as Object | any,
      skill: null as Skill | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchSkills(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.skillControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.skillList = data.paginatedResult;

        this.skillList.forEach((element) => {
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
        this.skillList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteSkill(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.skillControllerDelete(payload);
        this.skillList = this.skillList.filter((skill) => skill.id !== data.id);
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
    async editSkill(payload: { data: SkillUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.skillControllerUpdate(
          payload.id,
          payload.data
        );
        this.skillList = this.skillList.map((item) =>
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
    async getSkillById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.skillControllerFindOne(payload);
        this.skill = data;
        this.error = null;
      } catch (err: any) {
        this.skill = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createSkill(payload: SkillCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.skillControllerCreate(payload);
        this.skillList = [...this.skillList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
