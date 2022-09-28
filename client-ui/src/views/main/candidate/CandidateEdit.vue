<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Candidate</h3>
    <CandidateForm isEdit />
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
      setCurrentPageBreadcrumbs("Edit candidate", ["candidates"]);
    });
    return {};
  },
});
</script>
