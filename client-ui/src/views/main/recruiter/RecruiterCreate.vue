<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Recruiter</h3>
    <RecruiterForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RecruiterForm from "@/components/forms/RecruiterForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-recruiter",
  components: {
    RecruiterForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create recruiter", ["recruiters"]);
    });
    return {};
  },
});
</script>
