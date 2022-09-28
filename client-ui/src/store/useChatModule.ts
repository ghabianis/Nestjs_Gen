import { ChatUpdateInput, ChatCreateInput, Chat } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useChatStore = defineStore("chat-store", {
  state: () => {
    return {
      chatList: [] as Array<Chat>,
      isLoading: false,
      error: null as Object | any,
      chat: null as Chat | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchChats(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.chatList = data.paginatedResult;

        this.chatList.forEach((element) => {
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
        this.chatList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteChat(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatControllerDelete(payload);
        this.chatList = this.chatList.filter((chat) => chat.id !== data.id);
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
    async editChat(payload: { data: ChatUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatControllerUpdate(
          payload.id,
          payload.data
        );
        this.chatList = this.chatList.map((item) =>
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
    async getChatById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatControllerFindOne(payload);
        this.chat = data;
        this.error = null;
      } catch (err: any) {
        this.chat = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createChat(payload: ChatCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.chatControllerCreate(payload);
        this.chatList = [...this.chatList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
