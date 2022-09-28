<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Course</h3>
    <CourseForm :isEdit="false" />
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
      setCurrentPageBreadcrumbs("create course", ["courses"]);
    });
    return {};
  },
});
</script>
