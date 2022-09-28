<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit ContractsOnCandidate</h3>
    <ContractsOnCandidateForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ContractsOnCandidateForm from "@/components/forms/ContractsOnCandidateForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-contractsoncandidate",
  components: {
    ContractsOnCandidateForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit contractsoncandidate", [
        "contractsoncandidates",
      ]);
    });
    return {};
  },
});
</script>
