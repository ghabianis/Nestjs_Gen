<template>
  <div>
    <el-avatar :shape="shape" :size="size">{{
      firstName?.[0].toUpperCase() + lastName?.[0].toUpperCase()
    }}</el-avatar>
    <h4 id="fn-ln">
      {{firstName + lastName}}
    </h4>

  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    shape: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 40,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.el-avatar {
  background-color: #e8fff3;
  color: #50cd89;
}
#fn-ln{
  display: inline;
  padding-left: 16px;
}
</style>
