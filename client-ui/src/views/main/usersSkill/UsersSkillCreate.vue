<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create UsersSkill</h3>
    <UsersSkillForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsersSkillForm from "@/components/forms/UsersSkillForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-usersskill",
  components: {
    UsersSkillForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create usersskill", ["usersskills"]);
    });
    return {};
  },
});
</script>
