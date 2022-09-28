<template>
  <div
    class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 bg-white"
  >
    <h3 class="text-center text-primary my-4">Edit Chat</h3>
    <ChatForm isEdit />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ChatForm from "@/components/forms/ChatForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-chat",
  components: {
    ChatForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Edit chat", ["chats"]);
    });
    return {};
  },
});
</script>
