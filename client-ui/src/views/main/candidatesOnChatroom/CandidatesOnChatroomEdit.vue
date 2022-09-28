<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit CandidatesOnChatroom</h3>
    <CandidatesOnChatroomForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CandidatesOnChatroomForm from "@/components/forms/CandidatesOnChatroomForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-candidatesonchatroom",
  components: {
    CandidatesOnChatroomForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit candidatesonchatroom", [
        "candidatesonchatrooms",
      ]);
    });
    return {};
  },
});
</script>
