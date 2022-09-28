<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Job</h3>
    <JobForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JobForm from "@/components/forms/JobForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-job",
  components: {
    JobForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create job", ["jobs"]);
    });
    return {};
  },
});
</script>
