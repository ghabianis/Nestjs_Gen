import { CommentUpdateInput, CommentCreateInput, Comment } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export const useCommentStore = defineStore("comment-store", {
  state: () => {
    return {
      commentList: [] as Array<Comment>,
      isLoading: false,
      error: null as Object | any,
      comment: null as Comment | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchComments(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.commentControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.commentList = data.paginatedResult;

        this.commentList.forEach((element) => {
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
        this.commentList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteComment(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.commentControllerDelete(payload);
        this.commentList = this.commentList.filter(
          (comment) => comment.id !== data.id
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
    async editComment(payload: { data: CommentUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.commentControllerUpdate(
          payload.id,
          payload.data
        );
        this.commentList = this.commentList.map((item) =>
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
    async getCommentById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.commentControllerFindOne(payload);
        this.comment = data;
        this.error = null;
      } catch (err: any) {
        this.comment = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createComment(payload: CommentCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.commentControllerCreate(payload);
        this.commentList = [...this.commentList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
