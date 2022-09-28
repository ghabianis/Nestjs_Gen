<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Question</h3>
    <QuestionForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuestionForm from "@/components/forms/QuestionForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-question",
  components: {
    QuestionForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create question", ["questions"]);
    });
    return {};
  },
});
</script>
