<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Message</h3>
    <MessageForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import MessageForm from "@/components/forms/MessageForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-message",
  components: {
    MessageForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit message", ["messages"]);
    });
    return {};
  },
});
</script>
