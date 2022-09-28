<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Category</h3>
    <CategoryForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CategoryForm from "@/components/forms/CategoryForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-category",
  components: {
    CategoryForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit category", ["categories"]);
    });
    return {};
  },
});
</script>
