<template>
  <!--begin::Toolbar-->
  <div class="toolbar__container" id="kt_toolbar">
    <!--begin::Container-->
    <div
      id="kt_toolbar_container"
      :class="{
        'container-fluid': toolbarWidthFluid,
      }"
      class="d-flex flex-stack mx-4"
    >
      <!--begin::Page title-->
      <div
        data-kt-swapper="true"
        data-kt-swapper-mode="prepend"
        data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
        class="page-title d-flex align-items-center flex-wrap me-3 mb-lg-0"
      >
        <ul
          v-if="breadcrumbs"
          class="breadcrumb breadcrumb-separatorless fw-bolder fs-7 my-1 toolbar-ul"
        >
           <template v-for="(item, index) in breadcrumbs" :key="index">
            <li class="fs-3 me-3  breadcrumb-item" :class="{'breadcrumb-item--selected': item === title}" @click="setBreadcrumbs({title:item})">
              <div class="me-2" v-if="item === $t('breadcrumb.active') && item === title">  <inline-svg src="/svg/toolbar/active.svg"> </inline-svg> </div>
              <div class="me-2" v-if="item === $t('breadcrumb.active') && item !== title">  <inline-svg src="/svg/toolbar/active-disabled.svg"> </inline-svg> </div>
              <div class="me-2" v-if="item === $t('breadcrumb.archives') && item === title">  <inline-svg src="/svg/toolbar/archive.svg"> </inline-svg> </div>
              <div class="me-2" v-if="item === $t('breadcrumb.archives') && item !== title">  <inline-svg src="/svg/toolbar/archive-disabled.svg"> </inline-svg> </div>
              <span class="breadcrumb-item__text">{{ item }}</span>
            </li>
          </template>
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->

      <!--begin::Actions-->
      <div class="d-flex align-items-center py-1 gap-6 justify-content-between"  :class="{'w-100':breadcrumbs && breadcrumbs.length === 0}">
        <div class="d-flex toolbar-input__container">
          <inline-svg src="/svg/icons/search.svg"></inline-svg>
          <input class="toolbar-input" placeholder="Rechercher" />
        </div>
        <el-button
          type="primary"
          @click="buttonUsed?.action?.()"
          class="btn-sm d-flex toolbar__btn align-items-center"
        >
          <el-icon v-if="icon" :size="15">
            <component :is="icon" />
          </el-icon>
          <span>{{ buttonUsed?.titleButton }}</span>
        </el-button>
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref } from "vue";
import { toolbarWidthFluid } from "@/core/helpers/config";
import { setModal } from "@/core/helpers/config";
import { useRouter, useRoute } from "vue-router";
import { useConfigStore } from "@/store/useConfig";
import { t } from "@/core/i18n/translate";

export default defineComponent({
  name: "KToolbar",
  props: {
    breadcrumbs: Array,
    title: String,
    icon: String,
  },
  components: {},
  setup() {
    const buttonUsed = ref();
    const titleButton = ref("");
    const router = useRouter();
    const route = useRoute();
    const {setBreadcrumbs} = useConfigStore()
    const openedPage = (value: any) => {
      if (value.includes("offers")) {
        buttonUsed.value = {
          action: () => router.push({ name: `create-offers` }),
          titleButton: "Créer un offers",
        };
      } else if (value.includes("stories")) {
        buttonUsed.value = {
          action: () => setModal("StoryCreate"),
          titleButton: "Créer un story",
        };
      } else if (value.includes("event")) {
        buttonUsed.value = {
          action: () => setModal("EventCreate"),
          titleButton: "Créer un événement",
        };
      } else if (value.includes("post")) {
        buttonUsed.value = {
          action: () => setModal("PostCreate"),
          titleButton: "Créer un post",
        };
      } else if (value.includes("video")) {
        buttonUsed.value = {
          action: () => setModal("VideoCreate"),
          titleButton: "Créer un video",
        };
      }
    };

    onMounted(async () => {
      openedPage(route.path);
    });

    watch(
      () => route.path,
      (value) => {
        openedPage(value);
      }
    );


    const handleChangeStateModal = () => {
      // setModal("KTCreateNewTicket");
      console.log("handleChangeStateModal");
    };
    const displayModalPlatform = () => {
      // setModal("KTCreatePlatformModal");
      console.log("KTCreatePlatformModal");
    };
    const displayButton = computed(() => {
      const pathName = router.currentRoute.value.path.split("/")[1];
      return pathName;
    });
    return {
      toolbarWidthFluid,
      displayButton,
      handleChangeStateModal,
      buttonUsed,
      setBreadcrumbs
    };
  },
});
</script>
<style scoped lang="scss">
#kt_toolbar_container{
  width:100%;
}
.toolbar__container {
  background: $bg-dark-600;
  background-image: url("/png/illustrations/toolbar-background.png");
  margin-top: 55px !important ;
  // background: #ffffff;
  margin: 0 auto;
  // left: 0px !important;
  height: 70.07px;
  border-radius: 10px;
  padding: 10px;
  opacity: 0.9;
  display: flex;
  width: 100%;
}
.toolbar-input {
  background: $bg-dark-500;
  border: none;
  border-radius: 8px;
  outline: none;
  color: $text-color-50;
  height: 100%;
  width: 100%;
}
.toolbar-input__container {
  width: 300px;
  height: 42px;
  display: flex;
  background: $bg-dark-500;
  padding: 12px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  @media (max-width: 1024px) {
    width:200px
  }

}
.toolbar__btn {
  //background: $primary-500;
  color: $text-color-250;
}

@media (min-width: 992px) {
  body {
    background: rgba(28, 33, 61, 1);
  }
}
.btn-primary {
  color: $text-color-250;
}
.el-icon {
  color: $text-color-250 !important;
}
.breadcrumb-item--selected{
  color:$primary-500;
  text-decoration: underline;
  text-underline-offset : 8px;
  text-decoration-thickness : 2px;
  text-underline-position: above;
 }


.breadcrumb-item:hover {
  cursor: pointer;
}
.breadcrumb-item__text{
  @media (max-width: 1024px) {
    display:none;
  }
}
</style>
