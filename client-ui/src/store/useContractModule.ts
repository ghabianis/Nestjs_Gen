import {
  ContractUpdateInput,
  ContractCreateInput,
  Contract,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useContractStore = defineStore("contract-store", {
  state: () => {
    return {
      contractList: [] as Array<Contract>,
      isLoading: false,
      error: null as Object | any,
      contract: null as Contract | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchContracts(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.contractControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.contractList = data.paginatedResult;

        this.contractList.forEach((element) => {
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
        this.contractList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteContract(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.contractControllerDelete(payload);
        this.contractList = this.contractList.filter(
          (contract) => contract.id !== data.id
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
    async editContract(payload: { data: ContractUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.contractControllerUpdate(
          payload.id,
          payload.data
        );
        this.contractList = this.contractList.map((item) =>
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
    async getContractById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.contractControllerFindOne(payload);
        this.contract = data;
        this.error = null;
      } catch (err: any) {
        this.contract = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createContract(payload: ContractCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.contractControllerCreate(payload);
        this.contractList = [...this.contractList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
