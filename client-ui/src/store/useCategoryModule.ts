import {
  CategoryUpdateInput,
  CategoryCreateInput,
  Category,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { supabase } from "@/core/services/SupabaseClientService";

interface IPagination {
  take: number;
  skip: number;
}
export const useCategoryStore = defineStore("category-store", {
  state: () => {
    return {
      categoryList: [] as Array<Category>,
      isLoading: false,
      error: null as Object | any,
      category: null as Category | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchCategories() {
      this.isLoading = true;
      try {
        const categories = await supabase
        .from("Category")
        .select();
        this.categoryList=categories
      } catch (err: any) {
        this.categoryList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCategory(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.categoryControllerDelete(payload);
        this.categoryList = this.categoryList.filter(
          (category) => category.id !== data.id
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
    async editCategory(payload: { data: CategoryUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.categoryControllerUpdate(
          payload.id,
          payload.data
        );
        this.categoryList = this.categoryList.map((item) =>
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
    async getCategoryById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.categoryControllerFindOne(payload);
        this.category = data;
        this.error = null;
      } catch (err: any) {
        this.category = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createCategory(payload: CategoryCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.categoryControllerCreate(payload);
        this.categoryList = [...this.categoryList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
