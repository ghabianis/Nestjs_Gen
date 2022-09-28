<template>
    <transition name="fade" mode="default">
        
        <component
            v-if="modalState.type !== ''"
            :is="modalState.type"
            :payload="modalState.payload"
            :showModal="modalState.type !== ''"
             @close-modal="setModal('')"
        ></component>
    </transition>
</template>

<script lang="ts">
import { setModal } from "@/core/helpers/config";

import { defineComponent, computed } from "vue";
import { useConfigStore } from "@/store/useConfig";
import { storeToRefs } from "pinia";

//Modals
import StoryEdit from "@/views/main/story/StoryEdit.vue"
import StoryCreate from "@/views/main/story/StoryCreate.vue"
import PostCreate from "@/views/main/post/PostCreate.vue";
import PostEdit from "@/views/main/post/PostEdit.vue";
import EventCreate from "@/views/main/event/EventCreate.vue"
import EventEdit from "@/views/main/event/EventEdit.vue"
import VideoCreate from "@/views/main/video/VideoCreate.vue"
import VideoEdit from "@/views/main/video/VideoEdit.vue";

export default defineComponent({
    components: {
        StoryEdit,
        StoryCreate,
        PostCreate,
        PostEdit,
        EventCreate,
        EventEdit,
        VideoCreate,
        VideoEdit
    },
    setup() {
        const { modalState } = storeToRefs(useConfigStore());

        return { modalState , setModal };
    },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-to {
    opacity: 0;
}

.fade-leave-active,
.fade-enter-to {
    opacity: 1;
}
</style>
