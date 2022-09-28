<template >
  <div class="video">
     <audio
          autoplay
          loop
          controls
          :src="src" 
          style="display: none; "
        >
    </audio>
      <video   id="background-video" autoplay loop muted playsinline="true">
          <source 
          :src="src" 
           type="video/mp4">
      </video> 
  </div>
</template>
<script >
import {  defineComponent  } from "vue";

export default defineComponent({
    
    props: {
      src: {
        type: String,
        required: true
      },
    },

});
</script>
<style>
.video {
  position: fixed;
  top: 0;
  height: 100%;
}
#background-video {
  width: 100%;
  height: 100%;
}

</style>
