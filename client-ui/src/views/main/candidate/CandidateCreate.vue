<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Candidate</h3>
    <CandidateForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CandidateForm from "@/components/forms/CandidateForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-candidate",
  components: {
    CandidateForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create candidate", ["candidates"]);
    });
    return {};
  },
});
</script>
