<template>
  <!-- <el-button text >click to open the Dialog</el-button> -->
  <div @click="dialogVisible = true" style=" cursor: pointer;" class="d-flex cursor gap-1 align-items-center"><inline-svg src="/svg/icons/postReactions/share.svg"/> Share </div>
  <div>
    <el-dialog v-model="dialogVisible" title="Share on social media" :before-close="handleClose">
      <div class="d-flex flex-column align-items-stretch flex-nowrap gap-3">
        <button @click="() => { $emit('shareOnLinkedin'); dialogVisible=false}" class="media-btn"><inline-svg src="/svg/socialMediaLogos/linkedin.svg"/>share on linkedin</button>
        <button @click="() => { $emit('shareOnFacebook'); dialogVisible=false}" class="media-btn"><inline-svg src="/svg/socialMediaLogos/facebook.svg"/>share on Facebook</button>
        <button @click="() => { $emit('shareOnInstagram'); dialogVisible=false}" class="media-btn"><inline-svg src="/svg/socialMediaLogos/instagram.svg"/>share on Instagram</button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  export default defineComponent({
      emits: ["shareOnLinkedin", "shareOnFacebook", "shareOnInstagram"],
      setup(_props){
        const dialogVisible = ref(false)

        const handleClose = (done: () => void) => {
          done()
        }

        return{
         dialogVisible,
         handleClose

        }
      }
  })
</script>


<style lang="scss" scoped>

  :deep(.el-dialog) {
    --el-dialog-bg-color: #1E2027!important;
    --el-dialog-width: 420px;

  };
    //display the modal for the mobile large 425px
  @media (max-width: 500px) {
  :deep(.el-dialog) {
      --el-dialog-width: 90%;
    }
  }
.media-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: $bg-dark-500;
  color: $text-color-50;
}

:deep(.el-dialog__title,
.el-dialog__headerbtn .el-dialog__close) {
  color: $text-color-50;
  font-size: 16px;
}
:deep(.el-dialog__body){
  padding-top: 20px;
}

</style>