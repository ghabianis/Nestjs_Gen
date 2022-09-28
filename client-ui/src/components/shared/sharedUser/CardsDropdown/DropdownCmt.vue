<template>
    <el-dropdown trigger="click" popper-class="offer-card__footer-dropdown">
        <div style="width:10px" class="d-flex justify-content-center"><el-icon color="#F6F8FB" class="mt-1"><MoreFilled /></el-icon></div>
        <template #dropdown>
            <el-dropdown-menu>
                    <el-dropdown-item @click="$emit('edit')"><el-icon><EditPen /></el-icon><span class="ms-2">Edit</span></el-dropdown-item>
                    <el-dropdown-item @click="$emit('delete')"><el-icon><Delete /></el-icon><span class="ms-2">Delete</span></el-dropdown-item>
            </el-dropdown-menu>
        </template>                    
    </el-dropdown>
</template>

<!-- ts  -->
<script lang="ts">

  import { defineComponent } from 'vue'
  export default defineComponent({
    setup(){
        return {}
    }
  })

</script>

<!-- //css  -->
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