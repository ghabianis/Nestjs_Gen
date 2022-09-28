<template>
<div>
    <!-- this represent the comment template  -->
    <div id="comment-card" class="comment-card d-flex flex-column mx-4 my-2 rounded p-2">
        <div class=" d-flex justify-content-between">
            <div class=" d-flex gap-4">
                <div>
                    <img src="/jpg/userImage/1.jpg" class="use-image  rounded-circle" alt="...">
                </div>
                <div class="">
                    <h6 class="companyName text--medium m-0">User Name</h6>
                    <h6 class="text-color-100 text-small--regular"> Web developer</h6>
                    <div v-show="!isEdit">
                        <h6 class=" text-color-50 text--regular">  {{comment.text}}</h6>
                        <img v-if="comment.media" class="uploaded-file" :src="comment.media" alt="">
                    </div>

                    <!-- edit comment section  -->

                    <div v-show="isEdit">    

                        <el-input name="editCommentText" type="textarea" v-model="editedcommentText"/>
                        <el-button type="primary" :disabled="comment.text == editedcommentText" @click="editComment"  class="btn-edit text-small--semiBold">Save changes</el-button>
                        <el-button  @click="cancelEdit" class="send-btn text-small--semiBold">Cancel</el-button>
                        <img v-if="comment.media" class="uploaded-file mt-4" :src="comment.media" alt="">

                    </div>

                    <!-- end edit comment section  -->
                </div>
            </div>
            <div class="d-flex gap-3 align-items-baseline">
                <div class=" p">1h</div>
                <DropdownCmt @edit="handleedit" @delete="handledelete" />
                
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between m-2 px-2">

        <el-button size="small" key="plain" type="" text @click="$emit('showReplyInput')" class="text-small--regular"> Reply</el-button>
        <div @click="isLikedToggel" class="d-flex noSelect cursor gap-1 align-items-center">{{likesNb}}
            <span class="like" v-show="isLiked">
                <inline-svg class="like" src="/svg/icons/postReactions/love_filled.svg"/> 
            </span>
            <span v-show="!isLiked">
                <inline-svg class="like" src="/svg/icons/postReactions/love_unfilled.svg"/> 
            </span>
        </div>

    </div>
    
    <!-- <Comment-input v-if="replying" @send="(content) => $emit('send', content)" /> -->

</div>
</template>

<script lang="ts">
    import {ref } from "vue";
	import CommentInput from "./CommentInput.vue";
    import DropdownCmt  from 'src/components/shared/sharedUser/CardsDropdown/DropdownCmt.vue';

    export default ({
        name: "Comment-body",
        emits: ['showReplyInput'],
        components: {CommentInput, DropdownCmt},
        props: {
            comment: {}
        },
        setup(props){
            const replying = ref(false);
            const isLiked = ref(false)
            const likesNb = ref(5)

            // Like a comment
            const isLikedToggel = ()=>{
                isLiked.value = !isLiked.value;
                if(isLiked.value == true){
                    likesNb.value ++;   
                }else{
                    likesNb.value --;
                }
                console.log(likesNb.value);
            };


            //Edit comment
            const isEdit = ref(false);


            const editedcommentText = ref("");
            editedcommentText.value = props.comment.text
            const handleedit = () =>{
                isEdit.value = true
            }

            const editComment = () =>{
                //we only gonna update the text here forget about the file coz he cant update it!
                console.log("edited :", editedcommentText.value);
                props.comment.text = editedcommentText.value;
                isEdit.value = false

            }
                //cancel edit comment
            const cancelEdit = () => {
                isEdit.value = false
            }

            //Delete comment
            const handledelete = () =>{
                console.log("deleted :p")
            }

            return{
                //varibals
                replying,
                isLikedToggel,
                likesNb,
                isLiked,
                editedcommentText,
                isEdit,
                //functions
                editComment,
                handleedit,
                handledelete,
                cancelEdit
            }
        }
    })
</script>

<style scoped lang="scss">
    .use-image{
        width: 40px;
        height: 40px;
        object-fit: cover;
    }
    .comment-card{
        background-color: #262A34;
    }
    .el-button {
        --el-button-font-weight: var(--el-font-weight-primary);
        --el-button-border-color: #4c4d4f00;
        --el-button-bg-color: rgba(255, 255, 255, 0);
        --el-button-text-color: #cfd3dc;
        --el-button-disabled-bg-color: #ffffff00;
        --el-button-disabled-border-color: #41424300;
        --el-button-divide-border-color: rgba(255, 255, 255, 0);
        --el-button-hover-text-color: white;
        --el-button-hover-bg-color: rgba(255, 255, 255, 0.06);
        --el-button-hover-border-color: rgba(0, 0, 0, 0);
        --el-button-active-text-color: white;
        --el-button-active-border-color: rgba(255, 255, 255, 0);
        --el-button-active-bg-color: rgba(255, 255, 255, 0);
        --el-button-outline-color: rgba(255, 253, 253, 0);
        --el-button-hover-link-text-color: #909399;
        --el-button-active-color: #e5eaf3;
    }
    .el-button--small {
        padding: 0 2px;
    }
    .like{
        width: 18px;
    }
    .text-color-50{
        color: $text-color-50;
    }
    .text-color-100{
        color: $text-color-100;
    }
    //img
    .uploaded-file{
        width: 200px;
    }
    .el-textarea{
        --el-input-text-color: var(--el-text-color-regular);
        --el-input-border: 0px solide rgba(255, 255, 255, 0);
        --el-input-hover-border: var(--el-border-color-hover);
        --el-input-focus-border: var(--el-color-primary);
        --el-input-transparent-border: 0 0 0 1px transparent inset;
        --el-input-border-color: none;
        --el-input-border-radius: var(--el-border-radius-base);
        --el-input-bg-color: #ffffff17;
        --el-input-icon-color: #F6F8FB;
        --el-input-placeholder-color: var(--el-text-color-placeholder);
        --el-input-hover-border-color: none;
        --el-input-clear-hover-color: var(--el-text-color-secondary);
        --el-input-focus-border-color: none;
    };
    :deep(.el-textarea textarea ){
        background-color: rgba(0, 0, 0, 0);
        color: #F6F8FB;
        border: none;
    }
    .btn-edit {
        background-color: #F586E6;
        color: $text-color-250;
    }
    .btn-edit:hover {
     background-color: #F586E6;
        color: $text-color-250;
    }
</style>