import { StoryUpdateInput, StoryCreateInput, Story, Publication, PublicationUpdateInput } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
const initialState = {
  publication: {
    description: "",
    title: "",
    story:{
      id:'',
      mediaLink:''
    },
    publicationsOnCommunities:[],
  },
};
export const useStoryStore = defineStore("story-store", {
  state: () => {
    return {
      storyList: [] as Array<Story>,
      isLoading: false,
      error: null as Object | any,
      result: null as Object | any,
      story: null as Story | null,
      publication: { ...initialState.publication },
      publicationList: [] as Array<Publication>,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchStories(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerGetStoriesMediaData({
          skip: payload? payload.skip : this.pagination.skip,
          take: payload? payload.take : this.pagination.take,
        });

        this.storyList = data.paginatedResult;
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload? payload.skip : this.pagination.skip,
          take: payload? payload.take : this.pagination.take,
        };
        this.error = null;
      } catch (err: any) {
        this.storyList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteStory(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.storyControllerDelete(payload);
        this.storyList = this.storyList.filter((story) => story.id !== data.id);
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
    async editStory(payload: { data: StoryUpdateInput; id: string }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.storyControllerUpdate(
          payload.id,
          payload.data
        );
        this.storyList = this.storyList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        );
        this.error = null;
        this.result = data;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
      return { error: this.error , result: this.result};
    },
    async getStoryById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.storyControllerFindOne(payload);
        this.story = data;
        this.error = null;
      } catch (err: any) {
        this.story = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createStory(payload: StoryCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.storyControllerCreate(payload);
        this.storyList = [...this.storyList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
      return { error: this.error };
    },
    async createPublication(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerCreate({
          //...this.publication,
          ...payload,
        });
        this.publicationList = [...this.publicationList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
      
      return { error: this.error };
    },
    resetPublication() {
      this.publication = { ...initialState.publication };
    },
    async editPublication(id: string, payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerUpdate(
          id,
          payload,
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  publication", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
      return {error: this.error}
    },
    async getPublicationById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerFindOne(
          payload
        );
        const publicationsOnCommunities =
          data && data.publicationsOnCommunities
            ? data.publicationsOnCommunities.map((community) => {
                return community.communityId;
              })
            : undefined;

        this.publication = {
          ...data,
          publicationsOnCommunities,
        };

        console.log("publicationn", this.publication);
        this.error = null;
      } catch (err: any) {
        this.publication = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deletePublication(id: string, payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerDelete(id, payload);
        this.publicationList = this.publicationList.filter(
          (publication) => publication.id !== data.id
        );
        this.pagination.total--;
        this.isLoading = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error deleting  story", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
      return {error: this.error}
    },
  },
});
