<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Socialinterraction</h3>
    <SocialinterractionForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SocialinterractionForm from "@/components/forms/SocialinterractionForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-socialinterraction",
  components: {
    SocialinterractionForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create socialinterraction", [
        "socialinterractions",
      ]);
    });
    return {};
  },
});
</script>
