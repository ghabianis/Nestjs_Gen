<template>
    <div>

        <div class="d-flex flex-column flex-nowrap align-items-center cursor " @click="dialogVisible = true" >
            <div class="story-border d-inline-block rounded-circle p-1">
                <img class="media-story rounded-circle" :src="storyData.media" alt="">
            </div>
            <h3 class="text--regular  story-owner-name">{{storyData.companyName}}</h3>
        </div>

        <el-dialog  v-model="dialogVisible" >

           <StoryModal :dialogVisible="dialogVisible" />

        </el-dialog>
    </div>

</template>


<script lang="ts">

    import { defineComponent, onMounted, ref } from "vue";
    import { object } from "yup";
    import StoryModal from '../shared/sharedUser/StoryModal.vue'

    export default defineComponent({
        name: "story",
        components: {StoryModal},

        props:{
            storyData:{
                require: true,
                type: object,              
            }
        },
        setup(){
            const storyData = ref({
                media : '/public/jpg/userImage/storyimg.jpg',
                companyName: 'Microsoft'
            })

            // handelStory 
            const dialogVisible = ref(false)

            

            setTimeout(function () { 
                console.log("Hi my friend, I'm story modal, Can you autoclose me afther 5s? thanks");  
                console.log(dialogVisible.value);
            }, 1000);

            return{
                storyData,
                dialogVisible,
                
                
            }
        }

    })

</script>

<style lang="scss" scoped>
    .media-story{
        width: 54px;
        height: 54px;
        object-fit: cover;
        
    }
    .story-border{
        border: 3px solid hsla(308, 85%, 74%, 0.17);
    }
    .story-owner-name{
        color: $text-color-50 ;
    }
    .cursor{
        cursor: pointer;
    }
    :deep(.el-dialog) {
        
        --el-dialog-margin-top: 0px;
        --el-dialog-bg-color: rgba(255, 0, 212, 0.103);
        --el-dialog-box-shadow: var(--el-box-shadow);
        --el-dialog-title-font-size: var(--el-font-size-large);
        --el-dialog-content-font-size: 14px;
        --el-dialog-font-line-height: var(--el-font-line-height-primary);
        --el-dialog-padding-primary: 0px;
        --el-dialog-border-radius: var(--el-border-radius-small);
        position: relative;
        margin: auto;
        background: var(--el-dialog-bg-color);
        border-radius: var(--el-dialog-border-radius);
        box-shadow: var(--el-dialog-box-shadow);
        box-sizing: border-box;
        width: fit-content;;
    }
    :deep(.el-dialog__headerbtn){
        z-index: 2000;
    }
    :deep(.el-dialog__header){
        padding: 0px;
        padding-bottom: 0px;
        margin-right: 0px;
    }
    :deep(.el-dialog__body){
        padding: 0px
    }
    //close btn
    :deep(.el-dialog__headerbtn){
        padding: 6px;
        margin-top: 15px;
    }
    :deep(.el-dialog__headerbtn .el-dialog__close){
        color: white;
    }
</style>