<template>
    <div id="PostCardID" class="postCard  rounded">

        <!-- card header -->
        <div class=" d-flex justify-content-between  p-2">
            <div class="companyHreder d-flex flex-nowrap gap-2 align-items-center cursor">
                <div>
                 <img src="/png/logos/googleLogo.png" class="companyImg  rounded" alt="...">
                </div>
                <div class="d-flex flex-column ">
                    <h6 class="text-color-50 h6--semiBold m-0 text_hover currsor">{{postData.companyName}}</h6>
                    <h6 class=" text-color-100 text-small--regular m-0">{{postData.followersNb}} Followers</h6>
                    <h6  class=" text-color-100 text-small--regular m-0">{{postData.postDate}}</h6>
                </div>
            </div>

            <div class="btns-section d-flex align-items-center flex-wrap gap-2 justify-content-end px-2">
                <button @click="isfollowingToggle" id="follow-button" class="el-button text--regular">{{postData.isFollowed ? "Following" : "+ follow"}}</button>

                <div class="horizantal-list__more-icon">
                    <CardDropdown :isSaved="isSaved" @save="handleSave" @copyLink="handleCopyLink" />
                </div>
            </div>
        </div>
        <!-- End card header -->

        <!-- card content -->
        <div class="px-2">
            <h6 :class="{overflow: !showMoreText}" class="text-color-50 text-small--regular">{{postData.description}}</h6>
            <span @click="isTextToggel" :class="{visibility: showMoreText}" class="see_more text_hover text-color-100 text-small--regular cursor">...See more</span>
        </div>
        <div>
            <img class="post-file" src="/png/postTestImg.png" alt="">
        </div>
        <!-- End card content -->

        <!-- card Reactions NUMBERS-->
        <ul class="d-flex gap-8 text-small--regular m-0 p-2 text-color-100">
            <li class="cursor text_hover">{{postData.like}} Love</li>
            <li class="cursor text_hover">{{postData.comment}} Comment</li>
            <li>{{postData.share}} Share</li>
        </ul>
        <!-- End card Reactions NUMBERS-->


        <!-- End card Reactions -->
        <div class="postReactions d-flex  justify-content-between px-4 py-3">
            <div class="d-flex  gap-6">

                <!-- Like  -->
                <div @click="isLikedToggel" class="d-flex noSelect cursor align-items-center">
                    <span class="isLiked" v-show="postData.isLiked">
                        <inline-svg class="like-svg" src="/svg/icons/postReactions/love_filled.svg"/>Love 
                    </span>
                    <span  v-show="!postData.isLiked">
                        <inline-svg class="like-svg" src="/svg/icons/postReactions/love_unfilled.svg"/>Love 
                    </span>
                </div>

                <!-- comment  -->
                <div @click="commenttoggle" class="d-flex cursor gap-1 align-items-center"><inline-svg src="/svg/icons/postReactions/comment.svg"/> Comment </div>


            </div>
            <!-- send  -->
            <!-- <div><SendPost /></div> -->

            <!-- Share  -->
            <div><SharePost @shareOnLinkedin="shareOnLinkedin" @shareOnFacebook="shareOnFacebook" @shareOnInstagram="shareOnInstagram"/></div>
        </div>
        <!-- End card Reactions -->

        <!--card comments -->
        <div v-show="isCommentOppen" class="m-0 p-0">
            <CommentSection :comments="comments" @send="send"/>
        </div>

        <!--End card comments -->

    </div>
</template>

<script  lang="ts">
    import SharePost from '@/components/shared/sharedUser/SharePost.vue';
    import { ElMessage } from 'element-plus'
    import { computed, defineComponent, ref } from "vue";
    import CardDropdown from '@/components/shared/sharedUser/CardsDropdown/DropdownPost.vue';
    import CommentSection from "@/components/comments/CommentSection.vue";

    export default defineComponent({
        components:{ CardDropdown, CommentSection, SharePost },

        props: {
            data: {
                required: true,
                type: String,
            },

        },
        // emits: ["shareOnLinkedin"],

        setup(_props) {
            const isEmpty = ref(false)
            const postData = ref({
            companyName: "Google",
            postDate: "5 min",
            followersNb: "9, 524",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit molestie ipsum nulla cm dolor aliquet Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit. Sit molestie ipsum nulla cm dolor aliquet",Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sit molestie ipsum nulla dolor aliquet Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            1 .psum nulla dolor aliquet Lorem. 📌✅
                            2 .Ipsum nulla dolor aliquet Lorem. ✅
                            3 .Ipsum nulla dolor aliquet Lorem. ✅
                            psum nulla dolor aliquet Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            file: '',
            isFollowed: false,
            isLiked: false,
            like:'34',
            comment: '20',
            share: '12',
            });

            //Follow company trigger
            const isfollowingToggle =() =>{
                postData.value.isFollowed = !postData.value.isFollowed;
                //console.log(companyInfo.value.isFollow);
            }

            // Like a post
            const isLikedToggel = ()=>{
                postData.value.isLiked = !postData.value.isLiked;
                console.log(postData.value.isLiked);
            };

            //Save post
            const isSaved = ref(true);
            const handleSave = () =>{
                isSaved.value = !isSaved.value
                console.log(isSaved.value);
                console.log("Save")
            }

            //Copy post link
            const handleCopyLink = () =>{
                console.log("CopyLink");
                // ==> Here missed the code to copy the post path
                ElMessage({
                    message: 'Link copied to clipboard.',
                    type: 'success',
                })
            }


            //show-more-text
            let showMoreText= ref(false)
            const isTextToggel = ()=>{
                showMoreText.value = !showMoreText.value;
            };
            
            ////comment 
            let comments = ref([]);
            let comment= ref("");

            //Api save comments in data base thats why we get the cmt here
            function send(content: any){
                console.log("hii",content)
                comments.value.push(content)
                
            }

            //Share post on social media
            const closeSarePostPopUp = ref(false);
            function shareOnLinkedin(){
                console.log("shareed On Linkedin :D"); 
                closeSarePostPopUp.value = true; 

                ElMessage({
                    message: 'Post successfully shared',
                    type: 'success',
                })
            }
            function shareOnFacebook(){
                console.log("shareed On Facebook :D");
                closeSarePostPopUp.value = true; 

                ElMessage({
                    message: 'Post successfully shared',
                    type: 'success',
                })  
            }            
            function shareOnInstagram(){
                console.log("shareed On Instagram :D");
                closeSarePostPopUp.value = true; 

                ElMessage({
                    message: 'Post successfully shared',
                    type: 'success',
                })  
            }
            
            //Comment section trigger (open and close)
            const isCommentOppen = ref(false)
            const commenttoggle = () =>{
                isCommentOppen.value = !isCommentOppen.value
            }

            return {
                postData,
                isfollowingToggle,
                handleSave,
                handleCopyLink,
                isLikedToggel,
                showMoreText,
                isTextToggel,
                send,
                comments,
                isSaved,
                shareOnLinkedin,
                shareOnFacebook,
                shareOnInstagram,
                closeSarePostPopUp,
                commenttoggle,
                isCommentOppen
  
            };
        },


    });

</script>

<style scoped lang="scss">
    .postCard{
        background-color: $bg-dark-600;
        width: 527px;

    }
    .companyImg{
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
    .el-button {
    border: none;
    background-color: none;
    color: $primary-500;
    --el-button-bg-color: none;
    --el-button-hover-bg-color: none
    --el-button-active-bg-color: none; 
    }
    .horizantal-list__more-icon:hover {
    cursor: pointer;
    }
    .post-file{
        width: 527px;
        height: 297px;
        object-fit: cover;
    }
    ul{

        list-style-type: none;
    }
    .postReactions{
        background-color: rgba(255, 255, 255, 0.05);
    }
    .text-color-50{
        color: $text-color-50;
    }
    .text-color-100{
        color: $text-color-100;
    }
    .cursor{
        cursor: pointer;
    }
    .isLiked{
        color: $danger-500;
    }
    .noSelect{
        user-select: none
    }

    //post description
    .overflow {
        line-height: 1.5em; 
        height: 3em; 
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .see_more{
        text-align: right;
        display: block;
    }
    .visibility{
        visibility: hidden;
    }
    .text_hover:hover{
        text-decoration: underline;
        color: $primary-500;
        cursor: pointer;
    }

    .like-svg{
        margin-right: 4px;
    }
</style>