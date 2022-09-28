import {
  QuestionUpdateInput,
  QuestionCreateInput,
  Question,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useQuestionStore = defineStore("question-store", {
  state: () => {
    return {
      questionList: [] as Array<Question>,
      isLoading: false,
      error: null as Object | any,
      question: null as Question | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchQuestions(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.questionList = data.paginatedResult;

        this.questionList.forEach((element) => {
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
        this.questionList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteQuestion(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionControllerDelete(payload);
        this.questionList = this.questionList.filter(
          (question) => question.id !== data.id
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
    async editQuestion(payload: { data: QuestionUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionControllerUpdate(
          payload.id,
          payload.data
        );
        this.questionList = this.questionList.map((item) =>
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
    async getQuestionById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionControllerFindOne(payload);
        this.question = data;
        this.error = null;
      } catch (err: any) {
        this.question = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createQuestion(payload: QuestionCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.questionControllerCreate(payload);
        this.questionList = [...this.questionList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
