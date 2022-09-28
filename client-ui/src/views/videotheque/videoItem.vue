<template>
      <div class="card d-flex flex-column  mw-300px w-100 h-350px radius-10 p-1 video-item__container " >
        <div class="d-flex flex-column p-3" >
          <img :src="src" class=""/>
        </div>
        <div class="flex-grow-1 d-flex align-items-center justify-content-center">
          <h4 class="m-1 fs-1 fw-bolder">{{description}}</h4>
        </div>
      </div>
</template>

<script lang="ts">

import {defineComponent } from "vue";
export default defineComponent({
    
    props: {
      src: {
        type: String,
        required: true        
      },
      description: {
             type: String,
        required: true    
      }
    },

});
</script>

<style lang="scss">
 .video-item__container{
    background: $bg-dark-600;
    box-shadow: 0px 0px 2px $shadow-card-color;
    &:hover {
      cursor: pointer;
    }


 } 
</style>