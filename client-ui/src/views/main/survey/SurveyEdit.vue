<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Survey</h3>
    <SurveyForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SurveyForm from "@/components/forms/SurveyForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-survey",
  components: {
    SurveyForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit survey", ["surveys"]);
    });
    return {};
  },
});
</script>
