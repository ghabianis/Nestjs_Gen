<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">Create Chatroom</h3>
    <ChatroomForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ChatroomForm from "@/components/forms/ChatroomForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
export default defineComponent({
  name: "create-chatroom",
  components: {
    ChatroomForm,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("create chatroom", ["chatrooms"]);
    });
    return {};
  },
});
</script>
