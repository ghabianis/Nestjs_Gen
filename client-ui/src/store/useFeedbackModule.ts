import {
  FeedbackUpdateInput,
  FeedbackCreateInput,
  Feedback,
} from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
interface IPagination {
  take: number;
  skip: number;
}

export interface IApplication {
  likes: number
  comments: number
  shares: number
  feedbackstatus: string
  offerstatus: string
  content: string
  offertype: string
  userid: string
  photo: string
  email: string
  offerid:string
  feedback:string
  firstName: string
  lastName: string
  isFavourite:string
  personalCv:string
  mediaLink: string

}
export interface IApplicationList {
  ApprovedCandidates: [IApplication]
  InprogressCandidates: [IApplication]
  RejectedCandidates: [IApplication]
  WaitingCandidates: [IApplication]
  totalCount: object
}
const statusList = {'waiting':'WaitingCandidates','approved':'ApprovedCandidates','rejected':'RejectedCandidates','inporgress':'InprogressCandidates'}

export const useFeedbackStore = defineStore("feedback-store", {
  state: () => {
    return {
      feedbackList: {} as IApplicationList,
      isLoading: false,
      error: null as Object | any,
      feedback: null as Feedback | null,
      pagination: {
        skip: 0,
        take: 3,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchFeedbacks(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.feedbackControllerGetStoriesMediaData({
          "where[offerid]":payload  
         
        });   
        this.feedbackList = data
      } catch (err: any) {
        this.feedbackList = {} as IApplicationList;
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  
    async deleteFeedback(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.feedbackControllerDelete(payload);
        /* this.feedbackList = this.feedbackList.ApprovedCandidates.filter(
          (feedback) => feedback.id !== data.id
        ); */
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
    async editFeedback(payload: { data: FeedbackUpdateInput; feedback: string, oldStatus:string }) {
      this.isLoading = true;
      try {
        const oldStatus = statusList[payload.oldStatus as keyof typeof statusList] 
        const newStatus = statusList[payload.data.statue as keyof typeof statusList]
        const movedFeedback = JSON.parse(payload.feedback)
        if(payload.data.statue !== payload.oldStatus){
          const { data } = await service.api.feedbackControllerUpdate(
            movedFeedback.feedback,
            payload.data
          );
          const oldStatusArray = this.feedbackList[oldStatus as keyof IApplicationList] as Array<IApplication>
          this.feedbackList[oldStatus as keyof IApplicationList] = oldStatusArray.filter((item:IApplication)=> {
  
            return item.feedback !== movedFeedback.feedback
            
          })
          this.feedbackList[newStatus as keyof IApplicationList].push({...movedFeedback,feedbackstatus:payload.data.statue})
          this.error = null;
        }
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async getFeedbackById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.feedbackControllerFindOne(payload);
        this.feedback = data;
        this.error = null;
      } catch (err: any) {
        this.feedback = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createFeedback(payload: FeedbackCreateInput) {
      this.isLoading = true;
      try {
        const { data } = await service.api.feedbackControllerCreate(payload);
/*         this.feedbackList = [...this.feedbackList, data];
 */        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
