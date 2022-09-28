import { OfferUpdateInput, OfferCreateInput, Offer, PublicationCreateInput, SocialinterractionCreateInput } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { object } from "yup";
interface IPagination {
  take: number;
  skip: number;
}
export interface IOfferView {
  views: number,
  likes: number
  comments:number
  shares: number
  title: string
  description: string
  entrepriseId: string
  userId: string
  offerType: string
  publicationId: string
  isactive: boolean
  attendees: number
  createdAt: any
  offerId: string
  isLike: string | null
}

export const useOfferStore = defineStore("offer-store", {
  state: () => {
    return {
      offerList: [] as Array<IOfferView>,
      isLoading: false,
      error: null as Object | any,
      offer: null as IOfferView | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
     async fetchOffers(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerOffersView({
          skip: payload.skip,
          take: payload.take,
          "where[isactive]":'true'
        });
        console.log(data);
        
        this.offerList = data.paginatedResult;        
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.offerList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    }, 
    
    async fetchDisabledOffers(payload: any) {
      this.isLoading = true;
      try {
          const { data } = await service.api.socialinterractionControllerOffersView({
          skip: payload.skip,
          take: payload.take,
          "where[isactive]":'false'
        });
        console.log(data);
        
        this.offerList = data.paginatedResult;        
        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.offerList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteOffer(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.offerControllerDelete(payload);
        this.offerList = this.offerList.filter((offer) => offer.offerId !== data.id);
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
    async editOffer(payload: { data: OfferUpdateInput; id: string }) {
      this.isLoading = true;
      try {

        const { data } = await service.api.offerControllerUpdate(
          payload.id,
          payload.data
        );
        
        this.offerList = this.offerList.map((item) =>
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
    async getOfferById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerOffersView({
          "where[offerId]":payload
        });
        this.offer = data?.paginatedResult.length > 0 ? data?.paginatedResult[0] : {} ;
        this.error = null;
      } catch (err: any) {
        this.offer = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createOffer(payload: OfferCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.offerControllerCreate(payload);
        this.offerList = [...this.offerList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async duplicateOffer(payload: {
      data:PublicationCreateInput,
      id:string
    }) {
    this.isLoading = true;
    try {
      
      const { data } = await service.api.offerControllerDuplicateOffer(payload.id,payload.data,{  format: "json"});
      this.isLoading = false;
      this.error = null;
      return { duplicatedId: data.publicationId}      
    } catch (err: any) {
      console.error("Error loading  ITEMS", err);
      this.error = err.error;
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  },
  async fetchCandidateOffer(payload: {pagination:IPagination , entreprise:string}) {
    this.isLoading = true;
    try {
      const { data } = await service.api.socialinterractionControllerOffersView({
        skip: payload.pagination.skip,
        take: payload.pagination.take,
        "where[entrepriseId]":`${payload.entreprise}`  
          });   
      this.offerList = [...this.offerList , ...data.paginatedResult];        
      this.pagination.total = data.totalCount;
      this.pagination = {
        ...this.pagination,
        skip: payload.pagination.skip,
        take: payload.pagination.take,
      };
      this.error = null;
    } catch (err: any) {
      this.offerList = [];
      console.error("Error loading  ITEMS", err);
      this.error = err.error;
    } finally {
      this.isLoading = false;
    }
  },
  async likeOffer(payload: SocialinterractionCreateInput) {
    this.isLoading = true;
    try {
      const { data } = await service.api.socialinterractionControllerCreate(
        payload
      );
      this.offerList = this.offerList.map((offer) => offer.publicationId === data.publication?.id ? {...offer, isLike: data.id, likes:offer.likes+1} : offer )
      this.error = null;
    } catch (err: any) {
      this.error = err.error;
    } finally {
      this.isLoading = false;
    }
  },  
  async dislikeOffer(payload: string) {
    this.isLoading = true;
    try {
      const { data } = await service.api.socialinterractionControllerDelete(
        payload
      );
      this.offerList = this.offerList.map((offer) => offer.publicationId === data.publication?.id ? {...offer, isLike: null,likes:offer.likes - 1 } : offer )
      this.error = null;
    } catch (err: any) {
      this.error = err.error;
    } finally {
      this.isLoading = false;
    }
  },

  },
});
