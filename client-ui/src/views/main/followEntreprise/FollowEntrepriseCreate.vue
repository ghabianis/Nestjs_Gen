<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create FollowEntreprise</h3>
    <FollowEntrepriseForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FollowEntrepriseForm from "@/components/forms/FollowEntrepriseForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-followentreprise",
  components: {
    FollowEntrepriseForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create followentreprise", [
        "followentreprises",
      ]);
    });
    return {};
  },
});
</script>
