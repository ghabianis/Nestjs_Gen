import {
  CommunityUpdateInput,
  CommunityCreateInput,
  Community,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useCommunityStore = defineStore("community-store", {
  state: () => {
    return {
      communityList: [] as Array<Community>,
      isLoading: false,
      error: null as Object | any,
      community: null as Community | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchCommunities(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.communityControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.communityList = data.paginatedResult;

        this.communityList.forEach((element) => {
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
        this.communityList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCommunity(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.communityControllerDelete(payload);
        this.communityList = this.communityList.filter(
          (community) => community.id !== data.id
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
    async editCommunity(payload: { data: CommunityUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.communityControllerUpdate(
          payload.id,
          payload.data
        );
        this.communityList = this.communityList.map((item) =>
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
    async getCommunityById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.communityControllerFindOne(payload);
        this.community = data;
        this.error = null;
      } catch (err: any) {
        this.community = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createCommunity(payload: CommunityCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.communityControllerCreate(payload);
        this.communityList = [...this.communityList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
