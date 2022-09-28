<template>
  <div>
    <el-dialog
          v-model="$props.showModal" 
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          custom-class="event-dialog__custom-class">
          <EventForm @close-modal="$emit('close-modal') , (resetEvent)" :isEdit="false"/>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EventForm from "@/components/forms/EventForm.vue";
import { useEventStore } from "@/store/useEventModule";

export default defineComponent({
  name: "create-event",
   props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    EventForm,
  },
  setup() {
    const { resetEvent } = useEventStore();
    return {resetEvent};
  },
});
</script>
<style lang="scss" scoped>
 :deep(.event-dialog__custom-class) {
    background: $bg-dark-600 !important;
    border-radius: 10px;
    width: 70%;
    max-width: 1100px;
    @media (max-width: 1100px) {
      width:90%;
  }

}
:deep(.el-dialog__header){
  padding:0px!important;
}
:deep(.el-dialog__body){
  padding:0px!important;
  color:$text-color-50;
}
</style>