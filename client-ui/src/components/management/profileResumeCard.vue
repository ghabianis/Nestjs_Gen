<template>
  <div>
    <div class="title">{{ title }}</div>
    <div style="width: 158px; overflow: hidden">
      <div v-if="type == 'pdf'">
        <div style="background: transparent; position: absolute; width:-webkit-fill-available; height:-webkit-fill-available"></div>
        <embed
          style="cursor: pointer"
          class="resume_container"
          :src="mediaSrc"
        />
      </div>
      <video
        v-if="type == 'video'"
        :src="mediaSrc"
        class="resume_container"
      ></video>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "ProfileResumeCard",
  props: {
    title: { type: String, required: true },
    mediaSrc: { type: String, required: true },
    type: { type: String, required: true },
  },
  setup() {},
});
</script>
<style lang="scss" scoped>
.resume_container {
  width: 172px;
  height: 172px;
  border-radius: 5px;
}
.title {
  color: $text-color-placeholder;
}
</style>
