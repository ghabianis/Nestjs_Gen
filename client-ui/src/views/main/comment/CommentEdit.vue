<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Comment</h3>
    <CommentForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CommentForm from "@/components/forms/CommentForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-comment",
  components: {
    CommentForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit comment", ["comments"]);
    });
    return {};
  },
});
</script>
