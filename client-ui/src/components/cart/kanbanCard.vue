<template>
    <div class="kanban-card"  @drop="handleDrop" @dragenter.prevent @dragover.prevent>
        <div class="d-flex justify-content-between align-items-center p-5 mb-2 kanban-card__header" :style="{borderTopColor:color}">
            <span class="fs-3 fw-bolder">{{title}}</span>
            <div class="p-2 kanban-card__total"> 
                <span class="fs-6"> {{applications?.length}} </span>
            </div>
        </div>

        <div class="d-flex flex-column gap-3 p-2 px-4">
            <JobApplication v-for="application in applications" :key="application.feedback" :application="application"/>
        </div>

    </div>
</template>
<script lang="ts">
import { IApplication, useFeedbackStore } from '@/store/useFeedbackModule'
import { defineComponent, PropType } from 'vue'
import JobApplication from './JobApplication.vue'
export default defineComponent({
    components:{
        JobApplication
    },
    props:{
        color:{
            type:String,
            required:true
        },
        applications:{
            type: Array as PropType<IApplication[]>,
            required: true
        },
        title:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    setup(props) {
        const {editFeedback} = useFeedbackStore()
        const handleDrop = (event:DragEvent) =>  {
            if(event.dataTransfer){
                const feedback = event.dataTransfer.getData("feedback")
                const feedbackOldStatue = event.dataTransfer.getData("feedbackOldStatue")
                editFeedback({data:{statue:props.status}, feedback,oldStatus:feedbackOldStatue})
            }
        }    
        return {handleDrop}
    },
})
</script>

<style scoped lang="scss">
    .kanban-card {  
        background: $bg-dark-500;
        border-radius: 10px;
        min-height: 80vh;
        &__header {
            background: $bg-dark-400;
            border-top: 3px solid ;
            border-radius: 5px 5px 0px 0px;
            color: $text-color-50;
        }
        &__total{
            background: $white-transparent-11;
            border-radius: 5px;
        }
    }
</style>