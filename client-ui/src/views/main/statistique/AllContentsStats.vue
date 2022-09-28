<template>
  <div>
    <LineChart :chartData="chartData"></LineChart>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import LineChart from "./charts/LineChart";
export default defineComponent({
  name: "allContentsStats",
  props: {
    title: String,
  },
  components: { LineChart },
  setup() {
    const chartData = ref({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39, 10, 40, 39, 80, 40],
          pointStyle: 'circle',
          pointRadius: 3,
          pointHoverRadius: 5,
          borderColor: "#f87979",
        },
      ],
    });



    return { chartData };
  },
});
</script>
<style scoped lang="scss"></style>
