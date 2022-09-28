import {
  RecruiterUpdateInput,
  RecruiterCreateInput,
  Recruiter,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useRecruiterStore = defineStore("recruiter-store", {
  state: () => {
    return {
      recruiterList: [] as Array<Recruiter>,
      isLoading: false,
      error: null as Object | any,
      recruiter: null as Recruiter | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchRecruiters(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.recruiterControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.recruiterList = data.paginatedResult;

        this.recruiterList.forEach((element) => {
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
        this.recruiterList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteRecruiter(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.recruiterControllerDelete(payload);
        this.recruiterList = this.recruiterList.filter(
          (recruiter) => recruiter.id !== data.id
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
    async editRecruiter(payload: { data: RecruiterUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.recruiterControllerUpdate(
          payload.id,
          payload.data
        );
        this.recruiterList = this.recruiterList.map((item) =>
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
    async getRecruiterById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.recruiterControllerFindOne(payload);
        this.recruiter = data;
        this.error = null;
      } catch (err: any) {
        this.recruiter = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createRecruiter(payload: RecruiterCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.recruiterControllerCreate(payload);
        this.recruiterList = [...this.recruiterList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
