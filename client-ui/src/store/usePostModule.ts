import {
  PostUpdateInput,
  PostCreateInput,
  Post,
  UserWhereUniqueInput,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { PublicationType } from "./usePublicationModule";
interface IPagination {
  take: number;
  skip: number;
}
const initialState = {
  post: {
    image: "",
    publication: {
      description: "",
      publicationsOnCommunities: [],
      type: PublicationType.Post,
    },
  },
};
export interface IPostView {
  postid: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  userid: string;
  createdAt?: any;
  entrepriseid: string;
  image: true;
}

export const usePostStore = defineStore("post-store", {
  state: () => {
    return {
      postList: [] as Array<IPostView>,
      isLoading: false,
      error: null as Object | any,
      post: {
        ...initialState.post,
        publication: { ...initialState.post.publication },
      },
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchPosts(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } =
          await service.api.socialinterractionControllerGetPostsMediaInterraction(
            {
              skip: payload.skip,
              take: payload.take,
            }
          );
        this.postList = data.paginatedResult;
        console.log("post : [] ", data.paginatedResult);

        /* this.postList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object") {
              element[key] = Object.values(value);
            }
          }
        }); */
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.postList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deletePost(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.postControllerDelete(payload);
        this.postList = this.postList.filter((post) => post.postid !== data.id);
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
    async editPost(id: string) {
      this.isLoading = true;
      const updatedData = {
        image: this.post.image,
        publication: {
          description: this.post.publication.description,
          publicationsOnCommunities:
            this.post.publication.publicationsOnCommunities,
        },
      };
      try {
        const { data } = await service.api.postControllerUpdate(
          id,
          updatedData
        );
        /*         this.postList = this.postList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        ); */
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async getPostById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.postControllerFindOne(payload);
        console.log(data);
        const publicationsOnCommunities =
          data && data.publication.publicationsOnCommunities
            ? data.publication.publicationsOnCommunities.map((community) => {
                return community.communityId;
              })
            : undefined;

        this.post = {
          ...data,
          publication: { ...data.publication, publicationsOnCommunities },
        };
        this.error = null;
      } catch (err: any) {
        this.post = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createPost(payload: UserWhereUniqueInput) {
      this.isLoading = true;
      const publication = { ...this.post.publication, user: payload };
      try {
        const { data } = await service.api.postControllerCreate({
          ...this.post,
          publication,
        });
        //this.postList = [...this.postList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    resetPost() {
      this.post = {
        ...initialState.post,
        publication: { ...initialState.post.publication },
      };
    },
  },
});
