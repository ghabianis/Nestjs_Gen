<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Feedback</h3>
    <FeedbackForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FeedbackForm from "@/components/forms/FeedbackForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-feedback",
  components: {
    FeedbackForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create feedback", ["feedbacks"]);
    });
    return {};
  },
});
</script>
