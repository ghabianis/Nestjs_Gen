<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Community</h3>
    <CommunityForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommunityForm from "@/components/forms/CommunityForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-community",
  components: {
    CommunityForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create community", ["communities"]);
    });
    return {};
  },
});
</script>
