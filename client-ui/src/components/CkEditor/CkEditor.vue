<template>
    <ckeditor :editor="editor" :config="editorConfig"  @input="handleInput" :model-value="modelValue" ></ckeditor>  
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default defineComponent({
    props:{
        modelValue : String
    },
        components: {
      ckeditor: CKEditor.component,
       },
    setup(props,{emit}) {
      const editor = ClassicEditor
      const editorConfig = ref({
          toolbar:{
            items:['heading','bold', 'italic','BulletedList', 'numberedList']
          },
          placeholder:"Type description ..."
        })
      const handleInput = (data:string) => {
            emit('update:modelValue',data)
      }
      return{editor, editorConfig, handleInput}
    },
})
</script>
<style lang="scss" >
.ck .ck-editor__main>.ck-editor__editable{
    background: $bg-dark-500;
    height: 120px;
    outline:none!important;
    color:white!important;
}
.ck {
    background:  $bg-dark-500!important;;
    border:none!important;
    color:white!important;
    border-radius: 5px!important;
}
.ck-editor {
    width:100%!important;
}
.ck.ck-button:hover, a.ck.ck-button:hover{
    background: $bg-dark-500!important;
    color: $white-50!important;
}
.ck-toolbar{
  border-bottom: 1px solid $white-transparent-11!important;
  padding:5px!important ;
  border-end-end-radius:0!important;
  border-end-start-radius:0!important;

}
.ck.ck-button.ck-on{
    background: $bg-dark-500!important;
}
.ck.ck-button.ck-on:hover{
    background: $bg-dark-500!important;
}
.ck.ck-tooltip.ck-tooltip_s{
    display: none!important;
    }

.ck-toolbar__items{
  flex: 0!important;
}
.ck-tooltip_s{
  display: none!important;
}
.ck-heading_paragraph{
  background: $bg-dark-500!important;
}
.ck-list__item{
    background: $bg-dark-500!important;
}
.ck-placeholder:before{
  color:$white-50!important;
}

</style>