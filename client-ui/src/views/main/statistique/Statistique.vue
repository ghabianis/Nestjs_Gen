<template>
  <div class="d-flex bd-highlight" style="height: 660px">
    <div class="p-2 bd-highlight">
      <el-card class="card h-100" style="width: 220px" shadow="never">
        <div
          style="height: 120px"
          class="d-flex align-items-center justify-content-center mb-10"
        >
          <embed src="/svg/stats/stats-sidebar-image.svg" />
        </div>
        <el-menu
          :default-active="0"
          class="el-menu-vertical-demo"
          mode="vertical"
          :collapse="true"
        >
          <el-menu-item
            v-for="(item, index) in menu"
            :index="index"
            :key="item.title"
            @click="title = item.title, mediaType = item.mediaType"
            >
            <div class="d-flex gap-5 align-items-start">
              <img class="menu-icon" :src="item.icon" />
              <span>{{ item.title }}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>
    <div class="p-2 flex-grow-1 bd-highlight" shadow="never">
      <ChartCard :title="title? title : menu[0].title" :mediaType="mediaType"></ChartCard>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import chartCard from "./ChartCard.vue";
import i18n from "@/core/i18n/i18n";
import ChartCard from "./ChartCard.vue";
const { t } = i18n.global;
export default defineComponent({
  name: "Statistics",
  components: { chartCard, ChartCard },
  setup() {
    const title = ref("");
    const mediaType = ref("");
    const selectedChoice = ref("");
    const menu = reactive([
      {
        icon: "/svg/icons/stats/chart.svg",
        title: t("adminStatistic.sideMenu.allContentStats"),
        mediaType: 'all'
      },
      {
        icon: "/svg/icons/stats/post.svg",
        title: t("adminStatistic.sideMenu.rhContentStats"),
        mediaType: 'post'
      },
      {
        icon: "/svg/icons/stats/story.svg",
        title: t("adminStatistic.sideMenu.storiesStats"),
        mediaType: 'story'
      },
      {
        icon: "/svg/icons/stats/event.svg",
        title: t("adminStatistic.sideMenu.eventsStats"),
        mediaType: 'event'
      },
      {
        icon: "/svg/icons/stats/offer.svg",
        title: t("adminStatistic.sideMenu.offersStats"),
        mediaType: 'offer'
      },
    ]);
    const selectChoices = reactive([
      t("adminStatistic.mainCard.selectChoice.year"),
      t("adminStatistic.mainCard.selectChoice.month"),
      t("adminStatistic.mainCard.selectChoice.week"),
      t("adminStatistic.mainCard.selectChoice.day"),
    ]);
    return { menu, title, selectChoices, selectedChoice, mediaType };
  },
});
</script>
<style scoped lang="scss">
:deep(.el-card) {
  background: $bg-dark-600 !important;
}
:deep(.el-card__body) {
  padding: 15px !important;
}
:deep(.el-menu-item) {
  color: $text-color-100;

  padding: 12px !important;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: 0.01em;
  white-space: normal;
  align-items: baseline;
  height: auto;
  width: 192px;
  margin-bottom: 10px;
}
:deep(.el-menu-item:hover) {
  background-color: transparent !important;
}
:deep(.el-menu-item.is-active) {
  background: rgba(255, 255, 255, 0.06) !important;
  border-radius: 10px;
  color: $text-color-50;
  .menu-icon {
    filter: invert(42%) sepia(33%) saturate(830%) hue-rotate(264deg)
      brightness(114%) contrast(92%);
  }
}
:deep(.el-menu) {
  --el-menu-bg-color: transparent;
  border: none;
}

</style>
