<template>
  <div class="d-flex flex-wrap inputTag__container">
    <el-tag
        v-for="tag in tags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        class="m-1 tag"
    >
        {{ tag }}
    </el-tag>
    <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
        size="small"
        maxLength="30"
        class="m-1"
        style="width:130px"
    />
    <el-button v-if="addBtnVisibleComp" class="button-new-tag m-1" size="small" @click="showInput">
       {{ btnText }}
    </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, nextTick, computed } from 'vue'
import { ElInput } from 'element-plus'

export default defineComponent({
    emits: ["change",'delete'],
    props:{
        tags : {
            type: Array as PropType<string[]>,
            required:true,
        },
        btnText : {
            type:String,
            required:true
        }
    },
    setup(props,{emit}) {
        const inputValue = ref('')
        const inputVisible = ref(false)
        const InputRef = ref<InstanceType<typeof ElInput>>()
        const addBtnVisible = ref(true)
        const handleClose = (tag: string) => {
             emit('delete',tag)
             if ( props.tags.length < 5 && !addBtnVisible.value ) {
                addBtnVisible.value = true
             }
        }
        const addBtnVisibleComp = computed(()=>{
             return addBtnVisible.value || props.tags.length ==0 && !inputVisible.value
        })
        const showInput = () => {
        inputVisible.value = true
        addBtnVisible.value = false
        nextTick(() => {
            InputRef.value!.input!.focus()
        })

        }

        const handleInputConfirm = () => {
        if (inputValue.value.trim()) {
            emit("change",inputValue.value.trim())
        }
        inputVisible.value = false
        inputValue.value = ''
        if (props.tags.length > 4 ) {
            addBtnVisible.value = false
        }else {
            addBtnVisible.value = true
        }
        }

    return {inputValue, inputVisible,addBtnVisible ,addBtnVisibleComp, handleClose, showInput, handleInputConfirm,InputRef}

    },
})
</script>
<style lang="scss" scoped>
    .inputTag__container {
        background: $bg-dark-500;
        width:fit-content;
        height:fit-content;
        border-radius: 6px;
        padding: 7px;
        width: 100%;
    }
    .button-new-tag{
        border-radius: 6px;
    }
    .tag {
        color: $text-color-50;
        background:$bg-dark-300;
        border: none;
        border-radius: 10px;
        :deep(.el-tag__close ){
                color: $tag-color!important;
            }
        :deep(.el-tag__close:hover ){
                color: white!important;
                background: $tag-close-hover-background;
            }
    }
</style>
