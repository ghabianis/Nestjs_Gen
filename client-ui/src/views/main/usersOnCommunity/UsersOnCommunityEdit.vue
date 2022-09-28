<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit UsersOnCommunity</h3>
    <UsersOnCommunityForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UsersOnCommunityForm from "@/components/forms/UsersOnCommunityForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-usersoncommunity",
  components: {
    UsersOnCommunityForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit usersoncommunity", [
        "usersoncommunities",
      ]);
    });
    return {};
  },
});
</script>
