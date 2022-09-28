<template>
  <div class="container">
    <el-dialog v-model="$props.showModal" :show-close="false" :close-on-click-modal="false" destroy-on-close :close-on-press-escape="false">
      <div class="card p-3">
        <!-- <h3 class="text-center text-primary my-4">Create Story</h3> -->
        <StoryForm @close-modal="$emit('close-modal')" :isEdit="false" />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StoryForm from "@/components/forms/StoryForm.vue";
export default defineComponent({
  name: "create-story",
  components: {
    StoryForm,
  },
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.container {
  :deep(.el-dialog:not(.discard-card)) {
    background-color: transparent;
    @media screen and (max-width: 1024px) {
      width: 60% !important;
    }
    @media screen and (max-width: 768px) {
      width: 70% !important;
    }

    :deep(.el-dialog__body),
    :deep(.el-dialog__header) {
      padding: 0;
    }
  }
}
</style>
