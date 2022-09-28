<template>
  <div>
   <el-dialog
        v-model="$props.showModal" 
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="el-dialog__custom-class">
        <PostForm @close-modal="$emit('close-modal') , (resetPost)" :isEdit="false"/>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostForm from "@/components/forms/PostForm.vue";
import { usePostStore } from "@/store/usePostModule";
export default defineComponent({
  name: "create-post",
  components: {
    PostForm,
},
   props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { resetPost } = usePostStore()
    return {resetPost};
  },
});
</script>
<style scoped lang="scss">
 :deep(.el-dialog__custom-class) {
    background: $bg-dark-600 !important;
    border-radius: 10px;
    width: 70%;
    max-width: 1100px;
    @media (max-width: 1100px) {
      width:90%;
  }

}
:deep(.el-dialog__header){
  padding:0px!important;
}
:deep(.el-dialog__body){
  padding:0px!important;
  color:$text-color-50;
}

</style>
