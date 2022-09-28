<template>
  <!--begin::Toolbar-->
  <div class="toolbar__container" id="kt_toolbar"
  :style="{
      backgroundImage: image? 'url('+image+')': undefined,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right'
    }">
    <!--begin::Container-->
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
      }"
      class="ms-4"
    >
      <!--begin::Page title-->
      <div
        data-kt-swapper="true"
        data-kt-swapper-mode="prepend"
        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
        class="row align-items-center me-3 mb-5 mb-lg-0  position-relative h-100"
      >
      <!--begin::Page title-->
        <div class="col ps-8 position-absolute">
          <!--begin::Title-->
          <h1 class="fw-bolder my-5">
            {{ title }}
          </h1>
          <!--end::Title-->

          <!--begin::SubTitle-->
          <h5 v-if="$props.subTitle" style="color: #BCBEC2">
            {{ subTitle }}
          </h5>
          <!--end::SubTitle-->
        </div>
      <!--end::Page title-->
      <!--begin::image-->
      <!-- <div class="col align-self-end" >
         <img v-if="image" :src="image"> 
      </div> -->
      <!--begin::image-->
      </div>
    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { toolbarWidthFluid } from "@/core/helpers/config";

export default defineComponent({
  name: "KToolbar",
  props: {
    title: String,
    subTitle: String,
    image: String,
  },
  components: {},
  setup() {
    onMounted(async () => {});
    return {
      toolbarWidthFluid,
    };
  },
});
</script>
<style scoped lang="scss">
#kt_toolbar_container {
  width: 100%;
  height: 100%;
}
.toolbar__container {
  background: $bg-dark-600;
  margin-top: 7% !important ;
  height: 125px;
  border-radius: 10px;
  width: 100%;
}
@media (min-width: 992px) {
  body {
    background: rgba(28, 33, 61, 1);
  }
}
</style>
