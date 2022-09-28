import {
  ContractsOnCandidateUpdateInput,
  ContractsOnCandidateCreateInput,
  ContractsOnCandidate,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useContractsOnCandidateStore = defineStore(
  "contractsoncandidate-store",
  {
    state: () => {
      return {
        contractsoncandidateList: [] as Array<ContractsOnCandidate>,
        isLoading: false,
        error: null as Object | any,
        contractsoncandidate: null as ContractsOnCandidate | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchContractsOnCandidates(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.contractsOnCandidateControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.contractsoncandidateList = data.paginatedResult;

          this.contractsoncandidateList.forEach((element) => {
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
          this.contractsoncandidateList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteContractsOnCandidate(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.contractsOnCandidateControllerDelete(payload);
          this.contractsoncandidateList = this.contractsoncandidateList.filter(
            (contractsoncandidate) => contractsoncandidate.id !== data.id
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
      async editContractsOnCandidate(payload: {
        data: ContractsOnCandidateUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.contractsOnCandidateControllerUpdate(
            payload.id,
            payload.data
          );
          this.contractsoncandidateList = this.contractsoncandidateList.map(
            (item) => (item.id === payload.id ? { ...item, ...data } : item)
          );
          this.error = null;
        } catch (err: any) {
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async getContractsOnCandidateById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.contractsOnCandidateControllerFindOne(payload);
          this.contractsoncandidate = data;
          this.error = null;
        } catch (err: any) {
          this.contractsoncandidate = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createContractsOnCandidate(
        payload: ContractsOnCandidateCreateInput
      ) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.contractsOnCandidateControllerCreate(payload);
          this.contractsoncandidateList = [
            ...this.contractsoncandidateList,
            data,
          ];
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
    },
  }
);
