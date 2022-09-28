<template>
    <el-dropdown trigger="click" popper-class="offer-card__footer-dropdown">
        <div style="width:10px" class="d-flex justify-content-center"><inline-svg src="/svg/icons/more.svg" ></inline-svg></div>
        <template #dropdown>
            <el-dropdown-menu>
                    <el-dropdown-item  class="p-2"  @click="$emit('save')"><el-icon :size="20" :class="{savePost: isSaved}" ><CollectionTag /></el-icon> <span :class="{savePost: isSaved}" class="ms-2 ">{{isSaved? "Saved": "Save"}}</span></el-dropdown-item>
                    <el-dropdown-item  class="p-2"  @click="$emit('copyLink')"><el-icon :size="20"><Link /></el-icon><span class="ms-2">Copy Link</span></el-dropdown-item>
            </el-dropdown-menu>
        </template>                    
    </el-dropdown>
</template>

<script lang="ts">

  import { defineComponent, ref } from 'vue';
  export default defineComponent({

    props: {
        isSaved:{
          required: true,
          type: Boolean,
        }
    },
    
    setup(){
      return {
        
      }
    }
  })
  
</script>

<style lang="scss" scoped>
  .el-dropdown-menu{
    background-color: $bg-dark-500;
    padding:10px;
    border-color:black;
  }
  :deep(.el-dropdown-menu__item){
  color: $text-color-50;
  
  }
  :deep(.el-dropdown-menu__item:hover){
    background-color: $white-transparent-11;
    border-radius: 6px;
    color: $text-color-50;
  } 
  .savePost, .saveIcon{
    color: $primary-500;
  }
</style>

<style>
  div .offer-card__footer-dropdown{
    border-radius: 20px!important;
    border: 0!important;
  }
  .el-popper__arrow::before{
    content: none!important;
  }
  .el-tooltip__trigger:hover{
    cursor: pointer;
  }

</style>