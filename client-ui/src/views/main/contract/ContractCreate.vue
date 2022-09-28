<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Contract</h3>
    <ContractForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContractForm from "@/components/forms/ContractForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-contract",
  components: {
    ContractForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create contract", ["contracts"]);
    });
    return {};
  },
});
</script>
