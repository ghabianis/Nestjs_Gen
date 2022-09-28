<template>
    <el-dropdown trigger="click" popper-class="offer-card__footer-dropdown">
        <div style="width:10px" class="d-flex justify-content-center"><inline-svg src="/svg/icons/more.svg" ></inline-svg></div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item v-if="duplicate==true" @click="$emit('duplicate')"><inline-svg src="/svg/icons/duplicate.svg"/> <span class="ms-2">Dupliquer</span></el-dropdown-item>
                    <el-dropdown-item @click="$emit('edit')"><inline-svg src="/svg/icons/edit.svg"/><span class="ms-2">Modifier</span></el-dropdown-item>
                    <el-dropdown-item @click="$emit('delete')"><inline-svg src="/svg/icons/delete-icon.svg"/><span class="ms-2"> Supprimer</span></el-dropdown-item>
                    <el-dropdown-item @click="$emit('share')"><inline-svg src="/svg/icons/share.svg"/><span class="ms-2">Partager</span></el-dropdown-item>
            </el-dropdown-menu>
        </template>                    
    </el-dropdown>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props:{
    duplicate : {
        default : true,
        type: Boolean,
    }
  },
  
  setup(){
    return {}
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