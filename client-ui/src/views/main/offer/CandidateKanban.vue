<template>
    <el-card shadow="never" class="card w-100 mt-5 candidate-kanban__main-container" :body-style="{padding:'0'}">
        <div class="d-flex justify-content-between align-items-center p-8 candidate-kanban__header" >
            <div class="d-flex align-items-center gap-8 fs-5 fw-bolder">
                <div>
                    <inline-svg src="/svg/icons/candidate/like.svg"></inline-svg>
                    <span class="mx-2">{{offer?.likes}}</span> 
                    <span class="interraction">{{$t("applicationKanban.likes")}}</span>
                </div>
                <div>
                    <inline-svg src="/svg/icons/candidate/comment.svg"></inline-svg>
                    <span class="mx-2">{{offer?.comments}}</span>
                    <span class="interraction">{{$t("applicationKanban.comments")}}</span>
                </div>
                <div>
                    <inline-svg src="/svg/icons/candidate/share.svg"></inline-svg>
                    <span class="mx-2">{{offer?.shares}}</span>
                    <span class="interraction">{{$t("applicationKanban.shares")}}</span>
                </div>
                <div>
                    <inline-svg style="width:24px;height:12px;" src="/svg/people.svg"></inline-svg>
                    <span class="mx-2"> {{offer?.attendees}}</span>
                    <span class="interraction">{{$t("applicationKanban.applicants")}}</span>
                </div>
            </div>
            <el-button class="candidate-kanban__btn" @click="handleEditClick" >{{$t("applicationKanban.edit")}}</el-button>
        </div>
        <div class="gap-5 w-100 mt-5 pb-6 application-container">
            <kanbanCard color="#FFC700" :applications="feedbackList.WaitingCandidates" title="Applyed" status="waiting" />
            <kanbanCard color="#7239EA" :applications="feedbackList.InprogressCandidates" title="In Progress" status="inporgress" />
            <kanbanCard color="#50CD89" :applications="feedbackList.ApprovedCandidates" title="Approved" status="approved" />
            <kanbanCard color="#FF6262" :applications="feedbackList.RejectedCandidates" title="Rejected" status="rejected" />
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent , onMounted} from 'vue'
import JobApplication from '@/components/cart/JobApplication.vue'
import kanbanCard from '@/components/cart/kanbanCard.vue'
import {useOfferStore} from  '@/store/useOfferModule'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useFeedbackStore } from '@/store/useFeedbackModule'
import { t } from "@/core/i18n/translate";
export default defineComponent({
    components:{JobApplication,kanbanCard},
    setup() {
        const { getOfferById } = useOfferStore()
        const {feedbackList} = storeToRefs(useFeedbackStore())
        const {fetchFeedbacks} = useFeedbackStore()
        const {offer,offerList} = storeToRefs(useOfferStore())
        const route = useRoute()
        const router = useRouter()
        const id = route.params?.id as string
        onMounted( async ()=> {
            await getOfferById(id) 
            await fetchFeedbacks(id)
        })
        const handleEditClick =  () => {
            router.push({name:'edit-offer',params:{id:offer.value?.publicationId}})
        }
        return{feedbackList, offer,offerList,handleEditClick}
    },
})
</script>
<style lang="scss" scoped>
    .candidate-kanban__main-container{
        box-shadow: 0px 0px 2px #6A7199;
        border: $white-transparent-11;
        background:$bg-dark-600!important;
        border-radius: 10px 10px 0px 0px;

    }
    .candidate-kanban__header {
        color:$info-300 ;
        border-bottom: solid 1px $bd-card-color;
    }
    .application-container{
        display: grid;
        grid-template-columns: repeat(auto-fill,331px);
        justify-content: center;
    }
    :deep(.el-input) {
        --el-input-border-color: none;
        background: $bg-dark-500!important;
        border-radius:10px;
  }
    :deep(.el-input__inner) {
        background-color: $bg-dark-500;
        color: $text-color-50;
        border-radius: 5px;
    }
    .candidate-kanban__btn{
        background:transparent;
        color:$primary-500;
        border-color: $primary-500;
        padding-right: 30px;
        padding-left:30px;
    }
    @media (max-width:1025px){
        .interraction{
            display:none;
        }
        .candidate-kanban__select {
            display: none;
        }
        .candidate-kanban__header-end{
            width:100%;
            justify-content:space-between;
        }

    }

    
</style>