<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit User</h3>
    <UserForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UserForm from "@/components/forms/UserForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-user",
  components: {
    UserForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit user", ["users"]);
    });
    return {};
  },
});
</script>
