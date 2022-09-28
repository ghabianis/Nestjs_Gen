import { CourseUpdateInput, CourseCreateInput, Course } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useCourseStore = defineStore("course-store", {
  state: () => {
    return {
      courseList: [] as Array<Course>,
      isLoading: false,
      error: null as Object | any,
      course: null as Course | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchCourses(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.courseControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.courseList = data.paginatedResult;

        this.courseList.forEach((element) => {
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
        this.courseList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCourse(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.courseControllerDelete(payload);
        this.courseList = this.courseList.filter(
          (course) => course.id !== data.id
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
    async editCourse(payload: { data: CourseUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.courseControllerUpdate(
          payload.id,
          payload.data
        );
        this.courseList = this.courseList.map((item) =>
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
    async getCourseById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.courseControllerFindOne(payload);
        this.course = data;
        this.error = null;
      } catch (err: any) {
        this.course = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createCourse(payload: CourseCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.courseControllerCreate(payload);
        this.courseList = [...this.courseList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
