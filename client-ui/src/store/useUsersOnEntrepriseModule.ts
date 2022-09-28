import {
  UsersOnEntrepriseUpdateInput,
  UsersOnEntrepriseCreateInput,
  UsersOnEntreprise,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useUsersOnEntrepriseStore = defineStore(
  "usersonentreprise-store",
  {
    state: () => {
      return {
        usersonentrepriseList: [] as Array<UsersOnEntreprise>,
        isLoading: false,
        error: null as Object | any,
        usersonentreprise: null as UsersOnEntreprise | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchUsersOnEntreprises(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.usersOnEntrepriseControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.usersonentrepriseList = data.paginatedResult;

          this.usersonentrepriseList.forEach((element) => {
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
          this.usersonentrepriseList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteUsersOnEntreprise(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.usersOnEntrepriseControllerDelete(
            payload
          );
          this.usersonentrepriseList = this.usersonentrepriseList.filter(
            (usersonentreprise) => usersonentreprise.id !== data.id
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
      async editUsersOnEntreprise(payload: {
        data: UsersOnEntrepriseUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const { data } = await service.api.usersOnEntrepriseControllerUpdate(
            payload.id,
            payload.data
          );
          this.usersonentrepriseList = this.usersonentrepriseList.map((item) =>
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
      async getUsersOnEntrepriseById(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.usersOnEntrepriseControllerFindOne(
            payload
          );
          this.usersonentreprise = data;
          this.error = null;
        } catch (err: any) {
          this.usersonentreprise = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createUsersOnEntreprise(payload: UsersOnEntrepriseCreateInput) {
        this.isLoading = true;
        try {
          const { data } = await service.api.usersOnEntrepriseControllerCreate(
            payload
          );
          this.usersonentrepriseList = [...this.usersonentrepriseList, data];
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
