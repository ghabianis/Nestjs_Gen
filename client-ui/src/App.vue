<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ElConfigProvider } from "element-plus";
import fr from "element-plus/lib/locale/lang/fr";
import en from "element-plus/lib/locale/lang/en";
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/store/useAuth";

const { locale } = useI18n({});

const currentLang = computed(() => {
  if (locale.value === "en") {
    return en;
  } else {
    return fr;
  }
});
let { getCurrent } = useAuthStore();

onMounted(async () => {
  await getCurrent();
});


</script>
<template>
  <ElConfigProvider :locale="currentLang">
    <router-view />
  </ElConfigProvider>
</template>

<style lang="scss">

body {
  height: 100vh;
  overflow-y: scroll;
  background-color:$bg-dark-700
}
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap");
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
}
</style>
