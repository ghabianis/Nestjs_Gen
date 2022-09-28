<template>
    <div class="d-flex flex-column align-items-center">
        <img class="live-window__video" src="/png/entrepriseTestLive.png" />
        <div class="d-flex flex-column align-items-center live-window__info-wrapper">
            <div class="d-flex align-items-center justify-content-between gap-3 pe-2 live-window-info">
                <div class="d-flex align-items-center gap-3">
                    <div class="d-flex justify-content-center align-items-center live-icon">
                        <inline-svg src="/svg/liveIcon.svg"></inline-svg>
                    </div> 
                    <div class="pe-2 live-window__timer">0.32</div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <div>5K</div>
                    <inline-svg src="/svg/people.svg"></inline-svg>
                </div>
            </div>
            <div class="live-window__join">Join live</div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
.live-window__info-wrapper {
    position: relative;
    bottom:30px;
}
.live-window-info{
    background: rgba(18, 18, 18, 0.9);
    border: 2px solid rgba(0, 0, 0, 0.29);
    border-radius: 13px;
}

.live-icon{
    background: rgba(244, 0, 44, 0.72);
    width:21px;
    height:21px;
    border-radius: 50%;
} 
.live-window__timer {
    border-right: 1px solid #575757;
}
.live-window__join{
    color: $danger-300;
}
.live-window__video{
    width:93px;
    height: 93px;
    @media (max-width:600px){
        width:81px;
        height: 81px;
    }
}
</style>