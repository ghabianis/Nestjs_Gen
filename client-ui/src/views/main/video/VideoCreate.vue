<template>
  <div>
   <el-dialog
        v-model="$props.showModal" 
        :show-close="false"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        custom-class="el-dialog__custom-class">
        <VideoForm @close-modal="$emit('close-modal') , (resetVideo)" :isEdit="false"/>
      </el-dialog>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import VideoForm from "@/components/forms/VideoForm.vue";
import { useVideoStore } from "@/store/useVideoModule";
export default defineComponent({
  name: "create-video",
  components: {
    VideoForm,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },


  setup() {
    const { resetVideo } = useVideoStore()
    return {resetVideo};

  },
});
</script>
<style scoped lang="scss">
 :deep(.el-dialog__custom-class) {
    background: $bg-dark-600 !important;
    border-radius: 10px;
    width: 70%;
    max-width: 1100px;
    @media (max-width: 1200px) {
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
