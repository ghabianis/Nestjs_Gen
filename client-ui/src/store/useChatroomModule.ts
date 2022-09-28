import {
  ChatroomUpdateInput,
  ChatroomCreateInput,
  Chatroom,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useChatroomStore = defineStore("chatroom-store", {
  state: () => {
    return {
      chatroomList: [] as Array<Chatroom>,
      isLoading: false,
      error: null as Object | any,
      chatroom: null as Chatroom | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchChatrooms(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatroomControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.chatroomList = data.paginatedResult;

        this.chatroomList.forEach((element) => {
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
        this.chatroomList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteChatroom(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatroomControllerDelete(payload);
        this.chatroomList = this.chatroomList.filter(
          (chatroom) => chatroom.id !== data.id
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
    async editChatroom(payload: { data: ChatroomUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatroomControllerUpdate(
          payload.id,
          payload.data
        );
        this.chatroomList = this.chatroomList.map((item) =>
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
    async getChatroomById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatroomControllerFindOne(payload);
        this.chatroom = data;
        this.error = null;
      } catch (err: any) {
        this.chatroom = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createChatroom(payload: ChatroomCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatroomControllerCreate(payload);
        this.chatroomList = [...this.chatroomList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
