<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 100vh">
 
 
 <div class="video" v-if="!isMobile">

    <Video src="/mp4/video-retchee.mp4"/>

  </div>

  <div class="video " v-if="isMobile">

    <Video src="/mp4/videobackground.mp4"/>

  </div>


    <div class="w-lg-500px mb-10 mb-lg-3 mx-auto d-flex flex-column">
      <el-card class="card">
        <img alt="Logo" src="/svg/logos/logo.svg" class="h-60px mb-lg-20 logo" />
        <div class="card-body p-lg-9">
          <h1 class="d-flex justify-content-center fw-bolder">{{ t("signUpInterface.title") }}</h1>
          <div class="d-flex justify-content-center">
            <h4 class="text-white fw-bold">
              {{ t("alreadyHaveAnAccount") }}?
              <router-link :to="{ name: 'sign-in' }" class="fw-bolder">{{ t("signIn") }}</router-link>
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
            <label class="form-label fw-bolder text-gray-900 fs-6">
              {{
                t("password")
              }}
            </label>
            <el-input type="password" size="large" v-model="password" />
          </div>

          <div class="mt-lg-8" style="display:none">
            <label class="form-label fw-bolder text-gray-900 fs-6">
              {{
                t("role")
              }}
            </label>
            <el-select
              class="w-100"
              v-model="role"
              size="large"
              placeholder="Choisir role"
              style="width: auto"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </div>

          <div class="mt-lg-10 d-grid">
            <el-button @click="signUp()" type="primary" size="large" class="mt-2 bgColor">{{ t("signUp") }}</el-button>
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
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Video from "../inscription/bgVideo.vue";
import isMobileDevice from '../../core/helpers/isMobileDevice.ts'

let failMessage: string | null;

const roles = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
    disabled: true,
  },
    {
    value: "candidate_role",
    label: "candidate_role",
  },
    {
    value: "recruiter_role",
    label: "recruiter_role",
  },
];
export default defineComponent({
  name: "sign-up",
      components: {
    Video

  },
  setup() {
    failMessage = t("messages.signUpFailed");
    const authStore = useAuthStore();
    const password = ref("");
    const email = ref("");
    const role = ref("candidate_role");
    const router = useRouter();

    const signUp = async () => {
      try {
       const result = await authStore.signUp(email.value, password.value, role.value);
         console.log(result)
       if(result.data)
      setTimeout((e)=> {
        router.push({ name: "home" });
            },500)
      } catch (error) {
          console.log(error)
        Components.ElMessage.error(failMessage);
        console.log(error);
      }
    };

  let isMobile = isMobileDevice()

    return {
      t,
      email,
      password,
      role,
      roles,
      authStore,
      signUp,
      isMobile
    };
  },
});
</script>
<style lang="scss" scoped>
.bgColor {
  background-color: rgba(245, 134, 230, 1);
}
.video {
      width: 100%;
    position: fixed;
}
.card{
  background-color: rgba(21, 21, 33, 0.8)!important;
}
:deep(.is-always-shadow){
  border-color:none;
}
:deep(.card){
      background:rgba(21, 21, 33,0.8) !important;
}
.logo{
  text-align:center;
  width:100%
}
</style>