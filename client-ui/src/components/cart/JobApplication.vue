<template>
    <div class="p-5 cursor-pointer job-application" :draggable="!mediaLinkVisible"  @dragstart="handleDragStart($event,application.feedbackstatus)">
        <div class="d-flex gap-5 py-4 job-application__header">
            <div class="d-flex align-items-start gap-5 ">
                <img :src="application.photo"  class="job-application__img"/>
                <div class="d-flex flex-column">
                    <div class="fw-bolder fs-4 job-application__name">
                        {{userName}}
                    </div>
                    <div >
                        {{application.job}}
                    </div>
                    <div >
                        {{application.email}}
                    </div>
                </div>
            </div>
            <div v-if="application.isFavourite">
                <inline-svg src="/svg/icons/JobApplication/applyStar.svg"> </inline-svg>
            </div>
        </div>
        <div class="d-flex justify-content-between py-5 job-application__body">
            <div class="d-flex gap-2 align-items-center" @click="mediaLinkVisible = true">
                <inline-svg src="/svg/icons/JobApplication/watchCv.svg"> </inline-svg>
                <div> {{$t("jobApplication.watchCv")}}</div>
                <div class="p-0 m-0  video_cv_container"  >
                    <el-dialog
                        :show-close="false"
                        v-model="mediaLinkVisible"
                        width="55%"
                        custom-class="video-dialog__class"
                    >
                        <video controls style="width:100%; object-fit:cover; border-radius: 10px" height="500">
                            <source type="video/mp4" :src="application.mediaLink" />
                        </video>
                    </el-dialog>
                </div>
            </div>
            
            <div class="d-flex gap-2 align-items-center"  @click="personalCvVisible = true">
                <inline-svg src="/svg/icons/JobApplication/applyDocument.svg"> </inline-svg>
                <div> {{$t("jobApplication.readCv")}}</div>
                <div class="text_cv_container">
                    <el-dialog
                        v-model="personalCvVisible"
                        width="30%"
                    >
                        <iframe
                        width="100%"
                        height="680px"
                        style="border-radius: 10px"
                        :src="application.personalCv"
                        ></iframe>
                    </el-dialog>
                </div>
            </div>
            <div class="d-flex gap-2 align-items-center">
                <inline-svg src="/svg/icons/JobApplication/applyContact.svg"> </inline-svg>
                <div> {{$t("jobApplication.contact")}}</div>
            </div>
        </div>
        
        <div class="d-flex justify-content-between py-4 pb-1 px-2 job-application__footer">
          <div class="d-flex gap-2 align-items-center"> <inline-svg src="/svg/icons/JobApplication/applyShare.svg"> </inline-svg> <div> {{application.shares}}</div> </div>
          <div class="d-flex gap-2 align-items-center"> <inline-svg src="/svg/icons/JobApplication/commentApplication.svg"> </inline-svg> <div> {{application.comments}}</div> </div>
          <div class="d-flex gap-2 align-items-center"> <inline-svg src="/svg/icons/JobApplication/applyLike.svg"> </inline-svg> <div> {{application.likes}}</div> </div>
        </div>
        
    </div>
</template>
<script lang="ts">
import {  IApplication } from '@/store/useFeedbackModule'
import { defineComponent, PropType, computed, ref} from 'vue'
import { t } from "@/core/i18n/translate";

export default defineComponent({
    props:{
        application:{
            type: Object as PropType<IApplication>,
            required:true
        }
    },
    setup(props) {
        const userName = computed(()=>{
            return props.application.firstName + ' ' + props.application.lastName
        })
        const handleDragStart = (event : DragEvent, status:string) => {
            if(event.dataTransfer){
                event.dataTransfer.dropEffect = "move"
                event.dataTransfer.effectAllowed="move"
                event.dataTransfer.setData('feedback',JSON.stringify(props.application))
                event.dataTransfer.setData('feedbackOldStatue',status)
            }
         }
        const mediaLinkVisible = ref(false)
        const personalCvVisible = ref(false)
      return {userName, handleDragStart, mediaLinkVisible, personalCvVisible}
    }
})
</script>
<style lang="scss" scoped>
    .job-application {
        background:$bg-dark-600 ;
        border-radius: 10px;
        overflow-wrap: anywhere;
        &__img {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            min-width: 46px;
            min-height: 46px;

        }
        &__header {
            border-bottom: 1px solid $white-transparent-11;
            color: $text-color-info-200;
        }
        &__body {

            border-bottom: 1px solid $white-transparent-11;
            color: $text-color-100;
        }
        &__footer {
           color: $text-color-100;
        }
        &__name {
           color: $text-color-50;  
        }
    }
    :deep(.el-dialog__header) {
        padding: 0;
        
    }
    :deep(.el-dialog__body) {
        padding: 0;


    }
    :deep(.el-dialog__footer) {
        padding: 0;
    }
    :deep(.video-dialog__class){
        background: none!important;
    }

    .text_cv_container {
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
</style>