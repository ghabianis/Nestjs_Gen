<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create QuestionType</h3>
    <QuestionTypeForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuestionTypeForm from "@/components/forms/QuestionTypeForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-questiontype",
  components: {
    QuestionTypeForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create questiontype", ["questiontypes"]);
    });
    return {};
  },
});
</script>
