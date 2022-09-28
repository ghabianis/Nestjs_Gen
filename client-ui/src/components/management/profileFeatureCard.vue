<template>
<div>
 <el-card class="card rounded-bottom" :body-style="{ padding: '0px' }">
        <img
          src="/png/talentManagement/profile_test_1.png"
          class="image"
        />
        <div style="padding: 10px">
          <div class="content_container">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit molestie aliquet </div>
          <div class="bottom">
            {{$t('talentManagement.profileDrawer.featureCard.seeMore')}}
          </div>
        </div>
      </el-card></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProfileFeatureCard",
  props: {
    picture: { type: String },
    content: { type: String },
  },
  setup() {
  },
});
</script>
<style lang="scss" scoped>
.image {
  width: 100%;
  display: block;
  height: 210px;
}
.bottom {
  text-align: end;
  font-size: 12px;
}
.el-card{
 width: 100%;
 background: $bg-dark-600  !important;
 color:white;
}

</style>

