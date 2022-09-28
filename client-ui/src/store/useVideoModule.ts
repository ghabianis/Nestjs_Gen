import { VideoUpdateInput, VideoCreateInput, Video, UserWhereUniqueInput, Category } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { PublicationType } from "./usePublicationModule";
import { supabase } from "@/core/services/SupabaseClientService";
import router from "@/router/index";

interface IPagination {
  take: number;
  skip: number;
}
export interface IVideoView {
  videoId: string;
  views: number;
  likes: number;
  comments:number;
  shares: number;
  description: string;
  userid: string;
  createdAt?:any;
  entrepriseid: string;
  url: string;
  title:string;
  label:string;
}
const initialState = {
  category:{
    id:null as string | null,
  },
  url:"https://www.youtube.com/watch?v=iDO9J_3OVJ0",
  publication: {
    description:"",
    publicationsOnCommunities: []
  }
}

export const useVideoStore = defineStore("video-store", {
  state: () => {
    return {
      videoList: [] as Array<IVideoView>,
      isLoading: {
        list : false,
        form: false,
        delete:false,
        findOne:false
      },
      error: null as Object | any,
      video: {...initialState, publication:{...initialState.publication, publicationsOnCommunities:[]}},
      currentVideoCategory: null as Category | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchVideos(payload:
      {
        pagination:IPagination,
        type?: string
      }) {
      this.isLoading.list = true;
      try {
        let categories =  null
          if(!this.currentVideoCategory && payload.type)
          {
             categories = await supabase
              .from('Category')
              .select()
              .filter('label', 'eq', payload.type )
              .limit(1)
              console.log(categories)
              if(categories && categories.data && categories.data.length > 0){
                this.setCurrentVideoCategory(categories.data[0])
              }
          }
        if (this.currentVideoCategory)
        {
          const { data } = await service.api.socialinterractionControllerGetVideosMediaInterraction({
            skip: payload.pagination.skip,
            take: payload.pagination.take,
            "where[label]":`${this.currentVideoCategory.label}`
            
          });
          this.videoList = data.paginatedResult;
          this.pagination.total = data.totalCount;
          this.pagination = {
            ...this.pagination,
            skip: payload.pagination.skip,
            take: payload.pagination.take,
          };
          this.error = null;
       } 
      } catch (err: any) {
        this.videoList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading.list = false;
      }
    },
    async deleteVideo(payload: string) {
      this.isLoading.delete = true;
      try {
        const { data } = await service.api.videoControllerDelete(payload);
        this.videoList = this.videoList.filter((video) => video.videoId !== data.id);
        this.pagination.total--;
        this.isLoading.delete = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading.delete = false;
      } finally {
        this.isLoading.delete = false;
      }
    },
    async editVideo( id: string ) {
      this.isLoading.form = true;
      const updatedData = {
        category: this.video.category,
        url:this.video.url,
        publication:{
          description : this.video.publication.description,
          publicationsOnCommunities : this.video.publication.publicationsOnCommunities,
        }
      }
      try {
        const { data } = await service.api.videoControllerUpdate(
          id,
          updatedData
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading.form = false;
      }
    },
    async getVideoById(payload: string) {
      this.isLoading.findOne = true;
      try {
        const { data } = await service.api.videoControllerFindOne(payload);
        const publicationsOnCommunities =
        data && data.publication.publicationsOnCommunities
          ? data.publication.publicationsOnCommunities.map((community) => {
              return community.communityId;
            })
          : undefined;

        this.video = {...data, publication:{...data.publication,publicationsOnCommunities}};;
        this.error = null;
      } catch (err: any) {
        this.video = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading.findOne = false;
      }
    },
    async createVideo(payload: UserWhereUniqueInput) {
      this.isLoading.form = true;
      const publication = {...this.video.publication, user:payload,type:PublicationType.Video}
      try {
        const { data } = await service.api.videoControllerCreate({...this.video,publication});
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading.form = false;
      }
    },
    resetVideo() {
      this.video = {...initialState,category:{id:null} , publication:{...initialState.publication, publicationsOnCommunities:[]}}
    },
    setCurrentVideoCategory(payload:Category) {
      this.currentVideoCategory = payload
    },
  },
});