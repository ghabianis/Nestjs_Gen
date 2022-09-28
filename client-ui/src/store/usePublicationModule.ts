import { Publication, PublicationCreateInput } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}
export enum PublicationType {
  Event = 'event',
  Story = 'story',
  Post = 'post',
  Offer = 'offer',
  Video = 'video'
}
const initialState = {
  publication: {
    description: "",
    title: "",
    publicationsOnCommunities : [],
    offer: {
      renumeration: "",
      candidateMaxNumber: null,
      contract: {
        id: "",
      },
      image: "",
      place: "",
      offerType: "classic",
      questions: [
        { video: { url: "https://www.youtube.com/watch?v=4vQ8If7f374" } },
        { video: { url: "https://www.youtube.com/watch?v=4vQ8If7f374" } },
        { video: { url: "https://www.youtube.com/watch?v=4vQ8If7f374" } },
      ],
      experienceLevel:null,
      offerMode : null
    },
  },
};
export const usePublicationStore = defineStore("publication-store", {
  state: () => {
    return {
      publicationList: [] as Array<Publication>,
      isLoading: false,
      error: null as Object | any,
      publication: { ...initialState.publication, offer:{...initialState.publication.offer,contract:{id: "",}} },
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchPublications(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerFindMany({
          skip: payload.skip,
          take: payload.take,
        });
        this.publicationList = data.paginatedResult;

        this.publicationList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
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
        this.publicationList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deletePublication(id:string, payload: any) {
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
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async editPublication(id: string) {
      this.isLoading = true;
      const updatedData = {
        description: this.publication.description,
        publicationsOnCommunities: this.publication.publicationsOnCommunities,
        title: this.publication.title,
        video: this.publication.video,
        offer: {
          place: this.publication.offer.place,
          renumeration: this.publication.offer.renumeration,
          contract: this.publication.offer.contract,
          candidateMaxNumber: this.publication.offer.candidateMaxNumber !== "" ? this.publication.offer.candidateMaxNumber : null,
          questions: this.publication.offer.questions,
          experienceLevel : this.publication.offer.experienceLevel,
          offerMode: this.publication.offer.offerMode
        },
      };
      try {
        const { data } = await service.api.publicationControllerUpdate(
          id,
          updatedData
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
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
          ...{ offer: {...data.offer ,contract: data.offer?.contract || { id: "" }, questions: data.offer?.questions || []  } },
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
    async createPublication(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.publicationControllerCreate({
          ...this.publication,
          offer:{
            ...this.publication.offer,
            candidateMaxNumber: this.publication.offer.candidateMaxNumber !== "" ? this.publication.offer.candidateMaxNumber : null,
            experienceLevel : this.publication.offer.experienceLevel,
            offerMode: this.publication.offer.offerMode
            },
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
      this.publication =  { ...initialState.publication, offer:{...initialState.publication.offer,contract:{id: "",}} }

    },
  },
});
