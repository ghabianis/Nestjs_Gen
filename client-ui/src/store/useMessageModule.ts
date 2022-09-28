import { MessageUpdateInput, MessageCreateInput, Message } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useMessageStore = defineStore("message-store", {
  state: () => {
    return {
      messageList: [] as Array<Message>,
      isLoading: false,
      error: null as Object | any,
      message: null as Message | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchMessages(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.messageList = data.paginatedResult;

        this.messageList.forEach((element) => {
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
        this.messageList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteMessage(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerDelete(payload);
        this.messageList = this.messageList.filter(
          (message) => message.id !== data.id
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
    async editMessage(payload: { data: MessageUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerUpdate(
          payload.id,
          payload.data
        );
        this.messageList = this.messageList.map((item) =>
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
    async getMessageById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerFindOne(payload);
        this.message = data;
        this.error = null;
      } catch (err: any) {
        this.message = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createMessage(payload: MessageCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerCreate(payload);
        this.messageList = [...this.messageList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
