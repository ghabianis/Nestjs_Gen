<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Entreprise</h3>
    <EntrepriseForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import EntrepriseForm from "@/components/forms/EntrepriseForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-entreprise",
  components: {
    EntrepriseForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit entreprise", ["entreprises"]);
    });
    return {};
  },
});
</script>
