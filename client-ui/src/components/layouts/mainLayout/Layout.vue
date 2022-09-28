<template>
    <img class=" img-cover" src="/png/icons/cover.png" />

  <KTLoader v-if="loaderEnabled" :logo="loaderLogo"></KTLoader>

  <!-- begin:: Body -->
  <div class="page d-flex flex-row flex-column-fluid p-abs w-100">
    <!-- begin:: Aside Left -->
    <KTAside v-if="asideEnabled" :lightLogo="themeLightLogo"></KTAside>
    <!-- end:: Aside Left -->

    <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper ">
      <KTHeader :title="pageTitle">
        <div
          class="d-none d-lg-flex align-items-stretch flex-shrink-0 logo-nav"
        >
          <Logo></Logo>
        </div>
        <!--begin::Navbar-->
        <div class="d-flex align-items-stretch" id="kt_header_menu_nav">
          <Menu></Menu>
        </div>
        <!--end::Navbar-->

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0 ">
          <Topbar></Topbar>
        </div>
      </KTHeader>
      <!-- begin:: Content -->
      <div
        id="kt_content"
        class="content d-flex flex-column flex-column-fluid content__container pt-15"
      >
        <!-- begin:: Content Head -->
        <KTToolbar
          v-if="subheaderDisplay"
          :breadcrumbs="pageBreadcrumbPath"
          :title="pageTitle"
          :icon="icon"
        />

           <KTToolbarVideo 
            v-if="videoSubheaderDisplay"
            title="Vidéothèque"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod at hendrerit dolor turpis natoque netus pellentesque ultrices."  
            button='Créer Vidéothèque'
            src="./background.svg" 
        />

        <!-- end:: Content Head -->

        <!-- begin:: Content Body -->
        <div class="post d-flex">
          <div
            id="kt_content_container"
            :class="{
              'container-fluid': contentWidthFluid,
            }"
            class="w-100 p-0"
            >
            <router-view />
          </div>
        </div>
        <!-- end:: Content Body -->
      </div>
      <!-- end:: Content -->
      <!-- <KTFooter></KTFooter> -->
    </div>
  </div>
   <ModalLoader></ModalLoader> 
  <!-- end:: Body -->
  <KTScrollTop></KTScrollTop>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from "vue";

import { useRoute, useRouter } from "vue-router";
import KTAside from "@/components/layouts/mainLayout/aside/Aside.vue";
import KTHeader from "@/components/layouts/mainLayout/header/HeaderDevFactory.vue";
import KTFooter from "@/components/layouts/mainLayout/footer/FooterDevFactory.vue";
import HtmlClass from "@/core/services/LayoutService";
import KTToolbar from "@/components/layouts/mainLayout/toolbar/Toolbar.vue";
import KTScrollTop from "@/components/layouts/mainLayout/extras/ScrollTop.vue";

import KTLoader from "@/components/shared/Loader.vue";

import { MenuComponent, DrawerComponent } from "@/assets/ts/components/index";
import {
  loaderEnabled,
  contentWidthFluid,
  loaderLogo,
  asideEnabled,
  subheaderDisplay,
  themeLightLogo,
  videoSubheaderDisplay
} from "@/core/helpers/config";
import ModalLoader from "@/components/shared/ModalLoader.vue";
import Logo from "./header/Logo.vue";
import Menu from "./header/Menu.vue";
import Topbar from "./header/Topbar.vue";
import { useBodyStore } from "@/store/useBodyModule";
import { useConfigStore } from "@/store/useConfig";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/useAuth";
import KTToolbarVideo from "@/components/management/Toolbar.vue";

export default defineComponent({
  name: "Layout",
  components: {
    KTAside,
    KTHeader,
    KTFooter,
    KTToolbar,
    KTScrollTop,
    KTLoader,
    ModalLoader,
    Logo,
    Menu,
    Topbar,
    KTToolbarVideo
  },
  setup() {
    const { addBodyClassName, removeBodyClassName } = useBodyStore();
    const route = useRoute();

    // show page loading
    addBodyClassName("page-loading");
    // store.dispatch(Actions.FETCH_USER_TOKEN);

    // initialize html element classes
    HtmlClass.init();

    const tokenUser = computed(() => {
      // return store.getters.userToken;
      return "token";
    });

    const { pageBreadcrumbPath, pageTitle, icon } = storeToRefs(useConfigStore());
    const user = useAuthStore();
    onMounted(() => {
      //check if current user is authenticated
      //user.getCurrent();

      DrawerComponent.bootstrap();
      DrawerComponent.updateAll();

      // Simulate the delay page loading
      setTimeout(() => {
        // Remove page loader after some time
        removeBodyClassName("page-loading");
      }, 200);
    });

    watch(
      () => route.path,
      () => {
        MenuComponent.hideDropdowns(undefined);

        DrawerComponent.hideAll();

        // check if current user is authenticated
        //user.getCurrent();
      }
    );

    return {
      loaderEnabled,
      contentWidthFluid,
      loaderLogo,
      asideEnabled,
      subheaderDisplay,
      pageTitle,
      icon,
      pageBreadcrumbPath,
      themeLightLogo,
      videoSubheaderDisplay
    };
  },
});
</script>

<style scooped lang="scss">
  .img-cover{
    border-bottom-left-radius: 32px !important;
    border-bottom-right-radius: 32px !important;
  }
 #kt_wrapper{
  align-items: center;
 }
.toolbar{
  position:relative;
}
.p-abs{position: absolute !important;}
.cover-img{
  z-index: -89999;
  margin-top: -35px;
  border-end-end-radius: 10px ;
  opacity:0.5;
  width: 100%;
  height: 400px;
}

.content__container{
  width: 1400px;
}
@media (min-width: 992px) {
  .wrapper {
    padding-left: 0px !important;
  }
}
@media (max-width: 1440px) {
  .content__container {
    width: 1300px;
  }
}
@media (max-width: 1350px) {
  .content__container {
    width: 1000px;
  }
}
@media (max-width: 1024px) {
  .content__container {
    width: 600px;
  }
}

@media (max-width: 800px) {
  .content__container {
    width: 500px;
  }
}

</style>