<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Skill</h3>
    <SkillForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SkillForm from "@/components/forms/SkillForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-skill",
  components: {
    SkillForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit skill", ["skills"]);
    });
    return {};
  },
});
</script>
