import {
  FollowEntrepriseUpdateInput,
  FollowEntrepriseCreateInput,
  FollowEntreprise,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useFollowEntrepriseStore = defineStore("followentreprise-store", {
  state: () => {
    return {
      followentrepriseList: [] as Array<FollowEntreprise>,
      isLoading: false,
      error: null as Object | any,
      followentreprise: null as FollowEntreprise | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchFollowEntreprises(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.followentrepriseList = data.paginatedResult;

        this.followentrepriseList.forEach((element) => {
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
        this.followentrepriseList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteFollowEntreprise(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerDelete(
          payload
        );
        this.followentrepriseList = this.followentrepriseList.filter(
          (followentreprise) => followentreprise.id !== data.id
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
    async editFollowEntreprise(payload: {
      data: FollowEntrepriseUpdateInput;
      id: string;
    }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerUpdate(
          payload.id,
          payload.data
        );
        this.followentrepriseList = this.followentrepriseList.map((item) =>
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
    async getFollowEntrepriseById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerFindOne(
          payload
        );
        this.followentreprise = data;
        this.error = null;
      } catch (err: any) {
        this.followentreprise = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createFollowEntreprise(payload: FollowEntrepriseCreateInput) {
      this.isLoading = true;
      console.log(payload,"payloadpayload");
      
      try {
        const { data } = await service.api.followEntrepriseControllerCreate(
          payload
        );
        console.log(data,"data the foolowenEntreprise");
        
        this.followentrepriseList = [...this.followentrepriseList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
