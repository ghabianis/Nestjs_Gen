<template>
<div>
    <Comment-body @showReplyInput="showReplyInput" :comment="comment" @send="send" />
    <div class="ms-10 my-0">
        <!-- Here we fetch the replies of a specific comment  -->
        <Comment-body v-for="reply in replies" :comment="reply" />
        <Comment-input idkey="reply" v-show="replying"  @send="send"/>
    </div>
</div>
</template>

<script lang="ts">
    import {ref } from "vue";
    import CommentBody from "./CommentBody.vue";
	import CommentInput from "./CommentInput.vue";
    export default ({
        components: { CommentBody,CommentInput },

        name: "Comment",


        props: {
            comment: {}
        },

        setup(){
            const replies = ref([]);
            const reply = ref('');
            let replying = ref(false);
            function showReplyInput(){
                replying.value = true 
                console.log(replying.value);
                
            }
            function send(content: any) {
                replies.value.push(content);
            }

            return{
                send,
                reply,
                replies,
                replying,
                showReplyInput
            };

        },
    })

</script>

<style scoped>
    .use-image{
        width: 40px;
        height: 40px;
        object-fit: cover;
    }
    .comment-card{
        background-color: #262A34;
    }
</style>