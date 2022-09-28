import {
  OffersOnCommunityUpdateInput,
  OffersOnCommunityCreateInput,
  OffersOnCommunity,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useOffersOnCommunityStore = defineStore(
  "offersoncommunity-store",
  {
    state: () => {
      return {
        offersoncommunityList: [] as Array<OffersOnCommunity>,
        isLoading: false,
        error: null as Object | any,
        offersoncommunity: null as OffersOnCommunity | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchOffersOnCommunities(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.offersOnCommunityControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.offersoncommunityList = data.paginatedResult;

          this.offersoncommunityList.forEach((element) => {
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
          this.offersoncommunityList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteOffersOnCommunity(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.offersOnCommunityControllerDelete(
            payload
          );
          this.offersoncommunityList = this.offersoncommunityList.filter(
            (offersoncommunity) => offersoncommunity.id !== data.id
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
      async editOffersOnCommunity(payload: {
        data: OffersOnCommunityUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const { data } = await service.api.offersOnCommunityControllerUpdate(
            payload.id,
            payload.data
          );
          this.offersoncommunityList = this.offersoncommunityList.map((item) =>
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
      async getOffersOnCommunityById(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.offersOnCommunityControllerFindOne(
            payload
          );
          this.offersoncommunity = data;
          this.error = null;
        } catch (err: any) {
          this.offersoncommunity = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createOffersOnCommunity(payload: OffersOnCommunityCreateInput) {
        this.isLoading = true;
        try {
          const { data } = await service.api.offersOnCommunityControllerCreate(
            payload
          );
          this.offersoncommunityList = [...this.offersoncommunityList, data];
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
