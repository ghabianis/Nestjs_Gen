import { JobUpdateInput, JobCreateInput, Job } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useJobStore = defineStore("job-store", {
  state: () => {
    return {
      jobList: [] as Array<Job>,
      isLoading: false,
      error: null as Object | any,
      job: null as Job | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchJobs(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.jobControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.jobList = data.paginatedResult;

        this.jobList.forEach((element) => {
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
        this.jobList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteJob(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.jobControllerDelete(payload);
        this.jobList = this.jobList.filter((job) => job.id !== data.id);
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
    async editJob(payload: { data: JobUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.jobControllerUpdate(
          payload.id,
          payload.data
        );
        this.jobList = this.jobList.map((item) =>
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
    async getJobById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.jobControllerFindOne(payload);
        this.job = data;
        this.error = null;
      } catch (err: any) {
        this.job = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createJob(payload: JobCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.jobControllerCreate(payload);
        this.jobList = [...this.jobList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
