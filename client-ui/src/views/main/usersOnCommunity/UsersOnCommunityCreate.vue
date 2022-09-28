<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create UsersOnCommunity</h3>
    <UsersOnCommunityForm :isEdit="false" />
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
      setCurrentPageBreadcrumbs("create usersoncommunity", [
        "usersoncommunities",
      ]);
    });
    return {};
  },
});
</script>
