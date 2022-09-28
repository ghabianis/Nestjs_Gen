<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Experience</h3>
    <ExperienceForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExperienceForm from "@/components/forms/ExperienceForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-experience",
  components: {
    ExperienceForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create experience", ["experiences"]);
    });
    return {};
  },
});
</script>
