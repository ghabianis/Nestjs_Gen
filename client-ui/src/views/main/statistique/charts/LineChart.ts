import { defineComponent, h, PropType } from "vue";
import lineChartOptions from "../chartOptions/lineChartOptions.json"
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale, 
  Plugin,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default defineComponent({
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 420,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"line">[]>,
      //default: () => []
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
    },
  },
  setup(props) {
    const plugins = [
      {
        id: "increase-legend-spacing",
        beforeInit(chart) {
          // Get reference to the original fit function
          const originalFit = (chart.legend as any).fit;
          // Override the fit function
          (chart.legend as any).fit = function fit() {
            // Call original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            this.height += 50;
          };
        },
      },
    ];
    return () =>
      h(Line, {
        chartData: props.chartData,
        chartOptions: props.chartOptions ? props.chartOptions : lineChartOptions,
        chartId: props.chartId,
        datasetIdKey: props.datasetIdKey,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins ? props.plugins : plugins,
      });
  },
});
