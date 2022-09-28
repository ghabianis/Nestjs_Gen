<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">
      Create PublicationsOnCommunity
    </h3>
    <PublicationsOnCommunityForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PublicationsOnCommunityForm from "@/components/forms/PublicationsOnCommunityForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-publicationsoncommunity",
  components: {
    PublicationsOnCommunityForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create publicationsoncommunity", [
        "publicationsoncommunities",
      ]);
    });
    return {};
  },
});
</script>
