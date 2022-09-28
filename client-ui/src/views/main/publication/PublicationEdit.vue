<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Publication</h3>
    <PublicationForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PublicationForm from "@/components/forms/PublicationForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-publication",
  components: {
    PublicationForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit publication", ["publications"]);
    });
    return {};
  },
});
</script>
