import { EventUpdateInput, EventCreateInput, Event, UserWhereUniqueInput, SocialinterractionCreateInput } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { PublicationType } from "./usePublicationModule";
import { string } from "yup";
interface IPagination {
  take: number;
  skip: number;
}
export interface IEventView {
  id: string
  views: number
  likes: number
  comments:number
  shares: number
  title: string
  description: string
  userid: string
  location?: string
  speakers?:string
  file?: string
  link?: string
  startDate?: any
  endDate?:any
  attendees:number
  attended?: string | null
  entrepriseId: string
  publicationId: string
}

const initalState = {
  event:{
    eventMode:null,  
    location: null,
    file:null,         
    link:null,          
    startDate: null,     
    endDate: null,
    speakers : [],
    publication:{
      title:null,
      description:"",
      publicationsOnCommunities : [] ,
      type:PublicationType.Event
      }
    }
  }
export const useEventStore = defineStore("event-store", {
  state: () => {
    return {
      eventList: [] as Array<IEventView>,
      isLoading: false,
      error: null as Object | any,
      event: {...initalState.event,
              publication:{
                ...initalState.event.publication
              },
              speakers : []
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
    async fetchEvents(payload: IPagination) {
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerGetEventsMediaData({
          skip: payload.skip,
          take: payload.take,
        });
        this.eventList = data.paginatedResult;

        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.skip,
          take: payload.take,
        };
        this.error = null;
      } catch (err: any) {
        this.eventList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteEvent(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.eventControllerDelete(payload);
        this.eventList = this.eventList.filter((event) => event.id !== data.id);
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
    async editEvent(id: string ) {
      this.isLoading = true;
      const updatedData = {
          eventMode: this.event.eventMode,
          location: this.event.location,
          startDate : this.event.startDate,
          endDate : this.event.endDate,
          link : this.event.link,
          speakers : this.event.speakers,
          publication:{
            title: this.event.publication.title,
            description : this.event.publication.description,
            publicationsOnCommunities : this.event.publication.publicationsOnCommunities,
          }
        }

      try {
        const { data } = await service.api.eventControllerUpdate(
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
    async getEventById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.eventControllerFindOne(payload);
        const publicationsOnCommunities =
        data && data.publication.publicationsOnCommunities
          ? data.publication.publicationsOnCommunities.map((community) => {
              return community.communityId;
            })
          : undefined;
        const speakers = data.speakers ? data.speakers.split(';') : []
        
        this.event = {...data, speakers, publication:{...data.publication,publicationsOnCommunities}};
        
        this.error = null;
      } catch (err: any) {
        this.event = null;
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createEvent(payload: UserWhereUniqueInput) {
      this.isLoading = true;      
      const publication = {...this.event.publication, user:payload}
      try {
        const { data } = await service.api.eventControllerCreate({...this.event,publication});
       // this.eventList = [...this.eventList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    addEventSpeaker(payload: string) {
      this.event.speakers.push(payload)
    },
    removeEventSpeaker(payload: string) {
      this.event.speakers.splice(this.event.speakers.indexOf(payload),1)
    },
    setEvent(payload:EventCreateInput){
      this.event = {...this.event,...payload}
    },
    resetEvent(){
      this.event ={...initalState.event,
        speakers:[],
        publication:{...initalState.event.publication}
      }      
    },
    async fetchEntrepriseEvents(payload: {pagination:IPagination , entreprise:string}) {
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerGetEventsMediaData({
          skip: payload.pagination.skip,
          take: payload.pagination.take,
          "where[entrepriseId]":`${payload.entreprise}`  
        });
        this.eventList = [...this.eventList,...data.paginatedResult];

        this.pagination.total = data.totalCount;
        this.pagination = {
          ...this.pagination,
          skip: payload.pagination.skip,
          take: payload.pagination.take,
        };
        this.error = null;
      } catch (err: any) {
        this.eventList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async attendEvent(payload: SocialinterractionCreateInput){
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerCreate(
            payload
          );
          this.eventList = this.eventList.map((event) => event.publicationId === data.publication?.id ? {...event, attended: data.id, attendees:event.attendees+1} : event )
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }    
    },
    async missEvent(payload: string){
      this.isLoading = true;
      try {
        const { data } = await service.api.socialinterractionControllerDelete(
          payload
        );
        this.eventList = this.eventList.map((event) => event.publicationId === data.publication?.id ? {...event, attended: null,attendees:event.attendees - 1 } : event )
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    
  },
  },
});
