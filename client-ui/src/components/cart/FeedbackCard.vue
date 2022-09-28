<template>
<div class="d-flex flex-column justify-content-center align-items-center mt-0 mb-0  feedback-card">
    <div class="d-flex flex-column align-self-start ps-4" >
        <div class="feedback-card__title fs-9 ">{{title}}</div>
            <div class="d-flex align-items-center ">
                <div class="d-flex justify-content-center align-items-center mt-2 mb-2 me-2 feedback-card__icon " 
                :style="{backgroundColor: background}">
                    <el-icon v-if="icon"><component :is="icon" /></el-icon>
                     <inline-svg v-if="svg" :src="svg" />
                </div>
                <span class="feedback-card__value fs-7">{{value}}</span>
            </div>
    </div>                     
</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FeedbackCard",
  props: {
    title:{
        type:String,
        required: true
    },
    value : {
      type: Number,
      required :true
    }
    ,
    icon: {
        required: false,
        type: String
    },
    background : {
        required : true,
        type : String
    },
    svg: {
      required : false ,
      type: String
    }
  }
})
</script>
<style lang="scss">
.feedback-card {
  background: $bg-dark-500;
  border-radius: 10px;
  color: $text-color-10;
  box-sizing: border-box;
  height: 80px;
}

.feedback-card__title{
  font-weight: 600;
  color: $text-color-50
}

.feedback-card__value{
  font-weight: 500;
  color: $text-color-50
}
.feedback-card__icon {
  border-radius: 3.25507px;
  width:24px;
  height: 24px;
}

</style>