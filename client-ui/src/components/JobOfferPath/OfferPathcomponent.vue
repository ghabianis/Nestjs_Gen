<template>
  <div class="offerPath-container">
    <div class="p-6 offerPath-header">
      <h3 class="m-0">Parcours d'offre</h3>
      <inline-svg src="/svg/icons/infoIcon.svg" />
    </div>
    <div class="offerPath-content">
      <el-tabs stretch  v-model="offerType">
        <el-tab-pane name="classic">
          <template #label>
            <span class="custom-tabs-label">
              <inline-svg src="/svg/icons/bookmarkIcon.svg" />
              <span>Classique</span>
            </span>
          </template>
          <div class="d-flex justify-content-center px-3 pb-9 ">
            <OfferPathForm/>
          </div>
        </el-tab-pane>
        <el-tab-pane id="media-pane" name="media">
          <template #label>
            <span class="custom-tabs-label">
              <inline-svg
                src="/svg/icons/playmediaIcon.svg"
                class="play-media"
              />
              <span>Media</span>
            </span>
          </template>
          <div class="d-flex gap-4 flex-wrap justify-content-center" >
          <div class="upload-wrapper">
            <h6>1</h6>
            <UploadVideo text="Question 1: Parler de rémunération." />
          </div>
          <div class="upload-wrapper">
            <h6>2</h6>
            <UploadVideo text="Question 2: Parler de la mission" />
          </div>
          <div class="upload-wrapper">
            <h6>3</h6>
            <UploadVideo text="Question 3: Parler de la culture d'entreprise"/>
          </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import UploadVideo from "@/components/JobOfferPath/UploadVideo.vue";
import OfferPathForm from "@/components/forms/OfferPathForm.vue";
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { defineComponent, ref } from 'vue'
import { usePublicationStore } from "@/store/usePublicationModule";
import { storeToRefs } from "pinia";
export default defineComponent({
  components: { UploadVideo, OfferPathForm, DiscardDraftVue },
  props:{
    isEdit : {
      required: true,
      type: Boolean
    }
  },
  setup(props){
    const {publication} = storeToRefs(usePublicationStore())
    const offerType = ref('media')
    return{ publication,offerType}
  }
});
</script>

<style lang="scss" scoped>
.offerPath-container {
  background-color: $bg-dark-600;
  border-radius: 10px;
  overflow: hidden;
  animation: tabs-anim 1s ease 0s 1 normal forwards;
  height: 100%;
  box-shadow:0px 0px 2px #6a7199;

  .offerPath-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $white-transparent-11;
  }
}
#media-pane {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px;
  justify-content: center;
  .upload-wrapper {
    align-content: center;
    
    h6 {
      padding: 5px 8.5px;
      margin:20px  auto;
      width: 25px;
      height: 25px;
      background-color: $gray-500;
      border-radius: 50%;
    }
  }
}
:deep(.el-tabs__content) {
  transition: height 5s ease;
}
:deep(.el-tabs__nav-scroll) {
  border: none;
  margin-top: 25px;
}
:deep(.el-tabs__nav-wrap:after) {
  position: initial;
}
:deep(.el-tabs__item) {
  &:not(.is-active) {
    &:hover {
      background: linear-gradient(90deg, $bg-dark-600 5%, $primary-500 82%);
      opacity: 0.7;
      transform: translateX(7px);
    }
    &:last-child {
      &:hover {
        background: linear-gradient(280deg, $bg-dark-600 5%, $primary-500 82%);
        opacity: 0.7;
        transform: translateX(-7px);
      }
    }
  }
}
:deep(.el-tabs__item.is-active) {
  background-color: $primary-500;
  flex: 2;
  animation: isActiveAnim1 1s ease 0s 1 normal forwards;
  border-radius: 0 10px 10px 0;
  &:last-child {
    animation: isActiveAnim2 1s ease 0s 1 normal forwards;
    border-radius: 10px 0 0 10px;
  }
   & span {
    color: $text-color-250;
  }
}
:deep(.el-tab-pane) {
  overflow: visible;
  animation: tabs-anim 1s ease 0s 1 normal forwards;
}
:deep(.el-tabs__active-bar) {
  display: none;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 10px;
  color: white;
}
.play-media {
  animation: playanim 2s ease 0s infinite normal forwards;
}
/*   animations  */

@keyframes playanim {
  0% {
    animation-timing-function: ease-in;
    transform: scale(0.91);
    transform-origin: center center;
    border: none;
  }
  33% {
    animation-timing-function: ease-out;
    transform: scale(1);
    border: none;
    border: 0.1px double $primary;
    overflow: hidden;
    border-radius: 50%;
  }

  100% {
    animation-timing-function: ease-in;
    transform: scale(1.4);
    color: $primary;
    border: 0.1px double $primary-inverse;
    padding: 3px;
    border-radius: 50%;
    overflow: hidden;
  }
}

@keyframes isActiveAnim1 {
  0% {
    animation-timing-function: ease-in;
    transform: translateX(-48px);
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateX(-10px);
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    animation-timing-function: ease-out;
    transform: translateX(0px);
  }

  100% {
    animation-timing-function: ease-out;

    transform: translateX(0px);
  }
}

@keyframes isActiveAnim2 {
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateX(48px);
  }

  24% {
    opacity: 1;
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateX(10px);
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    animation-timing-function: ease-out;
    transform: translateX(0px);
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes tabs-anim {
  0% {
    animation-timing-function: ease-in;
    transform: translateY(0px);
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(2px);
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    animation-timing-function: ease-out;
    transform: translateY(4px);
  }

  100% {
    animation-timing-function: ease-out;
    transform: translateY(4px);
  }
}
</style>
