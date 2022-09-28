<template>
  <LineChart :chartData="chartData"></LineChart>
</template>
<script lang="ts">
import { useStatisticsStore } from "@/store/useStatisticsModule";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, watch } from "vue";
import LineChart from "./charts/LineChart";
const {
  GetRetcheeDataStatesPerYear,
  GetRetcheeDataStatesPerMonth,
  GetRetcheeDataStatesPerWeek,
  GetRetcheeDataStatesPerDay,
} = useStatisticsStore();
const { statsList } = storeToRefs(useStatisticsStore());
export default defineComponent({
  name: "StoriesStats",
  components: { LineChart },
  props: {
    date: String,
    type: String,
  },
  setup(props) {
      let dataset: Array<Object> = [];
      let labels = ref([]);
      const mediaType = "post"
      const chartData = ref({
        labels: labels.value,
        datasets: dataset,
      });

    const loadData = (
      List: Array<Object>,
      interaction: string,
      creationXXX: string
    ) => {
      return List.map((element: any) => {
        return {
          x: element[creationXXX],
          y: element._sum[interaction],
        };
      });
    };

    const fillDataset = (label: string, data: Array<Object>, color: string) => {
      dataset.push({
        label: label,
        data: data,
        //styling
        backgroundColor: color,
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 5,
        borderColor: color,
      });
    };
    let creationXXX: any = {
      year: "creation_month",
      month: "creation_weekofmonth",
      week: "creation_dayofweek",
      day: "creation_hour",
    };
    const loadChart = async () => {
      props.type == "year"
        ? await GetRetcheeDataStatesPerYear(
            props.date! ,
            mediaType
          )
        : props.type == "month"
        ? await GetRetcheeDataStatesPerMonth(
            props.date! ,
            props.type ? props.type : "month",
            mediaType
          )
        : props.type == "week"
        ? await GetRetcheeDataStatesPerWeek(
            props.date! ,
            props.type ? props.type : "week",
            mediaType
          )
        : props.type == "day"
        ? await GetRetcheeDataStatesPerDay(
            props.date! ,
            props.type ? props.type : "day",
            mediaType
          )
        : await GetRetcheeDataStatesPerYear("2022", mediaType);


      let data = ref(statsList.value.datasets[0].data);
      let colors = ref(statsList.value.datasets[0].color)
      labels.value = statsList.value.labels;
      dataset=[]
      fillDataset("Reach",loadData(data.value,"views",props.type? creationXXX[props.type]: creationXXX.year),colors.value[0]);
      fillDataset("Likes", loadData(data.value, "likes",props.type? creationXXX[props.type]: creationXXX.year), colors.value[1]);
      /* fillDataset("Comments", loadData(data.value, "comments",props.type? creationXXX[props.type]: creationXXX.year),colors.value[2]);
      fillDataset("Shares",loadData(data.value,"shares",props.type? creationXXX[props.type]: creationXXX.year),colors.value[3]);
       */
      chartData.value.labels = labels.value;
      chartData.value.datasets = dataset;
    };

    watch(
      () => props.date,
      async (first, second) => {
        console.log(
          "Watch props.selected function called with args:",
          first,
          second
        );
        await loadChart();
      }
    );
    onMounted(async () => {
      await loadChart();
    });
    return { chartData };
  },
});
</script>
