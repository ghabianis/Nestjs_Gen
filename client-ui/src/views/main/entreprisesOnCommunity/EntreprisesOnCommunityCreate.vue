<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create EntreprisesOnCommunity</h3>
    <EntreprisesOnCommunityForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EntreprisesOnCommunityForm from "@/components/forms/EntreprisesOnCommunityForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-entreprisesoncommunity",
  components: {
    EntreprisesOnCommunityForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create entreprisesoncommunity", [
        "entreprisesoncommunities",
      ]);
    });
    return {};
  },
});
</script>
