import {
  PublicationsOnCommunityUpdateInput,
  PublicationsOnCommunityCreateInput,
  PublicationsOnCommunity,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const usePublicationsOnCommunityStore = defineStore(
  "publicationsoncommunity-store",
  {
    state: () => {
      return {
        publicationsoncommunityList: [] as Array<PublicationsOnCommunity>,
        isLoading: false,
        error: null as Object | any,
        publicationsoncommunity: null as PublicationsOnCommunity | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchPublicationsOnCommunities(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.publicationsOnCommunityControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.publicationsoncommunityList = data.paginatedResult;

          this.publicationsoncommunityList.forEach((element) => {
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
          this.publicationsoncommunityList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deletePublicationsOnCommunity(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.publicationsOnCommunityControllerDelete(
            payload
          );
          this.publicationsoncommunityList = this.publicationsoncommunityList.filter(
            (publicationsoncommunity) => publicationsoncommunity.id !== data.id
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
      async editPublicationsOnCommunity(payload: {
        data: PublicationsOnCommunityUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.publicationsOnCommunityControllerUpdate(
            payload.id,
            payload.data
          );
          this.publicationsoncommunityList = this.publicationsoncommunityList.map(
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
      async getPublicationsOnCommunityById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.publicationsOnCommunityControllerFindOne(
            payload
          );
          this.publicationsoncommunity = data;
          this.error = null;
        } catch (err: any) {
          this.publicationsoncommunity = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createPublicationsOnCommunity(
        payload: PublicationsOnCommunityCreateInput
      ) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.publicationsOnCommunityControllerCreate(
            payload
          );
          this.publicationsoncommunityList = [
            ...this.publicationsoncommunityList,
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
