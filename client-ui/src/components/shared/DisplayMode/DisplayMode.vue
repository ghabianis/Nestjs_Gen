<template>
    <div class="d-flex display-mode__container">
        <div class="d-flex align-items-center p-3"
                @click="$emit('horizantal')"
                :class="[displayVertical ? 'display_horizantal--disabled' : 'display_horizantal--active']" >
            <inline-svg  v-if="displayVertical" src="/svg/icons/horizantal_list.svg"></inline-svg>
            <inline-svg  v-else src="/svg/icons/horizantal_list_active.svg"></inline-svg>
        </div>
        <div class="d-flex align-items-center">
            <div  class=" d-flex px-3  h-100 align-items-center" 
                @click="$emit('vertical')"
                :class="[displayVertical ? 'display_vertical--active' : 'display_vertical--disabled']" >
                <inline-svg v-if="displayVertical" src="/svg/icons/vertical_list.svg"></inline-svg>
                <inline-svg  v-else src="/svg/icons/vertical_list_disabled.svg"></inline-svg>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, defineAsyncComponent } from "vue";
export default defineComponent({
  name: "DisplayMode",
  props : {
    displayVertical : {
        type : Boolean ,
        default: true
    }
  },
  emits: ["vertical","horizantal"],
  })
</script>
<style lang="scss" scoped>
    .display-mode__container:hover {
        cursor: pointer;
    }
  .display_vertical--active{
    background:  $primary-500;
    border-radius: 0px 6px 6px 0px;
  }
  .display_vertical--disabled{
    border: 1px solid $white-transparent-11;
    border-radius: 0px 6px 6px 0px;
}

  .display_horizantal--active{
    background: $primary-500;
    border-radius: 6px 0px 0px 6px;
  }

  .display_horizantal--disabled{
    border: 1px solid $white-transparent-11;
    border-radius: 6px 0px 0px 6px;
  }
</style>