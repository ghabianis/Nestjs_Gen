<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit OffersOnCommunity</h3>
    <OffersOnCommunityForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import OffersOnCommunityForm from "@/components/forms/OffersOnCommunityForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-offersoncommunity",
  components: {
    OffersOnCommunityForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit offersoncommunity", [
        "offersoncommunities",
      ]);
    });
    return {};
  },
});
</script>
