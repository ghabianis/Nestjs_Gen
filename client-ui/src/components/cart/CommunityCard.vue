<template>
  <div @click="handelClick" :class="isSolo?'community-card-solo__container p-3':'d-flex p-3 community-card__container'">
    <div>
      <img :class="isSolo?'community-card-solo__image_community':'image_community'" src="/png/communityTestImg.png" />
    </div>
    <div :class="isSolo?'ms-4 d-flex flex-column align-items-center community-card-solo__center_element':'ms-4 d-flex flex-column justify-content-center'">
      <span :class="isSolo?'community-card-solo__name':'community-card__name'">{{userCommunity?.community?.name}}</span>
      <div class="d-flex align-items-center">
        <Connections
          width="15"
          :connections="[
            '/png/avatarProfileTest.png',
            '/png/avatarProfileTest.png',
            '/png/avatarProfileTest.png',
            '/png/avatarProfileTest.png',
            '/png/avatarProfileTest.png',
          ]"
        />
        <span class="ms-1 fs-9 fw-bolder">+ {{userCommunity?.community?.usersOnCommunities?.length}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Community, EntreprisesOnCommunity ,userCommunity} from "index";
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import Connections from "../shared/Connections/Connections.vue";
export default defineComponent({
  components: { Connections },
  props: {
    userCommunity: {
      type: Object as PropType<userCommunity>,
      required: false,
    },
    isSolo:{
        type:Boolean,
        default: true
    },
    isCandidate:{
      type:Boolean,
      default:false
    }
    
  },
  setup(props) {
    const router = useRouter();
    const handelClick= () =>{
      if(props.isCandidate){
        router.push({ name: "home-community-posts", params: { id:  props?.userCommunity?.community?.id}});}
      else{
        router.push({ name: "community-id", params: { id:  props?.userCommunity?.community?.id}});}
    
      }
    
      return {handelClick}
  },
});
</script>
<style scoped lang="scss">
.image_community {
  width: 70px;
  height: 70px;
}
.community-card-solo__{
    &container {
      @media screen and (min-width: 600px) {
      
    flex-direction: column;
    margin-right: 10px;
      }

 
    display: flex;
    align-items: center;
    background: $bg-dark-600;
    border-radius: 7.54854px
    }
    &image_community{
       @media screen and (min-width: 600px) {
        height: 200px;
        width:200px;
        text-align: center;
      }
    
    }
    &center_element{
      @media screen and (max-width: 600px) {
        margin-left: auto !important;
    margin-right: auto;
      }
        
    }
    &name{
       @media screen and (min-width: 600px) {
        color: $text-color-50;
        font-size: 500;
        width:200px;
        text-align: center;
      }
     
    }
    
}
.community-card__ {
  &container {
    background: $bg-dark-600;
    border-radius: 7.54854px;
  }
  &name {
    color: $text-color-50;
    font-size: 500;
  }
}
</style>