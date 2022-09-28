<template>
  <div class="w-100 community-posts__container">
    <div>
        <img
          class="community-posts__image "
          src="/png/communityTestCover.png"
        />
      <div class="d-flex justify-content-between p-4 community-posts__header">
        <div class="d-flex gap-5 community-posts__header-media">
          <img
            class="community-posts__image_profile"
            src="/png/communityTestImg.png"
          />
        </div>
        <div class="d-flex align-self-start followers">
          <Connections
            width="22"
            :connections="[
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
            ]"
          />
          <span class="ms-3 ">{{pagination.total?._count?._all}} Connection work here</span>
        </div>
      </div>
      <div class="p-4 pb-14 community-posts__body">
        <span class="fw-bolder fs-1 text-capitalize"
          >{{(usersoncommunityList[0]?.community?.name)?.toLowerCase()}}</span
        >
        <div class="mt-2">
          <span
            >{{capitalizeFirstLetter(usersoncommunityList[0]?.community?.descriptionFiled)?capitalizeFirstLetter(usersoncommunityList[0]?.community?.descriptionFiled):""}}</span
          >
        </div>
        <div>
          <span class="placeholder-color">{{capitalizeFirstLetter(usersoncommunityList[0]?.community?.activityField)?capitalizeFirstLetter(usersoncommunityList[0]?.community?.activityField):""}}</span>
          <div class="d-flex align-self-start followers-mobile">
          <Connections
            width="22"
            :connections="[
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
              '/png/avatarProfileTest.png',
            ]"
          />
          <span class="ms-3 ">200 Connection work here</span>
        </div>
        </div>
        <div class="community-posts__input-post-container d-flex  flex-column gap-1 ">
    
          <div class="d-flex gap-5 col-12">
            <img class="community-posts__user-profile-img col-2" src="/png/user_profile_img.png" />
            <div class="d-flex flex-direction-column gap-7 col-10">
                <input
                type="button"
                @click="showModal"
              class="community-posts__input-post text-left"
              value="Start a post ..."
            />
           </div>
           </div>
        
          <div class="community-posts__input-post-footer offset-1 ">
            <img src="/svg/communityPosts/photo_icon.svg" />
            <span>Photo</span>
            <img src="/svg/communityPosts/video_icon.svg">
            <span>Video</span>
            <img src="/svg/communityPosts/file_icon.svg" />
            <span>File</span>
          </div>
          
            
            
          </div>
        
        
      </div>
    </div>
      <PostModal :isShow="isShow" @close-modal="closeModal"/>
  </div>
</template>
<script lang="ts">
import { defineComponent , ref,onMounted} from "vue";
import Connections from "../Connections/Connections.vue";
import { storeToRefs } from "pinia";
import { capitalizeFirstLetter } from "@/core/helpers/string";
import { useUsersOnCommunityStore } from "@/store/useUsersOnCommunityModule";
import PostModal from '@/components/modals/PostModal.vue'
import { useAuthStore } from "@/store/useAuth";
import { useRoute } from 'vue-router'
export default defineComponent({
  components: { Connections ,PostModal},
  setup() {
const {currentUser} = storeToRefs(useAuthStore())        
            const route = useRoute()
        const id = route.params.id as string
    const { fetchUsersOnCommunities } = useUsersOnCommunityStore();
     const {usersoncommunityList,pagination} = storeToRefs(useUsersOnCommunityStore());
    const isShow = ref(false);

    function showModal() {
      console.log(isShow,"this.isshow");
      
      isShow.value = true;
    }
    function closeModal(){
      isShow.value=false
    }
     onMounted(async () => {
      await fetchUsersOnCommunities({communityId:id,pagination: {
                    skip:0,
                    take: 2
                }})
    }),
    console.log(usersoncommunityList,'usersoncommunityListusersoncommunityList');
    ;
return {
      isShow,
      showModal,
      usersoncommunityList,
      pagination,
      capitalizeFirstLetter,
      closeModal
    };
  },
});
</script>

<style scoped lang="scss">
.followers-mobile{
  margin-top: 5px;
 @media   (min-width :820px) {
    display: none !important;
    
  }
}
.followers{
  @media   (max-width :820px) {
    display: none !important;
    
  }
}
.community-posts {
&__input-post-container{
    padding: 29px 59px 30px 24px;
    margin-top: 20px;
    background: #1E2027;
    border: 1px solid rgba(255, 255, 255, 0.03);
    border-radius: 5px;
}
  &__input-post-footer{
  margin-left: 73px;
  display: flex;
  align-items: center;
  span,
  label {
    font-size: 12px;
    color: #e9ecef;
    margin-right: 30px;
    cursor: pointer;
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    cursor: pointer;
  }
  }
  &__input-post{

          width: 100%;
  height: 42px;
  text-align: left;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 5px;
  padding: 12px 20px 12px 13px;
  color: #B5B5C3;
  outline: none;
  cursor: pointer;
  border: none;
  caret-color: transparent;
    }
  &__user-profile-img { 
  width: 47px;
  height: 47px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 10px;
}
  
  &__image_profile {
   
   @media (max-width :887px) {
    width: 88%;
   }
  }
  &__container {
    border-radius: 5px;
  }
  &__header {
    @media  screen and (min-width:400px) {
      background: $bg-dark-700;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-top: none;
    }
    
  }
  &__image {
    width: 100%;
    margin-bottom: -1px;
    border-radius: 7.19298px;
    
    
  }
  &__subs {
    @media (max-width: 310px) {
      font-size: 9px;
    }
  }
  &__header-media {
    position: relative;
    bottom: 50px;
    display: flex;
    align-items: flex-start;
  }
  &__body {
    position: relative;
    bottom: 61px;
    margin-bottom: -186px;
    background: $bg-dark-700;
    border: 1px solid rgba(255, 255, 255, 0.11);
    border-top: none;
    border-radius: 5px;
  }
  &__name {
    color: $text-color-10;
  }
  &__description {
    color: $text-color-10;
  }
  &__message-icon {
    width: fit-content;
    border-radius: 50%;
    padding: 8px;
    background: $primary-500;
    box-shadow: 0px 0px 33px rgba(203, 101, 189, 0.3);
  }
  &__follow-btn {
    color: $primary-500;
    background: transparent;
    border-color: $primary-500;
  }
  &__website {
    color: $primary-500;
  }
  &__footer {
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: start !important;
      align-items: start !important;
    }
  }
}
:deep(.el-tabs__nav-prev) {
  display: none;
}
:deep(.el-tabs__nav-next) {
  display: none;
}
:deep(.el-tabs__nav-wrap.is-scrollable) {
  padding: 0px;
}
:deep(.el-tabs__nav-scroll) {
  overflow: scroll;
}
:deep(.el-tabs__nav-scroll)::-webkit-scrollbar {
  display: none;
}
:deep(.el-tabs__nav-wrap):after {
  content: none !important;
  display: none !important;
}
:deep(.el-tabs__active-bar) {
  display: none;
}
:deep(.el-tabs__item.is-active) {
  color: $info-300;
  background: $white-transparent-11;
  border-radius: 5px;
}
:deep(.el-tabs__item) {
  color: $info-300;
  padding: 0 20px !important;
}
:deep(.el-tabs__header) {
  margin: 0px;
}
.placeholder-color {
  color: $text-color-placeholder;
}

:deep(.el-tabs__nav-scroll) {
  width: 100%;
  padding: 15px 20px;
  background: rgba($white, 0.02);
  box-shadow: inset 0px 0px 4.59193px rgba($white, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 5px;
  margin-bottom: 10px;
}
:deep(.el-tabs__item) ~ #tab-4 {
  display: none;
}
:deep(.el-tabs__item) ~ #tab-5 {
  display: none;
}
@media (max-width: 1000px) {
  :deep(.el-tabs__item) ~ #tab-4 {
    display: inline-flex;
  }
  :deep(.el-tabs__item) ~ #tab-5 {
    display: inline-flex;
  }
}
</style>
