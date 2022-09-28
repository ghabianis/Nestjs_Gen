import {
  CandidatesOnChatroomUpdateInput,
  CandidatesOnChatroomCreateInput,
  CandidatesOnChatroom,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useCandidatesOnChatroomStore = defineStore(
  "candidatesonchatroom-store",
  {
    state: () => {
      return {
        candidatesonchatroomList: [] as Array<CandidatesOnChatroom>,
        isLoading: false,
        error: null as Object | any,
        candidatesonchatroom: null as CandidatesOnChatroom | null,
        pagination: {
          skip: 0,
          take: 3,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchCandidatesOnChatrooms(payload: IPagination) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.candidatesOnChatroomControllerFindMany({
            skip: payload.skip,
            take: payload.take,
          });
          this.candidatesonchatroomList = data.paginatedResult;

          this.candidatesonchatroomList.forEach((element) => {
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
          this.candidatesonchatroomList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteCandidatesOnChatroom(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.candidatesOnChatroomControllerDelete(payload);
          this.candidatesonchatroomList = this.candidatesonchatroomList.filter(
            (candidatesonchatroom) => candidatesonchatroom.id !== data.id
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
      async editCandidatesOnChatroom(payload: {
        data: CandidatesOnChatroomUpdateInput;
        id: string;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.candidatesOnChatroomControllerUpdate(
            payload.id,
            payload.data
          );
          this.candidatesonchatroomList = this.candidatesonchatroomList.map(
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
      async getCandidatesOnChatroomById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.candidatesOnChatroomControllerFindOne(payload);
          this.candidatesonchatroom = data;
          this.error = null;
        } catch (err: any) {
          this.candidatesonchatroom = null;
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createCandidatesOnChatroom(
        payload: CandidatesOnChatroomCreateInput
      ) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.candidatesOnChatroomControllerCreate(payload);
          this.candidatesonchatroomList = [
            ...this.candidatesonchatroomList,
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
