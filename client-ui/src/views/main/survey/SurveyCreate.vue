<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Survey</h3>
    <SurveyForm :isEdit="false" />
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
      setCurrentPageBreadcrumbs("create survey", ["surveys"]);
    });
    return {};
  },
});
</script>
