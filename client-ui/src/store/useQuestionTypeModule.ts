import {
  QuestionTypeUpdateInput,
  QuestionTypeCreateInput,
  QuestionType,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useQuestionTypeStore = defineStore("questiontype-store", {
  state: () => {
    return {
      questiontypeList: [] as Array<QuestionType>,
      isLoading: false,
      error: null as Object | any,
      questiontype: null as QuestionType | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchQuestionTypes(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionTypeControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.questiontypeList = data.paginatedResult;

        this.questiontypeList.forEach((element) => {
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
        this.questiontypeList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteQuestionType(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionTypeControllerDelete(
          payload
        );
        this.questiontypeList = this.questiontypeList.filter(
          (questiontype) => questiontype.id !== data.id
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
    async editQuestionType(payload: {
      data: QuestionTypeUpdateInput;
      id: string;
    }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionTypeControllerUpdate(
          payload.id,
          payload.data
        );
        this.questiontypeList = this.questiontypeList.map((item) =>
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
    async getQuestionTypeById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionTypeControllerFindOne(
          payload
        );
        this.questiontype = data;
        this.error = null;
      } catch (err: any) {
        this.questiontype = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createQuestionType(payload: QuestionTypeCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionTypeControllerCreate(
          payload
        );
        this.questiontypeList = [...this.questiontypeList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
