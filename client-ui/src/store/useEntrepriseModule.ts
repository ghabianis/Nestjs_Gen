import {
  EntrepriseUpdateInput,
  EntrepriseCreateInput,
  Entreprise,
  FollowEntrepriseCreateInput,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useEntrepriseStore = defineStore("entreprise-store", {
  state: () => {
    return {
      entrepriseList: [] as Array<Entreprise>,
      isLoading: false,
      error: null as Object | any,
      entreprise: null as Entreprise | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchEntreprises(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.entrepriseControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.entrepriseList = data.paginatedResult;

        this.entrepriseList.forEach((element) => {
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
        this.entrepriseList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteEntreprise(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.entrepriseControllerDelete(payload);
        this.entrepriseList = this.entrepriseList.filter(
          (entreprise) => entreprise.id !== data.id
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
    async editEntreprise(payload: { data: EntrepriseUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.entrepriseControllerUpdate(
          payload.id,
          payload.data
        );
        this.entrepriseList = this.entrepriseList.map((item) =>
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
    async getEntrepriseById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.entrepriseControllerFindOne(payload);
        this.entreprise = data;
        this.error = null;
      } catch (err: any) {
        this.entreprise = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createEntreprise(payload: EntrepriseCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.entrepriseControllerCreate(payload);
        this.entrepriseList = [...this.entrepriseList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async followEntreprise(payload: {data:FollowEntrepriseCreateInput , userId: string}) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerCreate(
          payload.data
        );
     
        this.entreprise = {...this.entreprise,
          followEntreprises:[{candidate:{userId:payload.userId},id:data.id}],
          _count: {followEntreprises:this.entreprise._count.followEntreprises + 1}};
     
        
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async unFollowEntreprise(payload:string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.followEntrepriseControllerDelete(
          payload
        );
        this.entreprise = {...this.entreprise,
          followEntreprises:[],
          _count: {followEntreprises:this.entreprise._count.followEntreprises - 1}};
        
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },



  },
});
