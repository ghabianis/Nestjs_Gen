import {
  SocialinterractionUpdateInput,
  SocialinterractionCreateInput,
  Socialinterraction,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useSocialinterractionStore = defineStore(
  "socialinterraction-store",
  {
    state: () => {
      return {
        socialinterractionList: [] as Array<Socialinterraction>,
        isLoading: false,
        error: null as Object | any,
        socialinterraction: null as Socialinterraction | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchSocialinterractions(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.socialinterractionControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.socialinterractionList = data.paginatedResult;

          this.socialinterractionList.forEach((element) => {
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
          this.socialinterractionList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteSocialinterraction(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerDelete(
            payload
          );
          this.socialinterractionList = this.socialinterractionList.filter(
            (socialinterraction) => socialinterraction.id !== data.id
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
      async editSocialinterraction(payload: {
        data: SocialinterractionUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerUpdate(
            payload.id,
            payload.data
          );
          this.socialinterractionList = this.socialinterractionList.map(
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
      async getSocialinterractionById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.socialinterractionControllerFindOne(payload);
          this.socialinterraction = data;
          this.error = null;
        } catch (err: any) {
          this.socialinterraction = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createSocialinterraction(payload: SocialinterractionCreateInput) {
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerCreate(
            payload
          );
          this.socialinterractionList = [...this.socialinterractionList, data];
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
