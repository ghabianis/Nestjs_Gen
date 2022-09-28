import { SurveyUpdateInput, SurveyCreateInput, Survey } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useSurveyStore = defineStore("survey-store", {
  state: () => {
    return {
      surveyList: [] as Array<Survey>,
      isLoading: false,
      error: null as Object | any,
      survey: null as Survey | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchSurveys(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.surveyControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.surveyList = data.paginatedResult;

        this.surveyList.forEach((element) => {
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
        this.surveyList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteSurvey(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.surveyControllerDelete(payload);
        this.surveyList = this.surveyList.filter(
          (survey) => survey.id !== data.id
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
    async editSurvey(payload: { data: SurveyUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.surveyControllerUpdate(
          payload.id,
          payload.data
        );
        this.surveyList = this.surveyList.map((item) =>
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
    async getSurveyById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.surveyControllerFindOne(payload);
        this.survey = data;
        this.error = null;
      } catch (err: any) {
        this.survey = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createSurvey(payload: SurveyCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.surveyControllerCreate(payload);
        this.surveyList = [...this.surveyList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
