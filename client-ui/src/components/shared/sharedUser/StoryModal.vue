<template>
    <div class="position-relative story">

        <!-- Header  -->
        <div class="story-header flex-column d-flex flex-nowrap gap-4 pb-5 p-4" >
            <el-progress :text-inside="true" :percentage="50" :stroke-width="3"><span class="percentage-label"></span></el-progress>
            <div class="d-flex gap-10 align-items-center">
                <div class="d-flex gap-2 align-items-start">
                    <img class="companyImg rounded" :src="storyData.companyImg" alt="">
                    <div>
                        <h6 class="text--semiBold text-color-50 m-0">{{storyData.companyName}}</h6>
                        <p class="text-small--regular text-color-100 m-0">{{storyData.date}} {{$t("date.ago")}}</p>
                    </div>
                </div>

                    <el-icon v-show="isPaused" @click="handelStoryShow"><VideoPlay /></el-icon>
                    <el-icon v-show="!isPaused" @click="handelStoryShow"><VideoPause /></el-icon>
            </div>
        </div>
        <!-- End Header  -->


        <!-- footer  -->
        <div class="story-footer p-4 pt-7">
            <h6 :class="{overflow: !showMoreText}" class="text-small--medium text-color-50 m-0 ">{{storyData.title}}</h6>
            <span @click="isTextToggel"  class="see_more  text-color-100 text-small--regular mb-2">{{showMoreText? $t("story.storyModal.seeLess") : $t("story.storyModal.seeMore")}}</span>
        
            <div class="d-flex justify-content-start align-items-center gap-2">
                <div class="d-flex  input  flex-fill align-items-start ">
                    <el-input id="comment" v-model="message"  type="textarea" :autosize="{maxRows: 4 }" class=" m-0" :placeholder='$t("story.storyModal.placeholder")' ></el-input>
                    <div class="d-flex align-items-center mt-2">
                        <!-- display emojis  -->
                        <inline-svg  src="/svg/comment/sentiment_satisfied_alt.svg" class="me-2"></inline-svg> 
                    </div>
                </div>
                <el-button @click="sendMessage" :disabled='!message' class="send-btn text-small--semiBold ">{{$t("story.storyModal.send")}}</el-button>
            </div>
        </div>

        <!-- End footer  -->

        <img class="media" :src="storyData.media" alt="">
    </div>
</template>


<script lang="ts">

    import { defineComponent, ref } from "vue";
    import { boolean, object } from "yup";

    export default defineComponent({
        name: "StoryModal",
        components: {},

        props:{
            storyData:{
                require: true,
                type: object,              
            },
            dialogVisible:{
                type: boolean
            }
        },
        setup(props){
            const storyData = ref({
                media : '/public/jpg/userImage/storyimg.jpg',
                companyName: 'Google',
                companyImg: '/png/logos/googleLogo.png',
                date: "5 min",
                title: "Internship in ABCD #Job #hiring Lorem ipsum dolor sit amet, consectetur adipiscing elit. Internship in ABCD #Job #hiring ipsum dolor sit amet, consectetur adipiscing elit. ",
                isLiked: true
            })
            
            // textarea messege 
            const message = ref('');
            function sendMessage(){
                console.log(message.value);
                message.value = ""
            }   
            

            // Story display time 
            const isPaused = ref(false);
            const handelStoryShow = () =>{
                isPaused.value = ! isPaused.value
            }

            //show-more-text
            let showMoreText= ref(false)
            const isTextToggel = ()=>{
                showMoreText.value = !showMoreText.value;
            };

            // onMounted(()=>{
            //     setTimeout(function () { 
            //         console.log("Hi my friend, I'm story modal, Can you autoclose me afther 5s? thanks");  
            //         console.log(props.dialogVisible.value);
            //         props.dialogVisible = false
            //     }, 1000);
            // })
            return{
                storyData,
                message,
                isPaused,
                handelStoryShow,
                isTextToggel,
                showMoreText,
                sendMessage
                
            }
        }

    })

</script>

<style lang="scss" scoped>
    .story{
        width: 400px;
        margin: auto;
        background-color: white;
    }
    .media{
        display: block;
        z-index: 99;
        top: 0;
        margin-left: auto;
        margin-right: auto;
        // width: 100vw;
        width: 400px;

        height: 100vh;
        background-size: contain;
        background-repeat: no-repeat no-repeat;
        background-position: center center;
        background-color: black;
    }
    .story-header{
        position: absolute;
        z-index: 20;
        width: -webkit-fill-available;
        background: rgb(0,0,0);
        background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%);
    }
    .companyImg{
        width: 30px;
        height: 30px;
        object-fit: cover;
    }
    .story-footer{
        position: absolute;
        z-index: 99999;
        width: -webkit-fill-available;
        background: rgb(0,0,0);
        background: -moz-linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 46%, rgba(0,0,0,0) 100%);
        background: -webkit-linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 46%, rgba(0,0,0,0) 100%);
        background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 46%, rgba(0,0,0,0) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1);
        bottom: 0px;
    }

    .text-color-50{
        color: $text-color-50;
    }
    .text-color-100{
        color: $text-color-100;
    }
    :deep(.el-icon){
        color: $text-color-50;
        font-size: 22px;
        cursor: pointer;
    }

    .input{
        width: -webkit-fill-available;
        border: 2px solid rgba(255, 255, 255, 0.28);
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.116);
    }
    :deep(.el-textarea){
        --el-input-text-color: var(--el-text-color-regular);
        --el-input-border: 0px solide rgba(255, 255, 255, 0);
        --el-input-hover-border: var(--el-border-color-hover);
        --el-input-focus-border: var(--el-color-primary);
        --el-input-transparent-border: 0 0 0 1px transparent inset;
        --el-input-border-color: none;
        --el-input-border-radius: var(--el-border-radius-base);
        --el-input-bg-color: #1e202700;
        --el-input-icon-color: #F6F8FB;
        --el-input-placeholder-color: var(--el-text-color-placeholder);
        --el-input-hover-border-color: none;
        --el-input-clear-hover-color: var(--el-text-color-secondary);
        --el-input-focus-border-color: none;
    }
       :deep(.el-textarea textarea ){
        background-color: rgba(0, 0, 0, 0);
        color: #F6F8FB;
        border: none;
    }

    //Story text
    .overflow {
        line-height: 1.5em; 
        height: 3em; 
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .see_more{
        text-align: right;
        display: block;
        cursor: pointer;
    }
    .send-btn{
        width: fit-content;
    }

</style>