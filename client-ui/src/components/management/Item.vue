<template>
  <div class="d-flex gap-3 justify-content-center align-items-center">
    <img :src="src" />
    <p class="infos__p mt-3">{{ p }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true,
    },
    p: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.infos__p {
  font-size: 12px;
  line-height: 12px;
}
</style>
