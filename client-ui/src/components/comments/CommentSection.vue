<template>
	<div>
		<Comment-input idkey="commentss"  label="send" @send="(content)=> $emit('send', content)" />
		<br>
		<comment v-for="comment in comments"  :comment="comment" />
	</div>
</template>

<script>
	import CommentInput from "./CommentInput.vue";
	import comment from "./Comment.vue";
	export default ({
		name: "comment-section",
		components: {CommentInput, comment},
		props: {
			comments: {
				required: true,
				type: Array,                                                                                                               
			},

		},
		setup(_props){

		

            return{
                
            }

        }
	})
</script>

<style>
</style>