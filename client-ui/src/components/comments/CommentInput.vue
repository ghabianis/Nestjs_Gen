<template>
<div>
            <div class="comment-input-section d-flex gap-5 flex-row align-items-start m-4">
                <img src="/jpg/userImage/1.jpg" class="use-image d-flex rounded-circle mt-2" alt="...">
                
                <div class="d-flex flex-fill flex-column  align-items-start  comment-icons">

                    <div class="d-flex comment-top flex-fill align-items-start ">
                        <el-input id="comment" v-model="content.text" :autosize="{maxRows: 4 }" type="textarea" autosize class=" m-0" placeholder="Whrite a comment.." ></el-input>
                        <div class="d-flex align-items-center mt-1">
                            <!-- {{'file'+idkey}} -->
                            <!-- upload file  -->
                            <label v-if="!content.media" class="label-file" :for="'file'+idkey"><inline-svg src="/svg/comment/broken_image.svg" class="me-0"></inline-svg> </label>
                            <input :id="'file'+idkey" class="upload-file pointer" type="file" @change="onFileChange">
                            
                            <!-- display emojis  -->
                            <inline-svg  src="/svg/comment/sentiment_satisfied_alt.svg" class="me-2"></inline-svg> 
                        </div>
                    </div>

                    <!-- display uploaded file  -->
                    <div v-if="content.media" class="position-relative d-inline-block m-4">
                        <div><img class="uploaded-file" v-if="content.media" :src="content.media" /></div>
                        <button class="close-btn d-flex rounded-circle position-absolute top-0 end-0 m-2 p-0" @click="content.media=''"><el-icon><Close /></el-icon></button>
                    </div>
                    <!-- End display uploaded file  -->
                </div>

            </div>

            <!-- Send data (content) to parent component -->
            <el-button class="send-btn text-small--semiBold mb-4 ms-20" v-show="content.media || content.text" type="primary" size="small" @click="$emit('send', content) ; resetComment()" >{{label}}</el-button>
        
  </div>  
</template>

<script lang="ts">
    import {ref} from 'vue';
    interface MsgContent {
        media: string;
        text: string;
    }
    export default ({
        name: "comment-input",
        props: {
            idkey: {
                type: String,
            },
            
            label: {
                require: false,
                type: String,
                default: "send"
            },
        },

        setup(){
            const content = ref<MsgContent>({media: '', text: ""});
            const resetComment =()=> {
               content.value= {media: '', text: ""}
            }

            //display file selected
            function onFileChange(e) {
                const file = e.target.files[0];
                content.value.media = file? URL.createObjectURL(file): '';
            }
            return{
                resetComment,
                content,
                onFileChange
            }

        },
    })
</script>

<style scoped lang="scss">
    .use-image{
        width: 34px;
        height: 34px;
        object-fit: cover;
    };

    .el-textarea{
        --el-input-text-color: var(--el-text-color-regular);
        --el-input-border: 0px solide red;
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
    };
    :deep(.el-textarea textarea ){
        background-color: rgba(0, 0, 0, 0);
        color: #F6F8FB;
        border: none;
    }
    .comment-top{
        width: -webkit-fill-available;
    }
    .comment-icons{
        border: 2px solid rgba(255, 255, 255, 0.28);
        border-radius: 6px;
    }
    .el-icon{
        font-size: 18px;
        margin: 2px;
    }
    :deep(.el-textarea__inner){
        height: 36px;
    }
    .upload-file{
        display: none;
        visibility: none;
    }
    .label-file{
        cursor: pointer;
        padding: 2px 6px;
    }
    // uploaded file
    .uploaded-file{
        width: 200px;
    }
    .close-btn{
        background-color: black;
        color: white;
    }
    .send-btn{
        margin-left: 37px;
        color: $text-color-250;
    }
</style>
