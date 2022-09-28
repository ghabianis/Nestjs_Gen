<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit UsersOnEntreprise</h3>
    <UsersOnEntrepriseForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UsersOnEntrepriseForm from "@/components/forms/UsersOnEntrepriseForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-usersonentreprise",
  components: {
    UsersOnEntrepriseForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit usersonentreprise", [
        "usersonentreprises",
      ]);
    });
    return {};
  },
});
</script>
