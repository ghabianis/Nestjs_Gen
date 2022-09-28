<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create OffersOnCommunity</h3>
    <OffersOnCommunityForm :isEdit="false" />
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
      setCurrentPageBreadcrumbs("create offersoncommunity", [
        "offersoncommunities",
      ]);
    });
    return {};
  },
});
</script>
