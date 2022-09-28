<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit EntreprisesOnCommunity</h3>
    <EntreprisesOnCommunityForm isEdit />
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
      setCurrentPageBreadcrumbs("Edit entreprisesoncommunity", [
        "entreprisesoncommunities",
      ]);
    });
    return {};
  },
});
</script>
