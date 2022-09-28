<template>
  <div class="video-card">
    <div class="w-100 video-card__header">
      <video class="w-100 h-100 video-card__header-img" @loadedmetadata="handleLodedMetaDate">
        <source :src="video.url" type="video/mp4">
      </video>
    </div>
    <div class="px-6 py-4 pb-4 video-card__body">
      <div class="mb-4 fs-9 w-100 video-card__description" v-html="video.description"></div>
      <div class="gap-3 video-card__feedback-container">
        <FeedbackCard title="Vues" icon="View" background="#00D998" :value="video.views" />
        <FeedbackCard
          title="J'aime"
          svg="/svg/icons/like.svg"
          background="#FF6262"
          :value="video.likes"
        />
        <FeedbackCard
          title="Commentaire"
          icon="ChatDotSquare"
          background="#F586E6"
          :value="video.comments"
        />
        <FeedbackCard title="Partages" icon="Share" background="#0AB6FF" :value="video.shares" />
      </div>
    </div>
    <div class="mt-4 mb-4 ms-6 me-6 d-flex justify-content-between video-card__footer">
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <inline-svg class="video-card__footer-date-icon" src="/svg/icons/time.svg"></inline-svg>
          <span class="ms-2 fs-9 video-card__footer-date">{{ createdAt }}</span>
        </div>
        <div class="ms-8 d-flex align-items-center">
          <inline-svg class="video-card__footer-date-icon" src="/svg/video/videoDuration.svg"></inline-svg>
          <span class="ms-2 fs-9 video-card__footer-date">{{duration}}</span>
        </div>
      </div>
      <div class="horizantal-list__more-icon">
        <CardDropdown
          @edit="handleEdit"
          @share="handleShare"
          @delete="deleteVideoVisible = true"
          @duplicate="handleDuplicate"
        />
      </div>
    </div>
    <DiscardDraftVue 
       :title="$t('video.card.deleteDialog.title')"
       :message="$t('video.card.deleteDialog.message')"
       :discardText="$t('video.card.deleteDialog.discard')" 
       :cancelText="$t('video.card.deleteDialog.goBack')"
       v-if="deleteVideoVisible"
       @discard="handleDelete"
       @close="deleteVideoVisible=false" /> 


  </div>
</template>
<script lang="ts">
import { getCreatedDate } from '@/core/helpers/date'
import { defineComponent, computed, PropType, ref } from 'vue'
import FeedbackCard from './FeedbackCard.vue'
import CardDropdown from '../shared/CardDropdown/CardDropdown.vue'
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { storeToRefs } from 'pinia'
import DiscardDraftVue from '../shared/DiscardDraft/DiscardDraft.vue';
import { IVideoView, useVideoStore } from '@/store/useVideoModule';
import i18n  from "@/core/i18n/i18n";
const { t } = i18n.global
import { setModal } from "@/core/helpers/config";

export default defineComponent({
  components: { FeedbackCard, CardDropdown,DiscardDraftVue },
  props: {
    video: {
      required: true,
      type: Object as PropType<IVideoView>
    }
  },
  setup(props, { emit }) {
    const {getVideoById , fetchVideos , deleteVideo} = useVideoStore()
    const  {pagination} = storeToRefs(useVideoStore())
    const deleteVideoVisible = ref(false)
    const createdAt = computed(() => {
      return getCreatedDate(props.video.createdAt)
    })
    const duration = ref()

    const handleEdit = async () => {
      await getVideoById(props.video.videoId)
      setModal("VideoEdit", {videoId : props.video.videoId})
     }
    const handleDelete = async () => {
      await deleteVideo(props.video.videoId)
      Components.ElMessage.success(t("video.popup.delete"))

     }
    const handleDuplicate = () => {
      console.log("duplicated")
    }
    const handleShare = () => {
      console.log("shared")
    }
    const handleLodedMetaDate = (event: any) =>{
      const videoDuration =  0
      if (Math.floor(event.target.duration) < 60 )
        {
          duration.value = Math.floor(event.target.duration) + " " + t("video.card.duration.second")
        }
      else{
        duration.value = Math.floor(event.target.duration) + " " +  t("video.card.duration.minute")
      }
    }
    return { handleEdit, handleDelete, handleShare, handleDuplicate, createdAt, deleteVideoVisible, duration, handleLodedMetaDate }
  },
})
</script>
<style lang="scss" scoped>
.video-card {
  background: $bg-dark-600;
  border: 1px solid $bg-dark-600;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #6a7199;
}
.video-card__header {
  background-size: cover;
  height: 240px;
}
.video-card__header-img {
  object-fit: cover;
  border-start-end-radius: 10px;
  border-start-start-radius: 10px;
}
.video-card__body {
  border-bottom: 1px solid $white-transparent-11;
}

.video-card__description {
  color: $text-color-50;
  height: 33px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 15px;

  @supports (-webkit-line-clamp: 2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.video-card__feedback-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, minmax(60px, 1fr));
  gap: 5px;
}
.video-card__footer {
  font-style: normal;
  font-weight: 400;
  color: $text-color-10;
}
.video-card__footer-date-icon {
  background-color: $bg-dark-500;
  border-radius: 50%;
}
.video-card__footer-more-icon:hover {
  cursor: pointer;
}
.video-card__footer-date {
  color: $text-color-50;
}
.horizantal-list__more-icon:hover {
  cursor: pointer;
}
</style>