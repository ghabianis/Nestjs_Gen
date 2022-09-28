<template>
  

  <div
    class="d-flex align-items-center justify-content-center card"
    style="background-color:#070C27; height: 100vh"
  >
    <div class="video" v-if="!isMobile">

    <Video src="/mp4/video-retchee.mp4"/>

    </div>

  <div class="video " v-if="isMobile">

    <Video src="/mp4/videobackground.mp4"/>

    </div>
    <div class="w-lg-500px mb-10 mb-lg-3 mx-auto d-flex flex-column">
      <el-card class="card">
        <img alt="Logo" src="/svg/logos/logo.svg" class="h-60px w-100" />

        <div class="card-body p-lg-9">
          <h1 class="d-flex justify-content-center fw-bolder">{{ t("Connexion") }}</h1>
          <div class="d-flex justify-content-center mt-5">
            <h4 class="text-white fw-bold" style="font-size:14px">
              {{ t("Pas encore de compte ?") }}?
              <router-link :to="{ name: 'sign-up' }" class="fw-bolder">{{ t("Connectez-vous") }}</router-link>
            </h4>
          </div>
          <div class="mt-lg-10">
            <label class="form-label fw-bolder text-gray-900 fs-6">
              {{
                t("email")
              }}
            </label>
            <el-input size="large" type="email" v-model="email" />
          </div>
          <div class="mt-lg-8">
            <div class="row justify-content-between form-label">
              <div class="col-6 text-start fw-bolder text-gray-900 fs-6">{{ t("password") }}</div>
              <!-- <div class="col-6 text-end">
                <router-link :to="{ name: 'email-reset-password' }">{{ t("forgotPassword") }} ?</router-link>
              </div>-->
            </div>
            <el-input type="password" size="large" v-model="password" />
          </div>
          <div class="mt-lg-10 d-grid">
            <el-button
              @click="login()"
              type="primary"
              size="large"
              class="btn-lg mt-2 bgColor"
            >{{ t("Se connecter") }}</el-button>
          </div>
        </div>

      </el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
import { ref, defineComponent } from "vue";
import { storeToRefs } from "pinia";
import Video from "../inscription/bgVideo.vue";
import isMobileDevice from '../../core/helpers/isMobileDevice.ts'
import { useRoute, useRouter } from "vue-router";

let failMessage: string | null;
let window: {
  width: 0,
  height: 0
}
let isDesktop = true;

export default defineComponent({
  name: "sign-in",
  components: {
    Video

  },
  setup() {
    let width = document.documentElement.clientWidth
    failMessage = t("messages.loginFailed");
    const authStore = useAuthStore();
    const router = useRouter();
    const { accessToken } = storeToRefs(useAuthStore());
    const password = ref("");
    const email = ref("");
    const login = async () => {
      try {
        const result = await authStore.login(email.value, password.value);
        if (result.data)
          setTimeout((e) => {
            router.push({ name: "home" });
          }, 500)
      } catch (error) {
        console.log(error)
        Components.ElMessage.error(failMessage);
      }
    };
    //    const elem=()=> {
    //    this.size = window.innerWidth;
    //    return this.size;
    //     console.log("size" , this.size)
    //  },


    let isMobile = isMobileDevice()

    return {
      t,
      email,
      password,
      authStore,
      login,
      // elem,
      isDesktop,
      window,
      isMobile

    };
  },
});
</script>
<style lang="scss" scoped>
.card{
  background-color: rgba(21, 21, 33, 0.8)!important;
}
.video {
  width: 100%;
  position: fixed;
}
.el-input {
  background-color: #e9ecef;
}
.hr {
  width: 40%;
  color: #fff;
  height: 4px;
}
.bgColor {
  background-color: rgba(245, 134, 230, 1);
}
@media (max-width: 1200px) {
  .bg-login {
    display: none !important;
  }
}
#background-video {
  width: 100%;
}
.logo {
  cursor: pointer;
}
:deep(.card) {
  background: rgba(21, 21, 33, 0.8);
}
</style>
