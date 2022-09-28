import {
  EntreprisesOnCommunityUpdateInput,
  EntreprisesOnCommunityCreateInput,
  EntreprisesOnCommunity,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useEntreprisesOnCommunityStore = defineStore(
  "entreprisesoncommunity-store",
  {
    state: () => {
      return {
        entreprisesoncommunityList: [] as Array<EntreprisesOnCommunity>,
        isLoading: false,
        error: null as Object | any,
        entreprisesoncommunity: null as EntreprisesOnCommunity | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchEntreprisesOnCommunities(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.entreprisesOnCommunityControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.entreprisesoncommunityList = data.paginatedResult;

          this.entreprisesoncommunityList.forEach((element) => {
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
          this.entreprisesoncommunityList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteEntreprisesOnCommunity(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.entreprisesOnCommunityControllerDelete(payload);
          this.entreprisesoncommunityList = this.entreprisesoncommunityList.filter(
            (entreprisesoncommunity) => entreprisesoncommunity.id !== data.id
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
      async editEntreprisesOnCommunity(payload: {
        data: EntreprisesOnCommunityUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.entreprisesOnCommunityControllerUpdate(
            payload.id,
            payload.data
          );
          this.entreprisesoncommunityList = this.entreprisesoncommunityList.map(
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
      async getEntreprisesOnCommunityById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.entreprisesOnCommunityControllerFindOne(
            payload
          );
          this.entreprisesoncommunity = data;
          this.error = null;
        } catch (err: any) {
          this.entreprisesoncommunity = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createEntreprisesOnCommunity(
        payload: EntreprisesOnCommunityCreateInput
      ) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.entreprisesOnCommunityControllerCreate(payload);
          this.entreprisesoncommunityList = [
            ...this.entreprisesoncommunityList,
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
