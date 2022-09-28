<template>
  <div class="upload-container">
    <div class="upload-section" :style="isUploaded ? bg_style : ''">
      <div class="uploded-icons" v-if="isUploaded">
        <inline-svg
          src="/svg/icons/UploadVideoIcons/galleryIcon.svg"
          @click="changeOpacity"
        />
        <inline-svg
          src="/svg/icons/UploadVideoIcons/deleteIcon.svg"
          @click="resetUpload"
        />
      </div>
      <div v-if="!baseUpload"  @click="baseUpload = true">
       <div class="upload-base"  :class="{hidden: isHidden }">
         <inline-svg src="/svg/icons/UploadVideoIcons/playVideoIcon.svg" />
        <p>Ajouter video</p>
       </div>
      </div>
      <div v-if="baseUpload" class="upload-options">
        <div class="option" @click="uploadFromLocal">
          <inline-svg src="/svg/icons/UploadVideoIcons/uploadIcon.svg" />

          <span>Importer</span>
        </div>
        <div class="option" @click="uploadfromCamera">
          <inline-svg src="/svg/icons/UploadVideoIcons/cameraIcon.svg" />
          <span>Caméra</span>
        </div>
        <div class="option" @click="uploadfromRecents">
          <inline-svg src="/svg/icons/UploadVideoIcons/recentsIcon.svg" />

          <span>Récents</span>
        </div>
      </div>
    </div>
    <div class="fs-4 upload-question" @click="baseUpload = false">
      {{text}}
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  props: {
    text:{
      type: String,
      required: true
    }
  },
  setup() {
    const baseUpload = ref(false);
    const isUploaded = ref(false);
    const isHidden= ref(false);
    const Opacity = ref(0.5);
    const resetUpload =()=>{
      Opacity.value = 0.5 ;
      isUploaded.value = false;
      isHidden.value = false;
    }
    const changeOpacity =()=>{
      Opacity.value = 1;
      baseUpload.value = !baseUpload;
      isHidden.value = true;
    };
        const uploadFromLocal = () => {
      isUploaded.value = true;
      baseUpload.value = false;
    }; 

    const uploadfromCamera=()=>{
      console.log("new video from caméra")
    }
    const uploadfromRecents=()=>{
      console.log("upload from récent vidéos")
    }


    const bg_style = computed(() => {
      return {
        "background-image": "url(/png/UploadTest.png)",
        "background-size": "cover",
        opacity: Opacity.value,
      };
    });

    return {
      baseUpload,
      isUploaded,
      bg_style,
      uploadFromLocal,
      Opacity,
      resetUpload,
      changeOpacity,
      isHidden,
      uploadfromCamera,
      uploadfromRecents
    };
  },
};
</script>

<style lang="scss" scoped>
.upload-container {
  max-width: 250px;
  height: 250px;
  background-color: $white-gradient-9-7;
  border-radius: 10px;
  box-shadow: 0px 0px 2px $shadow-card-color;
  .upload-section {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70%;
    border: 1px dashed $white-transparent-11;
    border-radius: 10px;
    background-color: $white-transparent-11;
  .uploded-icons {
      position: absolute;
      display: flex;
      justify-content: space-around;
      top: 0;
      right: 0;
      width: 80px;
      padding: 5px;
    }
    .upload-base {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .upload-options {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 15px;
      align-items: center;
      .option {
        display: flex;
        align-self: center;
        align-items: center;
        height: 30px;
        width: 70%;
        background-color: $bg-dark-300;
        justify-content: space-evenly;
        border-radius: 15px;
        cursor: pointer; 
        border: 0.5px dashed $bg-dark-100;
        border-radius: 6px;
      }
    }
  }
  .upload-question {
    padding: 10px;
    font-family: Poppins;
    font-weight: 600;
    color: $text-color-50;
  }
}
.hidden{
  visibility: hidden;
}
</style>
