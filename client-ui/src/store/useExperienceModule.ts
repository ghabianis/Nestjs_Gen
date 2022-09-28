import {
  ExperienceUpdateInput,
  ExperienceCreateInput,
  Experience,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useExperienceStore = defineStore("experience-store", {
  state: () => {
    return {
      experienceList: [] as Array<Experience>,
      isLoading: false,
      error: null as Object | any,
      experience: null as Experience | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchExperiences(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.experienceControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.experienceList = data.paginatedResult;

        this.experienceList.forEach((element) => {
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
        this.experienceList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteExperience(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.experienceControllerDelete(payload);
        this.experienceList = this.experienceList.filter(
          (experience) => experience.id !== data.id
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
    async editExperience(payload: { data: ExperienceUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.experienceControllerUpdate(
          payload.id,
          payload.data
        );
        this.experienceList = this.experienceList.map((item) =>
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
    async getExperienceById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.experienceControllerFindOne(payload);
        this.experience = data;
        this.error = null;
      } catch (err: any) {
        this.experience = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createExperience(payload: ExperienceCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.experienceControllerCreate(payload);
        this.experienceList = [...this.experienceList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
