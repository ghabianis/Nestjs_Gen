import {
    CategoryUpdateInput,
    CategoryCreateInput,
    CommunityPosts,
    CommunityPostsWhereUniqueInput,
  } from "./../../index";
  import { defineStore } from "pinia";
  import service from "@/service";
  import { useFollowEntrepriseStore } from "@/store/useFollowEntrepriseModule";
  import { supabase } from "@/core/services/SupabaseClientService";
import { PostgrestResponse } from "@supabase/supabase-js";
import { LogarithmicScale } from "chart.js";
  
  interface IPagination {
    from: number ;
    to: number ;
    take:number;
  }
  export const useCommunityPosts = defineStore("community-posts", {
    state: () => {
      return {
        searchInput: "",
        inputChange: false,
        postList: [] as CommunityPosts[] | null,
        paginationEnd: false,
        isLoading: false,
        error: null as Object | any,
        pagination: {
          from: 0,
          to: 1,
          take: 1,
        },
      };
    },
  
    getters: {},
  
    actions: {
      async getPost(payload:{ communityId: string; pagination:IPagination,inputChange:boolean,addPost:boolean}){
        this.isLoading = true;
        this.inputChange = payload.inputChange;
        console.log(payload, "paylog getPost");
        console.log(this.searchInput, "this.searchInput");
        console.log(
          this.searchInput !== "",
          "this.searchInput!==&& this.inputChange)"
        );

        if (this.searchInput !== "" && this.inputChange) {
          this.postList = [];
        }

        try {
          const response = await supabase
            .from<CommunityPosts>("CommunityPosts")
            .select("*")
            .eq("communityId", payload.communityId)
            .like("description", `%${this.searchInput}%`)
            .order("createdAt", { ascending: false })
            .range(payload?.pagination?.from?payload?.pagination?.from:0, payload?.pagination?.to?payload?.pagination?.to:this?.pagination?.to);
          console.log(
            (response.data || []).length <= this.pagination.take,
            "(response.data||[]).length<=this.pagination.take"
          );
          console.log(
            (response.data || []).length <= this.pagination.take,
            "(response.data||[]).length<=this.pagination.take"
          );
          console.log(this.pagination.take, "this.pagination.take");
          console.log(response.data, "response.data");

          if ((response.data || []).length <= this.pagination.take) {
            this.paginationEnd = true;
          }
          if (!payload.addPost) {
            this.postList = [
              ...(this.postList || []),
              ...(response.data || []),
            ];
          } else {
            if (response.data !== null)
              this.postList = [response.data[0], ...(this.postList || [])];
          }

          console.log(this.postList, "this.postList");
          this.pagination = {
            ...this.pagination,
            from: payload?.pagination?.from?payload.pagination.from:this.pagination.from,
            to: payload?.pagination?.to?payload.pagination.to:this.pagination.to,
          };
          this.error = null;
        } catch (err: any) {
          console.log(payload.communityId, "communityId");
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
          this.isLoading = false;
        } finally {
          this.isLoading = false;
        }
      },
      async fetchPosts(payload:{ where?: CommunityPostsWhereUniqueInput; skip?: number; take?: number }) {
        this.isLoading = true;
        try {
          const { data } = await service.api.communityControllerGetCommunityPosts(payload);
          this.postList = data.paginatedResult
          // this.pagination.total=data.totalCount
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
      followerPost(id:string,isfollower:boolean){
        const  {followentrepriseList} = useFollowEntrepriseStore()
        console.log(followentrepriseList,"useFollowEntrepriseStore");
        const followenentrepriseId=followentrepriseList.find((followentreprise)=>{return followentreprise?.entreprise?.id===id})
        this.postList=this.postList?.map((post)=> post.entrepriseId===id?{...post,isfollower:isfollower?0:1,followentrepriseId:isfollower?null:followenentrepriseId?.id}:post)
        console.log(this.postList,"this.postList");
        
      },
      async likePost(payload: SocialinterractionCreateInput) {
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerCreate(
            payload
          );
          console.log(data,"dataInterraction");
          this.postList = this.postList.map((post) => post.publicationId === data.publication?.id ? {...post, islike: 1, likes:post.likes+1,socialinterractionId:data.id} : post )
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },  
      async dislikePost(payload: string) {
        this.isLoading = true;
        try {
          const { data } = await service.api.socialinterractionControllerDelete(
            payload
          );
          this.postList = this.postList.map((post) => post.publicationId === data.publication?.id ? {...post, islike: 0,likes:post.likes - 1 } : post )
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
    },
  });
  