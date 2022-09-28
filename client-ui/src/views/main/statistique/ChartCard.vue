<template>
  <div class="h-100">
    <el-card class="p-4 px-6 card h-100">
      <div class="d-flex bd-highlight align-items-center mb-2">
        <div class="flex-grow-1 bd-highlight chart-title me-2">{{ title }}</div>
        <div class="px-5 bd-highlight" style="width: 25%">
          <el-select
            v-model="selectedChoice"
            :placeholder="$t('adminStatistic.mainCard.selectPlaceholder')"
            size="large"
            popper-class="popper-select"
          >
            <el-option
              v-for="item in selectChoices"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            >
              <div>
                <el-date-picker
                  class="mt-2 date-picker"
                  :editable="false"
                  :clearable="false"
                  v-model="item.value"
                  :type="item.type"
                  :placeholder="item.label"
                  size="small"
                  :value-format="item.format"
                  popper-class="date-picker-popper"
                  @blur="onBlurDatePicker(item.value, item.type)"
                />
              </div>
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-if="mediaType == 'all'"><AllContentsStats /></div>
      <div v-if="mediaType == 'post'"><HrContentStatsVue  :date="choosedDate" :type="dateType"/></div>
      <div v-if="mediaType == 'story'"><StoriesStatsVue  :date="choosedDate" :type="dateType"/></div>
      <div v-if="mediaType == 'event'"><EventStatsVue  :date="choosedDate" :type="dateType"/></div>
      <div v-if="mediaType == 'offer'"><OfferStatsVue  :date="choosedDate" :type="dateType"/></div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import i18n from "@/core/i18n/i18n";
import AllContentsStats from "./AllContentsStats.vue";
import HrContentStatsVue from "./HrContentStats.vue";
import StoriesStatsVue from "./StoriesStats.vue";
import EventStatsVue from "./EventStats.vue";
import OfferStatsVue from "./OfferStats.vue";
const { t } = i18n.global;
export default defineComponent({
  name: "StatsCard",
  props: {
    title: String,
    mediaType: String,
  },
  components: { AllContentsStats, HrContentStatsVue, StoriesStatsVue, EventStatsVue, OfferStatsVue },

  setup() {
    const selectedChoice = ref("");
    const choosedDate = ref("");
    const dateType = ref("");
    const year = ref("");
    const month = ref("");
    const week = ref("");
    const day = ref("");
    const selectChoices = reactive([
      {
        label: t("adminStatistic.mainCard.selectChoice.year"),
        type: "year",
        value: year,
        format: "YYYY-MM-DD",//YYYY YYYY-MM-DD
      }, 
      {
        label: t("adminStatistic.mainCard.selectChoice.month"),
        type: "month",
        value: month,
        format: "YYYY-MM-DD",//MMM YYYY
      }, 
      {
        label: t("adminStatistic.mainCard.selectChoice.week"),
        type: "week",
        value: week,
        format: "YYYY-MM-DD",/* YYYY [Week] ww  [start at] MMM DD */
      } ,
      {
        label: t("adminStatistic.mainCard.selectChoice.day"),
        type: "day",
        value: day,
        format: "YYYY-MM-DD",//MMM DD YYYY
      }, 
    ]);

    const formatOptions = ref({
      year: { year: "numeric" },
      month: { month: "short", year: "numeric" },
      day: { month: "short", year: "numeric", day: "numeric" },
    });

    const formatDate = (val: any, type: string) => {
      const date = new Date(val)
      let formattedDate : string =''
      type == "week"
        ? (formattedDate =
            "Week: " +
            new Intl.DateTimeFormat(
              "en-US",
              { month: "short", day: "numeric" }
            ).format(date) +
            " - " +
            new Intl.DateTimeFormat(
              "en-US",
              { month: "short", year: "numeric", day: "numeric" }
            ).format(new Date(date.setDate(date.getDate() + 6))))
        : (formattedDate = new Intl.DateTimeFormat(
            "en-US",
            formatOptions.value[type]
          ).format(date));
          return formattedDate;
    };

    const onBlurDatePicker = async (val: any, type: string) => {
      selectedChoice.value = formatDate(val, type)
      choosedDate.value = val;
      dateType.value = type;
      year.value = "";
      month.value = "";
      week.value = "";
      day.value = "";


      //await fetchPostsByDate(val, type);
    };

    return {
      selectChoices,
      selectedChoice,
      year,
      month,
      week,
      day,
      dateType,
      choosedDate,
      onBlurDatePicker,
    };
  },
});
</script>
<style scoped lang="scss">
.chart-title {
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
  color: $text-color-10;
}
:deep(.el-select .el-select--large) {
  background: #575a64;
  --el-select-input-color: $text-color-10;
}
:deep(.el-input) {
  --el-input-placeholder-color: $text-color-10;
}
:deep(.el-input__inner) {
  background-color: $bg-dark-400;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  height: 44px;
  box-shadow: none;
  padding-left: 20px !important;
}
:deep(.date-picker .el-input__inner) {
  background-color: transparent;
  border: none;
  height: auto;
  box-shadow: none;
  padding-left: 0% !important;
  font-weight: 500;
  font-size: 12px;
  border-radius: 0%;
}
:deep(.el-select) {
  border: none;
  --el-select-border-color-hover: var(--el-input-transparent-border) !important;
  --el-select-input-focus-border-color: var(
    --el-input-transparent-border
  ) !important;
}
:deep(.el-input__prefix) {
  display: none;
}
:deep(.el-popper.is-pure.is-light.el-picker__popper) {
  border-radius: 5px !important;
}
:deep(.el-picker-panel__body) {
  background-color: #fff !important;
}
:deep(li.el-select-dropdown__item) {
  height: auto !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: transparent !important;
}
</style>

<style lang="scss">
div .popper-select {
  width: 280px !important;
}

.el-popper__arrow::before {
  content: none !important;
}
div .date-picker-popper {
  border-radius: 5px !important;
  background-color: #fff;
  width: 250px;
  transform: translate(-275px, -50px);
}
div .date-picker-popper .el-picker-panel__body {
  background: #fff !important;
  color: var(--el-text-color-primary) !important;
  border-radius: 5px !important;
  width: 200px !important;
}
div .el-date-picker__header {
  width: 210px !important;
}
div .el-date-picker__header-label,
div .el-picker-panel__icon-btn {
  color: var(--el-text-color-primary) !important;
  font-size: 12px;
  padding: 0 3px;
}
div .el-date-picker {
  width: 250px !important;
}
div .el-year-table,
div .el-date-table,
div .el-month-table {
  width: 75% !important;
}
div .el-date-table th {
  font-size: 10px;
  font-weight: 700;
}
</style>
