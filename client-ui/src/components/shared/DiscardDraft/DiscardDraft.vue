<template>
      <el-dialog
        v-model="dialogVisible"
        :title="title"

        top="35vh"
        :show-close="false"
        @close="dialogVisible=false"
        custom-class="discard-dialog"
        append-to-body

      >
        <span class="discard-dialog__message">{{message}}</span>
        <template #footer>
          <span>
            <el-button
              class="discard-dialog__cancel-btn"
              plain
              size="large"
              @click="dialogVisible=false"
              :class="cancelBtnStyle"
              >{{cancelText }}</el-button
            >
            <el-button
              class="discard-dialog__share-btn"
              size="large"
              @click="($emit('discard')),(dialogVisible=false)"
              :class="discardBtnStyle"
              >{{ discardText }}</el-button>
          </span>
       </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { t } from '@/core/i18n/translate'

export default defineComponent({
  emits:['discard','close'],
  props:{
    title : {
      type: String,
      required:true
    },
    message:{
      type: String,
      required:true
    },
    cancelText:{
      type: String,
      required:true
    },
    discardText:{
      type: String,
      required:true
    },
    cancelBtnStyle:{
      type: String,
      required:false
    },
    discardBtnStyle:{
      type: String,
      required:false
    }
  },
  setup(props,ctx) {
    const dialogVisible = ref(true)
    watch(dialogVisible,()=>{
      ctx.emit("close")
    })
    return {dialogVisible}
  },
})
</script>
<style  lang="scss">
.discard-dialog {
  background: $bg-dark-600;
  border-radius: 10px;
  width:25%;
  @media (max-width:1440px) {
    width:40%
  }
  @media (max-width:1000px) {
    width:60%
  }
    @media (max-width:768px) {
    width:80%
  }



  .el-dialog__title,
  .el-dialog__body {
    color: $text-color-50;
    word-break: break-word;
  }
  .el-dialog__header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
    padding-bottom: var(--el-dialog-padding-primary);
    margin-right: 0;
  }
  .el-dialog__footer{
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    padding-top: var(--el-dialog-padding-primary);
  }

  &__cancel-btn, &__cancel-btn:hover, &__cancel-btn:focus{
  background: none;
  color:$primary-500;
  border-color:$primary-500;
  font-weight: 600;  
}
&__share-btn, &__share-btn:hover, &__share-btn:focus{
  background: $primary-500;
  color: $text-color-250;
  border-color: transparent;
  font-weight: 600;  
}
&__message {
  color:$text-color-100;
}
}
.danger,.danger:hover{
  border-color: $red-500;
  color: $red-500;
}
.success,.success:hover{
  background: $success-500;
}
</style>
