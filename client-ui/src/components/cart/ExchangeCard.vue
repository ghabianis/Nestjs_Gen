<template>
    <div class="p-4 exchange-card__container">
        <div class="fw-500 exchange-card__title">Daily Design Meeting</div>
        <div class="d-flex align-items-center my-3">
            <div class="d-flex justify-content-center align-items-center live-icon">
                <inline-svg src="/svg/liveIcon.svg"></inline-svg>
            </div> 
            <span class="ms-2">Now . 9pm/ 10pm</span>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex  align-items-center">
                <Connections width="24" :connections="['/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png','/png/avatarProfileTest.png']" />
                <span class="ms-1 fs-8">+18</span>
            </div>
            <el-button class="fs-8 exchange-btn"><inline-svg src="/svg/chat.svg"></inline-svg> <span class="ms-2"> Join now</span></el-button>
        </div>

        
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Connections from '../shared/Connections/Connections.vue'
export default defineComponent({
    components:{Connections},
    setup() {
        
    },
})
</script>
<style scoped lang="scss">
.exchange-card__{ 
    &container{
    background: $bg-dark-600;
    border-radius: 10px;
    color: $text-color-50;

    }
    &title {
        color: $text-color-50;
        font-weight: 500;
    }
}
.live-icon{
    background: rgba(244, 0, 44, 0.72);
    width:15px;
    height:15px;
    padding: 3px;
    border-radius: 50%;
} 
.exchange-btn{
    background: #F1416C;
    border-radius: 6px;
    border: none;
    color: $white;
    
    }
</style>