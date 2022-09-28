<template>
    <div class="w-100">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted , onUnmounted} from 'vue'

export default defineComponent({
    setup(props,{emit}) {

        onMounted(async () => {
            window.addEventListener("scroll",handleScroll)
        });
        onUnmounted(() =>{
            window.removeEventListener("scroll",handleScroll)
        })
        const handleScroll = async () => {
          if(window.innerHeight + document.documentElement.scrollTop + 600 >=  document.documentElement.scrollHeight){
            emit('bottom')
          }       
        }



        return {}
    },
})
</script>
