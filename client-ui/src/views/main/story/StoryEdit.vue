<template>
  <div class="container">
  <el-dialog v-model="$props.showModal" :show-close="false" :close-on-click-modal="false" destroy-on-close :close-on-press-escape="false">
    <div class="card p-3">
      <StoryForm isEdit :payload="$props.payload" @close-modal="$emit('close-modal')"/>
    </div>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import StoryForm from "@/components/forms/StoryForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";

export default defineComponent({
  name: "StoryEdit",
  components: {
    StoryForm,
  },
  props: {
    payload: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.container{
  :deep(.el-dialog:not(.discard-card)) {
    background-color: transparent;
    
    @media screen and (max-width: 1024px) {
      width: 60% !important;
    }
    @media screen and (max-width: 768px) {
      width: 70% !important;
    }

    :deep(.el-dialog__body), :deep(.el-dialog__header) {
      padding: 0 ;
    }
  }
}
</style>