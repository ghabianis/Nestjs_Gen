<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Course</h3>
    <CourseForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CourseForm from "@/components/forms/CourseForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-course",
  components: {
    CourseForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit course", ["courses"]);
    });
    return {};
  },
});
</script>
