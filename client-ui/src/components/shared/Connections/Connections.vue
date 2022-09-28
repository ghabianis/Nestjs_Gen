<template>
    <div class="d-flex justify-content-start" :style="`width:${(width/2) * connections.length + width/2}px;`">
        <div  :style="`width:${width}px`" v-for="(src,index) in connections" :key="index">
            <img :src=src :style="`transform:translatex(${-width/2*index}px);width:${width}px`">
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent , PropType} from 'vue'

export default defineComponent({
    props:{
        connections : {
            required:true,
            type: Array as PropType<String[]>
        },
        width:{
            required :true,
            type:String
        }
    },
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
</style>