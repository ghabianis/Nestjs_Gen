<template>
  <div class=" p-8 bar d-flex justify-content-between align-items-center w-100 h-200px radius-10 ">
    <div class=" p-1 gap-3 h-100 video-toolbar__body">
      <div>
        <h1 class=" fw-600" style="font-size: 40px;">{{title}}</h1>
        <p class="video-toolbar__description">{{ description }}</p>
      </div>
      <div>
         <button v-if='button' class="btn d-flex justify-content-center" @click="handleAddClick" >{{button}}</button>
      </div>
    </div>
    <div class="h-100 mb-5 video-toolbar__image">
      <img src="./background.svg" />
    </div>
    
  </div>
</template>
<script lang="ts">
import { t } from "@/core/i18n/translate";
import { setModal } from "@/core/helpers/config";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    src: {
      type: String,
      required: false
    },
    button: {
      type: String,
      required: false
    }
  },
  name: "form",
  setup(){
    const handleAddClick = () => {
      setModal("VideoCreate",{type:""})
    }

    return {handleAddClick}
  }
});
</script>

<style lang="scss" scoped>
.radius-10{
  border-radius: 10px;
}
.bar {
  background-color:  $bg-dark-600;
  width: 100%;
  color: $white;
}
p {
  color: #bcbec2;
}
.left {
  width: 43%;
}
.right {
  width: 60%;
}
.btn{
    background: $bg-dark-500;
    font-size: 15px;
    outline:none;
    
}
.video-toolbar__description{
  color:$white;
}
 @media(max-width: 1100px){
  .video-toolbar__body{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  }
  .video-toolbar__image {
    display: none;
  }
  .imgclass{
    display: none;
  }
}

</style>
