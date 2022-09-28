<template>
  <div class="drawer_container">
    <el-drawer v-model="showDrawer" size="26%" @closed="$emit('close')" :destroy-on-close="true">
      <div
        class="cover_container"
        :style="{
          background: coverPhoto?  'url('+coverPhoto+')' : 'white',
        }"
      ></div>
      <div class="content_container">
        <el-avatar shape="circle" :size="80"  :src="photo? photo : '/svg/inscription/pdp.svg'" />
        <div class="mt-2">
          <h4> {{firstName}} {{lastName}} </h4>
          <div class="mt-1 job_container">{{wantedPost}}</div>
          <div class="mt-1 address_container">{{address}}</div>
        </div>
        <div v-if="bio" class="mt-6">
          <h4>{{$t('talentManagement.profileDrawer.bio')}}</h4>
          <div class="mt-2">
            {{ bio }}
          </div>
        </div>
      <div>
        <div v-if="mediaLink || personalCv" class="mt-10 resume_section">
          <profileResumeCard style="cursor: pointer;" @click="mediaLinkVisible = true" v-if="mediaLink" type="video" :title="$t('talentManagement.profileDrawer.resumeCard.resumeVideo')" :mediaSrc="mediaLink"></profileResumeCard>
          <profileResumeCard style="cursor: pointer;" @click="personalCvVisible = true" v-if="personalCv" type="pdf" :title="$t('talentManagement.profileDrawer.resumeCard.resumeDocument')" :mediaSrc="personalCv"></profileResumeCard>
        </div>
      </div>
      </div>
        <div>
          <h5 class="mb-8">{{$t('talentManagement.profileDrawer.features')}}</h5>
          <div class="feature_section">
            <profileFeatureCard></profileFeatureCard>
            <profileFeatureCard></profileFeatureCard>
          </div>
        </div>
    </el-drawer>
    <div class="video_cv_container" >
          <el-dialog
            :show-close="false"
            destroy-on-close
            v-model="mediaLinkVisible"
            width="55%"
            @close="mediaLinkVisible = false"
          >
            <iframe :src="mediaLink" width="100%" height="500px" style="border-radius: 10px"></iframe>
          </el-dialog>
        </div>
    <div class="text_cv_container">
          <el-dialog
            v-model="personalCvVisible"
            width="30%"
            @close="personalCvVisible = false"
          >
            <iframe
              :src="personalCv + '#toolbar=0'"
              width="100%"
              height="680px"
              style="border-radius: 10px"
            ></iframe>
          </el-dialog>
        </div>  
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import profileResumeCard from "./profileResumeCard.vue";
import profileFeatureCard from "./profileFeatureCard.vue";
export default defineComponent({
  name: "ProfileDrawer",
  components: {profileResumeCard, profileFeatureCard},
  props: {
    coverPhoto: { type: String },
    photo: { type: String},
    imageData: { type: String, default: 'https://source.unsplash.com/user/c_v_r'},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true  },
    wantedPost: { type: String, required: true },
    address: { type: String },
    bio: { type: String },
    personalCv: { type: String, default: 'https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf' },
    mediaLink: { type: String },
    showDrawer: { type: Boolean, default: false, required: true },
    destroyOnClose: { type: Boolean, default: true, required: true },
  },
  setup() {
    const personalCvVisible = ref(false);
    const mediaLinkVisible = ref(false);
    return { personalCvVisible, mediaLinkVisible };
  },
});
</script>
<style lang="scss" scoped>
:deep(.el-drawer) {
  background-color: $bg-dark-700;
  color: white;
}
:deep(.el-drawer__header) {
  margin-bottom: 20px !important;
  height: 30px;
}
:deep(.el-drawer__close-btn) {
  position: absolute;
  background: #ffffff6e;
  color: $text-color-info-800;
  border-radius: 50%;
  width: auto;
  height: auto;
  font-size: 15px;
}
:deep(.el-drawer__close-btn .el-icon) {
  vertical-align: middle;
}
:deep(.el-drawer__body) {
  padding-top: 0%;
  padding-bottom: 0%;
}
.cover_container {
  width: 100%;
  height: 118px;
  right: 0px;
  top: 0px;
  border-radius: 5px;
}
.content_container {
  margin: 10px;
  margin-bottom: 0%;
  transform: translateY(-45px);
}
.resume_section{
    display: flex;
    gap: 1rem;
  }
.feature_section{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

@media (max-width: 1440px) {
  :deep(.el-drawer){
    width:30% !important;
  }  
  .text_cv_container,.video_cv_container{
    :deep(.el-dialog){
      width:33% !important;
    }
  }
}
@media (max-width: 1280px) {
  :deep(.el-drawer){
    width:35% !important;
  }
  .text_cv_container,.video_cv_container{
    :deep(.el-dialog){
      width:45% !important;
    }
  }
}
@media (max-width: 1024px) {
  :deep(.el-drawer){
    width:45% !important;
  }
  .text_cv_container,.video_cv_container{
    :deep(.el-dialog){
      width:50% !important;
    }
  }

}
@media (max-width: 800px) {
 /*  .resume_section{
    display: block
  } */
  :deep(.el-drawer){
    width:55% !important;
  }
  .text_cv_container,.video_cv_container{
    :deep(.el-dialog){
      width:66% !important;
    }
  }
}
.job_container{
  color: $text-color-100;
  font-size: 14px;
  font-weight: 500;
}
.address_container{
  color:$text-color-placeholder;
  font-size: 14px;
}
.drawer_container{
  font-size: 14px;
}
.text_cv_container {
  :deep(.el-dialog__body) {
    padding: 0;
  }
  :deep(.el-dialog) {
    background: transparent !important;
  }
  :deep(.el-dialog__header) {
    padding: 0;
    background-color: #000000cc;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 30px;
  }
  :deep(.el-dialog__headerbtn) {
    top: 5px;
    width: 24px;
    height: 24px;
    z-index: 2;
  }
  :deep(.el-dialog__headerbtn .el-dialog__close) {
    color: #ffffff;
  }
}
.video_cv_container {
  :deep(.el-dialog__body) {
    padding: 0;
  }
  :deep(.el-dialog) {
    background: transparent !important;
  }
  :deep(.el-dialog__header) {
    padding: 0;
  }
}
</style>
